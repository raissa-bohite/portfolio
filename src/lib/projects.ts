import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import type { Locale } from '@/i18n/config';
import { getProjectPath } from '@/i18n/routes';

export type ProjectSummary = {
  slug: string;
  name: string;
  kind: string;
  role: string;
  description: string;
  stack: readonly string[];
  cover: ImageMetadata;
  coverAlt: string;
  href: string;
};

export function toProjectSummary(entry: CollectionEntry<'projects'>, locale: Locale): ProjectSummary {
  const { data } = entry;
  return {
    slug: entry.id,
    name: data.name,
    kind: data.kind[locale],
    role: data.role[locale],
    description: data.description[locale],
    stack: data.stack,
    cover: data.cover,
    coverAlt: data.coverAlt[locale],
    href: getProjectPath(entry.id, locale)
  };
}

export async function getProjectSummaries(locale: Locale): Promise<ProjectSummary[]> {
  const entries = await getCollection('projects');
  return entries
    .toSorted((first, second) => first.data.order - second.data.order)
    .map((entry) => toProjectSummary(entry, locale));
}
