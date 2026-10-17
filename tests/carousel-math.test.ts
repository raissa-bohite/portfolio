import { describe, expect, it } from 'vitest';
import { getCardPose, getCircularOffset, wrapIndex } from '../src/scripts/carousel-math';

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

describe('getCircularOffset', () => {
  it('place le dernier projet juste à gauche du premier', () => {
    // Arrange
    const activeIndex = 0;
    // Act
    const offset = getCircularOffset(4, activeIndex, 5);
    // Assert
    expect(offset).toBe(-1);
  });
});

describe('getCardPose', () => {
  it('met la carte active au premier plan, opaque et droite', () => {
    // Arrange
    const offset = 0;
    // Act
    const pose = getCardPose(offset);
    // Assert
    expect(pose).toMatchObject({ x: 0, rotation: 0, opacity: 1, scale: 1 });
  });

  it('masque les cartes éloignées de plus d’un rang', () => {
    // Arrange
    const offset = 2;
    // Act
    const pose = getCardPose(offset);
    // Assert
    expect(pose.opacity).toBe(0);
  });

  it('incline les voisines vers l’extérieur, de façon symétrique', () => {
    // Arrange
    const leftOffset = -1;
    const rightOffset = 1;
    // Act
    const left = getCardPose(leftOffset);
    const right = getCardPose(rightOffset);
    // Assert
    expect(left.x).toBe(-right.x);
    expect(left.rotation).toBe(-right.rotation);
  });
});
