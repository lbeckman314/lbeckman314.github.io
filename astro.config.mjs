import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import expressiveCode from "astro-expressive-code";
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";
import { fromHtml } from "hast-util-from-html";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";

// Keep the admonition markup/classes the site's existing CSS already targets
// (.admonition / .admonition-{type} / .admonition-title) instead of the
// plugin's default GitHub-style markdown-alert-* output.
const admonitionBuild = (alertOptions, originalChildren) => {
  const icon =
    typeof alertOptions.icon === "string"
      ? fromHtml(alertOptions.icon, { fragment: true }).children[0]
      : alertOptions.icon;
  if (icon?.properties) {
    // Drop the plugin's own layout class; sizing/color come from our CSS instead.
    delete icon.properties.className;
  }
  return {
    type: "element",
    tagName: "div",
    properties: {
      className: ["admonition", `admonition-${alertOptions.keyword.toLowerCase()}`],
    },
    children: [
      {
        type: "element",
        tagName: "p",
        properties: { className: ["admonition-title"] },
        children: [icon, { type: "text", value: alertOptions.title }],
      },
      ...originalChildren,
    ],
  };
};

// https://astro.build/config
export default defineConfig({
  site: "https://liambeckman.com",
  // The order of integrations is important here.
  integrations: [
    sitemap(),
    pagefind(),
    expressiveCode({
      themes: ["catppuccin-latte", "catppuccin-frappe"],
      themeCssSelector: (theme) => `[data-theme="${theme.type}"]`,
      useDarkModeMediaQuery: false,
      plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
      styleOverrides: {
        codeFontFamily:
          '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        borderRadius: "12px",
        codePaddingInline: "20px",
        codePaddingBlock: "18px",
      },
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug, // ToC adds IDs, but that happens too late for the autolink plugin.
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          headingProperties: {
            className: ["section-anchor"],
          },
          properties: {
            className: ["section-anchor-link"],
          },
        },
      ],
      [rehypeGithubAlerts, { build: admonitionBuild }],
    ],
    shikiConfig: {
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-frappe",
      },
    },
  },
  vite: {
    // Force Vite to pre-bundle clsx into a normalized ESM module; otherwise
    // its SSR module runner sometimes rejects the named `clsx` import with
    // "Named export 'clsx' not found" against the package's CJS build.
    ssr: {
      optimizeDeps: {
        include: ["clsx"],
      },
      noExternal: ["clsx"],
    },
  },
});
