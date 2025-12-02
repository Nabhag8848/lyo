import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import type { Request } from 'express';
import { GoogleOAuthUserDto } from '@/modules/auth/dtos';

export const GoogleUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): GoogleOAuthUserDto => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user;
    return plainToInstance(GoogleOAuthUserDto, user, {
      excludeExtraneousValues: false,
    });
  }
);
