import { describe, expect, it } from 'vitest';
import { resolveDomainProofs } from '@/lib/domain-proofs';

const projects = [
  { slug: 'yofeii-delices', name: 'Yofeii Délices', href: '/projets/yofeii-delices' },
  { slug: 'erp-scolaire', name: 'ERP scolaire', href: '/projets/erp-scolaire' },
  { slug: 'fassbar', name: 'Fassbar', href: '/projets/fassbar' }
];
const labels = { certification: 'Certification Cisco', contactForm: 'Le formulaire de contact de ce site' };

describe('resolveDomainProofs', () => {
  it('relie chaque projet cité à sa page', () => {
    // Arrange
    const domainKey = 'dashboard';

    // Act
    const proofs = resolveDomainProofs(domainKey, projects, labels, '#contact');

    // Assert
    expect(proofs).toEqual([
      { label: 'Yofeii Délices', href: '/projets/yofeii-delices', highlighted: false },
      { label: 'ERP scolaire', href: '/projets/erp-scolaire', highlighted: false }
    ]);
  });

  it('affiche la certification sans lien et mise en avant', () => {
    // Arrange
    const domainKey = 'security';

    // Act
    const proofs = resolveDomainProofs(domainKey, projects, labels, '#contact');

    // Assert
    expect(proofs[0]).toEqual({ label: 'Certification Cisco', highlighted: true });
    expect(proofs[1]).toEqual({ label: 'Le formulaire de contact de ce site', href: '#contact', highlighted: false });
  });

  it('ignore un projet absent du site', () => {
    // Arrange
    const projectsWithoutFassbar = projects.filter((project) => project.slug !== 'fassbar');

    // Act
    const proofs = resolveDomainProofs('ai', projectsWithoutFassbar, labels, '#contact');

    // Assert
    expect(proofs).toEqual([]);
  });

  it('renvoie une liste vide pour un domaine inconnu', () => {
    // Arrange
    const domainKey = 'unknown';

    // Act
    const proofs = resolveDomainProofs(domainKey, projects, labels, '#contact');

    // Assert
    expect(proofs).toEqual([]);
  });
});
