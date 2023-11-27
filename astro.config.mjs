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
      // Required RSS configuration options
      title: 'Your Site Title',
      description: 'A brief description of your site or feed',
      site: 'https://Root-Shells.github.io',
      items: async () => {
        // Generate your feed items here
        // This usually involves fetching or computing a list of items
        // that represent your RSS feed entries
        return []; // Replace with your actual feed items
      },
    }),  
  ],
  markdown: {
    // Configure your markdown options here
  },
});
