import { defaultLocale, locales, type Locale } from './config';

export const routeIds = ['home', 'projects', 'about', 'contact', 'legal'] as const;

export type RouteId = (typeof routeIds)[number];

// Segments traduits : chaque langue a des adresses lisibles dans sa propre langue
const routeSegments: Record<RouteId, Record<Locale, string>> = {
  home: { fr: '', en: '', de: '' },
  projects: { fr: 'projets', en: 'projects', de: 'projekte' },
  about: { fr: 'a-propos', en: 'about', de: 'ueber-mich' },
  contact: { fr: 'contact', en: 'contact', de: 'kontakt' },
  legal: { fr: 'mentions-legales', en: 'legal-notice', de: 'impressum' }
};

function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? '' : `/${locale}`;
}

function joinPath(...segments: string[]): string {
  const path = segments.filter((segment) => segment !== '').join('/');
  return `/${path}`.replace(/\/+/g, '/');
}

export function getRoutePath(routeId: RouteId, locale: Locale): string {
  return joinPath(localePrefix(locale), routeSegments[routeId][locale]);
}

export function getProjectPath(slug: string, locale: Locale): string {
  return joinPath(getRoutePath('projects', locale), slug);
}

export function getCvPath(locale: Locale): string {
  return `/cv/raissa-bohite-cv-${locale}.pdf`;
}

export type AlternateLink = { locale: Locale; path: string };

export function getAlternateLinks(buildPath: (locale: Locale) => string): AlternateLink[] {
  return locales.map((locale) => ({ locale, path: buildPath(locale) }));
}
