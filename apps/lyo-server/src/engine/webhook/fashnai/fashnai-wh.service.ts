import { Injectable } from '@nestjs/common';
import { FashnaiWebhookRequestDto } from './dtos';
import { FashnaiWebhookStatus } from './enum';
import { S3ObjectService } from '@/modules/storage/s3/services/s3-object.service';

@Injectable()
export class FashnaiWebhookService {
  constructor(private readonly s3ObjectService: S3ObjectService) {}

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

        const generationId = id;
        const key = `users/${userId}/generations/${generationId}`;
        for (const imageBuffer of imageBuffers) {
          await this.s3ObjectService.put(key, imageBuffer, {
            ContentType: 'image/jpeg',
          });
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
