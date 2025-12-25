import { Injectable } from '@nestjs/common';
import { FashnaiWebhookStatus } from './enum';
import { S3ObjectService } from '@/modules/storage/s3/services/s3-object.service';
import { FashnaiWebhookRequestDto } from './dtos';
import { GenerationService } from '@/modules/generation/generation.service';
import { JobStatus } from '@/database/@types';
import { PubSubService } from '@/engine/pubsub/pubsub.service';
import { stringifyJson } from '@/utils';
import { FashnaiGenerationCompleteSchema } from './schema';
@Injectable()
export class FashnaiWebhookService {
  constructor(
    private readonly s3ObjectService: S3ObjectService,
    private readonly generationService: GenerationService,
    private readonly pubSubService: PubSubService<
      typeof FashnaiGenerationCompleteSchema,
      FashnaiGenerationCompletedMessage
    >
  ) {}

  async handleFashnaiWebhook(
    { status, id, output }: FashnaiWebhookRequestDto,
    userId: string
  ) {
    switch (status) {
      case FashnaiWebhookStatus.FAILED:
        return {
          success: false,
        };
      case FashnaiWebhookStatus.COMPLETED: {
        // output contains the base64 encoded images with prefix we must remove that before saving to s3
        const images =
          output?.map((image) => {
            return image.replace('data:image/jpeg;base64,', '');
          }) || [];

        const imageBuffers = images.map((image) => {
          return Buffer.from(image, 'base64');
        });

        const jobId = id;
        const channel = `user:${userId}:generation`;
        const key = `users/${userId}/generations/${jobId}`;
        for (const imageBuffer of imageBuffers) {
          await this.s3ObjectService.put(key, imageBuffer, {
            ContentType: 'image/jpeg',
          });
          await this.generationService.updateGeneration(
            jobId,
            JobStatus.COMPLETED,
            key
          );

          this.pubSubService.publish(
            channel,
            stringifyJson(FashnaiGenerationCompleteSchema, {
              id: jobId,
              imageUrl: key,
            })
          );
        }

        return {
          success: true,
        };
      }
      default:
        return {
          success: false,
        };
    }
  }
}
