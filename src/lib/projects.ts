import { getRepoMetadata, type Language } from "@lib/github";
import type { ImageMetadata } from "astro";
import type { CollectionEntry } from "astro:content";

export type ProjectData = Omit<
  CollectionEntry<"projects">["data"],
  "languages"
> & {
  title: string;
  description?: string;
  tags: string[];
  languages: Language[];
};

export type ProjectWithData = {
  entry: CollectionEntry<"projects">;
  data: ProjectData;
};

export type ProjectLink = { href: string; text: string };

// Screenshots live at src/assets/projects/<project id>.webp.
const screenshots = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/projects/*.webp",
  { eager: true },
);

export function getProjectScreenshot(id: string): ImageMetadata | undefined {
  return screenshots[`/src/assets/projects/${id}.webp`]?.default;
}

// Where a project card should link to: its site when it has one, otherwise
// its repo (every project has one). Projects no longer have their own
// detail page.
export function getPrimaryProjectLink(
  entry: CollectionEntry<"projects">,
  data: ProjectData,
): string {
  return data.demo || entry.data.repo;
}

// Every card gets a repo button (even when the repo is also the card's own
// link, for projects without a site), plus the package if there is one.
export function getProjectLinks(
  entry: CollectionEntry<"projects">,
  _data: ProjectData,
): ProjectLink[] {
  return [
    { href: entry.data.repo, text: "repo" },
    entry.data.packageURL && {
      href: entry.data.packageURL,
      text: "package",
    },
  ].filter(Boolean) as ProjectLink[];
}

export async function getProjectData(
  entry: CollectionEntry<"projects">,
): Promise<ProjectData> {
  const repoMetadata = await getRepoMetadata(entry.data.repo);

  return {
    ...entry.data,
    title: entry.data.title ?? repoMetadata?.name ?? entry.id,
    description:
      entry.data.description ?? repoMetadata?.description ?? undefined,
    demo: entry.data.demo ?? repoMetadata?.homepage ?? undefined,
    date: entry.data.date ?? repoMetadata?.createdAt ?? undefined,
    updated: entry.data.updated ?? repoMetadata?.pushedAt ?? undefined,
    tags: entry.data.tags ?? repoMetadata?.topics ?? [],
    languages: entry.data.languages
      ? entry.data.languages.map((name) => ({ name, bytes: 0 }))
      : (repoMetadata?.languages ?? []),
  };
}

export async function withProjectData(
  entry: CollectionEntry<"projects">,
): Promise<ProjectWithData> {
  return {
    entry,
    data: await getProjectData(entry),
  };
}

export async function withProjectsData(
  entries: CollectionEntry<"projects">[],
): Promise<ProjectWithData[]> {
  return Promise.all(entries.map(withProjectData));
}
