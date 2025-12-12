import { Injectable } from '@nestjs/common';
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3BucketService } from './s3-bucket.service';

@Injectable()
export class S3ObjectService {
  private readonly bucketName: string;
  private readonly client!: S3Client;
  constructor(private readonly s3BucketService: S3BucketService) {
    this.bucketName = this.s3BucketService.getBucketName();
    this.client = this.s3BucketService.client;
  }

  /**
   * Upload a file to S3
   * @param key - The S3 object key (path)
   * @param body - The file content (Buffer, Stream, or string)
   * @param options - Additional options for the upload
   */
  async put(
    key: string,
    body: Buffer,
    options?: S3ObjectService.PutObjectOptions
  ) {
    const { urlExpiresIn, ...commandOptions } = options || {};
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body,
      ...commandOptions,
    });

    const expiresIn = urlExpiresIn || 3600;
    return getSignedUrl(this.client, command, { expiresIn });
  }

  /**
   * Get a file from S3
   * @param key - The S3 object key (path)
   * @returns The presigned URL for the object
   */
  async get(
    key: string,
    options?: S3ObjectService.GetObjectOptions
  ): Promise<string> {
    const { urlExpiresIn, ...commandOptions } = options || {};
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ...commandOptions,
    });

    const expiresIn = urlExpiresIn || 3600;
    return getSignedUrl(this.client, command, { expiresIn });
  }
}
