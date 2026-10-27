import { gsap } from 'gsap';
import { prefersReducedMotion } from './motion';

const REVEAL_DELAY = 0.25;

// Entrée du haut de page : boutons et badges arrivent tout de suite, le titre quand le code a fini de s'exécuter
export function playIntro(hero: HTMLElement, titleDelay = REVEAL_DELAY): void {
  if (prefersReducedMotion()) return;
  const words = hero.querySelectorAll('[data-word]');
  const reveals = hero.querySelectorAll('[data-reveal]');
  gsap.from(reveals, { opacity: 0, y: 20, duration: 0.5, stagger: 0.08, delay: REVEAL_DELAY, ease: 'power3.out' });
  gsap.from(words, { yPercent: 110, duration: 0.7, stagger: 0.08, delay: titleDelay, ease: 'power3.out' });
  // Le curseur n'apparaît qu'avec le titre : seul, il flottait au-dessus du paragraphe pendant la frappe
  const cursor = hero.querySelector('[data-title-cursor]');
  if (cursor) gsap.from(cursor, { autoAlpha: 0, duration: 0.2, delay: titleDelay + words.length * 0.08 + 0.3 });
}
