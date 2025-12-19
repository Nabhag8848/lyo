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
import { FashnaiRequestErrorDto } from './fashnai-wh-error-request.dto';
import { FashnaiWebhookStatus } from '@/engine/webhook/fashnai/enum';

export class FashnaiWebhookRequestDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsEnum(FashnaiWebhookStatus)
  status: FashnaiWebhookStatus;

  @IsOptional()
  @IsArray()
  @IsDataURI({ each: true })
  output?: Array<string>;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FashnaiRequestErrorDto)
  error?: FashnaiRequestErrorDto | null;
}
