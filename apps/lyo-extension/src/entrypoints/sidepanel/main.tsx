import React, { useLayoutEffect, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '@/assets/tailwind.css';
import App from './App.js';

// Component to handle side panel messages and cleanup
const SidePanelMessageHandler = () => {
  useLayoutEffect(() => {
    const listener = (message: { type?: string }) => {
      if (message.type === 'closeSidePanel') {
        window.close();
      }
    };

    browser.runtime.onMessage.addListener(listener);

    return () => {
      browser.runtime.onMessage.removeListener(listener);
    };
  }, []);

  // Handle sidepanel close - clear current product view but keep SSE alive
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Send message to background to clear current product view
      // Using sendMessage in beforeunload may not always work, so we use
      // a synchronous approach with navigator.sendBeacon as fallback
      browser.runtime.sendMessage({ type: 'clearCurrentProduct' }).catch(() => {
        // Ignore errors - the panel is closing anyway
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
};

ReactDOM.createRoot(document.getElementById('root') ?? document.body).render(
  <React.StrictMode>
    <SidePanelMessageHandler />
    <App />
  </React.StrictMode>
);
