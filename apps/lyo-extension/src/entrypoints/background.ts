import { ProductData } from '@/lib/messaging';
import type { Browser } from 'wxt/browser';

type OpenOptions = Browser.sidePanel.OpenOptions;

export default defineBackground(() => {
  const closeSidePanel = async (tabId?: number) => {
    if (tabId) {
      await browser.storage.session.set({ [`sidePanelOpen_${tabId}`]: false });
      await browser.runtime.sendMessage({ type: 'closeSidePanel' });
    }
  };

  const openSidePanel = async (options: OpenOptions) => {
    await browser.sidePanel.open(options);
    if (options.tabId) {
      await browser.storage.session.set({
        [`sidePanelOpen_${options.tabId}`]: true,
      });
    }
  };

  browser.tabs.onActivated.addListener(async ({ tabId }) => {
    if (tabId) {
      const tab = await browser.tabs.get(tabId);
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

        await closeSidePanel(tabId);
      }
    }
  });

  browser.tabs.onUpdated.addListener(async (tabId, _changeInfo, tab) => {
    const url = tab.url;
    if (!url) return;

    if (url.includes('myntra.com')) {
      await browser.sidePanel.setOptions({
        tabId,
        path: 'sidepanel.html',
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

      await closeSidePanel(tabId);
    }
  });

  browser.sidePanel.onOpened.addListener(async (info) => {
    if (info.tabId) {
      await browser.storage.session.set({
        [`sidePanelOpen_${info.tabId}`]: true,
      });

      const response = await browser.tabs.sendMessage<
        { type: 'getProductData' },
        ProductData
      >(info.tabId, {
        type: 'getProductData',
      });

      if (response) {
        await browser.storage.session.set({ productData: response });
      }
    }
  });

  browser.runtime.onMessage.addListener(async (message, sender) => {
    switch (message.type) {
      case 'openSidePanel': {
        await openSidePanel({
          tabId: sender.tab?.id,
        } as OpenOptions);
        break;
      }
      case 'clickAddToBag': {
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

        await closeSidePanel(tabs[0]?.id);
        break;
      }

      case 'selectSize': {
        // Forward size selection to content script
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

        break;
      }

      case 'updateProductData': {
        if (message.productData) {
          await browser.storage.session.set({
            productData: message.productData,
          });
        }
        break;
      }
    }
  });
});
