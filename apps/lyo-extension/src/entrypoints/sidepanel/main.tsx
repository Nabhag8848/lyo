import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

// Send message when side panel opens
browser.runtime.sendMessage({ type: 'sidePanelOpened' });

// Send message when side panel closes - use multiple events for reliability
const sendCloseMessage = () => {
  browser.runtime.sendMessage({ type: 'sidePanelClosed' });
};

browser.runtime.onMessage.addListener((message) => {
  if (message.type === 'closeSidePanel') {
    sendCloseMessage();
    window.close();
  }
});

window.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    sendCloseMessage();
  }
});

ReactDOM.createRoot(document.getElementById('root') ?? document.body).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
