import {
  CanActivate,
  ExecutionContext,
  Injectable,
  RawBodyRequest,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class FashnaiWebhookSecretGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<RawBodyRequest<Request>>();

    const secret = request.query.secret as string | undefined;
    const expectedSecret = this.configService.get<string>(
      'FASHNAI_WEBHOOK_SECRET'
    );

    if (!expectedSecret) {
      throw new UnauthorizedException('Webhook secret not configured');
    }

    if (!secret || secret !== expectedSecret) {
      throw new UnauthorizedException('401 Unauthorized');
    }

    return true;
  }
}
