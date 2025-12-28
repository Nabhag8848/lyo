import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '@/modules/api/user/user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthUserDto } from '@/modules/api/user/dtos';

@Injectable()
export class ActiveUserGuard extends JwtAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {
    super();
  }

  override async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) {
      return false;
    }

    const request = context.switchToHttp().getRequest<Express.Request>();
    const user = request.user as AuthUserDto;

    if (!user || !user.id) {
      throw new ForbiddenException('User not found');
    }

    console.log('user', user);

    const isUserActive = await this.userService.isUserActive(user.id);

    if (!isUserActive) {
      throw new ForbiddenException(
        'Your account is inactive. For early access reachout at nabhag@lyo.fashion'
      );
    }

    return true;
  }
}
