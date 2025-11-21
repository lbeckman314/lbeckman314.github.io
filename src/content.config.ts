import { defineCollection, z } from 'astro:content';

const code = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
		img: z.string(),
		type: z.array(z.string()),
		src: z.string(),
	}),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string().optional(),
    tags: z.string().optional(),
  }),
});

const favorites = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		author: z.string(),
		src: z.string(),
		img: z.string().optional(),
		imgSrc: z.string().optional(),
	}),
});

const showoff = defineCollection({
  type: 'content',
  schema: z.object({
    path: z.string(),
    alt: z.string().optional(),
  }),
});
