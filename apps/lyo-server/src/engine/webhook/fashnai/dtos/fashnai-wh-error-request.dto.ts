import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FashnaiRequestErrorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Error name/type',
    example: 'ValidationError',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Error message',
    example: 'Invalid input provided',
  })
  message: string;
}
