// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import customErrorOverlayPlugin from "./vite-error-overlay-plugin.js";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [
    tailwind(),
    react(),
  ],
  vite: {
    plugins: [
      customErrorOverlayPlugin(),
    ],
  },
  server: {
    allowedHosts: true,
    host: true,
  },
});
