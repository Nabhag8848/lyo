import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@/modules/user/user.service';
import { GoogleOAuthUserDto } from './dtos';
import { parseExpiration } from './utils';

export interface TokenPayload {
  accessToken: string;
  expiresIn: number;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService
  ) {}

  async validateGoogleUser(
    googleUser: GoogleOAuthUserDto
  ): Promise<TokenPayload> {
    const user = await this.userService.upsertGoogleUser(googleUser);
    return this.generateTokens(user.id, user.email, googleUser.accessToken);
  }

  async generateTokens(
    userId: string,
    email: string,
    googleAccessToken: string
  ): Promise<TokenPayload> {
    const jti = crypto.randomUUID();
    const payload: {
      sub: string;
      email: string;
      jti: string;
      googleAccessToken: string;
    } = { sub: userId, email, jti, googleAccessToken };

    const accessExpiresIn = parseExpiration(
      this.configService.get<string>('JWT_ACCESS_EXPIRATION') || '15m'
    );

    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: accessExpiresIn }),
    ]);

    return { accessToken, expiresIn: accessExpiresIn };
  }

  /**
   * Revoke Google OAuth token
   * This is a fire-and-forget operation that doesn't block the caller
   */
  async revokeGoogleToken(googleAccessToken: string): Promise<void> {
    await fetch(
      `https://oauth2.googleapis.com/revoke?token=${googleAccessToken}`,
      {
        method: 'POST',
      }
    );
  }
}
