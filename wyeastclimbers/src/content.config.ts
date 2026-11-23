import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, reference } from "astro:content";

/**
 * How well-supported an entry is.
 * - sourced:     backed by at least one cited source
 * - conflicting: sources disagree (explain in the body)
 * - unverified:  plausible but not yet backed by a source we can cite
 */
const status = z.enum(["sourced", "conflicting", "unverified"]);

const sources = defineCollection({
  loader: file("src/content/sources.yaml"),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    publisher: z.string().optional(),
    year: z.union([z.string(), z.number()]).optional(),
    url: z.string().url().optional(),
    kind: z.enum(["book", "article", "web", "archive", "film"]),
    note: z.string().optional(),
  }),
});

const milestones = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/milestones" }),
  schema: z.object({
    title: z.string(),
    // Sortable date. For an undated entry leave it out and set `undated: true`.
    date: z.coerce.date().optional(),
    // How the date should read, e.g. "December 1930" or "1937".
    dateLabel: z.string().optional(),
    undated: z.boolean().default(false),
    category: z.enum(["club", "climb", "rescue", "context", "legacy"]),
    people: z.array(reference("people")).default([]),
    sources: z.array(reference("sources")).default([]),
    status,
    exhibit: reference("exhibits").optional(),
  }),
});

const people = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/people" }),
  schema: z.object({
    name: z.string(),
    years: z.string().optional(),
    // confirmed member / probable member / friend of the club
    membership: z.enum(["member", "probable", "associate"]),
    role: z.string().optional(),
    sources: z.array(reference("sources")).default([]),
    status,
    order: z.number().default(100),
  }),
});

const exhibits = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/exhibits" }),
  schema: z.object({
    title: z.string(),
    kicker: z.string(),
    summary: z.string(),
    order: z.number(),
    sources: z.array(reference("sources")).default([]),
    draft: z.boolean().default(false),
    // Optional interactive feature rendered above the exhibit text.
    feature: z.enum(["route-map"]).optional(),
  }),
});

const permissions = defineCollection({
  loader: file("src/content/permissions.yaml"),
  schema: z.object({
    item: z.string(),
    holder: z.string(),
    status: z.enum(["wanted", "requested", "granted", "declined"]),
    requested: z.coerce.date().optional(),
    terms: z.string().optional(),
    credit: z.string().optional(),
    // exhibit or person ids this image is meant for
    for: z.array(z.string()).default([]),
  }),
});

export const collections = { sources, milestones, people, exhibits, permissions };
