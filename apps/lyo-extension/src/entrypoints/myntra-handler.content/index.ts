import { MATCHES } from '@/lib/matches';
import { extractProductData } from '@/entrypoints/myntra.content/extract-product-data';

export default defineContentScript({
  matches: [MATCHES.MYNTRA_BASE],
  runAt: 'document_end',
  main() {
    const sizeButtonRoot = document.querySelectorAll(
      'button.size-buttons-size-button'
    );

    sizeButtonRoot.forEach((button) => {
      button.addEventListener('click', async (event) => {
        if (!event.isTrusted) return;

        const size = (event.target as HTMLElement).textContent?.trim();
        await new Promise((resolve) => setTimeout(resolve, 0));
        const goToBagButton = document.querySelector(
          'a.pdp-goToCart.pdp-add-to-bag'
        );

        const buttonType: 'addToBag' | 'goToBag' = goToBagButton
          ? 'goToBag'
          : 'addToBag';

        await browser.runtime.sendMessage({
          type: 'updateSizeAndButtonType',
          size,
          buttonType,
        });
      });
    });

    const addToBagButton = document.querySelector(
      'div.pdp-add-to-bag.pdp-button.pdp-flex.pdp-center'
    ) as HTMLElement;

    if (addToBagButton) {
      addToBagButton.addEventListener('click', async (event) => {
        if (!event.isTrusted) return;
        await browser.runtime.sendMessage({
          type: 'updateButtonType',
          buttonType: 'goToBag',
        });
      });
    }

    const listener = (
      message: {
        type?: string;
        buttonType?: string;
        size?: string;
      },
      _sender: unknown,
      sendResponse: (response?: unknown) => void
    ) => {
      if (message.type === 'clickAddToBag') {
        const buttonType = message.buttonType || 'addToBag';

        if (buttonType === 'goToBag') {
          const goToBagButton = document.querySelector(
            'a.pdp-goToCart.pdp-add-to-bag'
          ) as HTMLElement;
          if (goToBagButton) {
            goToBagButton.click();
          }
        } else {
          let addToBagButton = document.querySelector(
            'div.pdp-add-to-bag.pdp-button.pdp-flex.pdp-center'
          ) as HTMLElement;
          if (!addToBagButton) {
            addToBagButton = document.querySelector(
              '.pdp-add-to-bag'
            ) as HTMLElement;
          }
          if (addToBagButton) {
            addToBagButton.click();
          }
        }
      }

      if (message.type === 'selectSize') {
        const size = message.size;
        // Find the size button that matches the selected size
        const sizeButtons = document.querySelectorAll(
          'button.size-buttons-size-button'
        );
        sizeButtons.forEach((button) => {
          const sizeElement = button.querySelector(
            'p.size-buttons-unified-size'
          );
          if (sizeElement?.textContent?.trim() === size) {
            (button as HTMLElement).click();
          }
        });

        const updatedProductData = extractProductData();

        if (updatedProductData) {
          updatedProductData.selectedSize = size || null;
          sendResponse(updatedProductData);
        }
      }
    };

    browser.runtime.onMessage.addListener(listener);
    return () => {
      browser.runtime.onMessage.removeListener(listener);
    };
  },
});
