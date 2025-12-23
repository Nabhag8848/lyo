import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FashnaiWebhookController } from './fashnai-wh.controller';
import { FashnaiWebhookService } from './fashnai-wh.service';
import { FashnaiWebhookSecretGuard } from './guards';
import { S3Module } from '@/modules/storage/s3/s3.module';
import { GenerationModule } from '@/modules/api/generation/generation.module';

@Module({
  imports: [ConfigModule, S3Module, GenerationModule],
  controllers: [FashnaiWebhookController],
  providers: [FashnaiWebhookService, FashnaiWebhookSecretGuard],
})
export class FashnaiWebhookModule {}
