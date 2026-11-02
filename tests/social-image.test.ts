import { describe, expect, it } from 'vitest';
import { getProjectSocialImagePath, SOCIAL_IMAGE_VERSION } from '@/lib/social-image';

describe('getProjectSocialImagePath', () => {
  it('construit le chemin de l’image du projet dans la langue demandée', () => {
    // Arrange
    const slug = 'yofeii-delices';

    // Act
    const imagePath = getProjectSocialImagePath(slug, 'de');

    // Assert
    expect(imagePath).toBe(`/og/projects/yofeii-delices-de.jpg?v=${SOCIAL_IMAGE_VERSION}`);
  });

  it('ajoute la version pour forcer la mise à jour du cache des réseaux sociaux', () => {
    // Arrange
    const versionPattern = /\?v=\d+$/;

    // Act
    const imagePath = getProjectSocialImagePath('fassbar', 'fr');

    // Assert
    expect(imagePath).toMatch(versionPattern);
  });
});
