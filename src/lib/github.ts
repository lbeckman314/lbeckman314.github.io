// Build-time GitHub star counts for project repos. Each repo is fetched once
// per build (memoized) and failures resolve to null so the build never breaks
// and the UI simply omits the count. Set GITHUB_TOKEN in the build environment
// to lift the unauthenticated rate limit (60 req/hour/IP).

import { USER_AGENT } from "@consts";

const starCache = new Map<string, Promise<number | null>>();
const metadataCache = new Map<string, Promise<RepoMetadata | null>>();

export type Language = { name: string; bytes: number };

export type RepoMetadata = {
  name: string | null;
  description: string | null;
  homepage: string | null;
  stargazersCount: number | null;
  topics: string[];
  languages: Language[];
  createdAt: Date | null;
  pushedAt: Date | null;
};

function parseRepo(repoURL: string): { owner: string; repo: string } | null {
  const match = /github\.com\/([^/]+)\/([^/#?]+)/i.exec(repoURL);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
}

async function fetchLanguages(
  parsed: { owner: string; repo: string },
  headers: Record<string, string>,
): Promise<Language[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/languages`,
      { headers },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as Record<string, number>;
    return Object.entries(data)
      .map(([name, bytes]) => ({ name, bytes }))
      .sort((a, b) => b.bytes - a.bytes);
  } catch {
    return [];
  }
}

async function fetchRepoMetadata(
  repoURL: string,
): Promise<RepoMetadata | null> {
  const parsed = parseRepo(repoURL);
  if (!parsed) return null;

  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "user-agent": USER_AGENT,
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`,
      { headers },
    );
    if (!res.ok) return null;

    const data = (await res.json()) as {
      name?: string;
      description?: string | null;
      homepage?: string | null;
      stargazers_count?: number;
      topics?: string[];
      created_at?: string;
      pushed_at?: string;
    };

    return {
      name: data.name ?? null,
      description: data.description ?? null,
      homepage: data.homepage || null,
      stargazersCount:
        typeof data.stargazers_count === "number"
          ? data.stargazers_count
          : null,
      topics: Array.isArray(data.topics) ? data.topics : [],
      languages: await fetchLanguages(parsed, headers),
      createdAt: data.created_at ? new Date(data.created_at) : null,
      pushedAt: data.pushed_at ? new Date(data.pushed_at) : null,
    };
  } catch {
    return null;
  }
}

export function getRepoMetadata(
  repoURL?: string,
): Promise<RepoMetadata | null> {
  if (!repoURL) return Promise.resolve(null);
  let pending = metadataCache.get(repoURL);
  if (!pending) {
    pending = fetchRepoMetadata(repoURL);
    metadataCache.set(repoURL, pending);
  }
  return pending;
}

export function getRepoStars(repoURL?: string): Promise<number | null> {
  if (!repoURL) return Promise.resolve(null);
  let pending = starCache.get(repoURL);
  if (!pending) {
    pending = getRepoMetadata(repoURL).then(
      (metadata) => metadata?.stargazersCount ?? null,
    );
    starCache.set(repoURL, pending);
  }
  return pending;
}

export function formatStars(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(n < 10000 ? 1 : 0)}k` : String(n);
}
