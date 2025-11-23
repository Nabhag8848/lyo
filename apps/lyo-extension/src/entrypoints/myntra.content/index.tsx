import { MATCHES } from '@/lib/matches';
import ReactDOM from 'react-dom/client';
import TryNowButton from './try-on-button';
import '@/assets/tailwind.css';
import { extractProductData } from './extract-product-data';

export default defineContentScript({
  matches: [MATCHES.MYNTRA_BASE],
  runAt: 'document_end',
  main(ctx) {
    browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
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
            updatedProductData.selectedSize = size;
            // Send updated product data to background script
            browser.runtime.sendMessage({
              type: 'updateProductData',
              productData: updatedProductData,
            });
          }
        }, 100);
      }
    });

    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      append: 'before',
      anchor: () => {
        return document.querySelector(
          'div.pdp-add-to-bag.pdp-button.pdp-flex.pdp-center'
        );
      },
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);
        root.render(<TryNowButton />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui?.mount();
  },
});
