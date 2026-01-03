import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  outDir: 'dist',
  dev: {
    server: {
      port: 5000,
    },
  },
  modules: ['@wxt-dev/module-react'],
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
  vite: () => ({
    plugins: [tailwindcss()],
    envDir: path.resolve(__dirname, '.env'),
  }),
  manifest: {
    permissions: ['sidePanel', 'storage', 'cookies', 'tabs'],
    host_permissions: ['https://lyo.fashion/*', 'https://api.lyo.fashion/*'],
  },
  webExt: {
    disabled: true,
  },
});
