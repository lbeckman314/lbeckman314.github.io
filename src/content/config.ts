import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.string().optional(),
  }),
});

const code = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    img: z.string().optional(),
    type: z.union([z.string(), z.array(z.string())]).optional(),
    src: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    url: z.string().optional(),
    github: z.string().optional(),
    tags: z.string().optional(),
  }),
});

const favorites = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    src: z.string().optional(),
    img: z.string().optional(),
    'img-src': z.string().optional(),
    category: z.string().optional(),
    url: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  notes,
  code,
  favorites,
};