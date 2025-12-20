import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FashnaiWebhookController } from './fashnai-wh.controller';
import { FashnaiWebhookService } from './fashnai-wh.service';
import { FashnaiWebhookSecretGuard } from './guards';
import { TryonModule } from '@/modules/api/tryon/tryon.module';
import { S3Module } from '@/modules/storage/s3/s3.module';
import { RedisModule } from '@/database/redis/redis.module';

@Module({
  imports: [ConfigModule, TryonModule, S3Module, RedisModule],
  controllers: [FashnaiWebhookController],
  providers: [FashnaiWebhookService, FashnaiWebhookSecretGuard],
})
export class FashnaiWebhookModule {}
