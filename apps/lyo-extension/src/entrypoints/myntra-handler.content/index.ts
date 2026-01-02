import { MATCHES } from '@/entrypoints/sidepanel/utils/matches';

export default defineContentScript({
  matches: [MATCHES.MYNTRA_BASE],
  runAt: 'document_end',
  main() {
    console.log('Myntra handler content script loaded');
  },
});
