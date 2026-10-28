// Filtre de la page Projets : catégories proposées et visibilité de chaque projet

export const ALL_CATEGORIES = 'all';

export type CategoryOption = { value: string; label: string; count: number };

// Une option par catégorie présente, dans l'ordre d'apparition des projets, avec son nombre de projets
export function listCategoryOptions(categories: readonly string[]): CategoryOption[] {
  const counts = new Map<string, number>();
  for (const category of categories) counts.set(category, (counts.get(category) ?? 0) + 1);
  return Array.from(counts, ([category, count]) => ({ value: category, label: category, count }));
}

export function isVisibleForFilter(category: string, activeFilter: string): boolean {
  return activeFilter === ALL_CATEGORIES || category === activeFilter;
}

export function countVisible(categories: readonly string[], activeFilter: string): number {
  return categories.filter((category) => isVisibleForFilter(category, activeFilter)).length;
}
