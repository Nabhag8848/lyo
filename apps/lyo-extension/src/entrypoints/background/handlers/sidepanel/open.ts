import { MessageHandler } from '@/entrypoints/background/handlers/message';

export class OpenSidepanelHandler implements MessageHandler<undefined, void> {
  readonly messageType = 'open_sidepanel';

  async handle(
    _data: undefined,
    sender: Browser.runtime.MessageSender
  ): Promise<void> {
    const tabId = sender.tab?.id;
    if (tabId) {
      await browser.sidePanel.open({ tabId });
    }
  }
}
