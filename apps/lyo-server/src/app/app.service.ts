import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthCheck(): { message: string; id: number } {
    return { message: 'Health Check', id: process.pid };
  }
}
