import { defineConfig } from '@tanstack/start/config';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  tsr: {
    appDirectory: './src',
  },
  routers: {
    client: {
      entry: './src/client.tsx',
    },
    ssr: {
      entry: './src/ssr.tsx',
    }
  },
  vite: {
    plugins: [
      tsconfigPaths(),
      viteReact(),
      tailwindcss(),
    ],
  },
});
