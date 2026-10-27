import { describe, expect, it } from 'vitest';
import { splitTitleAccent } from '@/lib/title-accent';

describe('splitTitleAccent', () => {
  it('coupe après la virgule quand il y en a une', () => {
    // Arrange
    const title = 'Trois domaines, un même soin';
    // Act
    const parts = splitTitleAccent(title);
    // Assert
    expect(parts).toEqual({ lead: 'Trois domaines,', accent: 'un même soin' });
  });

  it('met les deux derniers mots en couleur sans virgule', () => {
    const parts = splitTitleAccent('De la linguistique au code');
    expect(parts).toEqual({ lead: 'De la linguistique', accent: 'au code' });
  });

  it('colore tout un titre très court', () => {
    const parts = splitTitleAccent('Mes projets');
    expect(parts).toEqual({ lead: '', accent: 'Mes projets' });
  });

  it('garde chaque mot, rien n’est perdu à la coupure', () => {
    const title = 'Chaque projet suit le même ordre';
    const { lead, accent } = splitTitleAccent(title);
    expect(`${lead} ${accent}`).toBe(title);
  });
});
