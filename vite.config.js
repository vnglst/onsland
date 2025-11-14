import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'public/index.html',
        country: 'public/country.html',
        rankings: 'public/rankings.html',
        about: 'public/about.html',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
