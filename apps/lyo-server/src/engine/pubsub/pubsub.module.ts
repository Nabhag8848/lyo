import { RedisModule } from '@/database/redis';
import { Module } from '@nestjs/common';
@Module({
  imports: [RedisModule],
  exports: [RedisModule],
})
export class PubSubModule {}
