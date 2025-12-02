import { GoogleOAuthUserDto } from '@/modules/auth/dtos';
import { AuthUserDto } from '@/modules/user/dtos';

declare module 'express' {
  interface Request {
    user: AuthUserDto | GoogleOAuthUserDto;
  }
}
