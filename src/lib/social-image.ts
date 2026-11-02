import type { Locale } from '@/i18n/config';

// À incrémenter quand les images sont régénérées (scripts/generate-social-images.cjs) :
// LinkedIn, Facebook et WhatsApp gardent l'aperçu en cache par adresse
export const SOCIAL_IMAGE_VERSION = 1;

export const defaultSocialImagePath = '/og-image-v2.jpg';

export function getProjectSocialImagePath(slug: string, locale: Locale): string {
  return `/og/projects/${slug}-${locale}.jpg?v=${SOCIAL_IMAGE_VERSION}`;
}
