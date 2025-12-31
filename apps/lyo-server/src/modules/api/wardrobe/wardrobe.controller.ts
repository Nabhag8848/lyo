import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@/modules/auth/decorators';
import { AuthUserDto } from '@/modules/api/user/dtos';
import { ActiveUserGuard } from '@/modules/auth/guards';
import { Serialize } from '@/app/decorators/serialize.decorator';
import { WardrobeService } from './wardrobe.service';
import { WardrobeResponseDto } from './dtos/wardrobe.dto';
import { GetWardrobeDto } from './dtos/get-wardrobe.dto';

@ApiTags('wardrobe')
@Controller('wardrobe')
@UseGuards(ActiveUserGuard)
export class WardrobeController {
  constructor(private readonly wardrobeService: WardrobeService) {}

  @Get('me')
  @Serialize(WardrobeResponseDto)
  @ApiOperation({
    summary: 'Get user wardrobe',
    description:
      'Retrieves paginated wardrobe items (generated try-on images) for the authenticated user. Uses cursor-based pagination. Each item includes the generation ID and a signed URL for the image. Returns up to 10 items per page.',
  })
  @ApiResponse({
    status: 200,
    description: 'Wardrobe items retrieved successfully',
    type: WardrobeResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid cursor format',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - User account is inactive',
  })
  async getWardrobe(
    @CurrentUser() user: AuthUserDto,
    @Query() query: GetWardrobeDto
  ): Promise<WardrobeResponseDto> {
    const limit = 10;
    return this.wardrobeService.getWardrobe(user.id, limit, query.cursor);
  }
}
