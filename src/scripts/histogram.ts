import { gsap } from 'gsap';
import { prefersReducedMotion } from './motion';

const MINIMUM_BAR_HEIGHT = 132;

// Les barres montent l'une après l'autre ; la dernière atteinte reste en orange
export function setupHistogram(list: HTMLElement): void {
  const bars = Array.from(list.querySelectorAll<HTMLElement>('[data-bar]'));
  const texts = Array.from(list.querySelectorAll<HTMLElement>('[data-bar-text]'));
  const lastBar = bars.at(-1);
  // Une seule colonne : pas d'escalier à faire monter
  const isStaircase = window.matchMedia('(min-width: 640px)').matches;
  if (prefersReducedMotion() || !isStaircase || !('IntersectionObserver' in window)) {
    lastBar?.classList.add('is-current');
    return;
  }
  // On anime la hauteur plutôt qu'une mise à l'échelle pour ne pas écraser le texte des barres
  const targetHeights = bars.map((bar) => bar.dataset['height'] ?? '100%');
  gsap.set(bars, { height: 0, minHeight: 0 });
  gsap.set(texts, { opacity: 0, y: 12 });

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting) return;
      observer.disconnect();
      const timeline = gsap.timeline();
      bars.forEach((bar, index) => {
        timeline.call(() => {
          for (const otherBar of bars) otherBar.classList.remove('is-current');
          bar.classList.add('is-current');
        });
        timeline.to(bar, { height: targetHeights[index] ?? '100%', minHeight: MINIMUM_BAR_HEIGHT, duration: 0.7, ease: 'power3.out' });
        timeline.to(texts[index] ?? [], { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.35');
        timeline.to({}, { duration: 0.2 });
      });
    },
    { threshold: 0.35 }
  );
  observer.observe(list);
}
