import { Module } from '@nestjs/common';
import { FashnaiWebhookModule } from './fashnai/fashnai-wh.module';

@Module({
  imports: [FashnaiWebhookModule],
})
export class WebhookModule {}
