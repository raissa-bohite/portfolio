import type { Locale } from './config';
import { fr, type Dictionary } from './dictionaries/fr';
import { en } from './dictionaries/en';
import { de } from './dictionaries/de';

const dictionaries: Record<Locale, Dictionary> = { fr, en, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

// Remplace les jetons {nom} ; un jeton sans valeur reste visible pour être repéré en relecture
export function formatMessage(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (token, name: string) => {
    const value = values[name];
    return value === undefined ? token : String(value);
  });
}
