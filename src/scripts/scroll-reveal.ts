import { gsap } from 'gsap';
import { prefersReducedMotion } from './motion';
import { whenPageReady } from './page-transition';

// Le groupe se révèle dès que son haut dépasse le bas de l'écran de 15 % :
// un seuil en pourcentage du groupe échouait pour les grilles plus hautes que l'écran (liste des projets)
const REVEAL_ROOT_MARGIN = '0px 0px -15% 0px';

// Construit l'entrée d'un groupe : chaque rôle (data-scroll-*) a son propre geste, joué dans l'ordre du document
function buildTimeline(group: HTMLElement): gsap.core.Timeline {
  const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
  const masks = group.querySelectorAll('[data-scroll-mask]');
  const items = group.querySelectorAll('[data-scroll-item]');
  const pops = group.querySelectorAll('[data-scroll-pop]');
  const lines = group.querySelectorAll('[data-scroll-line]');
  const dots = group.querySelectorAll('[data-scroll-dot]');

  if (masks.length > 0) {
    timeline.fromTo(masks, { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.1, ease: 'power4.out' });
  }
  if (items.length > 0) {
    timeline.from(items, { opacity: 0, y: 32, duration: 0.7, stagger: 0.12 }, masks.length > 0 ? '-=0.8' : 0);
  }
  if (pops.length > 0) {
    timeline.from(pops, { opacity: 0, scale: 0.6, rotation: -12, duration: 0.6, stagger: 0.12, ease: 'back.out(2)' }, '<0.15');
  }
  if (lines.length > 0) {
    timeline.from(lines, { scaleY: 0, transformOrigin: '50% 0%', duration: 1.2, ease: 'power2.inOut' }, '<');
  }
  if (dots.length > 0) {
    timeline.from(dots, { scale: 0, duration: 0.4, stagger: 0.35, ease: 'back.out(3)' }, '<0.1');
  }
  return timeline;
}

// Groupe plus haut que l'écran (liste des projets) : chaque élément se dévoile à son tour, au fil du défilement
function setupItemByItemReveal(items: HTMLElement[]): void {
  gsap.set(items, { opacity: 0, y: 48 });
  const observer = new IntersectionObserver(
    (entries) => {
      // Les éléments qui entrent ensemble à l'écran forment un lot, joué en cascade
      const batch = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target);
      if (batch.length === 0) return;
      for (const target of batch) observer.unobserve(target);
      void whenPageReady().then(() => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out' }));
    },
    { threshold: 0, rootMargin: REVEAL_ROOT_MARGIN }
  );
  for (const item of items) observer.observe(item);
}

// Révèle un groupe la première fois qu'il entre à l'écran ; sans animation si l'utilisateur la refuse
export function setupScrollReveal(group: HTMLElement): void {
  // Plusieurs sections importent ce script : un groupe ne doit être préparé qu'une fois
  if (group.dataset['scrollReady'] === 'true') return;
  group.dataset['scrollReady'] = 'true';
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
  const items = Array.from(group.querySelectorAll<HTMLElement>('[data-scroll-item]'));
  if (items.length > 1 && group.getBoundingClientRect().height > window.innerHeight) {
    setupItemByItemReveal(items);
    return;
  }
  const timeline = buildTimeline(group);
  // La timeline en pause applique déjà les états de départ : rien n'apparaît avant d'être joué
  timeline.progress(0);
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting) return;
      observer.disconnect();
      void whenPageReady().then(() => timeline.play());
    },
    { threshold: 0, rootMargin: REVEAL_ROOT_MARGIN }
  );
  observer.observe(group);
}
