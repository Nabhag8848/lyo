import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerationEntity } from '@/database/entities';
import { GenerationService } from './generation.service';
import { S3Module } from '@/modules/storage/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([GenerationEntity]), S3Module],
  providers: [GenerationService],
  exports: [GenerationService],
})
export class GenerationModule {}
