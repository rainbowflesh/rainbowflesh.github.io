// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://rainbowflesh.github.io/",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "vesper",
    },
  },
});
