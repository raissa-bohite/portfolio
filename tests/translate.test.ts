import { describe, expect, it } from 'vitest';
import { formatMessage, getDictionary } from '../src/i18n/translate';

function collectStrings(value: unknown, path = ''): { path: string; text: string }[] {
  if (typeof value === 'string') return [{ path, text: value }];
  if (Array.isArray(value)) return value.flatMap((item, index) => collectStrings(item, `${path}[${index}]`));
  if (typeof value === 'object' && value !== null) {
    return Object.entries(value).flatMap(([key, item]) => collectStrings(item, path ? `${path}.${key}` : key));
  }
  return [];
}

describe('formatMessage', () => {
  it('remplace chaque jeton par sa valeur', () => {
    // Arrange
    const template = 'Projet {current} sur {total}';
    // Act
    const message = formatMessage(template, { current: 2, total: 5 });
    // Assert
    expect(message).toBe('Projet 2 sur 5');
  });

  it('laisse visible un jeton sans valeur', () => {
    // Arrange
    const template = 'Merci {name}';
    // Act
    const message = formatMessage(template, {});
    // Assert
    expect(message).toBe('Merci {name}');
  });
});

describe('dictionnaires', () => {
  it.each(['en', 'de'] as const)('%s couvre exactement les mêmes clés que le français', (locale) => {
    // Arrange
    const referencePaths = collectStrings(getDictionary('fr')).map((entry) => entry.path);
    // Act
    const translatedPaths = collectStrings(getDictionary(locale)).map((entry) => entry.path);
    // Assert
    expect(translatedPaths).toEqual(referencePaths);
  });

  it.each(['fr', 'en', 'de'] as const)('%s ne contient aucun texte vide ni crochet à compléter', (locale) => {
    // Arrange
    const entries = collectStrings(getDictionary(locale));
    // Act
    const incomplete = entries.filter((entry) => entry.text.trim() === '' || /\[[^\]]+\]/.test(entry.text));
    // Assert
    expect(incomplete).toEqual([]);
  });
});
