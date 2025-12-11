/// <reference types="multer" />

import { GoogleOAuthUserDto } from '@/modules/auth/dtos';
import { AuthUserDto } from '@/modules/user/dtos';

interface AppCookies extends Record<string, string | undefined> {
  access_token: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user: AuthUserDto | GoogleOAuthUserDto;
      cookies: AppCookies;
    }
  }
}

export {};
