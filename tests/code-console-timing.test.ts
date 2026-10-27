import { describe, expect, it } from 'vitest';
import { CHARACTER_DURATION, LINE_PAUSE, OUTPUT_DURATION, START_DELAY, getConsoleTimeline } from '@/scripts/code-console-timing';

describe('getConsoleTimeline', () => {
  it('fait durer une ligne de code proportionnellement à sa longueur', () => {
    // Arrange
    const lines = [{ kind: 'code' as const, characters: 20 }];
    // Act
    const [timing] = getConsoleTimeline(lines);
    // Assert
    expect(timing).toEqual({ delay: START_DELAY, duration: 20 * CHARACTER_DURATION, characters: 20 });
  });

  it('enchaîne les lignes avec une pause entre chacune', () => {
    const lines = [
      { kind: 'code' as const, characters: 10 },
      { kind: 'code' as const, characters: 5 }
    ];
    const [, second] = getConsoleTimeline(lines);
    expect(second?.delay).toBeCloseTo(START_DELAY + 10 * CHARACTER_DURATION + LINE_PAUSE);
  });

  it('affiche la sortie de console.log en une durée fixe, après les lignes de code', () => {
    const lines = [
      { kind: 'code' as const, characters: 10 },
      { kind: 'output' as const, characters: 30 }
    ];
    const [, output] = getConsoleTimeline(lines);
    expect(output?.duration).toBe(OUTPUT_DURATION);
    expect(output?.delay).toBeCloseTo(START_DELAY + 10 * CHARACTER_DURATION + LINE_PAUSE);
  });
});
