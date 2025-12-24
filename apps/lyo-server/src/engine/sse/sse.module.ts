import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/auth/auth.module';
import { GenerationModule } from './generation/generation.module';

@Module({
  imports: [AuthModule, GenerationModule],
})
export class SseModule {}
