import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // For GitHub Pages — set to '/<repo-name>/' when deploying. Use '/' locally and on root domains.
  base: command === 'build' ? (process.env.VITE_BASE ?? '/') : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
}));
