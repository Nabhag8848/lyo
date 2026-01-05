import { MessageHandler } from '../message';

export class ClickBuyActionButtonHandler implements MessageHandler<undefined> {
  readonly messageType = 'click_buy_action_button';

  async handle(
    _data: undefined,
    _sender: Browser.runtime.MessageSender
  ): Promise<void> {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tabs[0]?.id) {
      await browser.tabs.sendMessage<{ type: 'click_buy_action_button' }, void>(
        tabs[0].id,
        {
          type: 'click_buy_action_button',
        }
      );
    }
  }
}
