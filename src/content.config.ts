import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  draft: z.boolean().optional(),
  archive: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  socials: z.array(z.string()).optional(),
  series: z.string().optional(),
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
    order: z.number().optional(),
  }),
});

const favorites = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/favorites" }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    src: z.string().optional(),
    img: z.string().optional(),
    imgSrc: z.string().optional(),
  }),
});

const resumeEducation = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/resume/education" }),
  schema: z.object({
    degree: z.string(),
    org: z.string(),
    orgHref: z.string().optional(),
    location: z.string(),
    period: z.string(),
    order: z.number(),
  }),
});

const resumeExperience = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/resume/experience" }),
  schema: z.object({
    title: z.string(),
    org: z.string(),
    orgHref: z.string().optional(),
    location: z.string(),
    period: z.string(),
    order: z.number(),
  }),
});

const resumeSkills = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/resume/skills" }),
  schema: z.object({
    label: z.string(),
    items: z.array(z.string()),
    order: z.number(),
  }),
});

const resumePublications = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/resume/publications" }),
  schema: z.object({
    title: z.string(),
    venue: z.string(),
    href: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  notes,
  projects,
  favorites,
  resumeEducation,
  resumeExperience,
  resumeSkills,
  resumePublications,
};
