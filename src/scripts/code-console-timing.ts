// Calendrier du bloc de code animé : chaque ligne de code se tape, puis la sortie de console.log apparaît

export type ConsoleLineKind = 'code' | 'output';

export type ConsoleLineTiming = {
  delay: number;
  duration: number;
  characters: number;
};

// Secondes par caractère : assez lent pour être lu, assez rapide pour ne pas faire attendre
export const CHARACTER_DURATION = 0.024;
export const OUTPUT_DURATION = 0.5;
// Pause entre deux lignes, comme quand on valide une instruction
export const LINE_PAUSE = 0.22;
export const START_DELAY = 0.2;

export function getConsoleTimeline(lines: ReadonlyArray<{ kind: ConsoleLineKind; characters: number }>): ConsoleLineTiming[] {
  let cursor = START_DELAY;
  return lines.map(({ kind, characters }) => {
    const duration = kind === 'output' ? OUTPUT_DURATION : characters * CHARACTER_DURATION;
    const timing = { delay: cursor, duration, characters };
    cursor += duration + LINE_PAUSE;
    return timing;
  });
}
