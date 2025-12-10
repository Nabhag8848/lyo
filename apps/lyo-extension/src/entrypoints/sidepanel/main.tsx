import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

// Component to handle side panel close messages
const SidePanelMessageHandler = () => {
  useEffect(() => {
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

  return null;
};

ReactDOM.createRoot(document.getElementById('root') ?? document.body).render(
  <React.StrictMode>
    <SidePanelMessageHandler />
    <App />
  </React.StrictMode>
);
