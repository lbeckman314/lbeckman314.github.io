import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  draft: z.boolean().optional(),
  archive: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  socials: z.array(z.string()).optional(),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: baseSchema.extend({
    date: z.coerce.date(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: baseSchema.extend({
    title: z.string().optional(),
    date: z.coerce.date().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
    packageURL: z.string().optional(),
    professional: z.boolean().optional(),
    languages: z.array(z.string()).optional(),
  }),
});

export const collections = { notes, projects };
