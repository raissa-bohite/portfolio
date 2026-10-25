import {
  formatLoaderCount,
  getLoaderProgress,
  getTransitionLabel,
  shouldAnimateNavigation
} from './page-transition-rules';

// Durées accordées aux animations CSS de PageLoader.astro
const LOADER_MINIMUM_DURATION = 1700;
const LOADER_MAXIMUM_WAIT = 4000;
const LOADER_LEAVE_DURATION = 1150;
const CURTAIN_COVER_DURATION = 640;
const CURTAIN_UNCOVER_DURATION = 800;
// Moment où le rideau a assez monté pour que l'on voie le contenu apparaître
const CURTAIN_REVEAL_DELAY = 420;

const TRANSITION_STORAGE_KEY = 'page-transition';
const LOADER_SEEN_STORAGE_KEY = 'page-loader-seen';
const PAGE_READY_EVENT = 'page:ready';

const root = document.documentElement;

// Les animations d'entrée attendent que le chargeur ou le rideau commence à se lever, sinon elles se jouent cachées
export function whenPageReady(): Promise<void> {
  if (root.dataset.loader === 'active') {
    return new Promise((resolve) => document.addEventListener(PAGE_READY_EVENT, () => resolve(), { once: true }));
  }
  if (root.dataset.transition === 'uncover') {
    return new Promise((resolve) => window.setTimeout(resolve, CURTAIN_REVEAL_DELAY));
  }
  return Promise.resolve();
}

function rememberInSession(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Stockage indisponible (navigation privée stricte) : l'animation se rejouera, sans conséquence
  }
}

function renderLoaderProgress(progress: number): void {
  const count = document.querySelector<HTMLElement>('[data-page-loader-count]');
  const fill = document.querySelector<HTMLElement>('[data-page-loader-fill]');
  const bar = document.querySelector<HTMLElement>('[data-page-loader-bar]');
  if (count) count.textContent = formatLoaderCount(progress);
  if (fill) fill.style.transform = `scaleX(${progress / 100})`;
  bar?.setAttribute('aria-valuenow', String(progress));
}

function finishLoader(): void {
  root.dataset.loader = 'leaving';
  rememberInSession(LOADER_SEEN_STORAGE_KEY, '1');
  document.dispatchEvent(new Event(PAGE_READY_EVENT));
  window.setTimeout(() => delete root.dataset.loader, LOADER_LEAVE_DURATION);
}

function runLoader(): void {
  let isPageLoaded = document.readyState === 'complete';
  if (!isPageLoaded) window.addEventListener('load', () => (isPageLoaded = true), { once: true });
  const startedAt = performance.now();

  const tick = (now: number): void => {
    const elapsed = now - startedAt;
    const progress = getLoaderProgress(elapsed, LOADER_MINIMUM_DURATION, isPageLoaded || elapsed >= LOADER_MAXIMUM_WAIT);
    renderLoaderProgress(progress);
    if (progress < 100) {
      requestAnimationFrame(tick);
      return;
    }
    finishLoader();
  };
  requestAnimationFrame(tick);
}

function coverThenNavigate(href: string, label: string): void {
  if (root.dataset.transition === 'cover') return;
  const title = document.querySelector<HTMLElement>('[data-page-curtain-title]');
  if (title) title.textContent = label;
  root.style.removeProperty('--curtain-label');
  root.dataset.transition = 'cover';
  rememberInSession(TRANSITION_STORAGE_KEY, label);
  window.setTimeout(() => window.location.assign(href), CURTAIN_COVER_DURATION);
}

function handleLinkClick(event: MouseEvent): void {
  if (event.defaultPrevented || root.dataset.loader) return;
  const link = event.target instanceof Element ? event.target.closest('a') : null;
  if (!link || !link.href) return;

  const intent = {
    href: link.href,
    currentHref: window.location.href,
    origin: window.location.origin,
    target: link.target,
    button: event.button,
    hasModifier: event.metaKey || event.ctrlKey || event.shiftKey || event.altKey,
    hasDownload: link.hasAttribute('download'),
    optedOut: link.dataset.transition === 'off'
  };
  if (!shouldAnimateNavigation(intent)) return;

  event.preventDefault();
  coverThenNavigate(link.href, getTransitionLabel(link.dataset.transitionLabel, link.textContent ?? ''));
}

function cleanUpUncover(): void {
  window.setTimeout(() => {
    delete root.dataset.transition;
    root.style.removeProperty('--curtain-label');
  }, CURTAIN_UNCOVER_DURATION);
}

// Retour arrière depuis le cache du navigateur : la page revient telle qu'on l'a quittée, rideau baissé
function resetRestoredPage(event: PageTransitionEvent): void {
  if (!event.persisted) return;
  delete root.dataset.transition;
  delete root.dataset.loader;
}

export function setupPageTransitions(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (root.dataset.loader === 'active') runLoader();
  if (root.dataset.transition === 'uncover') cleanUpUncover();
  window.addEventListener('pageshow', resetRestoredPage);
  // Mouvement réduit : navigation immédiate, sans rideau
  if (!prefersReducedMotion) document.addEventListener('click', handleLinkClick);
}
