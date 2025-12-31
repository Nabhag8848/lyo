import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray, IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GenerationWithGarmentDto } from './generation-with-garment.dto';

export class GenerationsResponseDto {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GenerationWithGarmentDto)
  @ApiProperty({
    description:
      'Array of generations with their associated garment information',
    type: [GenerationWithGarmentDto],
  })
  generations: GenerationWithGarmentDto[];

  @Expose()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Cursor for pagination. Use this to fetch the next page.',
    example:
      'MTcwNDA2NzIwMDAwMHwxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDA',
    nullable: true,
  })
  nextCursor: string | null;
}
