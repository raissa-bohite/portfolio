import { describe, expect, it } from 'vitest';
import { getNearestSlideIndex, getNextAutoplayIndex, getOriginTransform, getTargetSlideIndex } from '../src/scripts/gallery-math';

const rect = (left: number, top: number, width: number, height: number): DOMRectReadOnly =>
  ({ left, top, width, height, right: left + width, bottom: top + height, x: left, y: top, toJSON: () => ({}) }) as DOMRectReadOnly;

describe('getNearestSlideIndex', () => {
  it('retourne la diapositive la plus proche du défilement courant', () => {
    // Arrange
    const offsets = [0, 600, 1200];
    // Act
    const index = getNearestSlideIndex(820, offsets);
    // Assert
    expect(index).toBe(1);
  });

  it('retourne 0 sans diapositive', () => {
    // Arrange
    const offsets: number[] = [];
    // Act
    const index = getNearestSlideIndex(300, offsets);
    // Assert
    expect(index).toBe(0);
  });
});

describe('getTargetSlideIndex', () => {
  it('avance d une diapositive', () => {
    // Arrange
    const current = 1;
    // Act
    const target = getTargetSlideIndex(current, 1, 4);
    // Assert
    expect(target).toBe(2);
  });

  it('reste sur la dernière diapositive au lieu de boucler', () => {
    // Arrange
    const current = 3;
    // Act
    const target = getTargetSlideIndex(current, 1, 4);
    // Assert
    expect(target).toBe(3);
  });

  it('reste sur la première diapositive en reculant', () => {
    // Arrange
    const current = 0;
    // Act
    const target = getTargetSlideIndex(current, -1, 4);
    // Assert
    expect(target).toBe(0);
  });
});

describe('getOriginTransform', () => {
  it('ramène l aperçu sur la vignette d origine', () => {
    // Arrange
    const thumbnail = rect(100, 200, 200, 100);
    const preview = rect(300, 100, 800, 400);
    // Act
    const transform = getOriginTransform(thumbnail, preview);
    // Assert
    expect(transform).toBe('translate(-500px, -50px) scale(0.25)');
  });
});

describe('getNextAutoplayIndex', () => {
  it('passe à la capture suivante', () => {
    // Arrange
    const current = 2;
    // Act
    const next = getNextAutoplayIndex(current, 6);
    // Assert
    expect(next).toBe(3);
  });

  it('revient à la première après la dernière', () => {
    // Arrange
    const current = 5;
    // Act
    const next = getNextAutoplayIndex(current, 6);
    // Assert
    expect(next).toBe(0);
  });
});
