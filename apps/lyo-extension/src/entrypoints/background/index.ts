import { ActiveTabProductStorageService } from '@/services/active-tab-product-storage.service';
import { TabEventManager } from './services';
import { MessageHandlerRegistry } from './registry/message/message-handler-registry';
import {
  PostActiveTabProductMetaHandler,
  UpdateActiveTabProductButtonTypeHandler,
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

  messageRegistry.register(new OpenSidepanelHandler());

  // Single listener delegates to registry
  browser.runtime.onMessage.addListener(
    async (message: { type: string; data: unknown }, sender, sendResponse) => {
      const result = await messageRegistry.dispatch(message, sender);
      sendResponse(result);
      return true;
    }
  );

  // TODO: when open get active_tab_product_meta, start tryon and connect to sse. 
  // pending_wardrobe_item - store this info (sync with session storage) 
  // and in sidepanel listen to changes of storage key in wardrobe
  // when generation pending -> prepand to wardrobe store. 
  // when generation completed -> update the wardrobe store and remove this pending_wardrobe_item
  // when generation failed -> update the wardrobe store and remove this pending_wardrobe_item

});
