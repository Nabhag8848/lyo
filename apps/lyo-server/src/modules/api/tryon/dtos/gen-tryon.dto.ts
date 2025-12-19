import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateTryonDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'URL of the garment image to try on',
    example: 'https://example.com/garment.jpg',
  })
  garmentImageUrl: string;
}
