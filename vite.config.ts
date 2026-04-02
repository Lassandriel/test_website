import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        links: 'links.html',
        contact: 'contact.html',
        credits: 'credits.html',
        imprint: 'imprint.html',
      },
    },
  },
});