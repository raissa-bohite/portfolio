// Calculs purs de la galerie de captures, séparés du DOM pour être testés

// Index de la diapositive la plus proche du bord de départ, d'après le défilement courant
export function getNearestSlideIndex(scrollLeft: number, slideOffsets: readonly number[]): number {
  if (slideOffsets.length === 0) return 0;
  let nearestIndex = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;
  slideOffsets.forEach((offset, index) => {
    const distance = Math.abs(offset - scrollLeft);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  });
  return nearestIndex;
}

// Index visé par un bouton précédent ou suivant, borné aux extrémités (pas de boucle : on sait où l'on est)
export function getTargetSlideIndex(currentIndex: number, direction: -1 | 1, slideCount: number): number {
  return Math.min(Math.max(currentIndex + direction, 0), Math.max(slideCount - 1, 0));
}

// Transformation qui place l'aperçu agrandi exactement sur la vignette d'origine (technique FLIP)
export function getOriginTransform(from: DOMRectReadOnly, to: DOMRectReadOnly): string {
  const scale = to.width === 0 ? 1 : from.width / to.width;
  const translateX = from.left + from.width / 2 - (to.left + to.width / 2);
  const translateY = from.top + from.height / 2 - (to.top + to.height / 2);
  return `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

// Capture suivante en lecture automatique : après la dernière, on revient à la première
export function getNextAutoplayIndex(currentIndex: number, slideCount: number): number {
  if (slideCount <= 0) return 0;
  return (currentIndex + 1) % slideCount;
}
