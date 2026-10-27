import { describe, expect, it } from 'vitest';
import { getTurnstileSize } from '@/scripts/turnstile';

describe('getTurnstileSize', () => {
  it('garde le widget standard quand la place suffit', () => {
    // Arrange
    const availableWidth = 320;
    // Act
    const size = getTurnstileSize(availableWidth);
    // Assert
    expect(size).toBe('normal');
  });

  it('passe en version compacte sur une carte étroite', () => {
    const size = getTurnstileSize(248);
    expect(size).toBe('compact');
  });
});
