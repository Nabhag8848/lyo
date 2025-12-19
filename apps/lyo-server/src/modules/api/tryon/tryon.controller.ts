import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/api/auth/guards';
import { GenerateTryonDto, GenerateTryonResponseDto } from './dtos';
import { TryonService } from './tryon.service';
import { CurrentUser } from '@/modules/api/user/decorators';
import { AuthUserDto } from '@/modules/api/user/dtos';

@ApiTags('tryon')
@Controller('tryon')
@UseGuards(JwtAuthGuard)
export class TryonController {
  constructor(private readonly tryonService: TryonService) {}

  @Post('gen')
  @ApiOperation({
    summary: 'Generate virtual try-on',
    description:
      "Generates a virtual try-on image by combining a garment image with the user's avatar",
  })
  @ApiResponse({
    status: 200,
    description: 'Try-on generation initiated successfully',
    type: GenerateTryonResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request - Invalid garment image URL',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  async generateTryon(
    @Body() body: GenerateTryonDto,
    @CurrentUser() { id: userId }: AuthUserDto
  ): Promise<GenerateTryonResponseDto> {
    const response = await this.tryonService.generateTryon(userId, body);
    return response;
  }
}
