import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetWardrobeDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    name: 'cursor',
    description:
      'Cursor for pagination. Use the nextCursor value from the previous response to fetch the next page. Omit for the first page.',
    example:
      'MTcwNDA2NzIwMDAwMHwxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDA',
    type: String,
    required: false,
  })
  cursor?: string;
}
