import { describe, expect, it } from 'vitest';
import { getReachedSteps, getTimelineProgress } from '../src/scripts/timeline-progress';

describe('getTimelineProgress', () => {
  it('reste à zéro tant que la frise est sous les trois quarts de la fenêtre', () => {
    // Arrange
    const viewportHeight = 800;
    // Act
    const progress = getTimelineProgress(700, 1000, viewportHeight);
    // Assert
    expect(progress).toBe(0);
  });

  it('atteint la moitié quand la moitié de la frise a dépassé ce repère', () => {
    // Arrange
    const viewportHeight = 800;
    // Act
    const progress = getTimelineProgress(100, 1000, viewportHeight);
    // Assert
    expect(progress).toBe(0.5);
  });

  it('ne dépasse jamais 1, même une fois la frise passée', () => {
    // Arrange
    const viewportHeight = 800;
    // Act
    const progress = getTimelineProgress(-5000, 1000, viewportHeight);
    // Assert
    expect(progress).toBe(1);
  });
});

describe('getReachedSteps', () => {
  it('allume la première étape avant le cinquième de la frise', () => {
    // Arrange
    const progress = 0.18;
    // Act
    const reached = getReachedSteps(progress, 5);
    // Assert
    expect(reached).toBe(1);
  });

  it('plafonne au nombre d’étapes', () => {
    // Arrange
    const progress = 1;
    // Act
    const reached = getReachedSteps(progress, 5);
    // Assert
    expect(reached).toBe(5);
  });
});
