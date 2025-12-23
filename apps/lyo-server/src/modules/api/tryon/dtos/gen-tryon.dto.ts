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

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description:
      'Source Product URL of the garment (e.g. ecommerce shop product page)',
    example: 'https://ecommerceshop.com/product/123',
  })
  garmentSourceUrl: string;
}
