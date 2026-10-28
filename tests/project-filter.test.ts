import { describe, expect, it } from 'vitest';
import { ALL_CATEGORIES, countVisible, isVisibleForFilter, listCategoryOptions } from '@/lib/project-filter';

const categories = ['Produit IA', 'E-commerce', 'Application métier', 'Site vitrine', 'Site vitrine'];

describe('listCategoryOptions', () => {
  it('propose chaque catégorie une seule fois, dans l’ordre des projets, avec son nombre', () => {
    // Arrange
    const projectCategories = categories;

    // Act
    const options = listCategoryOptions(projectCategories);

    // Assert
    expect(options).toEqual([
      { value: 'Produit IA', label: 'Produit IA', count: 1 },
      { value: 'E-commerce', label: 'E-commerce', count: 1 },
      { value: 'Application métier', label: 'Application métier', count: 1 },
      { value: 'Site vitrine', label: 'Site vitrine', count: 2 }
    ]);
  });
});

describe('isVisibleForFilter', () => {
  it('montre tous les projets avec le filtre « tous »', () => {
    // Arrange
    const activeFilter = ALL_CATEGORIES;

    // Act
    const visible = isVisibleForFilter('E-commerce', activeFilter);

    // Assert
    expect(visible).toBe(true);
  });

  it('masque un projet d’une autre catégorie', () => {
    // Arrange
    const activeFilter = 'Site vitrine';

    // Act
    const visible = isVisibleForFilter('E-commerce', activeFilter);

    // Assert
    expect(visible).toBe(false);
  });
});

describe('countVisible', () => {
  it('compte les projets restant affichés', () => {
    // Arrange
    const activeFilter = 'Site vitrine';

    // Act
    const count = countVisible(categories, activeFilter);

    // Assert
    expect(count).toBe(2);
  });
});
