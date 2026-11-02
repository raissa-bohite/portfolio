import type { ProjectSummary } from '@/lib/projects';

// Couleurs de marque des projets : fonds des vignettes de la galerie, des captures et des couvertures
export const accentBackgroundClasses: Record<ProjectSummary['accent'], string> = {
  mint: 'bg-[#0da479]',
  crimson: 'bg-[#c8323f]',
  forest: 'bg-[#2f5b45]',
  gold: 'bg-[#e0940f]',
  royal: 'bg-[#1e4fc4]'
};

// Lueur douce derrière les appareils de la visite en direct : la couleur du projet, très diluée
export const accentGlowClasses: Record<ProjectSummary['accent'], string> = {
  mint: 'bg-[radial-gradient(closest-side,rgb(13_164_121/0.14),transparent)]',
  crimson: 'bg-[radial-gradient(closest-side,rgb(200_50_63/0.12),transparent)]',
  forest: 'bg-[radial-gradient(closest-side,rgb(47_91_69/0.14),transparent)]',
  gold: 'bg-[radial-gradient(closest-side,rgb(224_148_15/0.16),transparent)]',
  royal: 'bg-[radial-gradient(closest-side,rgb(30_79_196/0.14),transparent)]'
};
