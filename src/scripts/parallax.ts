import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whenPageReady } from './page-transition';

gsap.registerPlugin(ScrollTrigger);

// Profondeur au défilement : data-parallax donne l'amplitude en pixels, plus elle est grande plus l'objet semble proche.
// Grand écran uniquement : sur mobile, l'effet coûte de la batterie pour un gain visuel faible
export function setupParallax(element: HTMLElement): void {
  if (element.dataset['parallaxSetup'] === 'true') return;
  element.dataset['parallaxSetup'] = 'true';
  const amplitude = Number(element.dataset['parallax'] ?? 0) || 0;
  if (amplitude === 0) return;
  const scope = element.closest<HTMLElement>('[data-parallax-scope]') ?? element;
  const media = gsap.matchMedia();
  void whenPageReady().then(() => {
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        element,
        { y: amplitude / 2 },
        { y: -amplitude / 2, ease: 'none', scrollTrigger: { trigger: scope, start: 'top bottom', end: 'bottom top', scrub: true } }
      );
    });
  });
}
