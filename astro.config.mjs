import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel'; // Changed import style
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    edge: false, // assuming serverless is the target
  }),
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        // Define the alias: '@' should point to the 'src' directory
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
