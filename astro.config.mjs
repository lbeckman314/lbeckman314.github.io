import { globSync, readFileSync } from "node:fs";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";
import { fromHtml } from "hast-util-from-html";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";

// Escape text that's going into a raw HTML mdast node - unlike normal
// markdown text nodes, nothing else sanitizes this for us.
const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

// Renders ```poem fenced code blocks as the same "poem" box
// used on the favorites page (.poem-body, white-space: pre-wrap) instead of
// letting astro-expressive-code turn them into a syntax-highlighted code
// block. Blank lines split the fence into separate paragraphs, same as a
// normal markdown poem would; a single paragraph's internal line breaks and
// leading whitespace are preserved via pre-wrap.
const POEM_LANGS = new Set([
  "poem",
]);

function remarkPoemFence() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (!parent || index === undefined || !POEM_LANGS.has(node.lang)) {
        return;
      }
      const paragraphs = node.value
        .split(/\n{2,}/)
        .map((block) => escapeHtml(block).trim())
        .filter(Boolean)
        .map((block) => `<p>${block}</p>`)
        .join("");
      parent.children[index] = {
        type: "html",
        value: `<div class="poem-body">${paragraphs}</div>`,
      };
    });
  };
}

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
      className: [
        "admonition",
        `admonition-${alertOptions.keyword.toLowerCase()}`,
      ],
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

// Drafts are always built (so the site's "Show drafts" toggle has pages to
// reveal) but should never be indexed - find their slugs so the sitemap can
// exclude them regardless of the toggle.
const draftSlugs = new Set(
  globSync("src/content/{notes,projects}/**/*.{md,mdx}")
    .filter((file) => /^draft:\s*true\s*$/m.test(readFileSync(file, "utf-8")))
    .map((file) =>
      file.replace(/^src\/content\//, "").replace(/\.(md|mdx)$/, ""),
    ),
);

// https://astro.build/config
export default defineConfig({
  site: "https://liambeckman.com",
  // The order of integrations is important here.
  integrations: [
    sitemap({
      filter: (page) =>
        ![...draftSlugs].some((slug) => page.includes(`/${slug}/`)),
    }),
    pagefind(),
    icon(),
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
    // Sätteri (Astro's default processor as of v6) doesn't support
    // remark/rehype plugins, so stick with the classic unified pipeline for
    // KaTeX math, heading autolinks, and GitHub-style admonitions.
    processor: unified({
      remarkPlugins: [remarkPoemFence, remarkMath],
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
    }),
    shikiConfig: {
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-frappe",
      },
    },
  },
});
