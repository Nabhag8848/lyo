import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@/modules/user/user.service';
import { GoogleOAuthUserDto } from './dtos';
import { parseExpiration } from './utils';

export interface TokenPayload {
  accessToken: string;
  refreshToken: string;
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
    return this.generateTokens(user.id, user.email);
  }

  async generateTokens(userId: string, email: string): Promise<TokenPayload> {
    const payload = { sub: userId, email };

    const accessExpiresIn = parseExpiration(
      this.configService.get<string>('JWT_ACCESS_EXPIRATION') || '15m'
    );
    const refreshExpiresIn = parseExpiration(
      this.configService.get<string>('JWT_REFRESH_EXPIRATION') || '7d'
    );

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: accessExpiresIn }),
      this.jwtService.signAsync(payload, { expiresIn: refreshExpiresIn }),
    ]);

    return { accessToken, refreshToken, expiresIn: accessExpiresIn };
  }

  async refreshTokens(refreshToken: string): Promise<TokenPayload> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      return this.generateTokens(payload.sub, payload.email);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
