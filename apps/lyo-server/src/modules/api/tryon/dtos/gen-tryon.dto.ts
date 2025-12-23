import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
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

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Brand name of ecommerce shop',
    example: 'Myntra',
    required: false,
  })
  brandName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Brand name of the garment',
    example: 'StyleCast',
    required: false,
  })
  garmentBrandName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Name of the garment',
    example: 'Red Floral Print Maxi Dress',
    required: false,
  })
  garmentName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Description of the garment',
    example:
      'This is a red floral print maxi dress with a v-neckline and a flowy skirt.',
    required: false,
  })
  garmentDescription?: string;
}
