import { defineCollection, z } from "astro:content";

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
  type: "content",
  schema: baseSchema.extend({
    date: z.coerce.date(),
  }),
});

const projects = defineCollection({
  type: "content",
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
