import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { createRedisConfig } from './redis.config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redis: Redis;
  private subscriber: Redis;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.createConnection();
  }

  async onModuleDestroy() {
    await this.redis.quit();
    await this.subscriber.quit();
  }

  private async createConnection(): Promise<void> {
    const redisConfig = createRedisConfig(this.configService);
    this.redis = new Redis(redisConfig);
    // Create separate subscriber client for pub/sub (required for cluster mode)
    this.subscriber = new Redis(redisConfig);
  }

  getClient(): Redis {
    return this.redis;
  }

  getSubscriber(): Redis {
    return this.subscriber;
  }

  async ping(): Promise<string> {
    return this.redis.ping();
  }

  /**
   * Publish a message to a Redis channel
   * @param channel - The channel name
   * @param message - The message to publish (will be JSON stringified)
   */
  async publish(
    channel: string,
    message: string | Record<string, unknown>
  ): Promise<number> {
    const messageStr =
      typeof message === 'string' ? message : JSON.stringify(message);
    return this.redis.publish(channel, messageStr);
  }

  /**
   * Subscribe to a Redis channel
   * @param channel - The channel name
   * @param callback - Callback function to handle messages
   */
  async subscribe(
    channel: string,
    callback: (message: string) => void
  ): Promise<void> {
    await this.subscriber.subscribe(channel);
    this.subscriber.on('message', (ch, message) => {
      if (ch === channel) {
        callback(message);
      }
    });
  }

  /**
   * Unsubscribe from a Redis channel
   * @param channel - The channel name
   */
  async unsubscribe(channel: string): Promise<void> {
    await this.subscriber.unsubscribe(channel);
  }
}
