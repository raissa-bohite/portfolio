import { gsap } from 'gsap';
import { getTabIndexForKey, wrapIndex } from './cycle';
import { prefersReducedMotion } from './motion';

const AUTOPLAY_SECONDS = 6;

// Vitrine produit : onglets accessibles au clavier, transition entre appareils, défilement avec pause (WCAG 2.2.2)
export function setupShowcase(root: HTMLElement): void {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[role="tabpanel"]'));
  const pauseButton = root.querySelector<HTMLButtonElement>('[data-action="pause"]');
  const reduceMotion = prefersReducedMotion();
  const total = tabs.length;
  let activeIndex = 0;
  let paused = reduceMotion;
  let progressTween: gsap.core.Tween | undefined;

  function animateIn(panel: HTMLElement, direction: number): void {
    if (reduceMotion) return;
    const stage = panel.querySelector('[data-stage]');
    const phone = panel.querySelector('[data-phone]');
    const caption = panel.querySelector('[data-caption]');
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (stage) timeline.from(stage, { opacity: 0, x: 40 * direction, duration: 0.6 });
    if (phone) timeline.from(phone, { opacity: 0, y: 30, duration: 0.5 }, '-=0.35');
    if (caption) timeline.from(caption, { opacity: 0, y: 12, duration: 0.4 }, '-=0.4');
  }

  function startProgress(): void {
    progressTween?.kill();
    for (const bar of root.querySelectorAll<HTMLElement>('[data-tab-progress]')) gsap.set(bar, { scaleX: 0 });
    if (paused) return;
    const bar = tabs[activeIndex]?.querySelector<HTMLElement>('[data-tab-progress]');
    if (!bar) return;
    // La barre sous l'onglet actif montre le temps restant avant le projet suivant
    progressTween = gsap.to(bar, {
      scaleX: 1,
      duration: AUTOPLAY_SECONDS,
      ease: 'none',
      onComplete: () => select(activeIndex + 1, false)
    });
  }

  function select(index: number, moveFocus: boolean): void {
    const nextIndex = wrapIndex(index, total);
    const direction = nextIndex >= activeIndex ? 1 : -1;
    activeIndex = nextIndex;
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === activeIndex;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel, panelIndex) => {
      panel.hidden = panelIndex !== activeIndex;
    });
    const panel = panels[activeIndex];
    if (panel) animateIn(panel, direction);
    if (moveFocus) tabs[activeIndex]?.focus();
    startProgress();
  }

  function setPaused(nextPaused: boolean): void {
    paused = nextPaused;
    if (pauseButton) {
      pauseButton.dataset['paused'] = String(paused);
      pauseButton.setAttribute('aria-label', (paused ? root.dataset['labelPlay'] : root.dataset['labelPause']) ?? '');
    }
    if (paused) progressTween?.pause();
    else if (progressTween && progressTween.progress() < 1) progressTween.resume();
    else startProgress();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index, false));
    tab.addEventListener('keydown', (event) => {
      const target = getTabIndexForKey(event.key, activeIndex, total);
      if (target === undefined) return;
      event.preventDefault();
      select(target, true);
    });
  });
  pauseButton?.addEventListener('click', () => setPaused(!paused));

  // Survol ou focus : le défilement s'arrête pour laisser le temps de regarder
  const hold = (): void => {
    progressTween?.pause();
  };
  const release = (): void => {
    if (!paused) progressTween?.resume();
  };
  root.addEventListener('pointerenter', hold);
  root.addEventListener('pointerleave', release);
  root.addEventListener('focusin', hold);
  root.addEventListener('focusout', (event) => {
    if (!root.contains(event.relatedTarget as Node | null)) release();
  });

  root.dataset['ready'] = 'true';
  setPaused(paused);
}
