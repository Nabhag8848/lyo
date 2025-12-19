import { Type } from 'class-transformer';
import {
  IsArray,
  IsDataURI,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FashnaiRequestErrorDto } from './fashnai-wh-error-request.dto';
import { FashnaiWebhookStatus } from '@/engine/webhook/fashnai/enum';
import { ValidateFieldByStatus } from '@/engine/webhook/fashnai/validator';

export class FashnaiWebhookRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for the try-on job',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @IsEnum(FashnaiWebhookStatus)
  @ApiProperty({
    description: 'Status of the try-on job',
    enum: FashnaiWebhookStatus,
    example: FashnaiWebhookStatus.COMPLETED,
  })
  status: FashnaiWebhookStatus;

  @ValidateIf(
    (o: FashnaiWebhookRequestDto) => o.status === FashnaiWebhookStatus.COMPLETED
  )
  @IsNotEmpty()
  @IsArray()
  @IsDataURI({ each: true })
  @ValidateFieldByStatus({
    requiredWhen: FashnaiWebhookStatus.COMPLETED,
    forbiddenWhen: FashnaiWebhookStatus.FAILED,
    oppositeField: 'error',
  })
  @ApiPropertyOptional({
    description:
      'Array of base64-encoded images (data URIs) with try-on results. Up to 4 images. Required when status is completed, must not be present when status is failed.',
    type: [String],
    example: ['data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...'],
  })
  output?: Array<string>;

  @ValidateIf(
    (o: FashnaiWebhookRequestDto) => o.status === FashnaiWebhookStatus.FAILED
  )
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => FashnaiRequestErrorDto)
  @ValidateFieldByStatus({
    requiredWhen: FashnaiWebhookStatus.FAILED,
    forbiddenWhen: FashnaiWebhookStatus.COMPLETED,
    oppositeField: 'output',
  })
  @ApiPropertyOptional({
    description:
      'Error information if the job failed. Required when status is failed, must not be present when status is completed.',
    type: FashnaiRequestErrorDto,
    nullable: true,
  })
  error?: FashnaiRequestErrorDto | null;
}
