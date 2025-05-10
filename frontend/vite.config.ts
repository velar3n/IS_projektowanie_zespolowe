import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    svgr({
      include: './src/assets/svgs/*',
    }),
    react(),
    eslint(),
    tsconfigPaths(),
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
