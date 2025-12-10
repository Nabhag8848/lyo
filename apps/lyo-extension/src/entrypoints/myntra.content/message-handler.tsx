import { useEffect } from 'react';
import { extractProductData } from './extract-product-data';

export const ContentScriptMessageHandler = () => {
  useEffect(() => {
    const listener = (
      message: { type?: string; buttonType?: string; size?: string },
      _sender: unknown,
      sendResponse: (response?: unknown) => void
    ) => {
      if (message.type === 'getProductData') {
        let productData = extractProductData();

        if (!productData) {
          setTimeout(() => {
            productData = extractProductData();
            sendResponse(productData);
          }, 500);
        } else {
          sendResponse(productData);
        }

        return true;
      }

      if (message.type === 'clickAddToBag') {
        const buttonType = message.buttonType || 'addToBag';

        if (buttonType === 'goToBag') {
          const goToBagButton = document.querySelector(
            'a.pdp-goToCart.pdp-add-to-bag'
          ) as HTMLElement;
          if (goToBagButton) {
            goToBagButton.click();
          } else {
            console.warn('LYO: Go to Bag button not found');
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
          } else {
            console.warn('LYO: Add to Bag button not found');
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

        // Wait for DOM to update after size selection, then re-extract product data
        setTimeout(() => {
          const updatedProductData = extractProductData();
          if (updatedProductData) {
            // Ensure selectedSize is set to the size we just clicked
            updatedProductData.selectedSize = size || null;
            // Send updated product data to background script
            browser.runtime.sendMessage({
              type: 'updateProductData',
              productData: updatedProductData,
            });
          }
        }, 100);
      }
    };

    browser.runtime.onMessage.addListener(listener);

    return () => {
      browser.runtime.onMessage.removeListener(listener);
    };
  }, []);

  return null;
};
