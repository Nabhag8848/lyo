import type {
  PutObjectCommandInput,
  GetObjectCommandInput,
} from '@aws-sdk/client-s3';

declare global {
  namespace S3ObjectService {
    interface PutObjectOptions
      extends Omit<PutObjectCommandInput, 'Bucket' | 'Key' | 'Body'> {
      urlExpiresIn?: number;
    }
    interface GetObjectOptions
      extends Omit<GetObjectCommandInput, 'Bucket' | 'Key'> {
      urlExpiresIn?: number;
    }
  }
}
