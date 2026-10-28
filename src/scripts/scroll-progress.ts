import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { countReachedSteps, toTrackFraction } from '@/lib/progress-steps';
import { whenPageReady } from './page-transition';

gsap.registerPlugin(ScrollTrigger);

type Axis = 'x' | 'y';

// Mesure la position de chaque étape sur le rail de fond (jamais transformé, donc mesurable sans biais)
function measureStepFractions(track: HTMLElement, steps: HTMLElement[], axis: Axis): number[] {
  const trackRect = track.getBoundingClientRect();
  const trackStart = axis === 'x' ? trackRect.left : trackRect.top;
  const trackLength = axis === 'x' ? trackRect.width : trackRect.height;
  return steps.map((step) => {
    const stepRect = step.getBoundingClientRect();
    const stepCenter = axis === 'x' ? stepRect.left + stepRect.width / 2 : stepRect.top + stepRect.height / 2;
    return toTrackFraction(stepCenter, trackStart, trackLength);
  });
}

function markReachedSteps(steps: HTMLElement[], reachedCount: number): void {
  steps.forEach((step, index) => {
    step.toggleAttribute('data-reached', index < reachedCount);
  });
}

// Le rail se remplit au rythme du défilement et chaque étape s'allume quand il l'atteint.
// Uniquement sur grand écran et sans préférence de mouvement réduit : ailleurs, le rail reste plein et les étapes allumées
function animateProgress(container: HTMLElement): () => void {
  const axis: Axis = container.dataset['progress'] === 'y' ? 'y' : 'x';
  const track = container.querySelector<HTMLElement>('[data-progress-track]');
  const fill = container.querySelector<HTMLElement>('[data-progress-fill]');
  const steps = Array.from(container.querySelectorAll<HTMLElement>('[data-progress-step]'));
  if (!track || !fill || steps.length === 0) return () => {};

  let stepFractions = measureStepFractions(track, steps, axis);
  container.setAttribute('data-progress-ready', '');
  // Découpe plutôt qu'étirement : le dégradé garde sa place et se dévoile, l'orange n'apparaît qu'en fin de rail
  const hiddenClip = axis === 'x' ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 100% 0%)';
  gsap.set(fill, { clipPath: hiddenClip });
  markReachedSteps(steps, countReachedSteps(0, stepFractions));

  const trigger = ScrollTrigger.create({
    trigger: container,
    start: axis === 'x' ? 'top 70%' : 'top 65%',
    end: axis === 'x' ? 'center 40%' : 'bottom 55%',
    scrub: 0.6,
    animation: gsap.to(fill, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }),
    onRefresh: () => {
      stepFractions = measureStepFractions(track, steps, axis);
    },
    onUpdate: (self) => markReachedSteps(steps, countReachedSteps(self.progress, stepFractions))
  });

  return () => {
    trigger.kill();
    container.removeAttribute('data-progress-ready');
    for (const step of steps) step.removeAttribute('data-reached');
  };
}

export function setupScrollProgress(container: HTMLElement): void {
  if (container.dataset['progressSetup'] === 'true') return;
  container.dataset['progressSetup'] = 'true';
  const minWidth = container.dataset['progressMinWidth'] ?? '1024px';
  const media = gsap.matchMedia();
  // Attendre la fin du chargement : les mesures prises sous le rideau d'entrée seraient fausses
  void whenPageReady().then(() => {
    media.add(`(min-width: ${minWidth}) and (prefers-reduced-motion: no-preference)`, () => animateProgress(container));
  });
}
