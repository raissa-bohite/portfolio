import { getOriginTransform } from './gallery-math';
import { prefersReducedMotion } from './motion';

// Courbe proche d'un ressort amorti critique : départ vif, arrivée douce, sans rebond
const SPRING_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
const OPEN_DURATION = 420;
const CLOSE_DURATION = 320;

// Aperçu plein écran des captures : un seul <dialog> natif partagé (focus piégé et retour du focus gérés par le navigateur).
// L'aperçu grandit depuis la vignette cliquée et y retourne à la fermeture : on sait toujours d'où il vient.
export function setupLightbox(dialog: HTMLDialogElement): void {
  const image = dialog.querySelector<HTMLImageElement>('[data-lightbox-image]');
  const caption = dialog.querySelector<HTMLElement>('[data-lightbox-caption-text]');
  if (!image || !caption) return;

  let origin: HTMLElement | null = null;
  let isClosing = false;

  const animateFromOrigin = (): void => {
    if (prefersReducedMotion() || !origin) {
      image.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: 'ease-out' });
      return;
    }
    const transform = getOriginTransform(origin.getBoundingClientRect(), image.getBoundingClientRect());
    image.animate([{ transform, borderRadius: '12px' }, { transform: 'none' }], { duration: OPEN_DURATION, easing: SPRING_EASING });
  };

  const close = (): void => {
    if (isClosing || !dialog.open) return;
    isClosing = true;
    const finish = (): void => {
      isClosing = false;
      dialog.close();
    };
    if (prefersReducedMotion() || !origin) {
      image.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, easing: 'ease-in' }).finished.then(finish, finish);
      return;
    }
    // Retour par le même chemin qu'à l'ouverture, vers la vignette d'origine
    const transform = getOriginTransform(origin.getBoundingClientRect(), image.getBoundingClientRect());
    dialog.classList.add('is-closing');
    image
      .animate([{ transform: 'none' }, { transform }], { duration: CLOSE_DURATION, easing: SPRING_EASING, fill: 'forwards' })
      .finished.then(finish, finish);
  };

  document.addEventListener('click', (event) => {
    const trigger = (event.target as Element | null)?.closest<HTMLElement>('[data-lightbox-src]');
    if (!trigger) return;
    origin = trigger.querySelector<HTMLElement>('[data-lightbox-thumb]') ?? trigger;
    image.src = trigger.dataset['lightboxSrc'] ?? '';
    image.alt = trigger.dataset['lightboxAlt'] ?? '';
    caption.textContent = trigger.dataset['lightboxCaption'] ?? '';
    caption.hidden = caption.textContent === '';
    dialog.classList.remove('is-closing');
    dialog.showModal();
    // L'image grand format peut arriver après l'ouverture : on anime dès que sa taille est connue
    if (image.complete && image.naturalWidth > 0) animateFromOrigin();
    else image.addEventListener('load', animateFromOrigin, { once: true });
  });

  // Échap, bouton de fermeture et clic sur le fond passent tous par la même fermeture animée
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });
  dialog.querySelector('[data-lightbox-close]')?.addEventListener('click', close);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });

  dialog.addEventListener('close', () => {
    for (const animation of image.getAnimations()) animation.cancel();
    image.removeAttribute('src');
    dialog.classList.remove('is-closing');
  });
}
