import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  plugins: [injectHTML()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        links: 'links.html',
        contact: 'contact.html',
        credits: 'credits.html',
        imprint: 'imprint.html',
        notFound: '404.html',
      },
    },
  },
});