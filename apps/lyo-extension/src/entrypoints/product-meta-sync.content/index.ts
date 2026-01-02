import { ActiveTabProductButton } from '@/constants/active-tab-product';
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
      if (!event.isTrusted) return;

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
