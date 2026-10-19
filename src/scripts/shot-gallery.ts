import { getNearestSlideIndex, getTargetSlideIndex } from './gallery-math';

// Galerie de captures : le défilement natif fait le mouvement (élan, aimantation, interruption au doigt),
// le script ne fait que synchroniser les boutons et le compteur avec la position réelle
export function setupShotGallery(gallery: HTMLElement): void {
  const track = gallery.querySelector<HTMLElement>('[data-shot-track]');
  const slides = Array.from(gallery.querySelectorAll<HTMLElement>('[data-shot-slide]'));
  const previousButton = gallery.querySelector<HTMLButtonElement>('[data-shot-previous]');
  const nextButton = gallery.querySelector<HTMLButtonElement>('[data-shot-next]');
  const counter = gallery.querySelector<HTMLElement>('[data-shot-counter]');
  if (!track || slides.length < 2 || !previousButton || !nextButton) return;

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

  const goTo = (direction: -1 | 1): void => {
    const targetIndex = getTargetSlideIndex(currentIndex, direction, slides.length);
    const targetOffset = slideOffsets()[targetIndex] ?? 0;
    // Le défilement part de la position actuelle : un nouveau clic en cours de mouvement le redirige sans à-coup
    track.scrollTo({ left: targetOffset });
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
