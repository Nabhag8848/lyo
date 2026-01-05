import { ActiveTabProductButton } from '@/constants';
import { MATCHES } from '@/entrypoints/sidepanel/utils/matches';
import { myntraExtractActiveProductMeta } from '@/extraction';

export default defineContentScript({
  matches: [MATCHES.MYNTRA_BASE],
  runAt: 'document_end',
  allFrames: true,
  main() {
    const sizeButtonRoot = document.querySelectorAll(
      'button.size-buttons-size-button'
    );

    const addToBagButton: HTMLElement | null = document.querySelector(
      'div.pdp-add-to-bag.pdp-button.pdp-flex.pdp-center'
    );

    const handleProductMetaSync = async (event: Event, delay = 0) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      const activeTabProductMeta = myntraExtractActiveProductMeta();

      await browser.runtime.sendMessage<
        { type: 'post_active_tab_product_meta'; data: ActiveTabProductState },
        void
      >({
        type: 'post_active_tab_product_meta',
        data: activeTabProductMeta,
      });
    };

    const handleAddToBag = async (event: Event) => {
      if (!event.isTrusted) return;

      await browser.runtime.sendMessage<
        {
          type: 'update_active_tab_product_button_type';
          data: ActiveTabProductButton;
        },
        void
      >({
        type: 'update_active_tab_product_button_type',
        data: ActiveTabProductButton.GO_TO_BAG,
      });
    };

    sizeButtonRoot.forEach((button) => {
      button.addEventListener('click', (event) => handleProductMetaSync(event));
    });

    if (addToBagButton) {
      addToBagButton.addEventListener('click', (event) =>
        handleAddToBag(event)
      );
    }

    browser.runtime.onMessage.addListener(async (message) => {
      if (message.type === 'update_selected_size') {
        const size = message.size;
        // Find the size button that matches the selected size
        const xpath = `//button[contains(@class, 'size-buttons-size-button')]//p[contains(@class, 'size-buttons-unified-size') and normalize-space(text())='${size}']/ancestor::button[1]`;
        const result = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        );
        const targetButton = result.singleNodeValue as HTMLElement | null;

        if (targetButton) {
          targetButton.click();
        }
        return;
      }

      if (message.type === 'click_buy_action_button') {
        const actionbutton: HTMLElement | null =
          document.querySelector('a.pdp-goToCart.pdp-add-to-bag') ??
          document.querySelector(
            'div.pdp-add-to-bag.pdp-button.pdp-flex.pdp-center'
          );

        if (actionbutton) {
          actionbutton.click();
        }

        const isAddToBag = actionbutton?.classList.contains('pdp-add-to-bag');

        if (isAddToBag) {
          await handleProductMetaSync(new Event('click'), 1000);
        }

        return;
      }
    });

    return () => {
      sizeButtonRoot.forEach((button) => {
        button.removeEventListener('click', handleProductMetaSync);
      });
      if (addToBagButton) {
        addToBagButton.removeEventListener('click', handleProductMetaSync);
      }
    };
  },
});
