// Largeur fixe du widget Turnstile standard : en dessous, il déborderait de la carte du formulaire
const STANDARD_WIDGET_WIDTH = 300;

type TurnstileSize = 'normal' | 'compact';

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: { sitekey: string; language?: string; size: TurnstileSize; appearance: 'interaction-only' }
  ) => string | undefined;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function getTurnstileSize(availableWidth: number): TurnstileSize {
  return availableWidth < STANDARD_WIDGET_WIDTH ? 'compact' : 'normal';
}

function renderWidget(api: TurnstileApi, container: HTMLElement): void {
  if (container.dataset['turnstileRendered'] === 'true') return;
  const sitekey = container.dataset['sitekey'];
  if (!sitekey) return;
  container.dataset['turnstileRendered'] = 'true';
  const language = container.dataset['language'];
  // Invisible tant que Cloudflare n'a pas besoin d'une action du visiteur : la plupart ne verront jamais la case
  api.render(container, {
    sitekey,
    size: getTurnstileSize(container.clientWidth),
    appearance: 'interaction-only',
    ...(language ? { language } : {})
  });
}

// Le script de Cloudflare se charge en asynchrone : on rend les widgets dès qu'il est prêt
export function renderTurnstileWidgets(): void {
  const containers = document.querySelectorAll<HTMLElement>('[data-turnstile]');
  if (containers.length === 0) return;
  const renderAll = (): void => {
    if (!window.turnstile) return;
    for (const container of containers) renderWidget(window.turnstile, container);
  };
  if (window.turnstile) {
    renderAll();
    return;
  }
  for (const script of document.querySelectorAll('script[data-turnstile-api]')) script.addEventListener('load', renderAll, { once: true });
}
