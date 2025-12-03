// @ts-check
import custom from './src/styles/codedark.js';
import mdx from '@astrojs/mdx';
import pagefind from "astro-pagefind";
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { remarkAlert } from "remark-github-blockquote-alert";

// Config
// https://astro.build/config
export default defineConfig({
  site: 'https://liambeckman.com',

  integrations: [
    mdx(), 
    sitemap(),
    pagefind(),
  ],

  // https://eikowagenknecht.de/posts/use-github-alerts-admonitions-callouts-in-astro/
  markdown: {
    remarkPlugins: [remarkAlert],
    shikiConfig: {
      theme: {...custom, type: 'dark'},
    },
  },

  devToolbar: {
      enabled: false
  },

  vite: {
    build: {
      sourcemap: true,
    },

    css: {
      devSourcemap: true,
    },
  },

});
