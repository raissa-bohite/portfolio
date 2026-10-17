import { describe, expect, it, vi } from 'vitest';

// Le module importe astro:content, inutile ici : on le remplace pour tester la logique seule
vi.mock('astro:content', () => ({ getCollection: vi.fn() }));

const { getNextProject } = await import('../src/lib/projects');

describe('getNextProject', () => {
  it('propose le projet suivant dans l’ordre', () => {
    // Arrange
    const projects = ['fassbar', 'yofeii-delices', 'erp-scolaire'];
    // Act
    const next = getNextProject(projects, 0);
    // Assert
    expect(next).toBe('yofeii-delices');
  });

  it('revient au premier projet après le dernier', () => {
    // Arrange
    const projects = ['fassbar', 'yofeii-delices', 'erp-scolaire'];
    // Act
    const next = getNextProject(projects, 2);
    // Assert
    expect(next).toBe('fassbar');
  });

  it('ne propose rien sans projet', () => {
    // Arrange
    const projects: string[] = [];
    // Act
    const next = getNextProject(projects, 0);
    // Assert
    expect(next).toBeUndefined();
  });
});
