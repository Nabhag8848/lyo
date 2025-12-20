import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FashnaiWebhookController } from './fashnai-wh.controller';
import { FashnaiWebhookService } from './fashnai-wh.service';
import { FashnaiWebhookSecretGuard } from './guards';

@Module({
  imports: [ConfigModule],
  controllers: [FashnaiWebhookController],
  providers: [FashnaiWebhookService, FashnaiWebhookSecretGuard],
})
export class FashnaiWebhookModule {}
