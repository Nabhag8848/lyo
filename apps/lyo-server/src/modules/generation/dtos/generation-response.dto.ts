import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUrl, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GarmentDto } from '@/modules/garment/dtos';

export class GenerationResponseDto {
  @Expose()
  @IsUUID()
  @ApiProperty({
    description:
      'Unique identifier for the generation. Use this ID to reference the specific try-on generation.',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Expose()
  @IsUrl()
  @ApiProperty({
    description:
      'Pre-signed URL for the generation image. This URL is temporary and expires after a set time. Use this URL directly to display the image.',
    example:
      'https://s3.amazonaws.com/bucket/users/123/generations/456.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...',
  })
  signedUrl: string;

  @Expose()
  @ValidateNested()
  @Type(() => GarmentDto)
  @ApiProperty({
    description: 'Garment information associated with this generation',
    type: GarmentDto,
  })
  garment: GarmentDto;
}
