// @ts-check
import { defineConfig } from 'astro/config';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Adresse provisoire : à remplacer par le domaine définitif avant la mise en ligne
const SITE_URL = 'https://raissa-bohite.pages.dev';

// Le script de thème doit s'exécuter avant l'affichage, donc en ligne : son empreinte est déclarée à la main
const themeInitScript = readFileSync(new URL('./src/scripts/theme-init.inline.js', import.meta.url), 'utf8');
const themeInitHash = `sha256-${createHash('sha256').update(themeInitScript).digest('base64')}`;
// Même principe pour le script qui choisit entre chargeur et rideau avant l'affichage
const pageInitScript = readFileSync(new URL('./src/scripts/page-init.inline.js', import.meta.url), 'utf8');
const pageInitHash = `sha256-${createHash('sha256').update(pageInitScript).digest('base64')}`;

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  build: {
    // Une seule petite feuille de style : l'intégrer évite une requête bloquante au premier affichage
    inlineStylesheets: 'always'
  },
  trailingSlash: 'ignore',
  // Les pages sont préchargées au survol : le rideau masque un chargement déjà presque terminé
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr', en: 'en', de: 'de' } }
    })
  ],
  i18n: {
    locales: ['fr', 'en', 'de'],
    defaultLocale: 'fr',
    // Le français reste à la racine, l'anglais et l'allemand sous /en et /de
    routing: { prefixDefaultLocale: false }
  },
  security: {
    // Astro calcule les empreintes des scripts et styles qu'il génère : aucune exécution inline non déclarée
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://challenges.cloudflare.com https://cloudflareinsights.com",
        "frame-src https://challenges.cloudflare.com",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'"
      ],
      scriptDirective: {
        // Cloudflare Web Analytics injecte son script de mesure, sans cookie
        resources: ["'self'", 'https://challenges.cloudflare.com', 'https://static.cloudflareinsights.com'],
        hashes: [/** @type {`sha256-${string}`} */ (themeInitHash), /** @type {`sha256-${string}`} */ (pageInitHash)]
      }
    }
  },
  markdown: {
    // Shiki injecte des styles en ligne incompatibles avec la CSP
    syntaxHighlight: false
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
