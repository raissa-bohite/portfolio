// Règles pures du chargement et des transitions de page : isolées du DOM pour être testées

export type NavigationIntent = {
  href: string;
  currentHref: string;
  origin: string;
  target: string;
  button: number;
  hasModifier: boolean;
  hasDownload: boolean;
  optedOut: boolean;
};

const FILE_EXTENSION = /\.[a-z0-9]+$/i;
const HTML_EXTENSION = /\.html?$/i;
const MAX_LABEL_LENGTH = 28;
// Tant que la page n'a pas fini de charger, le compteur s'arrête ici pour ne jamais mentir
const PROGRESS_CAP_WHILE_LOADING = 90;

// Seule une navigation interne ordinaire, vers une autre page, déclenche le rideau
export function shouldAnimateNavigation(intent: NavigationIntent): boolean {
  if (intent.button !== 0 || intent.hasModifier || intent.hasDownload || intent.optedOut) return false;
  if (intent.target !== '' && intent.target !== '_self') return false;

  const destination = new URL(intent.href, intent.currentHref);
  if (destination.origin !== intent.origin) return false;
  // Un fichier (CV en PDF, image) s'ouvre sans rideau
  if (FILE_EXTENSION.test(destination.pathname) && !HTML_EXTENSION.test(destination.pathname)) return false;

  const current = new URL(intent.currentHref);
  const isSamePage = destination.pathname === current.pathname && destination.search === current.search;
  return !isSamePage;
}

// Le titre du rideau reprend le texte du lien, sauf s'il est trop long pour un affichage en très grand
export function getTransitionLabel(explicitLabel: string | undefined, linkText: string): string {
  const label = (explicitLabel ?? linkText).replace(/\s+/g, ' ').trim();
  return label.length <= MAX_LABEL_LENGTH ? label : '';
}

// Progression du compteur : ralentit à la fin et ne dépasse 90 % qu'une fois la page réellement chargée
export function getLoaderProgress(elapsed: number, minimumDuration: number, isPageLoaded: boolean): number {
  const ratio = Math.min(1, Math.max(0, elapsed / minimumDuration));
  const eased = 1 - Math.pow(1 - ratio, 3);
  const progress = Math.round(eased * 100);
  return isPageLoaded ? progress : Math.min(progress, PROGRESS_CAP_WHILE_LOADING);
}

export function formatLoaderCount(progress: number): string {
  return String(progress).padStart(3, '0');
}
