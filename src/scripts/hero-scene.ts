import { prefersReducedMotion } from './motion';

const MAX_SHIFT_PIXELS = 14;

// Les animations d'ambiance s'arrêtent quand la scène n'est plus visible : aucun travail inutile pour le navigateur
function pauseWhenHidden(hero: HTMLElement): void {
  const observer = new IntersectionObserver(([entry]) => {
    hero.toggleAttribute('data-paused', !entry?.isIntersecting);
  });
  observer.observe(hero);
}

// Effet de profondeur : la scène suit légèrement le pointeur, uniquement avec une souris
function followPointer(hero: HTMLElement, layer: HTMLElement): void {
  let pendingFrame = 0;

  const moveLayer = (shiftX: number, shiftY: number): void => {
    layer.style.setProperty('--shift-x', `${shiftX}px`);
    layer.style.setProperty('--shift-y', `${shiftY}px`);
  };

  hero.addEventListener('pointermove', (event) => {
    if (pendingFrame) return;
    pendingFrame = requestAnimationFrame(() => {
      pendingFrame = 0;
      const bounds = hero.getBoundingClientRect();
      const ratioX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const ratioY = (event.clientY - bounds.top) / bounds.height - 0.5;
      // Sens inverse du pointeur : l'image semble plus lointaine que le texte
      moveLayer(-ratioX * 2 * MAX_SHIFT_PIXELS, -ratioY * 2 * MAX_SHIFT_PIXELS);
    });
  });

  hero.addEventListener('pointerleave', () => moveLayer(0, 0));
}

export function initHeroScene(hero: HTMLElement): void {
  pauseWhenHidden(hero);
  const layer = hero.querySelector<HTMLElement>('[data-hero-parallax]');
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!layer || prefersReducedMotion() || !hasFinePointer) return;
  followPointer(hero, layer);
}
