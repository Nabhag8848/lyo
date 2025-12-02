import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards';
import { GoogleUser } from './decorators';
import { GoogleOAuthUserDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // Guard redirects to Google
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(
    @GoogleUser() googleUser: GoogleOAuthUserDto,
    @Res() res: Response
  ) {
    const authResponse = await this.authService.validateGoogleUser(googleUser);

    const frontendUrl =
      this.configService.get<string>('FRONT_URL') || 'http://localhost:4200';
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    // For cross-origin cookies in development, use sameSite: 'none' with secure
    // In production, use strict sameSite
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? ('strict' as const) : ('lax' as const),
      path: '/',
      domain: isProduction ? undefined : 'localhost',
    };

    res.cookie('access_token', authResponse.accessToken, {
      ...cookieOptions,
      maxAge: authResponse.expiresIn * 1000,
    });

    return res.redirect(`${frontendUrl}/dashboard`);
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    const clearCookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict' as const,
      maxAge: 0,
      path: '/',
      domain: isProduction ? undefined : 'localhost',
    };

    res.cookie('access_token', '', clearCookieOptions);
    res.cookie('refresh_token', '', clearCookieOptions);

    return res.json({ message: 'Logged out successfully' });
  }
}
