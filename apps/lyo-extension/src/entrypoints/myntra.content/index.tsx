import { Button } from '@/components/ui/button';
import { MATCHES } from '@/lib/matches';
import ReactDOM from 'react-dom/client';
import '@/assets/tailwind.css';
import { Shirt } from 'lucide-react';
import { sendMessage } from '@/lib/messaging';

export default defineContentScript({
  matches: [MATCHES.MYNTRA_BASE],
  runAt: 'document_end',
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      append: 'after',
      anchor: () => {
        return document.querySelector(
          'div.pdp-add-to-bag.pdp-button.pdp-flex.pdp-center'
        );
      },
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);
        const App = () => {
          return (
            <main className="mr-4">
              <Button
                variant="default"
                className="px-14 py-7 rounded-sm"
                onClick={async () => {
                  await sendMessage('openSidePanel');
                }}
              >
                <Shirt className="size-5" />
                <span className="font-semibold uppercase flex items-center justify-center">
                  Try On
                </span>
              </Button>
            </main>
          );
        };
        root.render(<App />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui?.mount();
  },
});
