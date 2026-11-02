// Calcul pur de l'aperçu agrandi, séparé du DOM pour être testé

// Transformation qui place l'aperçu agrandi exactement sur la vignette d'origine (technique FLIP)
export function getOriginTransform(from: DOMRectReadOnly, to: DOMRectReadOnly): string {
  const scale = to.width === 0 ? 1 : from.width / to.width;
  const translateX = from.left + from.width / 2 - (to.left + to.width / 2);
  const translateY = from.top + from.height / 2 - (to.top + to.height / 2);
  return `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}
