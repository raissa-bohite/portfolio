import { describe, expect, it } from 'vitest';
import { countReachedSteps, toTrackFraction } from '@/lib/progress-steps';

describe('toTrackFraction', () => {
  it('place une étape au milieu du rail à 0,5', () => {
    // Arrange
    const trackStart = 100;
    const trackLength = 400;

    // Act
    const fraction = toTrackFraction(300, trackStart, trackLength);

    // Assert
    expect(fraction).toBe(0.5);
  });

  it('borne les étapes situées hors du rail entre 0 et 1', () => {
    // Arrange
    const trackStart = 100;
    const trackLength = 400;

    // Act
    const before = toTrackFraction(40, trackStart, trackLength);
    const after = toTrackFraction(900, trackStart, trackLength);

    // Assert
    expect(before).toBe(0);
    expect(after).toBe(1);
  });

  it('renvoie 0 pour un rail sans longueur, encore masqué', () => {
    // Arrange
    const trackLength = 0;

    // Act
    const fraction = toTrackFraction(50, 0, trackLength);

    // Assert
    expect(fraction).toBe(0);
  });
});

describe('countReachedSteps', () => {
  const fractions = [0, 1 / 3, 2 / 3, 1];

  it('allume seulement la première étape au début du défilement', () => {
    // Arrange
    const progress = 0;

    // Act
    const reached = countReachedSteps(progress, fractions);

    // Assert
    expect(reached).toBe(1);
  });

  it('allume les étapes déjà dépassées par le remplissage', () => {
    // Arrange
    const progress = 0.7;

    // Act
    const reached = countReachedSteps(progress, fractions);

    // Assert
    expect(reached).toBe(3);
  });

  it('allume la dernière étape malgré un arrondi en bout de rail', () => {
    // Arrange
    const progress = 0.995;

    // Act
    const reached = countReachedSteps(progress, fractions);

    // Assert
    expect(reached).toBe(4);
  });
});
