import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel'; // استخدمنا اسم الحزمة مباشرة
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    edge: false, // تحديد نوع الـ deployment
  }),
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        // تعريف Alias الصحيح
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
