import { MessageEvent } from '@nestjs/common';

declare global {
  interface MessageEventData<T> extends Omit<MessageEvent, 'data'> {
    data: T;
  }
}
