import { Expose } from 'class-transformer';
import { IsArray, IsString, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { WardrobeItemDto } from './wardrobe-item.dto';

export class WardrobeResponseDto {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WardrobeItemDto)
  @ApiProperty({
    description:
      'Array of wardrobe items. Each item contains a generation ID and a signed URL for the generated try-on image.',
    type: [WardrobeItemDto],
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        signedUrl:
          'https://s3.amazonaws.com/bucket/path/to/image.jpg?signature=...',
      },
      {
        id: '223e4567-e89b-12d3-a456-426614174001',
        signedUrl:
          'https://s3.amazonaws.com/bucket/path/to/image2.jpg?signature=...',
      },
    ],
  })
  wardrobe: WardrobeItemDto[];

  @Expose()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description:
      'Cursor for pagination. If present, use this value as the cursor query parameter to fetch the next page. If null, there are no more pages.',
    example:
      'MTcwNDA2NzIwMDAwMHwxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDA',
    nullable: true,
  })
  nextCursor: string | null;
}
