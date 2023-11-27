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
      title: 'Your Site Title', // Replace with your site's title
      description: 'A brief description of your site', // Replace with a brief description
      site: 'https://Root-Shells.github.io',
      items: () => {
        // Here you should return an array of items for your RSS feed
        // This typically involves fetching or generating a list of your blog posts, articles, or other content.
        // Ensure that any asynchronous operations are resolved before this function is called.
        return []; // Replace with your actual feed items
      },
    }),  
  ],
  markdown: {
    // Configure your markdown options here if needed
  },
});
