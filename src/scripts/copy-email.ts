// Le bouton n'apparaît que si le presse-papiers est disponible ; le lien mailto reste l'alternative
export function setupCopyEmail(block: HTMLElement): void {
  const button = block.querySelector<HTMLButtonElement>('[data-copy-button]');
  const email = block.querySelector<HTMLElement>('[data-email]')?.textContent?.trim();
  const status = block.querySelector<HTMLElement>('[data-copy-status]');
  if (!button || !email || !status || !navigator.clipboard) return;
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      status.textContent = block.dataset['copied'] ?? '';
    } catch {
      status.textContent = block.dataset['copyFailed'] ?? '';
    }
  });
}
