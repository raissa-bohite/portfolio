// Calculs de la visite en direct : vitesse de défilement, position des liens du menu, progression

// Largeur d'écran de référence : les vitesses sont réglées pour un écran d'ordinateur de 800 px de large
const REFERENCE_SCREEN_WIDTH = 800;
// Largeur de page des sites capturés : sert à mesurer la hauteur réelle d'une page à partir de sa capture
const CAPTURED_PAGE_WIDTH = 1440;
// Au-delà de cette hauteur, la page défile deux fois plus vite pour garder une visite d'une durée raisonnable
export const LONG_PAGE_HEIGHT = 4000;
export const BASE_SCROLL_SPEED = 45;
export const LONG_PAGE_SCROLL_SPEED = 90;

export type NavPoint = { x: number; y: number };

export function getPageHeightAtCaptureWidth(imageWidth: number, imageHeight: number): number {
  if (imageWidth <= 0) return 0;
  return (CAPTURED_PAGE_WIDTH * imageHeight) / imageWidth;
}

export function getScrollSpeed(imageWidth: number, imageHeight: number, screenWidth: number): number {
  const isLongPage = getPageHeightAtCaptureWidth(imageWidth, imageHeight) > LONG_PAGE_HEIGHT;
  const referenceSpeed = isLongPage ? LONG_PAGE_SCROLL_SPEED : BASE_SCROLL_SPEED;
  return (referenceSpeed * screenWidth) / REFERENCE_SCREEN_WIDTH;
}

export function getScrollDuration(distance: number, speed: number): number {
  if (distance <= 0 || speed <= 0) return 0;
  return distance / speed;
}

// Les positions du menu sont exprimées en pourcentage de la largeur de la capture, hauteur comprise
export function getNavPoint(navX: number, navY: number, screenWidth: number): NavPoint {
  return { x: (navX / 100) * screenWidth, y: (navY / 100) * screenWidth };
}

export function getNextPageIndex(currentIndex: number, pageCount: number): number {
  if (pageCount <= 0) return 0;
  return (currentIndex + 1) % pageCount;
}

export function getTourProgress(pageIndex: number, pageFraction: number, pageCount: number): number {
  if (pageCount <= 0) return 0;
  const boundedFraction = Math.min(Math.max(pageFraction, 0), 1);
  return Math.min((pageIndex + boundedFraction) / pageCount, 1);
}
