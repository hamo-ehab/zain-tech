import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import 'path' module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Define the alias: '@' should point to the 'src' directory
      '@': path.resolve(import.meta.url.replace('file://', ''), '../src'),
    },
  },
});
