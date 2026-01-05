import { ActiveTabProductStorageService } from '@/services/active-tab-product-storage.service';
import {
  GenerationService,
  GenerationSSEService,
  TabEventManager,
} from './services';
import { MessageHandlerRegistry } from './registry/message/message-handler-registry';
import {
  PostActiveTabProductMetaHandler,
  UpdateActiveTabProductButtonTypeHandler,
  UpdateSelectedSizeHandler,
  ClickBuyActionButtonHandler,
} from './handlers/active-tab-product-meta';
import { OpenSidepanelHandler } from './handlers/sidepanel/open';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async () => {
    await browser.sidePanel.setOptions({
      path: 'sidepanel.html',
      enabled: true,
    });

    await browser.sidePanel.setPanelBehavior({
      openPanelOnActionClick: true,
    });
  });

  const tabEventManager = new TabEventManager();
  tabEventManager.start();

  const activeTabProductStorageService = new ActiveTabProductStorageService();
  // Initialize registry and register handlers
  const messageRegistry = new MessageHandlerRegistry();

  messageRegistry.register(
    new PostActiveTabProductMetaHandler(activeTabProductStorageService)
  );
  messageRegistry.register(
    new UpdateActiveTabProductButtonTypeHandler(activeTabProductStorageService)
  );

  const generationService = new GenerationService();
  const generationSSEService = new GenerationSSEService();
  const openSidepanelHandler = new OpenSidepanelHandler(
    generationService,
    generationSSEService
  );

  messageRegistry.register(openSidepanelHandler);

  const updateSelectedSizeHandler = new UpdateSelectedSizeHandler();
  messageRegistry.register(updateSelectedSizeHandler);

  const clickBuyActionButtonHandler = new ClickBuyActionButtonHandler();
  messageRegistry.register(clickBuyActionButtonHandler);

  // Single listener delegates to registry
  browser.runtime.onMessage.addListener(
    async (message: { type: string; data: unknown }, sender, sendResponse) => {
      const result = await messageRegistry.dispatch(message, sender);
      sendResponse(result);
      return true;
    }
  );
});
