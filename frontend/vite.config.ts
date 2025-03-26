import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore - Workaround for missing types
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    svgr({
      include: './src/assets/svgs/*',
    }),
    react(),
    eslint(),
  ],
  resolve: {
    alias: {
      '@app': '/src',
    },
  },
  server: {
    port: 3000,
  },
});
