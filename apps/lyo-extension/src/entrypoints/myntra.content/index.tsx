import { MATCHES } from '@/lib/matches';
import ReactDOM from 'react-dom/client';
import React from 'react';
import TryNowButton from './try-on-button';
import '@/assets/tailwind.css';

export default defineContentScript({
  matches: [MATCHES.MYNTRA_BASE],
  runAt: 'document_end',
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      append: 'after',
      anchor: '.pdp-add-to-bag.pdp-button.pdp-flex.pdp-center',
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);
        root.render(
          <React.StrictMode>
            <TryNowButton />
          </React.StrictMode>
        );
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.autoMount();
  },
});
