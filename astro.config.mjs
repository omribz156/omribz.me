// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { remarkLazyLoadImages } from "./src/utils/remarkLazyLoadImages.mjs";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  trailingSlash: "never",
  markdown: {
    remarkPlugins: [
      remarkToc,
      // @ts-ignore - TypeScript has issues with remark plugin tuple syntax
      [remarkCollapse, { test: "Table of contents" }],
      remarkLazyLoadImages,
    ],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      serialize: (item) => {
        // Remove trailing slash from URL if present (except for root)
        if (item.url.endsWith("/") && item.url !== SITE.website + "/") {
          item.url = item.url.slice(0, -1);
        }

        const url = item.url;

        // Set defaults
        item.changefreq = ChangeFreqEnum.MONTHLY;
        item.priority = 0.5;

        // Homepage - highest priority, frequent updates
        if (url === SITE.website || url === SITE.website + "/") {
          item.priority = 1.0;
          item.changefreq = ChangeFreqEnum.DAILY;
          item.lastmod = new Date().toISOString();
        }
        // Main section pages
        else if (url.endsWith("/posts") || url.endsWith("/about") || url.endsWith("/search")) {
          item.priority = 0.9;
          item.changefreq = ChangeFreqEnum.WEEKLY;
        }
        return item;
      },
    }),
    react(),
  ],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
