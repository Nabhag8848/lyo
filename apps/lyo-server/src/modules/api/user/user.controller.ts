import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthUserDto, UserProfileDto } from './dtos';
import { CurrentUser } from '@/modules/auth/decorators';
import { Serialize } from '@/app/decorators/serialize.decorator';
import { JwtAuthGuard } from '@/modules/auth/guards';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @Serialize(UserProfileDto)
  @ApiOperation({
    summary: 'Get current user',
    description: "Retrieves the authenticated user's information",
  })
  @ApiResponse({
    status: 200,
    description: 'Current user retrieved successfully',
    type: UserProfileDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  async getCurrentUser(
    @CurrentUser() authUser: AuthUserDto
  ): Promise<UserProfileDto> {
    const user = await this.userService.findByIdOrFail(authUser.id);

    return user;
  }
}
