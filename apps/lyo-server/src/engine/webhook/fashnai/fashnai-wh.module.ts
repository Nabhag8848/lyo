import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FashnaiWebhookController } from './fashnai-wh.controller';
import { FashnaiWebhookService } from './fashnai-wh.service';
import { FashnaiWebhookSecretGuard } from './guards';
import { S3Module } from '@/modules/storage/s3/s3.module';
import { GenerationModule } from '@/modules/api/generation/generation.module';
import {
  PUBSUB_SCHEMA_TOKEN,
  PubSubService,
} from '@/engine/pubsub/pubsub.service';
import { FashnaiGenerationCompleteSchema } from './schema';
@Module({
  imports: [ConfigModule, S3Module, GenerationModule],
  providers: [
    FashnaiWebhookService,
    FashnaiWebhookSecretGuard,
    {
      provide: PUBSUB_SCHEMA_TOKEN,
      useValue: FashnaiGenerationCompleteSchema,
    },
    PubSubService,
  ],
  controllers: [FashnaiWebhookController],
})
export class FashnaiWebhookModule {}
