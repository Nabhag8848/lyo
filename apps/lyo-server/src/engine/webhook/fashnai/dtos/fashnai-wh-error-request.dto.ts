import { IsNotEmpty, IsString } from 'class-validator';

export class FashnaiRequestErrorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
