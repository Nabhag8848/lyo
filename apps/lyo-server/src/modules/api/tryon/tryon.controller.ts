import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/api/auth/guards';
import { GenerateTryonDto, GenerateTryonResponseDto } from './dtos';
import { TryonService } from './tryon.service';
import { CurrentUser } from '@/modules/api/user/decorators';
import { AuthUserDto } from '@/modules/api/user/dtos';

@Controller('tryon')
@UseGuards(JwtAuthGuard)
export class TryonController {
  constructor(private readonly tryonService: TryonService) {}

  @Post('gen')
  async generateTryon(
    @Body() body: GenerateTryonDto,
    @CurrentUser() { id: userId }: AuthUserDto
  ): Promise<GenerateTryonResponseDto> {
    const response = await this.tryonService.generateTryon(userId, body);
    return response;
  }
}
