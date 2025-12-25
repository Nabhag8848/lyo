import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/auth/auth.module';
import { SseGenerationModule } from './generation/sse-generation.module';

@Module({
  imports: [AuthModule, SseGenerationModule],
})
export class SseModule {}
