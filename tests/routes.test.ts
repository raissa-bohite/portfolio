import { describe, expect, it } from 'vitest';
import { getAlternateLinks, getCvPath, getProjectPath, getRoutePath } from '../src/i18n/routes';

describe('getRoutePath', () => {
  it('garde le français à la racine', () => {
    // Arrange
    const locale = 'fr';
    // Act
    const path = getRoutePath('about', locale);
    // Assert
    expect(path).toBe('/a-propos');
  });

  it('préfixe et traduit les adresses allemandes', () => {
    // Arrange
    const locale = 'de';
    // Act
    const path = getRoutePath('about', locale);
    // Assert
    expect(path).toBe('/de/ueber-mich');
  });

  it("renvoie la racine de la langue pour l'accueil", () => {
    // Arrange
    const locales = ['fr', 'en', 'de'] as const;
    // Act
    const paths = locales.map((locale) => getRoutePath('home', locale));
    // Assert
    expect(paths).toEqual(['/', '/en', '/de']);
  });
});

describe('getProjectPath', () => {
  it('place le projet sous la page Projets traduite', () => {
    // Arrange
    const slug = 'fassbar';
    // Act
    const path = getProjectPath(slug, 'en');
    // Assert
    expect(path).toBe('/en/projects/fassbar');
  });
});

describe('getAlternateLinks', () => {
  it('fournit une adresse par langue pour les balises hreflang', () => {
    // Arrange
    const buildPath = (locale: 'fr' | 'en' | 'de') => getRoutePath('contact', locale);
    // Act
    const alternates = getAlternateLinks(buildPath);
    // Assert
    expect(alternates).toEqual([
      { locale: 'fr', path: '/contact' },
      { locale: 'en', path: '/en/contact' },
      { locale: 'de', path: '/de/kontakt' }
    ]);
  });
});

describe('getCvPath', () => {
  it('pointe vers le CV de la langue demandée', () => {
    // Arrange
    const locale = 'de';
    // Act
    const path = getCvPath(locale);
    // Assert
    expect(path).toBe('/cv/raissa-bohite-cv-de.pdf');
  });
});
