import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUUID, IsUrl, IsOptional } from 'class-validator';

export class GarmentDto {
  @Expose()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for the garment',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Expose()
  @IsUrl()
  @ApiProperty({
    description: 'URL of the garment image',
    example: 'https://example.com/garment.jpg',
  })
  garmentUrl: string;

  @Expose()
  @IsUrl()
  @ApiProperty({
    description: 'Source URL of the garment (e.g., ecommerce product page)',
    example: 'https://ecommerceshop.com/product/123',
  })
  sourceUrl: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Brand name of the ecommerce shop',
    example: 'Myntra',
    nullable: true,
  })
  brandName?: string | null;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Brand name of the garment',
    example: 'Nike',
    nullable: true,
  })
  garmentBrandName?: string | null;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Name of the garment',
    example: 'Red Floral Print Maxi Dress',
    nullable: true,
  })
  garmentName?: string | null;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Description of the garment',
    example: 'A comfortable cotton t-shirt with floral print',
    nullable: true,
  })
  garmentDescription?: string | null;
}
