import { describe, expect, it } from 'vitest';
import { getOriginTransform } from '../src/scripts/gallery-math';

const rect = (left: number, top: number, width: number, height: number): DOMRectReadOnly =>
  ({ left, top, width, height, right: left + width, bottom: top + height, x: left, y: top, toJSON: () => ({}) }) as DOMRectReadOnly;

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
