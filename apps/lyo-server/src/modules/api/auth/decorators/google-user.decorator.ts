import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { GoogleOAuthUserDto } from '@/modules/api/auth/dtos';

export const GoogleUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): GoogleOAuthUserDto => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as GoogleOAuthUserDto;
  }
);
