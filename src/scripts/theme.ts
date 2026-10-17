export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

export function readCurrentTheme(): Theme {
  return document.documentElement.dataset['theme'] === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset['theme'] = theme;
  // Le stockage peut être bloqué (navigation privée) : le thème reste appliqué pour la page en cours
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* préférence non mémorisée, sans conséquence */
  }
}
