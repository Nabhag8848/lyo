import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/auth/auth.module';
import { GenerationController } from './generation.controller';
import {
  PUBSUB_SCHEMA_TOKEN,
  PubSubService,
} from '@/engine/pubsub/pubsub.service';
import { FashnaiGenerationCompleteSchema } from '@/engine/webhook/fashnai/schema';

@Module({
  imports: [AuthModule],
  providers: [
    {
      provide: PUBSUB_SCHEMA_TOKEN,
      useValue: FashnaiGenerationCompleteSchema,
    },
    PubSubService,
  ],
  controllers: [GenerationController],
})
export class GenerationModule {}
