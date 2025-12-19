import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateTryonResponseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Unique identifier for the try-on generation job',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
}
