import { onMessage } from '@/lib/messaging';

export default defineBackground(() => {
  browser.tabs.onActivated.addListener(async ({ tabId }) => {
    if (tabId) {
      const tab = await browser.tabs.get(tabId);
      const { url } = tab;

      if (!url?.includes('myntra.com')) {
        await browser.sidePanel.setOptions({
          tabId,
          enabled: false,
        });

        await browser.storage.local.set({ sidePanelOpen: false });
      }
    }
  });

  browser.tabs.onUpdated.addListener(async (tabId, _changeInfo, tab) => {
    if (tabId) {
      const { url } = tab;
      if (url?.includes('myntra.com')) {
        await browser.sidePanel.setOptions({
          path: 'sidepanel.html',
          tabId,
          enabled: true,
        });

        await browser.sidePanel.setPanelBehavior({
          openPanelOnActionClick: true,
        });
      } else {
        await browser.sidePanel.setOptions({
          tabId,
          enabled: false,
        });
        await browser.storage.local.set({ sidePanelOpen: false });
      }
    }
  });

  onMessage('openSidePanel', async ({ sender }) => {
    await browser.sidePanel.open({
      tabId: sender.tab?.id,
    });
    await browser.storage.local.set({ sidePanelOpen: true });

    // Extract product data immediately when side panel is opened
    if (sender.tab?.id) {
      try {
        const response = await browser.tabs.sendMessage(sender.tab.id, {
          type: 'getProductData',
        });
        if (response) {
          await browser.storage.local.set({ productData: response });
        } else {
          console.warn('LYO: No product data extracted');
        }
      } catch (error) {
        console.error('LYO: Error getting product data:', error);
      }
    }
  });

  browser.runtime.onMessage.addListener(async (message, sender) => {
    if (message.type === 'sidePanelOpened') {
      await browser.storage.local.set({ sidePanelOpen: true });

      // Extract product data from content script and store it
      if (sender.tab?.id) {
        try {
          const response = await browser.tabs.sendMessage(sender.tab.id, {
            type: 'getProductData',
          });
          if (response) {
            await browser.storage.local.set({ productData: response });
          }
        } catch (error) {
          console.error('LYO: Error getting product data:', error);
        }
      }
    } else if (message.type === 'sidePanelClosed') {
      await browser.storage.local.set({ sidePanelOpen: false });
    } else if (message.type === 'clickAddToBag') {
      try {
        const tabs = await browser.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (tabs[0]?.id) {
          await browser.tabs.sendMessage(tabs[0].id, {
            type: 'clickAddToBag',
            buttonType: message.buttonType,
          });
        }

        await browser.storage.local.set({ sidePanelOpen: false });
        // Send message to side panel to close itself
        browser.runtime.sendMessage({ type: 'closeSidePanel' }).catch(() => {
          // Ignore errors if side panel is not open
        });
      } catch (error) {
        console.error('LYO: Error clicking add to bag:', error);
      }
    } else if (message.type === 'selectSize') {
      // Forward size selection to content script
      try {
        const tabs = await browser.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (tabs[0]?.id) {
          await browser.tabs.sendMessage(tabs[0].id, {
            type: 'selectSize',
            size: message.size,
          });
        }
      } catch (error) {
        console.error('LYO: Error selecting size:', error);
      }
    } else if (message.type === 'updateProductData') {
      // Update product data when size changes
      if (message.productData) {
        await browser.storage.local.set({ productData: message.productData });
      }
    }
  });
});
