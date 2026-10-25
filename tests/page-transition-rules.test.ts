import { describe, expect, it } from 'vitest';
import {
  formatLoaderCount,
  getLoaderProgress,
  getTransitionLabel,
  shouldAnimateNavigation,
  type NavigationIntent
} from '@/scripts/page-transition-rules';

const baseIntent: NavigationIntent = {
  href: 'https://example.com/projets',
  currentHref: 'https://example.com/',
  origin: 'https://example.com',
  target: '',
  button: 0,
  hasModifier: false,
  hasDownload: false,
  optedOut: false
};

describe('shouldAnimateNavigation', () => {
  it('anime un lien interne vers une autre page', () => {
    // Arrange
    const intent = { ...baseIntent };
    // Act
    const result = shouldAnimateNavigation(intent);
    // Assert
    expect(result).toBe(true);
  });

  it('ignore un lien externe', () => {
    const intent = { ...baseIntent, href: 'https://github.com/raissa-bohite' };
    const result = shouldAnimateNavigation(intent);
    expect(result).toBe(false);
  });

  it('ignore une ancre sur la même page', () => {
    const intent = { ...baseIntent, href: 'https://example.com/#main' };
    const result = shouldAnimateNavigation(intent);
    expect(result).toBe(false);
  });

  it('ignore un fichier comme le CV en PDF', () => {
    const intent = { ...baseIntent, href: 'https://example.com/cv.pdf' };
    const result = shouldAnimateNavigation(intent);
    expect(result).toBe(false);
  });

  it('ignore un clic avec touche de modification ou ouverture dans un nouvel onglet', () => {
    const withModifier = { ...baseIntent, hasModifier: true };
    const newTab = { ...baseIntent, target: '_blank' };
    const results = [shouldAnimateNavigation(withModifier), shouldAnimateNavigation(newTab)];
    expect(results).toEqual([false, false]);
  });

  it('ignore un lien marqué comme exclu', () => {
    const intent = { ...baseIntent, optedOut: true };
    const result = shouldAnimateNavigation(intent);
    expect(result).toBe(false);
  });
});

describe('getTransitionLabel', () => {
  it('reprend le texte du lien en normalisant les espaces', () => {
    const label = getTransitionLabel(undefined, '\n  À   propos \n');
    expect(label).toBe('À propos');
  });

  it('préfère le libellé explicite', () => {
    const label = getTransitionLabel('Projets', 'Voir tous les projets récents');
    expect(label).toBe('Projets');
  });

  it('renonce au titre quand le texte est trop long', () => {
    const label = getTransitionLabel(undefined, 'Yofeii Délices, boutique en ligne d’épices et de marinades');
    expect(label).toBe('');
  });
});

describe('getLoaderProgress', () => {
  it('part de zéro', () => {
    const progress = getLoaderProgress(0, 1700, true);
    expect(progress).toBe(0);
  });

  it('atteint 100 après la durée minimale si la page est chargée', () => {
    const progress = getLoaderProgress(1700, 1700, true);
    expect(progress).toBe(100);
  });

  it('plafonne à 90 tant que la page charge encore', () => {
    const progress = getLoaderProgress(3000, 1700, false);
    expect(progress).toBe(90);
  });
});

describe('formatLoaderCount', () => {
  it('affiche toujours trois chiffres', () => {
    const counts = [formatLoaderCount(7), formatLoaderCount(42), formatLoaderCount(100)];
    expect(counts).toEqual(['007', '042', '100']);
  });
});
