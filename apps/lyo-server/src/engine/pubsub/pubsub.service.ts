import {
  Injectable,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { createRedisConfig } from '@/database/redis';
import { Subject } from 'rxjs';
import { parseJson } from '@/utils';
import z from 'zod';

export const PUBSUB_SCHEMA_TOKEN = Symbol('PUBSUB_SCHEMA');

@Injectable()
export class PubSubService<
  Schema extends z.ZodType<Type>,
  Type = z.infer<Schema>
> implements OnModuleInit, OnModuleDestroy
{
  private publisher: Redis;
  private subscriber: Redis;
  private activeSubscriptions = new Map<
    string,
    Subject<MessageEventData<Type>>
  >();

  constructor(
    private configService: ConfigService,
    @Inject(PUBSUB_SCHEMA_TOKEN)
    private readonly schema: Schema
  ) {}

  async onModuleInit() {
    const redisConfig = createRedisConfig(this.configService);
    this.publisher = new Redis({
      ...redisConfig,
      connectionName: 'publisher',
    });
    this.subscriber = new Redis({
      ...redisConfig,
      connectionName: 'subscriber',
    });

    this.subscriber.on('message', (channel, message) => {
      const subscription = this.activeSubscriptions.get(channel);
      if (subscription) {
        const data = parseJson<Type>(this.schema, message);
        if (data) {
          subscription.next({ data });
        }
      }
    });
  }
  async onModuleDestroy() {
    this.activeSubscriptions.forEach((subscription) => {
      subscription.complete();
    });
    await this.publisher.quit();
    await this.subscriber.quit();
  }

  subscribe(channel: string) {
    const subscription = this.getSubscription(channel);
    this.subscriber.subscribe(channel);
    return subscription.asObservable();
  }

  publish(channel: string, data: string): void {
    this.publisher.publish(channel, data);
  }

  private getSubscription(channel: string): Subject<MessageEventData<Type>> {
    // if no subscription, create a new one
    return (
      this.activeSubscriptions.get(channel) ?? this.createSubscription(channel)
    );
  }

  private createSubscription(channel: string) {
    const subject = new Subject<MessageEventData<Type>>();
    this.activeSubscriptions.set(channel, subject);
    return subject;
  }
}
