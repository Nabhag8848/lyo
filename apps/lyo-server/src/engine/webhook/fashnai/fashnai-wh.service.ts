import { Injectable } from '@nestjs/common';
import { FashnaiWebhookStatus } from './enum';
import { S3ObjectService } from '@/modules/storage/s3/services/s3-object.service';

@Injectable()
export class FashnaiWebhookService {
  constructor(private readonly s3ObjectService: S3ObjectService) {}

  async handleFashnaiWebhook({ status, id, output }: any, userId: string) {
    console.log('output', output);
    console.log('id', id);
    console.log('userId', userId);
    console.log('status', status);

    switch (status) {
      case FashnaiWebhookStatus.FAILED:
        return {
          success: false,
        };
      case FashnaiWebhookStatus.COMPLETED: {
        // output contains the base64 encoded images with prefix we must remove that before saving to s3
        const images =
          output?.map((image: any) => {
            return image.replace('data:image/jpeg;base64,', '');
          }) || [];

        const imageBuffers = images.map((image: any) => {
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
