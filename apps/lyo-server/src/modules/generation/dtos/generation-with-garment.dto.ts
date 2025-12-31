import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUUID, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GarmentDto } from '@/modules/garment/dtos';

export class GenerationWithGarmentDto {
  @Expose()
  @IsString()
  @ApiProperty({
    description: 'S3 object key for the generation image',
    example: 'users/123/generations/456',
  })
  key: string;

  @Expose()
  @IsUUID()
  @ApiProperty({
    description: 'Unique identifier for the generation',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: 'Creation timestamp of the generation',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @Expose()
  @ValidateNested()
  @Type(() => GarmentDto)
  @ApiProperty({
    description: 'Garment information associated with this generation',
    type: GarmentDto,
  })
  garment: GarmentDto;
}
