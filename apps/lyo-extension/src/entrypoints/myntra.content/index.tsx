import { MATCHES } from '@/lib/matches';
import ReactDOM from 'react-dom/client';
import '@/assets/tailwind.css';
import { sendMessage } from '@/lib/messaging';

export default defineContentScript({
  matches: [MATCHES.MYNTRA_BASE],
  runAt: 'document_end',
  main(ctx) {
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
        const Button = () => {
          return (
            <main className="mr-4">
              <button
                onClick={async () => {
                  await sendMessage('openSidePanel');
                }}
                className="myntra-button text-base font-bold w-full relative overflow-hidden bg-yellow-400 text-black px-6 py-5 rounded-[2px] shadow-md uppercase tracking-[0.2em] hover:bg-yellow-300 transition-all flex items-center justify-center gap-3 group ring-2 ring-yellow-100 duration-300"
              >
                <span className="bg-black text-white px-2 py-0.5 text-[9px] rounded-sm font-bold">
                  LYO
                </span>
                <span className="relative z-10 flex items-center gap-2 uppercase">
                  TRY NOW
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </button>
            </main>
          );
        };
        root.render(<Button />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui?.mount();
  },
});
