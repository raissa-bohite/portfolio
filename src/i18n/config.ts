export const locales = ['fr', 'en', 'de'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  de: 'Deutsch'
};

// Balises Open Graph : format langue_PAYS attendu par les réseaux sociaux
export const openGraphLocales: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  de: 'de_DE'
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}
