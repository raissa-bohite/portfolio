import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { locales } from './i18n/config';

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
      liveUrl: z.url().optional(),
      gallery: z.array(z.object({ image: image(), alt: localizedText })).default([]),
      // Vitrine de l'accueil : un fait vérifiable mis en avant, et l'écran mobile quand il existe
      highlight: localizedText.optional(),
      mobileShot: z.object({ image: image(), screen: z.enum(['brand', 'light']).default('light') }).optional()
    })
});

const paragraphs = z.array(z.string().min(1)).min(1);

// Étude de cas : un fichier par langue, tous construits sur la même structure de sections
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/case-studies' }),
  schema: ({ image }) =>
    z.object({
      project: z.string().min(1),
      locale: z.enum(locales),
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      lead: z.string().min(1),
      seoTitle: z.string().min(1).max(60),
      seoDescription: z.string().min(1).max(155),
      meta: z.object({ role: z.string(), team: z.string(), period: z.string(), status: z.string() }),
      context: paragraphs,
      role: z.object({ paragraphs, highlights: z.array(z.string().min(1)).min(1) }),
      approach: z.object({
        paragraphs,
        gallery: z
          .array(
            z.object({
              image: image(),
              alt: z.string().min(1),
              caption: z.string().min(1),
              // Teinte du haut de l'écran capturé : la barre d'état du mockup s'y raccorde
              screen: z.enum(['brand', 'light']).default('light')
            })
          )
          .default([])
      }),
      technical: z.object({
        intro: z.string().min(1),
        decisions: z.array(z.object({ title: z.string().min(1), text: z.string().min(1) })).min(1),
        stack: z.array(z.string().min(1)).min(1)
      }),
      results: z.object({
        intro: z.string().min(1),
        metrics: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).min(1)
      }),
      learnings: paragraphs
    })
});

// Mentions légales : un fichier par langue, en sections que le sommaire reprend automatiquement
const legal = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/legal' }),
  schema: z.object({
    locale: z.enum(locales),
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    seoTitle: z.string().min(1).max(60),
    seoDescription: z.string().min(1).max(155),
    updatedLabel: z.string().min(1),
    updatedAt: z.coerce.date(),
    sections: z
      .array(
        z.object({
          id: z.string().regex(/^[a-z-]+$/),
          title: z.string().min(1),
          paragraphs: z.array(z.string().min(1)).default([]),
          facts: z.array(z.object({ term: z.string().min(1), value: z.string().min(1), href: z.url().optional() })).default([])
        })
      )
      .min(1)
  })
});

export const collections = { projects, caseStudies, legal };
