import { gsap } from 'gsap';
import { prefersReducedMotion } from './motion';

// Le contenu est dupliqué dans la piste : un décalage de 50 % boucle sans à-coup
export function setupMarquee(track: HTMLElement): void {
  if (prefersReducedMotion()) return;
  const tween = gsap.to(track, { xPercent: -50, duration: 60, ease: 'none', repeat: -1 });
  track.addEventListener('mouseenter', () => tween.timeScale(0.2));
  track.addEventListener('mouseleave', () => tween.timeScale(1));
}
