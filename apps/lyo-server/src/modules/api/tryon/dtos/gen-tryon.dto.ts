import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class GenerateTryonDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  garmentImageUrl: string;
}
