import { currentProductView } from '@/lib/storage';
import type { Browser } from 'wxt/browser';
import { sseService } from './services/sse-service';
import { tryonService, type StartTryonRequest } from './services/tryon-service';

type OpenOptions = Browser.sidePanel.OpenOptions;

export default defineBackground(() => {
  // On installation - set up sidepanel
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

  // Start a try-on generation
  const startTryon = async (product: Product): Promise<string> => {
    const request: StartTryonRequest = {
      garmentImageUrl: product.imageUrl,
      garmentSourceUrl: product.sourceUrl,
      brandName: 'Myntra', // Default brand for now
      garmentBrandName: product.brand,
      garmentName: product.name,
      garmentDescription: product.description,
    };

    const productInfo: ProductInfo = {
      brand: product.brand,
      name: product.name,
      sourceUrl: product.sourceUrl,
      imageUrl: product.imageUrl,
      garmentBrandName: product.brand,
      garmentName: product.name,
      garmentDescription: product.description,
    };

    const generationId = await tryonService.startTryon(request, productInfo);
    return generationId;
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

        // If product exists, start try-on generation automatically
        if (product) {
          try {
            await startTryon(product);
          } catch (error) {
            console.error('Failed to start try-on:', error);
          }
        }
        break;
      }

      case 'startTryon': {
        // Manual try-on trigger from sidepanel
        const product: Product = message.product;
        if (product) {
          try {
            const generationId = await startTryon(product);
            return { success: true, generationId };
          } catch (error) {
            console.error('Failed to start try-on:', error);
            return { success: false, error: String(error) };
          }
        }
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

      case 'clearCurrentProduct': {
        // Clear current product view when sidepanel closes
        await currentProductView.setValue(null);

        // Also clear completed generations from storage
        // Keep pending ones in case SSE is still processing
        // The SSE service will handle cleanup when all generations complete
        await sseService.clearGenerations();
        break;
      }
    }
  });
});
