# Portfolio — Raïssa Bohité

Site statique Astro en trois langues (français, anglais, allemand), déployé sur Cloudflare Pages.

## Démarrer

```bash
npm install
npm run dev        # serveur de développement : http://localhost:4321
npm run test       # tests unitaires Vitest
npm run build      # vérification des types puis génération dans dist/
npm run preview    # prévisualisation du site généré
```

Node.js 22.22 ou plus récent est requis.

## Structure

```
src/
  components/
    atoms/          Bouton, étiquette, titre, bouton icône
    molecules/      Titre de section, sélecteur de langue, bascule de thème, champ de formulaire
    organisms/      En-tête, carrousel, bande des technologies, sections de l'accueil, formulaire
    templates/      BaseLayout : SEO, hreflang, données structurées, thème
    pages/          Composition des pages, partagée par les trois langues
  content/projects/ Une fiche JSON par projet, textes traduits, validée par Zod
  i18n/             Langues, adresses traduites, dictionnaires fr / en / de
  lib/              Projets, profil public, schéma et traitement du formulaire de contact
  scripts/          Comportements côté navigateur (carrousel, histogramme, thème, formulaire)
  pages/            Routes : / (fr), /en, /de
functions/api/      Fonction Cloudflare Pages qui reçoit le formulaire de contact
public/             _headers (sécurité), robots.txt, favicon, image de partage
tests/              Tests Vitest (motif Arrange-Act-Assert)
```

## Langues et adresses

Le français est à la racine, l'anglais sous `/en`, l'allemand sous `/de`. Les adresses sont traduites
(`/a-propos`, `/en/about`, `/de/ueber-mich`) et déclarées dans `src/i18n/routes.ts`.
Aucun texte n'est écrit en dur dans les composants : tout passe par `src/i18n/dictionaries`.
Un test vérifie que l'anglais et l'allemand couvrent exactement les clés du français.

## Sécurité

- CSP générée par Astro dans chaque page (empreintes des scripts et styles), complétée par `public/_headers`
  (HSTS, X-Frame-Options, frame-ancestors, Permissions-Policy).
- Formulaire de contact : validation Zod côté serveur, vérification de l'origine, champ piège,
  Cloudflare Turnstile, email envoyé en texte brut via Resend. Aucun secret dans le code.

## Variables d'environnement (Cloudflare Pages → Settings → Variables)

| Nom | Rôle |
| --- | --- |
| `RESEND_API_KEY` | Clé API Resend (secret) |
| `TURNSTILE_SECRET_KEY` | Clé secrète Turnstile (secret) |
| `CONTACT_TO_EMAIL` | Adresse qui reçoit les messages |
| `CONTACT_FROM_EMAIL` | Expéditeur vérifié chez Resend |
| `PUBLIC_TURNSTILE_SITE_KEY` | Clé publique Turnstile, lue au moment du build |

En local, copier `.env.example` en `.dev.vars` (fonctions) et `.env` (build).

## Déploiement

Cloudflare Pages, commande de build `npm run build`, dossier de sortie `dist`.
Remplacer `SITE_URL` dans `astro.config.mjs` et l'adresse de `public/robots.txt` par le domaine définitif.

## Licence

Le code est publié sous licence MIT (voir `LICENSE`). Les textes, photos, design et captures de projets
(`src/assets`, `src/content`) restent © Raïssa Bohité ou ses clients : tous droits réservés.
