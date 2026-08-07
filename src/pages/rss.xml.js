import rss from "@astrojs/rss";
import { SITE } from "@consts";
import { withProjectsData } from "@lib/projects";
import { dateSortDesc, shouldRenderPage } from "@lib/utils";
import { getCollection } from "astro:content";

export async function GET(context) {
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
      link: `/notes/${post.id}/`,
    })),
    ...projects.map(({ entry, data }) => ({
      title: data.title,
      description: data.description,
      pubDate: data.date ?? new Date(),
      updated: data.updated,
      link: `/projects/${entry.id}/`,
    })),
  ].sort((a, b) => dateSortDesc(a.pubDate, b.pubDate));

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    stylesheet: "/rss-styles.xsl",
    items: items.map((item) => ({
      title: item.title,
      description: item.description,
      pubDate: item.pubDate,
      link: item.link,
      customData: `<updated>
        ${item.updated !== undefined ? item.updated.toISOString() : ""}
      </updated>`,
    })),
  });
}
