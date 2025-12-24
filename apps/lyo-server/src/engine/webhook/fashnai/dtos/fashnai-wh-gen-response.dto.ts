import { Expose } from 'class-transformer';
import { IsString, IsUrl, IsUUID } from 'class-validator';

export class FashnaiGenerationCompletedResponseDto {
  @Expose()
  @IsString()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  @IsUrl()
  imageUrl: string;
}
