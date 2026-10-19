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
  liveUrl: string | undefined;
  accent: CollectionEntry<'projects'>['data']['accent'];
  shots: ImageMetadata[];
  shotFrame: CollectionEntry<'projects'>['data']['shotFrame'];
  gallery: { image: ImageMetadata; alt: string }[];
  hasCaseStudy: boolean;
};

export type CaseStudy = CollectionEntry<'caseStudies'>['data'];

export function toProjectSummary(entry: CollectionEntry<'projects'>, locale: Locale, hasCaseStudy: boolean): ProjectSummary {
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
    href: getProjectPath(entry.id, locale),
    liveUrl: data.liveUrl,
    accent: data.accent,
    shots: data.shots,
    shotFrame: data.shotFrame,
    gallery: data.gallery.map((item) => ({ image: item.image, alt: item.alt[locale] })),
    hasCaseStudy
  };
}

export async function findCaseStudy(slug: string, locale: Locale): Promise<CaseStudy | undefined> {
  const caseStudies = await getCollection('caseStudies', (entry) => entry.data.project === slug && entry.data.locale === locale);
  return caseStudies[0]?.data;
}

export async function getProjectSummaries(locale: Locale): Promise<ProjectSummary[]> {
  const [entries, caseStudies] = await Promise.all([
    getCollection('projects'),
    getCollection('caseStudies', (entry) => entry.data.locale === locale)
  ]);
  const projectsWithCaseStudy = new Set(caseStudies.map((entry) => entry.data.project));
  return entries
    .toSorted((first, second) => first.data.order - second.data.order)
    .map((entry) => toProjectSummary(entry, locale, projectsWithCaseStudy.has(entry.id)));
}

// Le projet suivant boucle : après le dernier, on revient au premier
export function getNextProject<Item>(items: readonly Item[], currentIndex: number): Item | undefined {
  if (items.length === 0) return undefined;
  return items[(currentIndex + 1) % items.length];
}
