// Preuves concrètes de chaque domaine : un projet publié, une certification ou une fonctionnalité de ce site
export type DomainProofSource = { kind: 'project'; slug: string } | { kind: 'certification' } | { kind: 'contactForm' };

export type DomainProof = {
  label: string;
  // Absent pour une preuve qui n'a pas de page dédiée (la certification)
  href?: string;
  // Mise en avant orange pour distinguer un diplôme d'un lien vers du travail réalisé
  highlighted: boolean;
};

type ProjectLink = { slug: string; name: string; href: string };
type ProofLabels = { certification: string; contactForm: string };

export const domainProofSources: Record<string, readonly DomainProofSource[]> = {
  dashboard: [
    { kind: 'project', slug: 'yofeii-delices' },
    { kind: 'project', slug: 'erp-scolaire' }
  ],
  security: [{ kind: 'certification' }, { kind: 'contactForm' }],
  ai: [{ kind: 'project', slug: 'fassbar' }]
};

function resolveProof(source: DomainProofSource, projects: readonly ProjectLink[], labels: ProofLabels, contactHref: string): DomainProof | undefined {
  if (source.kind === 'certification') return { label: labels.certification, highlighted: true };
  if (source.kind === 'contactForm') return { label: labels.contactForm, href: contactHref, highlighted: false };
  const project = projects.find((candidate) => candidate.slug === source.slug);
  return project ? { label: project.name, href: project.href, highlighted: false } : undefined;
}

// Un projet retiré du site disparaît simplement de la liste au lieu de produire un lien cassé
export function resolveDomainProofs(domainKey: string, projects: readonly ProjectLink[], labels: ProofLabels, contactHref: string): DomainProof[] {
  const sources = domainProofSources[domainKey] ?? [];
  return sources.map((source) => resolveProof(source, projects, labels, contactHref)).filter((proof): proof is DomainProof => proof !== undefined);
}
