import { gsap } from 'gsap';
import { prefersReducedMotion } from './motion';

const LOOP_DURATION = 60;
// Un clic sur une flèche avance ou recule la bande de quelques secondes de défilement
const NUDGE_SECONDS = 5;
const NUDGE_PIXELS = 240;

// Le contenu est dupliqué dans la piste : un décalage de 50 % boucle sans à-coup
export function setupMarquee(section: HTMLElement): void {
  const track = section.querySelector<HTMLElement>('[data-marquee]');
  const viewport = section.querySelector<HTMLElement>('[data-marquee-viewport]');
  const previous = section.querySelector<HTMLButtonElement>('[data-marquee-previous]');
  const next = section.querySelector<HTMLButtonElement>('[data-marquee-next]');
  if (!track || !viewport) return;

  // Mouvement réduit : la bande reste immobile, les flèches la font défiler d'un cran
  if (prefersReducedMotion()) {
    previous?.addEventListener('click', () => viewport.scrollBy({ left: -NUDGE_PIXELS }));
    next?.addEventListener('click', () => viewport.scrollBy({ left: NUDGE_PIXELS }));
    return;
  }

  const tween = gsap.to(track, { xPercent: -50, duration: LOOP_DURATION, ease: 'none', repeat: -1 });
  // On démarre loin dans la boucle pour pouvoir reculer sans passer sous zéro
  tween.totalTime(LOOP_DURATION * 100);

  const nudge = (direction: 1 | -1): void => {
    tween.pause();
    gsap.to(tween, {
      totalTime: tween.totalTime() + direction * NUDGE_SECONDS,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: true,
      onComplete: () => void tween.resume()
    });
  };
  previous?.addEventListener('click', () => nudge(-1));
  next?.addEventListener('click', () => nudge(1));
  track.addEventListener('mouseenter', () => tween.timeScale(0.2));
  track.addEventListener('mouseleave', () => tween.timeScale(1));
}
