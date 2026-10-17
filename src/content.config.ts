import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localizedText = z.object({
  fr: z.string().min(1),
  en: z.string().min(1),
  de: z.string().min(1)
});

// Une fiche par projet : les textes sont traduits, le nom et la stack restent identiques dans toutes les langues
const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      order: z.number().int().positive(),
      name: z.string().min(1),
      kind: localizedText,
      role: localizedText,
      description: localizedText,
      stack: z.array(z.string().min(1)).min(1),
      cover: image(),
      coverAlt: localizedText,
      liveUrl: z.url().optional()
    })
});

export const collections = { projects };
