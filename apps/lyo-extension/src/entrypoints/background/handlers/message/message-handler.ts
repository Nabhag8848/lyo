export interface MessageHandler<TData, TResponse = void> {
  readonly messageType: string;
  handle(
    data: TData,
    sender: Browser.runtime.MessageSender
  ): Promise<TResponse>;
}
