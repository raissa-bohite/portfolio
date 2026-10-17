// Barre de lecture : avance avec le défilement de l'article, sans écouteur coûteux (une mise à jour par image)
export function setupReadingProgress(article: HTMLElement, bar: HTMLElement): void {
  let scheduled = false;
  const update = (): void => {
    scheduled = false;
    const bounds = article.getBoundingClientRect();
    const travel = bounds.height - window.innerHeight;
    const ratio = travel > 0 ? Math.min(Math.max(-bounds.top / travel, 0), 1) : 1;
    bar.style.transform = `scaleX(${ratio})`;
  };
  const schedule = (): void => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  update();
}

// Sommaire : la section qui traverse le haut de l'écran devient l'entrée active
export function setupTableOfContents(root: ParentNode): void {
  const links = new Map<string, HTMLElement>();
  for (const link of root.querySelectorAll<HTMLElement>('[data-toc-link]')) {
    const id = link.dataset['tocLink'];
    if (id) links.set(id, link);
  }
  const sections = root.querySelectorAll<HTMLElement>('[data-toc-section]');
  if (links.size === 0 || sections.length === 0 || !('IntersectionObserver' in window)) return;

  const setActive = (activeId: string): void => {
    for (const [id, link] of links) {
      if (id === activeId) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  };
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );
  for (const section of sections) observer.observe(section);
  const firstId = sections[0]?.id;
  if (firstId) setActive(firstId);
}
