import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateTryonResponseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;
}
