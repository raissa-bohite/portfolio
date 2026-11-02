// Preuves concrètes de chaque domaine : un projet publié, une certification ou une fonctionnalité de ce site
export type DomainProofSource = { kind: 'project'; slug: string } | { kind: 'certification' } | { kind: 'contactForm' };

export type DomainProof = {
  label: string;
  // Absent pour une preuve qui n'a pas de page dédiée
  href?: string;
  // Lien vers un autre site (badges vérifiables) : ouvert avec une flèche en diagonale
  external?: boolean;
  // Mise en avant orange pour distinguer un diplôme d'un lien vers du travail réalisé
  highlighted: boolean;
};

type ProjectLink = { slug: string; name: string; href: string };
type ProofLabels = { certification: string; contactForm: string };
// Adresses des preuves : le formulaire de contact, et la page publique des badges de certification si elle existe
type ProofHrefs = { contact: string; certification?: string };

export const domainProofSources: Record<string, readonly DomainProofSource[]> = {
  dashboard: [
    { kind: 'project', slug: 'yofeii-delices' },
    { kind: 'project', slug: 'erp-scolaire' }
  ],
  security: [{ kind: 'certification' }, { kind: 'contactForm' }],
  ai: [{ kind: 'project', slug: 'fassbar' }]
};

function resolveProof(source: DomainProofSource, projects: readonly ProjectLink[], labels: ProofLabels, hrefs: ProofHrefs): DomainProof | undefined {
  if (source.kind === 'certification') {
    return hrefs.certification
      ? { label: labels.certification, href: hrefs.certification, external: true, highlighted: true }
      : { label: labels.certification, highlighted: true };
  }
  if (source.kind === 'contactForm') return { label: labels.contactForm, href: hrefs.contact, highlighted: false };
  const project = projects.find((candidate) => candidate.slug === source.slug);
  return project ? { label: project.name, href: project.href, highlighted: false } : undefined;
}

// Un projet retiré du site disparaît simplement de la liste au lieu de produire un lien cassé
export function resolveDomainProofs(domainKey: string, projects: readonly ProjectLink[], labels: ProofLabels, hrefs: ProofHrefs): DomainProof[] {
  const sources = domainProofSources[domainKey] ?? [];
  return sources.map((source) => resolveProof(source, projects, labels, hrefs)).filter((proof): proof is DomainProof => proof !== undefined);
}
