import { prefersReducedMotion } from './motion';

// Part de la frise déjà parcourue, entre 0 et 1, à partir de sa position dans la fenêtre
export function getTimelineProgress(top: number, height: number, viewportHeight: number): number {
  if (height <= 0) return 1;
  const start = viewportHeight * 0.75;
  return Math.min(1, Math.max(0, (start - top) / height));
}

// Nombre d'étapes atteintes pour une progression donnée ; la marge évite qu'une étape s'allume trop tard
export function getReachedSteps(progress: number, stepCount: number): number {
  return Math.min(stepCount, Math.floor(progress * stepCount + 0.15));
}

export function setupTimelineProgress(timeline: HTMLElement, fill: HTMLElement, codeLines: HTMLElement[]): void {
  const lightLines = (reached: number): void => {
    codeLines.forEach((line, index) => {
      line.dataset['lit'] = String(index < reached);
    });
  };
  if (prefersReducedMotion()) {
    fill.style.transform = 'scaleY(1)';
    lightLines(codeLines.length);
    return;
  }
  let scheduled = false;
  const update = (): void => {
    scheduled = false;
    const bounds = timeline.getBoundingClientRect();
    const progress = getTimelineProgress(bounds.top, bounds.height, window.innerHeight);
    fill.style.transform = `scaleY(${progress})`;
    lightLines(getReachedSteps(progress, codeLines.length));
  };
  const schedule = (): void => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  update();
}
