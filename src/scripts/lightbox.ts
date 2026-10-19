// Aperçu plein écran des captures : un seul <dialog> natif partagé (focus piégé, Échap et retour du focus gérés par le navigateur)
export function setupLightbox(dialog: HTMLDialogElement): void {
  const image = dialog.querySelector<HTMLImageElement>('[data-lightbox-image]');
  const caption = dialog.querySelector<HTMLElement>('[data-lightbox-caption-text]');
  if (!image || !caption) return;

  document.addEventListener('click', (event) => {
    const trigger = (event.target as Element | null)?.closest<HTMLElement>('[data-lightbox-src]');
    if (!trigger) return;
    image.src = trigger.dataset['lightboxSrc'] ?? '';
    image.alt = trigger.dataset['lightboxAlt'] ?? '';
    caption.textContent = trigger.dataset['lightboxCaption'] ?? '';
    caption.hidden = caption.textContent === '';
    dialog.showModal();
  });

  // Un clic en dehors de l'image, sur le fond, ferme l'aperçu
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => image.removeAttribute('src'));
}
