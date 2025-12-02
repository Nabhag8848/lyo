import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
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

    const cookieOptions = this.getCookieOptions(frontendUrl, isProduction);

    res.cookie('access_token', authResponse.accessToken, {
      ...cookieOptions,
      maxAge: authResponse.expiresIn * 1000, // Convert seconds to milliseconds
    });

    return res.redirect(`${frontendUrl}/dashboard`);
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    const frontendUrl =
      this.configService.get<string>('FRONT_URL') || 'http://localhost:4200';
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    // Use same cookie options as login to ensure proper deletion
    // Must match exact same domain, path, and sameSite to delete cookie
    const clearCookieOptions = {
      ...this.getCookieOptions(frontendUrl, isProduction),
      maxAge: 0, // Delete cookie immediately
    };

    res.cookie('access_token', '', clearCookieOptions);

    return res.redirect(frontendUrl);
  }

  /**
   * Extract root domain for subdomain cookie sharing
   * Returns domain with leading dot (e.g., '.example.com') for custom domains only
   * Returns undefined for localhost, IP addresses, third-party hosting (e.g., vercel.app), or in development
   */
  private getCookieDomain(
    frontendUrl: string,
    isProduction: boolean
  ): string | undefined {
    if (!isProduction) return undefined; // localhost doesn't support domain option

    try {
      const url = new URL(frontendUrl);
      const hostname = url.hostname;

      // For IP addresses or localhost, don't set domain
      if (hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
        return undefined;
      }

      // Don't set domain for third-party hosting platforms (e.g., vercel.app, netlify.app, github.io)
      // This ensures cookies only work for the specific subdomain, not all subdomains of the platform
      const thirdPartyHostingPatterns = [
        /\.vercel\.app$/,
        /\.netlify\.app$/,
        /\.github\.io$/,
        /\.pages\.dev$/,
        /\.cloudflare\.pages\.dev$/,
      ];

      if (thirdPartyHostingPatterns.some((pattern) => pattern.test(hostname))) {
        return undefined;
      }

      const parts = hostname.split('.');
      // Only apply root domain logic for custom domains with at least 2 parts
      // This allows subdomain sharing for your own domain (e.g., .lyo-ai.com)
      if (parts.length >= 2) {
        // Return root domain with leading dot for subdomain sharing
        return `.${parts.slice(-2).join('.')}`;
      }

      return undefined;
    } catch {
      return undefined;
    }
  }

  /**
   * Get cookie options for authentication tokens
   * Configured for cross-domain and subdomain support
   */
  private getCookieOptions(frontendUrl: string, isProduction: boolean) {
    return {
      httpOnly: true, // Prevent JS access (XSS protection)
      secure: isProduction, // HTTPS only in production (required for sameSite: 'none')
      sameSite: isProduction ? ('none' as const) : ('lax' as const), // Cross-domain in prod, same-domain in dev
      domain: this.getCookieDomain(frontendUrl, isProduction), // Share across subdomains (e.g., .example.com)
      path: '/', // Available on all paths
    };
  }
}
