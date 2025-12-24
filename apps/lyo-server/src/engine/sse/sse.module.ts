import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/auth/auth.module';
import { SseController } from './sse.controller';

@Module({
  imports: [AuthModule],
  controllers: [SseController],
})
export class SseModule {}
