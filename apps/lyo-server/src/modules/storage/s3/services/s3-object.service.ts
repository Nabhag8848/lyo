import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3BucketService } from './s3-bucket.service';

@Injectable()
export class S3ObjectService {
  private readonly bucketName: string;
  constructor(private readonly s3BucketService: S3BucketService) {
    this.bucketName = this.s3BucketService.getBucketName();
  }

  private get client(): S3Client {
    return this.s3BucketService.client;
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
  ): Promise<void> {
    const { urlExpiresIn, ...commandOptions } = options || {};
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: body,
      ...commandOptions,
    });

    const { $metadata } = await this.client.send(command);

    if ($metadata.httpStatusCode !== 200) {
      throw new InternalServerErrorException('Failed to upload file to S3');
    }
  }

  /**
   * Check if an object exists in S3
   * @param key - The S3 object key (path)
   * @returns True if the object exists, false otherwise
   */
  async existsOrFail(key: string): Promise<void> {
    const command = new HeadObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      await this.client.send(command);
    } catch (error) {
      const awsError = error as {
        name?: string;
        $metadata?: { httpStatusCode?: number };
      };

      if (
        awsError.name === 'NotFound' ||
        awsError.$metadata?.httpStatusCode === 404
      ) {
        throw new NotFoundException('Object not found');
      }

      throw new InternalServerErrorException(
        'Failed to check if object exists'
      );
    }
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
    await this.existsOrFail(key);
    const { urlExpiresIn, ...commandOptions } = options || {};
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ...commandOptions,
    });

    const expiresIn = urlExpiresIn || 3600;
    return getSignedUrl(this.client, command, { expiresIn });
  }

  /**
   * Delete a file from S3
   * @param key - The S3 object key (path)
   */
  async delete(key: string): Promise<void> {
    await this.existsOrFail(key);
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const { $metadata } = await this.client.send(command);

    if ($metadata.httpStatusCode !== 204 && $metadata.httpStatusCode !== 200) {
      throw new InternalServerErrorException('Failed to delete file from S3');
    }
  }
}
