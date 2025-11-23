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
