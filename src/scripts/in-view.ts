import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whenPageReady } from './page-transition';

gsap.registerPlugin(ScrollTrigger);

type InViewEffect = 'wipe' | 'zoom';

// Un geste par effet, joué une seule fois à l'entrée dans l'écran
const effects: Record<InViewEffect, (element: HTMLElement, delay: number) => gsap.TweenVars> = {
  // Balayage de gauche à droite : donne l'impression qu'un numéro ou une note s'écrit
  wipe: (_element, delay) => ({ clipPath: 'inset(0% 0% 0% 0%)', duration: 1, delay, ease: 'power2.inOut', startAt: { clipPath: 'inset(0% 100% 0% 0%)' } }),
  // Léger zoom avant : la photo se pose dans la scène
  zoom: (_element, delay) => ({ autoAlpha: 1, scale: 1, duration: 1.1, delay, ease: 'power3.out', startAt: { autoAlpha: 0, scale: 0.92 } })
};

function isInViewEffect(value: string | undefined): value is InViewEffect {
  return value === 'wipe' || value === 'zoom';
}

// Éléments marqués data-in-view="wipe|zoom", avec data-in-view-delay facultatif en secondes
export function setupInView(element: HTMLElement): void {
  if (element.dataset['inViewSetup'] === 'true') return;
  element.dataset['inViewSetup'] = 'true';
  const effect = element.dataset['inView'];
  if (!isInViewEffect(effect)) return;
  const delay = Number(element.dataset['inViewDelay'] ?? 0) || 0;
  const media = gsap.matchMedia();
  void whenPageReady().then(() => {
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(element, { ...effects[effect](element, delay), scrollTrigger: { trigger: element, start: 'top 88%', once: true } });
    });
  });
}
