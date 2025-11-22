// @ts-check
import { defineConfig } from 'astro/config';
import { remarkAlert } from "remark-github-blockquote-alert";
import custom from './src/styles/codedark.js';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Config
// https://astro.build/config
export default defineConfig({
  site: 'https://liambeckman.com',

  integrations: [mdx(), sitemap()],

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
