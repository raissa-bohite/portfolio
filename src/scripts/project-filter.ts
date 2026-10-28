import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { formatMessage } from '@/i18n/translate';
import { countVisible, isVisibleForFilter } from '@/lib/project-filter';

// Boutons à bascule (aria-pressed) : un seul actif, les projets des autres catégories sont masqués,
// et le nombre de projets affichés est annoncé aux lecteurs d'écran
export function setupProjectFilter(root: HTMLElement): void {
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-filter-value]'));
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-filter-item]'));
  const status = root.querySelector<HTMLElement>('[data-filter-status]');
  const template = status?.dataset['template'] ?? '';
  const categories = items.map((item) => item.dataset['category'] ?? '');

  const applyFilter = (activeFilter: string): void => {
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset['filterValue'] === activeFilter));
    items.forEach((item, index) => {
      item.hidden = !isVisibleForFilter(categories[index] ?? '', activeFilter);
    });
    if (status) status.textContent = formatMessage(template, { count: countVisible(categories, activeFilter) });
    // La hauteur de la page change : les animations liées au défilement recalculent leurs positions
    ScrollTrigger.refresh();
  };

  for (const button of buttons) {
    button.addEventListener('click', () => applyFilter(button.dataset['filterValue'] ?? ''));
  }
}
