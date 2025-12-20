import { Injectable } from '@nestjs/common';
import { GenerateTryonDto, GenerateTryonResponseDto } from './dtos';
import { FashnaiService } from '@/modules/fashnai/fashnai.service';
import { S3ObjectService } from '@/modules/storage/s3/services/s3-object.service';
import { RedisService } from '@/database/redis/redis.service';

@Injectable()
export class TryonService {
  private readonly JOB_MAPPING_TTL = 3600; // 1 hour

  constructor(
    private readonly fashnaiService: FashnaiService,
    private readonly s3ObjectService: S3ObjectService,
    private readonly redisService: RedisService
  ) {}

  async generateTryon(
    userId: string,
    { garmentImageUrl }: GenerateTryonDto
  ): Promise<GenerateTryonResponseDto> {
    const modelImageUrl = await this.s3ObjectService.get(
      `users/${userId}/avatar/uploaded_avatar`,
      {
        urlExpiresIn: 5 * 60, // 5 minutes
      }
    );

    const { id: jobId } = await this.fashnaiService.startTryon({
      modelImageUrl,
      garmentImageUrl,
    });

    // Store job ID to user ID mapping in Redis for webhook lookup
    await this.redisService
      .getClient()
      .setex(`tryon:job:${jobId}`, this.JOB_MAPPING_TTL, userId);

    return { id: jobId };
  }

  /**
   * Get user ID for a job ID
   */
  async getUserIdForJob(jobId: string): Promise<string | null> {
    const userId = await this.redisService
      .getClient()
      .get(`tryon:job:${jobId}`);
    return userId;
  }
}
