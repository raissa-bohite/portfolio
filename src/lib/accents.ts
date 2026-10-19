import type { ProjectSummary } from '@/lib/projects';

// Couleurs de marque des projets : fonds des vignettes de la galerie, des captures et des couvertures
export const accentBackgroundClasses: Record<ProjectSummary['accent'], string> = {
  mint: 'bg-[#0da479]',
  crimson: 'bg-[#c8323f]',
  forest: 'bg-[#2f5b45]',
  gold: 'bg-[#e0940f]',
  royal: 'bg-[#1e4fc4]'
};
