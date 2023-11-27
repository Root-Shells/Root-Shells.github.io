import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import rss from '@astrojs/rss';

export default defineConfig({
  site: 'https://Root-Shells.github.io',
  integrations: [
    react(),
    sitemap(),
    rss({
      // Configure your RSS feed options here
    }),
  ],
  markdown: {
    // Configure your markdown options here
  },
});
