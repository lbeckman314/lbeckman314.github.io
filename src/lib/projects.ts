import { getRepoMetadata, type Language } from "@lib/github";
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

export function demoLabel(demoURL?: string): string {
  if (!demoURL) return "";
  try {
    return new URL(demoURL).hostname.replace(/^www\./, "");
  } catch {
    return demoURL;
  }
}

export async function getProjectData(
  entry: CollectionEntry<"projects">,
): Promise<ProjectData> {
  const repoMetadata = await getRepoMetadata(entry.data.repoURL);

  return {
    ...entry.data,
    title: entry.data.title ?? repoMetadata?.name ?? entry.id,
    description:
      entry.data.description ?? repoMetadata?.description ?? undefined,
    demoURL: entry.data.demoURL ?? repoMetadata?.homepage ?? undefined,
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
