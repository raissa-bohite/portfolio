import LayoutDashboard from '@lucide/astro/icons/layout-dashboard';
import Scissors from '@lucide/astro/icons/scissors';
import ShoppingBag from '@lucide/astro/icons/shopping-bag';
import Sparkles from '@lucide/astro/icons/sparkles';
import Store from '@lucide/astro/icons/store';
import FolderCode from '@lucide/astro/icons/folder-code';

// Pictogramme associé à chaque projet sur les cartes ; un projet ajouté plus tard prend l'icône par défaut
const projectIcons: Record<string, typeof Sparkles> = {
  fassbar: Sparkles,
  'yofeii-delices': ShoppingBag,
  'erp-scolaire': LayoutDashboard,
  ateliya: Scissors,
  'moomen-pro': Store
};

export function getProjectIcon(slug: string): typeof Sparkles {
  return projectIcons[slug] ?? FolderCode;
}
