import { Injectable } from '@nestjs/common';
import { FashnaiWebhookRequestDto } from './dtos';
import { FashnaiWebhookStatus } from './enum';

@Injectable()
export class FashnaiWebhookService {
  async handleFashnaiWebhook(dto: FashnaiWebhookRequestDto) {
    switch (dto.status) {
      case FashnaiWebhookStatus.FAILED:
        return {
          success: false,
        };
      case FashnaiWebhookStatus.COMPLETED:
        return {
          success: true,
        };
      default:
        return {
          success: false,
        };
    }
  }
}
