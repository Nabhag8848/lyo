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
  }),
  manifest: {
    permissions: ['sidePanel', 'storage', 'cookies'],
    host_permissions: ['https://lyo.fashion/*', 'https://api.lyo.fashion/*'],
  },
  webExt: {
    disabled: true,
  },
});
