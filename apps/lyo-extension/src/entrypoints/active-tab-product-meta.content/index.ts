import { MATCHES } from '@/entrypoints/sidepanel/utils/matches';
import { myntraExtractActiveProductMeta } from './myntra-extract-active-product-meta';

export default defineContentScript({
  matches: [MATCHES.MYNTRA_BASE],
  runAt: 'document_end',
  allFrames: true,
  main() {
    const onGetActiveTabProductMeta = (
      message: { type: 'get_active_tab_product_meta' },
      _sender: Browser.runtime.MessageSender,
      sendResponse: (response: ActiveTabProductState) => void
    ) => {
      if (message.type === 'get_active_tab_product_meta') {
        const activeTabProductMeta = myntraExtractActiveProductMeta();
        sendResponse(activeTabProductMeta);
        return;
      }
    };

    browser.runtime.onMessage.addListener(onGetActiveTabProductMeta);
    return () => {
      browser.runtime.onMessage.removeListener(onGetActiveTabProductMeta);
    };
  },
});
