import { describe, expect, it } from 'vitest';
import { getTabIndexForKey, wrapIndex } from '../src/scripts/cycle';

describe('wrapIndex', () => {
  it('revient au dernier projet depuis le premier', () => {
    // Arrange
    const total = 5;
    // Act
    const index = wrapIndex(-1, total);
    // Assert
    expect(index).toBe(4);
  });

  it('revient au premier projet après le dernier', () => {
    // Arrange
    const total = 5;
    // Act
    const index = wrapIndex(5, total);
    // Assert
    expect(index).toBe(0);
  });
});

describe('getTabIndexForKey', () => {
  it('passe à l’onglet suivant avec la flèche droite et boucle à la fin', () => {
    // Arrange
    const currentIndex = 4;
    // Act
    const index = getTabIndexForKey('ArrowRight', currentIndex, 5);
    // Assert
    expect(index).toBe(0);
  });

  it('va au premier et au dernier onglet avec Début et Fin', () => {
    // Arrange
    const currentIndex = 2;
    // Act
    const first = getTabIndexForKey('Home', currentIndex, 5);
    const last = getTabIndexForKey('End', currentIndex, 5);
    // Assert
    expect([first, last]).toEqual([0, 4]);
  });

  it('ignore les autres touches', () => {
    // Arrange
    const currentIndex = 2;
    // Act
    const index = getTabIndexForKey('Enter', currentIndex, 5);
    // Assert
    expect(index).toBeUndefined();
  });
});
