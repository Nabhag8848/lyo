import { ActiveTabProductStorageService } from '@/services/active-tab-product-storage.service';
import { TabEventManager } from './services';
import { MessageHandlerRegistry } from './registry/message/message-handler-registry';
import {
  PostActiveTabProductMetaHandler,
  UpdateActiveTabProductButtonTypeHandler,
} from './handlers/active-tab-product-meta';

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

  // Single listener delegates to registry
  browser.runtime.onMessage.addListener(
    async (message: { type: string; data: unknown }, sender, sendResponse) => {
      const result = await messageRegistry.dispatch(message, sender);
      sendResponse(result);
      return true;
    }
  );
});
