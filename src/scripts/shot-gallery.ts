import { getNearestSlideIndex, getNextAutoplayIndex, getTargetSlideIndex } from './gallery-math';
import { prefersReducedMotion } from './motion';

const AUTOPLAY_DELAY = 5000;

// Galerie de captures : le défilement natif fait le mouvement (élan, aimantation, interruption au doigt),
// le script synchronise les boutons et le compteur, et fait défiler les captures tout seul tant qu'on ne les touche pas
export function setupShotGallery(gallery: HTMLElement): void {
  const track = gallery.querySelector<HTMLElement>('[data-shot-track]');
  const slides = Array.from(gallery.querySelectorAll<HTMLElement>('[data-shot-slide]'));
  const previousButton = gallery.querySelector<HTMLButtonElement>('[data-shot-previous]');
  const nextButton = gallery.querySelector<HTMLButtonElement>('[data-shot-next]');
  const counter = gallery.querySelector<HTMLElement>('[data-shot-counter]');
  const toggleButton = gallery.querySelector<HTMLButtonElement>('[data-shot-toggle]');
  const progressBar = gallery.querySelector<HTMLElement>('[data-shot-progress]');
  if (!track || slides.length < 2 || !previousButton || !nextButton) return;

  // Référence non nulle pour les fonctions internes
  const scrollTrack: HTMLElement = track;

  // Modèle du compteur, déjà traduit dans le HTML : seul le premier nombre change
  const counterTemplate = counter?.textContent ?? '';
  let currentIndex = 0;

  const slideOffsets = (): number[] => {
    const startPadding = parseFloat(getComputedStyle(track).scrollPaddingInlineStart) || 0;
    return slides.map((slide) => slide.offsetLeft - startPadding);
  };

  const render = (): void => {
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slides.length - 1;
    if (counter) counter.textContent = counterTemplate.replace(/\d+/, String(currentIndex + 1));
  };

  const scrollToIndex = (index: number): void => {
    // Le défilement part de la position actuelle : un nouvel appel en cours de mouvement le redirige sans à-coup
    track.scrollTo({ left: slideOffsets()[index] ?? 0 });
  };

  let pendingFrame = 0;
  track.addEventListener(
    'scroll',
    () => {
      if (pendingFrame) return;
      pendingFrame = requestAnimationFrame(() => {
        pendingFrame = 0;
        const nearestIndex = getNearestSlideIndex(track.scrollLeft, slideOffsets());
        if (nearestIndex === currentIndex) return;
        currentIndex = nearestIndex;
        render();
      });
    },
    { passive: true }
  );

  // Lecture automatique : jamais si l'utilisateur a demandé moins de mouvement
  const autoplay = toggleButton && progressBar && !prefersReducedMotion() ? createAutoplay(toggleButton, progressBar) : null;

  function createAutoplay(button: HTMLButtonElement, bar: HTMLElement) {
    // La barre de progression sert d'horloge : à la fin de son animation, on passe à la capture suivante
    let progress: Animation | null = null;
    let isStopped = false;
    const temporaryPauses = new Set<string>();

    const startCycle = (): void => {
      progress?.cancel();
      progress = bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: AUTOPLAY_DELAY, easing: 'linear', fill: 'forwards' });
      progress.onfinish = () => {
        scrollToIndex(getNextAutoplayIndex(currentIndex, slides.length));
        startCycle();
      };
      if (isStopped || temporaryPauses.size > 0) progress.pause();
    };

    const sync = (): void => {
      if (!progress) return;
      if (isStopped || temporaryPauses.size > 0) progress.pause();
      else progress.play();
    };

    const setStopped = (stopped: boolean): void => {
      isStopped = stopped;
      button.dataset['state'] = stopped ? 'paused' : 'playing';
      button.setAttribute('aria-label', (stopped ? button.dataset['labelPlay'] : button.dataset['labelPause']) ?? '');
      if (stopped) progress?.cancel();
      else startCycle();
      sync();
    };

    button.hidden = false;
    button.dataset['state'] = 'playing';
    button.addEventListener('click', () => setStopped(!isStopped));

    // Pauses passagères : survol, focus clavier dans la galerie, galerie hors de l'écran, onglet caché
    const holdWhile = (reason: string, active: boolean): void => {
      if (active) temporaryPauses.add(reason);
      else temporaryPauses.delete(reason);
      sync();
    };
    scrollTrack.addEventListener('pointerenter', () => holdWhile('hover', true));
    scrollTrack.addEventListener('pointerleave', () => holdWhile('hover', false));
    gallery.addEventListener('focusin', (event) => holdWhile('focus', event.target !== button));
    gallery.addEventListener('focusout', () => holdWhile('focus', false));
    document.addEventListener('visibilitychange', () => holdWhile('hidden', document.hidden));
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => holdWhile('offscreen', !entry?.isIntersecting), { threshold: 0.3 }).observe(gallery);
    }

    // Une prise en main (doigt, molette, boutons) arrête la lecture : c'est l'utilisateur qui conduit
    for (const eventName of ['pointerdown', 'wheel'] as const) {
      scrollTrack.addEventListener(eventName, () => setStopped(true), { passive: true });
    }

    startCycle();
    return { stop: () => setStopped(true) };
  }

  const goTo = (direction: -1 | 1): void => {
    autoplay?.stop();
    scrollToIndex(getTargetSlideIndex(currentIndex, direction, slides.length));
  };

  previousButton.addEventListener('click', () => goTo(-1));
  nextButton.addEventListener('click', () => goTo(1));

  // Flèches du clavier quand la galerie a le focus
  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(-1);
    }
  });

  render();
}
