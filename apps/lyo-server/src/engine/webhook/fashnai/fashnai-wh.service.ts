import { Injectable, Logger } from '@nestjs/common';
import { FashnaiWebhookRequestDto } from './dtos';
import { FashnaiWebhookStatus } from './enum';
import { TryonService } from '@/modules/api/tryon/tryon.service';
import { S3ObjectService } from '@/modules/storage/s3/services/s3-object.service';
import { RedisService } from '@/database/redis/redis.service';

@Injectable()
export class FashnaiWebhookService {
  private readonly logger = new Logger(FashnaiWebhookService.name);

  constructor(
    private readonly tryonService: TryonService,
    private readonly s3ObjectService: S3ObjectService,
    private readonly redisService: RedisService
  ) {}

  async handleFashnaiWebhook(dto: FashnaiWebhookRequestDto) {
    const { id: jobId, status, output, error } = dto;

    try {
      // Get user ID from job mapping
      const userId = await this.tryonService.getUserIdForJob(jobId);

      if (!userId) {
        this.logger.warn(`No user ID found for job ${jobId}`);
        return { success: false, error: 'Job not found' };
      }

      const channel = `tryon:${jobId}`;

      if (status === FashnaiWebhookStatus.FAILED) {
        // Publish failure event to Redis
        await this.redisService.publish(channel, {
          event: 'failed',
          jobId,
          error: error || { message: 'Unknown error' },
        });

        return { success: false };
      }

      if (status === FashnaiWebhookStatus.COMPLETED && output) {
        // Store base64 images in S3 and get URLs
        const imageUrls: string[] = [];

        for (let i = 0; i < output.length; i++) {
          const dataUri = output[i];
          const base64Data = dataUri.split(',')[1]; // Remove data:image/jpeg;base64, prefix
          const imageBuffer = Buffer.from(base64Data, 'base64');

          // Determine content type from data URI
          const contentTypeMatch = dataUri.match(/data:([^;]+)/);
          const contentType = contentTypeMatch
            ? contentTypeMatch[1]
            : 'image/jpeg';

          // Store in S3
          const s3Key = `users/${userId}/tryon/${jobId}/result_${i + 1}.jpg`;
          await this.s3ObjectService.put(s3Key, imageBuffer, {
            ContentType: contentType,
          });

          // Get presigned URL
          const imageUrl = await this.s3ObjectService.get(s3Key, {
            urlExpiresIn: 7 * 24 * 60 * 60, // 7 days
          });

          imageUrls.push(imageUrl);
        }

        // Publish completion event to Redis with S3 URLs
        await this.redisService.publish(channel, {
          event: 'completed',
          jobId,
          imageUrls,
        });

        this.logger.log(
          `Try-on job ${jobId} completed. Stored ${imageUrls.length} images for user ${userId}`
        );

        return { success: true };
      }

      return { success: false, error: 'Invalid webhook data' };
    } catch (error) {
      this.logger.error(`Error handling webhook for job ${jobId}:`, error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }
}
