import { GoogleOAuthUserDto } from '@/modules/auth/dtos';
import { AuthUserDto } from '@/modules/user/dtos';

// Define the cookies structure explicitly
interface AppCookies extends Record<string, string | undefined> {
  access_token: string | null;
}

declare module 'express' {
  interface Request {
    user: AuthUserDto | GoogleOAuthUserDto;
    cookies: AppCookies;
  }
}
