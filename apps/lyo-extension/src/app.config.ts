import { defineAppConfig } from '#imports';

// Define types for your config
declare module 'wxt/utils/define-app-config' {
  export interface WxtAppConfig {
    serverConfig: {
      serverUrl: string;
    };
    clientConfig: {
      clientDomain: string;
    };
  }
}

declare global {
  interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string;
    readonly VITE_CLIENT_DOMAIN: string;
  }
}

export default defineAppConfig({
  serverConfig: {
    serverUrl: import.meta.env.VITE_SERVER_URL,
  },
  clientConfig: {
    clientDomain: import.meta.env.VITE_CLIENT_DOMAIN,
  },
});
