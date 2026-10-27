// Sépare un titre en deux parties pour mettre la fin en couleur, sans toucher au texte des traductions
export type TitleParts = { lead: string; accent: string };

const ACCENT_WORD_COUNT = 2;

export function splitTitleAccent(title: string): TitleParts {
  const trimmed = title.trim();
  // Une virgule marque la coupure naturelle : « Trois domaines, un même soin »
  const commaIndex = trimmed.lastIndexOf(', ');
  if (commaIndex > 0) return { lead: trimmed.slice(0, commaIndex + 1), accent: trimmed.slice(commaIndex + 2) };
  const words = trimmed.split(/\s+/);
  if (words.length <= ACCENT_WORD_COUNT) return { lead: '', accent: trimmed };
  return { lead: words.slice(0, -ACCENT_WORD_COUNT).join(' '), accent: words.slice(-ACCENT_WORD_COUNT).join(' ') };
}
