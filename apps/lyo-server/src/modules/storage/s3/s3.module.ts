import { Module } from '@nestjs/common';
import { S3ObjectService } from './services/s3-object.service';
import { S3BucketService } from './services/s3-bucket.service';
@Module({
  providers: [S3BucketService, S3ObjectService],
  exports: [S3BucketService, S3ObjectService],
})
export class S3Module {}
