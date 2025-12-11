import { Product } from '@/lib/messaging';
import type { Browser } from 'wxt/browser';

type OpenOptions = Browser.sidePanel.OpenOptions;

export default defineBackground(() => {
  const closeSidePanel = async (tabId?: number, url?: string) => {
    if (tabId) {
      await browser.storage.session.set({ [`sidePanelOpen_${tabId}`]: false });
      if (url && !url.includes('myntra.com')) {
        await new Promise((resolve) => setTimeout(resolve, 0));
        await browser.runtime.sendMessage({ type: 'closeSidePanel' });
      }
    }
  };

  const forceCloseSidePanel = async (tabId?: number) => {
    if (tabId) {
      await browser.storage.session.set({ [`sidePanelOpen_${tabId}`]: false });
      await new Promise((resolve) => setTimeout(resolve, 0));
      await browser.runtime.sendMessage({ type: 'closeSidePanel' });
    }
  };

  const openSidePanel = async (
    options: OpenOptions,
    product: Product | null
  ) => {
    if (options.tabId) {
      await browser.sidePanel.open(options);
      await browser.storage.session.set({
        [`sidePanelOpen_${options.tabId}`]: true,
      });

      if (product) {
        await browser.storage.session.set({ current_product_view: product });
      }
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
        const tab = await browser.tabs.get(tabId);
        const { url } = tab;
        await browser.sidePanel.setOptions({
          tabId,
          enabled: false,
        });
        await closeSidePanel(tabId, url);
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
      await closeSidePanel(tab.id, url);
    }
  });

  browser.runtime.onMessage.addListener(async (message, sender) => {
    switch (message.type) {
      case 'openSidePanel': {
        const product: Product | null = message.current_product_view;
        await openSidePanel(
          {
            tabId: sender.tab?.id,
          } as OpenOptions,
          product
        );
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
          await forceCloseSidePanel(tabs[0]?.id);
        }
        break;
      }

      case 'selectSize': {
        // Forward size selection to content script
        const tabs = await browser.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (tabs[0]?.id) {
          const product = await browser.tabs.sendMessage<
            { type: 'selectSize'; size: string },
            Product
          >(tabs[0].id, {
            type: 'selectSize',
            size: message.size,
          });

          await browser.storage.session.set({
            current_product_view: product,
          });
        }

        break;
      }

      case 'updateSizeAndButtonType': {
        const product = await browser.storage.session.get(
          'current_product_view'
        );
        if (product && product.current_product_view) {
          await browser.storage.session.set({
            current_product_view: {
              ...product.current_product_view,
              selectedSize: message.size,
              buttonType: message.buttonType,
            },
          });
        }
        break;
      }

      case 'updateButtonType': {
        const product = await browser.storage.session.get(
          'current_product_view'
        );
        if (product && product.current_product_view) {
          await browser.storage.session.set({
            current_product_view: {
              ...product.current_product_view,
              buttonType: message.buttonType,
            },
          });
        }
        break;
      }
    }
  });
});
