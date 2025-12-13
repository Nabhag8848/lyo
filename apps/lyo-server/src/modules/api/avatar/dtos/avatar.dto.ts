import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';

export class AvatarDto {
  @Expose()
  @IsString()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  @IsUrl()
  @IsOptional()
  url?: string;
}
