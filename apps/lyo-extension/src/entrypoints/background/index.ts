import { currentProductView } from '@/lib/storage';
import type { Browser } from 'wxt/browser';

type OpenOptions = Browser.sidePanel.OpenOptions;

export default defineBackground(() => {
  // onInstallation
  browser.runtime.onInstalled.addListener(async () => {
    await browser.sidePanel.setOptions({
      path: 'sidepanel.html',
      enabled: true,
    });

    await browser.sidePanel.setPanelBehavior({
      openPanelOnActionClick: true,
    });
  });

  const forceCloseSidePanel = async (tabId?: number) => {
    if (tabId) {
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

      if (product) {
        await currentProductView.setValue(product);
      }
    }
  };

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

          await currentProductView.setValue(product);
        }

        break;
      }

      case 'updateSizeAndButtonType': {
        const product = await currentProductView.getValue();
        if (product) {
          await currentProductView.setValue({
            ...product,
            selectedSize: message.size,
            buttonType: message.buttonType,
          });
        }
        break;
      }

      case 'updateButtonType': {
        const product = await currentProductView.getValue();
        if (product) {
          await currentProductView.setValue({
            ...product,
            buttonType: message.buttonType,
          });
        }
        break;
      }
    }
  });
});
