import { prefersReducedMotion } from './motion';

const FIRST_DELAY_MS = 400;
const STEP_DELAY_MS = 500;
const FLASH_DURATION_MS = 600;

// Les étapes futures s'allument brièvement l'une après l'autre : seule l'étape actuelle reste en orange
export function setupRoadmap(roadmap: HTMLElement): void {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
  const futureSteps = Array.from(roadmap.querySelectorAll<HTMLElement>('[data-roadmap-step]')).filter(
    (step) => step.dataset['reached'] !== 'true'
  );
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting) return;
      observer.disconnect();
      futureSteps.forEach((step, index) => {
        window.setTimeout(() => {
          step.dataset['reached'] = 'true';
          window.setTimeout(() => {
            step.dataset['reached'] = 'false';
          }, FLASH_DURATION_MS);
        }, FIRST_DELAY_MS + index * STEP_DELAY_MS);
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(roadmap);
}
