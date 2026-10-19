import { gsap } from 'gsap';
import { prefersReducedMotion } from './motion';

// Entrée du haut de page, lancée après la frappe de la ligne de code
export function playIntro(hero: HTMLElement): void {
  if (prefersReducedMotion()) return;
  const words = hero.querySelectorAll('[data-word]');
  const reveals = hero.querySelectorAll('[data-reveal]');
  const stage = hero.querySelector('[data-showcase]');
  const timeline = gsap.timeline({ delay: 1.1, defaults: { ease: 'power3.out' } });
  timeline.from(words, { yPercent: 110, duration: 0.7, stagger: 0.08 });
  if (stage) timeline.from(stage, { opacity: 0, y: 40, duration: 0.9 }, '-=0.5');
  timeline.from(reveals, { opacity: 0, y: 20, duration: 0.5, stagger: 0.08 }, '-=0.6');
}
