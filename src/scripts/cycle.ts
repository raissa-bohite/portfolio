// Calculs purs de navigation circulaire, séparés du DOM pour être testés

export function wrapIndex(index: number, total: number): number {
  return ((index % total) + total) % total;
}

export type TabKey = 'ArrowRight' | 'ArrowLeft' | 'Home' | 'End';

// Onglet visé par une touche du clavier, selon le motif d'onglets ARIA (les flèches bouclent)
export function getTabIndexForKey(key: string, currentIndex: number, total: number): number | undefined {
  switch (key) {
    case 'ArrowRight':
      return wrapIndex(currentIndex + 1, total);
    case 'ArrowLeft':
      return wrapIndex(currentIndex - 1, total);
    case 'Home':
      return 0;
    case 'End':
      return total - 1;
    default:
      return undefined;
  }
}
