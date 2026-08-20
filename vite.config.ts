import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BASE_PATH ('/' prod, '/dev/' dev) is injected by the Pages workflow.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
  server: {
    host: true,
    port: 8888,
  },
});
