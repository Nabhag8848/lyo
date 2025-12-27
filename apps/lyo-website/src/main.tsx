import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import App from './app/app';
import './styles.css';
import * as Sentry from '@sentry/react';

const serverUrl = import.meta.env.VITE_SERVER_URL;
const isProduction = import.meta.env.PROD;

if (isProduction && serverUrl) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    sendDefaultPii: true,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    // Match the server URL pattern - includes /v1 prefix
    // This enables distributed tracing for all API calls under /v1/*
    tracePropagationTargets: [
      'localhost',
      // Match base URL (includes /v1) and all paths under it
      // Escapes special regex characters and matches any path after /v1
      new RegExp(`^${serverUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/.*`),
    ],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    enableLogs: true,
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Analytics />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
