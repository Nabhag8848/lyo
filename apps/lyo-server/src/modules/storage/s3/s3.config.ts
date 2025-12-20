import { ConfigService } from '@nestjs/config';
import { S3ClientConfig } from '@aws-sdk/client-s3';

export const createS3Config = (
  configService: ConfigService
): S3ClientConfig => {
  // Only set endpoint for LocalStack or S3-compatible services
  // In production, leave AWS_ENDPOINT unset to use default AWS endpoints
  const endpoint =
    configService.get<string>('NODE_ENV') === 'production'
      ? undefined
      : configService.get<string>('AWS_ENDPOINT');

  return {
    ...(endpoint && { endpoint, forcePathStyle: true }),
    region: configService.get<string>('AWS_REGION', 'ap-south-1'),
    credentials: {
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID', ''),
      secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY', ''),
    },
  };
};
