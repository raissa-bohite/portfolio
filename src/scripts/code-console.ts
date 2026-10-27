import { getConsoleTimeline, type ConsoleLineKind } from './code-console-timing';
import { prefersReducedMotion } from './motion';

// Sans JavaScript ou avec moins de mouvement demandé, le code reste affiché en entier : rien n'est caché d'avance
// Renvoie le moment (en secondes) où la dernière ligne finit de se taper : le titre s'affiche alors comme sa sortie
export function playCodeConsole(root: HTMLElement): number {
  if (prefersReducedMotion()) return 0;
  const lines = Array.from(root.querySelectorAll<HTMLElement>('[data-console-line]'));
  const timeline = getConsoleTimeline(
    lines.map((line) => ({
      kind: (line.dataset['consoleLine'] === 'output' ? 'output' : 'code') as ConsoleLineKind,
      characters: line.textContent?.length ?? 0
    }))
  );
  lines.forEach((line, index) => {
    const timing = timeline[index];
    if (!timing) return;
    // Variables posées par le CSSOM : autorisées par la CSP, contrairement à un attribut style dans le HTML
    line.style.setProperty('--console-delay', `${timing.delay}s`);
    line.style.setProperty('--console-duration', `${timing.duration}s`);
    line.style.setProperty('--console-characters', String(timing.characters));
  });
  root.classList.add('is-playing');
  const last = timeline.at(-1);
  return last ? last.delay + last.duration : 0;
}
