import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { createS3Config } from '../s3.config';

@Injectable()
export class S3BucketService implements OnModuleInit, OnModuleDestroy {
  public client!: S3Client;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const s3Config = createS3Config(this.configService);
    this.client = new S3Client(s3Config);
  }

  onModuleDestroy() {
    this.client.destroy();
  }

  getBucketName(): string {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    if (!bucketName) {
      throw new Error('S3 bucket name is not configured');
    }
    return bucketName;
  }
}
