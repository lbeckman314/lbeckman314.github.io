import type { CollectionEntry } from "astro:content";
import { GITHUB_USERNAME, REPO_BRANCH, REPO_NAME } from "@consts";

// Links a rendered page back to its source file on GitHub, given the
// content entry's `filePath` (repo-relative, e.g.
// "src/content/notes/example.md").
export function githubEditUrl(filePath: string) {
  return `https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/blob/${REPO_BRANCH}/${filePath}`;
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function dateSortDesc(a: Date | undefined, b: Date | undefined) {
  return (b?.valueOf() ?? 0) - (a?.valueOf() ?? 0);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Archived posts get rendered but not listed.
// Draft posts get rendered and listed too, but stay hidden client-side
// behind the "Show drafts" toggle (see Head.astro) unless opted into.

export function shouldListPage(page: CollectionEntry<"notes" | "projects">) {
  if (page.data.archive) {
    return false;
  }

  return shouldRenderPage(page);
}

export function shouldRenderPage(_page: CollectionEntry<"notes" | "projects">) {
  return true;
}

// Unlike shouldRenderPage, this always excludes drafts - used for feeds and
// other contexts with no client-side toggle to hide them behind.
export function isNotDraft(page: CollectionEntry<"notes" | "projects">) {
  return page.data.draft !== true;
}

// Icon names for astro-icon's <Icon>. Tabler has no Lobsters icon, so that
// one is a local SVG in src/icons/lobsters.svg.
const SOCIAL_ICON_MAP: Record<string, string> = {
  "news.ycombinator.com": "tabler:brand-ycombinator",
  "www.linkedin.com": "tabler:brand-linkedin",
  default: "tabler:message-circle",
};

export function iconForSocial(socialUrl: string) {
  const hostname = new URL(socialUrl).hostname;
  return SOCIAL_ICON_MAP[hostname] ?? SOCIAL_ICON_MAP.default;
}
