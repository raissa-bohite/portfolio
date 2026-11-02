import { gsap } from 'gsap';
import { getNavPoint, getNextPageIndex, getScrollDuration, getScrollSpeed, getTourProgress } from '@/lib/site-tour';
import { prefersReducedMotion } from './motion';

// Temps de la visite, en secondes
const FADE_DURATION = 0.6;
const TOP_PAUSE = 2;
const BOTTOM_PAUSE = 1.5;
const SCROLL_BACK_DURATION = 2.5;
const CURSOR_MOVE_DURATION = 1.4;
// Position de repos du curseur, en fraction de l'écran, avant qu'il parte vers le menu
const CURSOR_REST = { x: 0.62, y: 0.72 };

type TourElements = {
  pages: HTMLElement[];
  tabs: HTMLButtonElement[];
  screen: HTMLElement;
  cursor: HTMLElement;
  ripple: HTMLElement;
  progress: HTMLElement | null;
  toggle: HTMLButtonElement | null;
};

function findElements(root: HTMLElement): TourElements | null {
  const pages = Array.from(root.querySelectorAll<HTMLElement>('[data-tour-page]'));
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tour-tab]'));
  const screen = root.querySelector<HTMLElement>('[data-tour-screen]');
  const cursor = root.querySelector<HTMLElement>('[data-tour-cursor]');
  const ripple = root.querySelector<HTMLElement>('[data-tour-ripple]');
  if (pages.length < 2 || !screen || !cursor || !ripple) return null;
  return {
    pages,
    tabs,
    screen,
    cursor,
    ripple,
    progress: root.querySelector<HTMLElement>('[data-tour-progress]'),
    toggle: root.querySelector<HTMLButtonElement>('[data-tour-toggle]')
  };
}

// Attend que la capture de la page soit chargée : sa hauteur fixe la distance à faire défiler
function whenImageReady(page: HTMLElement): Promise<void> {
  const image = page.querySelector('img');
  if (!image || image.complete) return Promise.resolve();
  image.loading = 'eager';
  return new Promise((resolve) => {
    image.addEventListener('load', () => resolve(), { once: true });
    image.addEventListener('error', () => resolve(), { once: true });
  });
}

function preload(page: HTMLElement | undefined): void {
  const image = page?.querySelector('img');
  if (image) image.loading = 'eager';
}

export function setupSiteTour(root: HTMLElement): void {
  const elements = findElements(root);
  if (!elements) return;
  const { pages, tabs, screen, cursor, ripple, progress, toggle } = elements;
  let currentIndex = 0;

  const showPage = (index: number, animate: boolean): void => {
    pages.forEach((page, pageIndex) => {
      const isTarget = pageIndex === index;
      if (isTarget) page.scrollTop = 0;
      gsap.to(page, { autoAlpha: isTarget ? 1 : 0, duration: animate ? FADE_DURATION : 0, overwrite: true });
    });
    tabs.forEach((tab, tabIndex) => tab.setAttribute('aria-pressed', String(tabIndex === index)));
    currentIndex = index;
  };

  // Sans animation : les onglets changent de page, le visiteur fait défiler l'écran lui-même
  if (prefersReducedMotion()) {
    tabs.forEach((tab, index) => tab.addEventListener('click', () => showPage(index, false)));
    return;
  }

  let timeline: gsap.core.Timeline | null = null;
  let isStopped = false;
  let runToken = 0;
  const temporaryPauses = new Set<string>();

  const setProgress = (value: number): void => {
    if (progress) gsap.set(progress, { scaleY: value });
  };

  const sync = (): void => {
    if (!timeline) return;
    if (isStopped || temporaryPauses.size > 0) timeline.pause();
    else timeline.play();
  };

  // Chronologie d'une page : pause en haut, défilement jusqu'en bas, retour en haut, puis clic dans le menu
  const buildPageTimeline = (index: number): gsap.core.Timeline => {
    const page = pages[index] as HTMLElement;
    const nextIndex = getNextPageIndex(index, pages.length);
    const nextPage = pages[nextIndex] as HTMLElement;
    const screenWidth = screen.clientWidth;
    const distance = Math.max(page.scrollHeight - page.clientHeight, 0);
    const speed = getScrollSpeed(Number(page.dataset['imageWidth']), Number(page.dataset['imageHeight']), screenWidth);
    const target = getNavPoint(Number(nextPage.dataset['navX']), Number(nextPage.dataset['navY']), screenWidth);
    const rest = { x: screen.clientWidth * CURSOR_REST.x, y: screen.clientHeight * CURSOR_REST.y };
    const scroll = { top: 0 };
    const applyScroll = (): void => {
      page.scrollTop = scroll.top;
    };

    const pageTimeline = gsap.timeline({
      paused: true,
      onUpdate: () => setProgress(getTourProgress(index, pageTimeline.progress(), pages.length))
    });
    pageTimeline
      .to(scroll, { top: distance, duration: getScrollDuration(distance, speed), ease: 'none', delay: TOP_PAUSE, onUpdate: applyScroll })
      .to(scroll, { top: 0, duration: SCROLL_BACK_DURATION, ease: 'power2.inOut', delay: BOTTOM_PAUSE, onUpdate: applyScroll })
      .set(cursor, { x: rest.x, y: rest.y, scale: 1 })
      .to(cursor, { autoAlpha: 1, duration: 0.3 })
      .to(cursor, { x: target.x - 4, y: target.y - 4, duration: CURSOR_MOVE_DURATION, ease: 'power2.inOut' })
      .to(cursor, { scale: 0.85, duration: 0.12, yoyo: true, repeat: 1, transformOrigin: '4px 4px' })
      .fromTo(ripple, { x: target.x, y: target.y, scale: 0, autoAlpha: 0.55 }, { scale: 1, autoAlpha: 0, duration: 0.7 }, '<')
      .to(cursor, { autoAlpha: 0, duration: 0.3 });
    return pageTimeline;
  };

  const run = async (index: number, animate: boolean): Promise<void> => {
    const token = ++runToken;
    timeline?.kill();
    timeline = null;
    gsap.set(cursor, { autoAlpha: 0 });
    showPage(index, animate);
    preload(pages[getNextPageIndex(index, pages.length)]);
    await whenImageReady(pages[index] as HTMLElement);
    // Une autre page a été demandée pendant le chargement : cette visite est abandonnée
    if (token !== runToken) return;
    timeline = buildPageTimeline(index);
    timeline.eventCallback('onComplete', () => void run(getNextPageIndex(index, pages.length), true));
    sync();
  };

  const setStopped = (stopped: boolean): void => {
    isStopped = stopped;
    if (toggle) {
      toggle.dataset['state'] = stopped ? 'paused' : 'playing';
      toggle.setAttribute('aria-label', (stopped ? toggle.dataset['labelPlay'] : toggle.dataset['labelPause']) ?? '');
    }
    if (stopped) gsap.set(cursor, { autoAlpha: 0 });
    sync();
  };

  const holdWhile = (reason: string, active: boolean): void => {
    if (active) temporaryPauses.add(reason);
    else temporaryPauses.delete(reason);
    sync();
  };

  if (toggle) {
    toggle.hidden = false;
    toggle.dataset['state'] = 'playing';
    toggle.addEventListener('click', () => {
      const willStop = !isStopped;
      setStopped(willStop);
      // Reprise : la page en cours repart de son haut, le visiteur a pu la faire défiler à la main entre-temps
      if (!willStop) void run(currentIndex, false);
    });
  }

  tabs.forEach((tab, index) => tab.addEventListener('click', () => void run(index, true)));

  // Le visiteur prend la main sur l'écran (molette, doigt, clavier) : la visite s'arrête, il fait défiler lui-même
  for (const page of pages) {
    page.addEventListener('wheel', () => setStopped(true), { passive: true });
    page.addEventListener('pointerdown', () => setStopped(true), { passive: true });
    page.addEventListener('keydown', () => setStopped(true));
  }

  document.addEventListener('visibilitychange', () => holdWhile('hidden', document.hidden));

  // La visite ne commence qu'une fois l'ordinateur à l'écran, et s'interrompt quand il en sort
  let hasStarted = false;
  const start = (): void => {
    if (hasStarted) return;
    hasStarted = true;
    void run(0, false);
  };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entry]) => {
        const isVisible = Boolean(entry?.isIntersecting);
        if (isVisible) start();
        holdWhile('offscreen', !isVisible);
      },
      { threshold: 0.4 }
    ).observe(screen);
  } else {
    start();
  }

  // Changement de taille : distances et positions du menu changent, la page en cours repart de son haut
  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (hasStarted) void run(currentIndex, false);
    }, 250);
  });
}
