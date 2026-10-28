// Calculs purs du rail de progression : où se trouve chaque étape sur le rail, et combien sont atteintes

// Position d'une étape le long du rail, entre 0 (début) et 1 (fin)
export function toTrackFraction(stepCenter: number, trackStart: number, trackLength: number): number {
  if (trackLength <= 0) return 0;
  return Math.min(1, Math.max(0, (stepCenter - trackStart) / trackLength));
}

// Une étape est atteinte dès que le remplissage du rail arrive à sa hauteur ;
// la tolérance évite qu'une étape posée pile en bout de rail ne s'allume jamais à cause d'un arrondi
export function countReachedSteps(progress: number, stepFractions: readonly number[], tolerance = 0.01): number {
  return stepFractions.filter((fraction) => fraction <= progress + tolerance).length;
}
