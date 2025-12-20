import { Module } from '@nestjs/common';
import { TryonController } from './tryon.controller';
import { TryonSseController } from './tryon-sse.controller';
import { TryonService } from './tryon.service';
import { FashnaiModule } from '@/modules/fashnai/fashnai.module';
import { S3Module } from '@/modules/storage/s3/s3.module';
import { RedisModule } from '@/database/redis/redis.module';

@Module({
  imports: [FashnaiModule, S3Module, RedisModule],
  controllers: [TryonController, TryonSseController],
  providers: [TryonService],
  exports: [TryonService],
})
export class TryonModule {}
