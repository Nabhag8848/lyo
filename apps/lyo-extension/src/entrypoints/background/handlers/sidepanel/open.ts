import { MessageHandler } from '@/entrypoints/background/handlers/message';
import {
  GenerationService,
  GenerationSSEService,
} from '@/entrypoints/background/services';

export class OpenSidepanelHandler implements MessageHandler<undefined, void> {
  readonly messageType = 'open_sidepanel';

  constructor(
    private readonly generationService: GenerationService,
    private readonly generationSSEService: GenerationSSEService
  ) {}

  async handle(
    _data: undefined,
    sender: Browser.runtime.MessageSender
  ): Promise<void> {
    const options: Browser.sidePanel.OpenOptions = {
      windowId: sender.tab?.windowId ?? browser.windows.WINDOW_ID_NONE,
    };

    await browser.sidePanel.open(options);
    const success = await this.generationService.startGeneration();

    if (success) {
      await this.generationSSEService.connect();
    }
  }
}
