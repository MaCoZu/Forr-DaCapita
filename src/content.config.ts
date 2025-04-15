import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
	loader: glob({ base: 'src/content/news', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		pubDate: z.coerce.date(),
		body: z.string().optional(), 
		thumbnail: z.string().optional(), 
		draft: z.boolean().optional().default(false)

	}),
});

export const collections = { news };
