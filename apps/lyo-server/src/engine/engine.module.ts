import { Module } from '@nestjs/common';
import { WebhookModule } from './webhook/webhook.module';
import { SseModule } from './sse/sse.module';

@Module({
  imports: [SseModule, WebhookModule],
})
export class EngineModule {}
