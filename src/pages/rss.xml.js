import rss from "@astrojs/rss";
import { SITE } from "@consts";
import { withProjectsData } from "@lib/projects";
import { dateSortDesc, shouldRenderPage } from "@lib/utils";
import { getCollection } from "astro:content";

function escapeXml(value) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[char],
  );
}

export async function GET(context) {
  // Point links at the local dev server during development so they're
  // clickable on localhost; use the canonical site URL in production.
  const site = import.meta.env.DEV
    ? new URL(context.url.origin)
    : context.site;

  // Archived pages get listed in the RSS even if they're not listed on the site itself.

  const blog = (await getCollection("notes")).filter(shouldRenderPage);
  const projectEntries = (await getCollection("projects")).filter(
    shouldRenderPage,
  );
  const projects = await withProjectsData(projectEntries);

  const items = [
    ...blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date ?? new Date(),
      updated: post.data.updated,
      tags: post.data.tags ?? [],
      link: `/notes/${post.id}/`,
    })),
    ...projects.map(({ entry, data }) => ({
      title: data.title,
      description: data.description,
      pubDate: data.date ?? new Date(),
      updated: data.updated,
      tags: data.tags ?? [],
      link: `/projects/${entry.id}/`,
    })),
  ].sort((a, b) => dateSortDesc(a.pubDate, b.pubDate));

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site,
    stylesheet: "/rss-styles.xsl",
    items: items.map((item) => ({
      title: item.title,
      description: item.description,
      pubDate: item.pubDate,
      link: item.link,
      customData: `<updated>
        ${item.updated !== undefined ? item.updated.toISOString() : ""}
      </updated>
      ${item.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}`,
    })),
  });
}
