import { ConfigService } from '@nestjs/config';
import { S3ClientConfig } from '@aws-sdk/client-s3';

export const createS3Config = (
  configService: ConfigService
): S3ClientConfig => {
  return {
    region: configService.get<string>('AWS_REGION', 'ap-south-1'),
    credentials: {
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID', ''),
      secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY', ''),
    },
  };
};
