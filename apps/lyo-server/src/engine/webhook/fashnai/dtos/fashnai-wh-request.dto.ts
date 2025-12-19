import { Type } from 'class-transformer';
import {
  IsArray,
  IsDataURI,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FashnaiRequestErrorDto } from './fashnai-wh-error-request.dto';
import { FashnaiWebhookStatus } from '@/engine/webhook/fashnai/enum';

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

  @IsOptional()
  @IsArray()
  @IsDataURI({ each: true })
  @ApiPropertyOptional({
    description:
      'Array of base64-encoded images (data URIs) with try-on results. Up to 4 images.',
    type: [String],
    example: [
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...',
    ],
  })
  output?: Array<string>;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FashnaiRequestErrorDto)
  @ApiPropertyOptional({
    description: 'Error information if the job failed',
    type: FashnaiRequestErrorDto,
    nullable: true,
  })
  error?: FashnaiRequestErrorDto | null;
}
