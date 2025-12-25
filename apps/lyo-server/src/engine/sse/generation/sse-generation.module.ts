import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/auth/auth.module';
import {
  PUBSUB_SCHEMA_TOKEN,
  PubSubService,
} from '@/engine/pubsub/pubsub.service';
import { FashnaiGenerationCompleteSchema } from '@/engine/webhook/fashnai/schema';
import { GenerationModule } from '@/modules/generation/generation.module';
import { SseGenerationController } from './sse-generation.controller';

@Module({
  imports: [AuthModule, GenerationModule],
  providers: [
    {
      provide: PUBSUB_SCHEMA_TOKEN,
      useValue: FashnaiGenerationCompleteSchema,
    },
    PubSubService,
  ],
  controllers: [SseGenerationController],
})
export class SseGenerationModule {}
