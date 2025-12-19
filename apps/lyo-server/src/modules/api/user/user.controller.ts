import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthUserDto, UserProfileDto } from './dtos';
import { CurrentUser } from './decorators';
import { Serialize } from '@/app/decorators/serialize.decorator';
import { JwtAuthGuard } from '@/modules/api/auth/guards';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @Serialize(UserProfileDto)
  @ApiOperation({
    summary: 'Get user profile',
    description: "Retrieves the authenticated user's profile information",
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
    type: UserProfileDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  async getProfile(
    @CurrentUser() authUser: AuthUserDto
  ): Promise<UserProfileDto> {
    const user = await this.userService.findByIdOrFail(authUser.id);

    return user;
  }
}
