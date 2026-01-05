import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';
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
  modules: ['@wxt-dev/module-react', '@wxt-dev/auto-icons'],
  autoIcons: {
    baseIconPath: 'assets/icon.png',
    developmentIndicator: 'grayscale',
    sizes: [128, 48, 24, 16],
  },
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
  vite: () => ({
    plugins: [tailwindcss()],
    envDir: path.resolve(__dirname, '.env'),
  }),
  manifest: {
    name: 'LYO',
    author: { email: 'nabhag@lyo.fashion' },
    version: '1.0.0',
    description:
      'Your perfect fit awaits — stop guessing how clothes will look and try them instantly before you buy.',
    permissions: ['sidePanel', 'storage', 'cookies', 'tabs'],
    host_permissions: ['https://lyo.fashion/*', 'https://api.lyo.fashion/*'],
  },
  webExt: {
    disabled: true,
  },
});
