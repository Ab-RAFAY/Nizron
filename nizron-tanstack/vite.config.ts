import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

const config = defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  server: {
    port: 3001,
  },
});

export default config;
