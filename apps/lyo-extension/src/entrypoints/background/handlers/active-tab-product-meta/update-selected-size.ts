import { MessageHandler } from '../message';

export class UpdateSelectedSizeHandler
  implements MessageHandler<{ size: string }>
{
  readonly messageType = 'update_selected_size';

  async handle(data: { size: string }): Promise<void> {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tabs[0]?.id) {
      await browser.tabs.sendMessage(tabs[0].id, {
        type: 'update_selected_size',
        size: data.size,
      });
    }
  }
}
