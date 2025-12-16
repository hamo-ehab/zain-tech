import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/server';
import path from 'path'; // Import 'path' module

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        // Define the alias: '@' should point to the 'src' directory
        '@': path.resolve(import.meta.url.replace('file://', ''), '../src'),
      },
    },
  },
});
