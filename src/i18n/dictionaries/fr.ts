// Le français est la langue de référence : sa forme définit la structure que l'anglais et l'allemand doivent respecter
type Widen<Value> = Value extends string
  ? string
  : Value extends readonly (infer Item)[]
    ? readonly Widen<Item>[]
    : { readonly [Key in keyof Value]: Widen<Value[Key]> };

const dictionary = {
  meta: {
    homeTitle: "Raïssa Bohité · Développeuse front-end, orientée full-stack",
    homeDescription:
      "Interfaces et tableaux de bord clairs, accessibles et sécurisés. Projets : Fassbar, Yofeii Délices, Ateliya, Moomen Pro.",
    portraitAlt: "Portrait de Raïssa Bohité",
    socialImageAlt: "Logo RB de Raïssa Bohité et sa devise : comprendre avant de construire",
  },
  nav: {
    label: "Navigation principale",
    home: "Accueil",
    projects: "Projets",
    about: "À propos",
    contact: "Contact",
    cta: "Discutons",
    language: "Changer de langue",
    currentLanguage: "langue actuelle : {language}",
    themeDark: "Activer le mode sombre",
    themeLight: "Activer le mode clair",
    skip: "Aller au contenu",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
  },
  common: {
    cv: "Télécharger le CV",
    caseStudy: "Lire l'étude de cas",
    allProjects: "Tous les projets",
    viewProject: "Voir le projet",
  },
  loader: {
    label: "Chargement du portfolio",
    progress: "Progression du chargement",
    kicker: "Portfolio",
    tagline: "Développeuse front-end, orientée full-stack",
  },
  notFound: {
    seoTitle: "Page introuvable · Raïssa Bohité",
    seoDescription: "Cette page n'existe pas ou a été déplacée.",
    title: "Cette page est introuvable",
    text: "Le lien est peut-être ancien, ou l'adresse contient une faute de frappe.",
    cta: "Revenir à l'accueil",
  },
  home: {
    availability: "Disponible pour un poste ou une mission",
    signature: "comprendre().then(construire);",
    titleWords: ["Comprendre", "avant", "de", "construire."],
    intro:
      "Développeuse front-end, orientée full-stack, je conçois des interfaces et des tableaux de bord clairs, accessibles et sécurisés, et je construis le back-end quand le projet le demande.",
    ctaProjects: "Voir les projets",
    heroBadges: ["Développeuse front-end", "Tableaux de bord", "Sécurité web"],
    stack: {
      label: "Technologies utilisées",
    },
    projects: {
      eyebrow: "Projets",
      title: "Cinq produits en ligne",
    },
    domains: {
      eyebrow: "Ce que je fais",
      title: "Trois domaines, un même soin",
      items: [
        {
          icon: "dashboard",
          title: "Interfaces et tableaux de bord",
          text: "Des écrans lisibles qui rendent les données utiles, du site vitrine au back-office.",
          skills: ["React", "Next.js", "Astro", "SvelteKit", "Tailwind CSS"]
        },
        {
          icon: "security",
          title: "Sécurité web",
          text: "Les bonnes pratiques OWASP appliquées dès la conception, pas ajoutées à la fin.",
          skills: ["OWASP", "CSP", "Validation Zod", "Certification Cisco"]
        },
        {
          icon: "ai",
          title: "IA et développement agentique",
          text: "J'intègre les API d'IA dans mes produits et je développe avec des agents de code. Je sais où ils aident, où ils échouent, et je vérifie ce qu'ils produisent.",
          skills: ["Claude API", "Agents de code"]
        },
      ],
    },
    method: {
      eyebrow: "Ma démarche",
      title: "Chaque projet suit le même ordre",
      listLabel: "Les quatre étapes de ma démarche, dans l'ordre",
      step: "Étape {n} sur 4",
      deliverableLabel: "Livrable",
      steps: [
        { code: "comprendre()", text: "Le besoin, les utilisateurs et les contraintes, avant la première ligne de code.", deliverable: "Cahier des charges" },
        { code: "concevoir()", text: "Les parcours et les écrans, validés avant le développement.", deliverable: "Maquettes validées" },
        { code: "construire()", text: "Un code typé, testé et structuré, facile à faire évoluer.", deliverable: "Code typé et testé" },
        { code: "vérifier()", text: "Accessibilité, performance et sécurité contrôlées avant la mise en ligne.", deliverable: "Rapport d'audit" }
      ],
    },
    about: {
      eyebrow: "Parcours",
      title: "De la linguistique au code",
      text: "Mes études d'allemand m'ont appris à décortiquer une langue avant de la parler. J'applique la même méthode à chaque interface.",
      link: "Lire mon parcours",
      timeline: [
        {
          period: "2020 – 2023",
          text: "Licence d'allemand, Université Alassane Ouattara de Bouaké",
          current: false,
        },
        {
          period: "2023 – 2025",
          text: "Full-stack chez DigiFemmes, cybersécurité chez WeCode",
          current: false,
        },
        {
          period: "Aujourd'hui",
          text: "Développeuse front-end chez Freewan, créatrice de Fassbar",
          current: true,
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Un poste, une mission, une question ?",
      text: "Vous pouvez m’écrire en français, en allemand ou en anglais.",
    },
  },
  contactForm: {
    label: "Formulaire de contact",
    name: "Votre nom",
    nameError: "Indiquez votre nom pour que je sache à qui je réponds.",
    email: "Votre email",
    emailPlaceholder: "nom@domaine.com",
    emailError: "Saisissez une adresse complète, par exemple nom@domaine.com.",
    typeLegend: "Votre demande concerne",
    typeHints: {
      job: "CDI, CDD ou alternance",
      project: "Projet en freelance",
      other: "Question, collaboration",
    },
    type: "Votre demande",
    types: {
      job: "Une offre d'emploi",
      project: "Une mission freelance",
      other: "Autre chose",
    },
    message: "Votre message",
    messageHelp:
      "Le contexte, ce que vous attendez, et une échéance si vous en avez une.",
    messageError: "Écrivez au moins 20 caractères pour décrire votre besoin.",
    privacy:
      "Vos informations servent uniquement à vous répondre. Elles ne sont ni partagées ni réutilisées.",
    submit: "Envoyer le message",
    sending: "Envoi en cours…",
    successTitle: "Message envoyé",
    successText:
      "Merci {name}. Je vous réponds à l’adresse {email} dès que possible.",
    again: "Envoyer un autre message",
    failure:
      "Le message n'est pas parti. Réessayez, ou écrivez directement à raissabohite@gmail.com.",
    verificationError:
      "La vérification anti-robot a échoué. Rechargez la page et réessayez.",
  },
  projectsPage: {
    eyebrow: "Projets",
    title: "Cinq produits en ligne, conçus avec soin",
    intro:
      "Un tuteur IA, une boutique en ligne, un logiciel de gestion scolaire, deux sites produits. Ouvrez un projet pour lire son étude de cas.",
    seoTitle: "Projets · Raïssa Bohité",
    seoDescription:
      "Cinq produits en ligne, du tuteur IA à l’e-commerce, conçus et développés avec soin.",
  },
  projectPage: {
    breadcrumb: "Fil d'Ariane",
    factsLabel: "Fiche du projet",
    role: "Rôle",
    team: "Équipe",
    period: "Période",
    status: "Statut",
    stack: "Technologies",
    kind: "Type de projet",
    visit: "Voir le projet en ligne",
    previewLabel: "Aperçu principal",
    galleryLabel: "Autres captures",
    enlarge: "Agrandir la capture : {caption}",
    closePreview: "Fermer l'aperçu",
    screenshotsLabel: "Captures du projet",
    previousShot: "Capture précédente",
    nextShot: "Capture suivante",
    shotPosition: "Capture {current} sur {total}",
    pauseShots: "Mettre en pause le défilement des captures",
    playShots: "Reprendre le défilement des captures",
    caseStudyPending:
      "L’étude de cas détaillée de ce projet est en préparation.",
    next: "Projet suivant",
    tocTitle: "Sommaire",
    tocLabel: "Sommaire de l'étude de cas",
    sections: {
      context: "Contexte et problème",
      role: "Mon rôle",
      approach: "Démarche",
      technical: "Choix techniques",
      results: "Résultats",
      learnings: "Ce que j'ai appris",
    },
  },
  aboutPage: {
    seoTitle: "À propos · Raïssa Bohité",
    seoDescription:
      "De la linguistique au code : mon parcours, mes langues de travail et la direction que je prends.",
    eyebrow: "À propos",
    title: "De la linguistique au code",
    intro:
      "Je suis Raïssa Bohité, développeuse front-end orientée full-stack. Avant d'écrire du code, j'ai appris à décortiquer une langue étrangère. C'est la même méthode que j'applique aujourd'hui à chaque interface.",
    contactCta: "Me contacter",
    location: "Abidjan, Côte d'Ivoire",
    story: {
      eyebrow: "Mon histoire",
      title: "Un parcours atypique, assumé",
      paragraphs: [
        "J'ai commencé par une licence d'allemand à l'Université Alassane Ouattara de Bouaké. Étudier une langue, c'est apprendre à comprendre une structure avant de produire quoi que ce soit.",
        "Je me suis ensuite formée au développement full-stack chez DigiFemmes, par projets concrets, puis à la cybersécurité chez WeCode. Aujourd'hui, je développe le front-end de LEBEDOO, le produit fintech de Freewan, et je construis mes propres produits.",
        "Ce chemin m'a donné une habitude que je garde : comprendre le besoin, le contexte et les utilisateurs avant de construire.",
      ],
    },
    timeline: {
      eyebrow: "Parcours",
      title: "Les étapes clés",
      codeLabel: "Mon parcours résumé en code",
      codeCaption: "Chaque étape s'allume au fil de la frise.",
      steps: [
        {
          period: "2020 – 2023",
          title: "Licence de langue et littérature allemandes",
          place: "Université Alassane Ouattara de Bouaké",
          code: "allemand",
        },
        {
          period: "Oct. 2023 – 2025",
          title: "Formation au développement full-stack",
          place: "DigiFemmes, un apprentissage par projets",
          code: "full-stack",
        },
        {
          period: "2025",
          title: "Analyste junior en cybersécurité",
          place: "WeCode, avec une certification Cisco en cybersécurité",
          code: "cybersécurité",
        },
        {
          period: "Aujourd'hui",
          title: "Développeuse front-end chez Freewan",
          place:
            "Sur LEBEDOO, produit fintech de Freewan, et créatrice de Fassbar",
          code: "front-end",
        },
      ],
    },
    awards: {
      eyebrow: "Distinctions",
      title: "Trois premiers prix en hackathon",
      items: [
        {
          rank: "first",
          badge: "1er prix",
          title: "DiplomaChain",
          text: "Authentification de diplômes par blockchain",
          event: "Hackathon WeCode, 2025",
        },
        {
          rank: "first",
          badge: "1er prix",
          title: "Scoring de solvabilité par IA",
          text: "Évaluer le risque de crédit avec des données alternatives",
          event: "Féminitement Digital, DigiFemmes, 2025",
        },
        {
          rank: "finalist",
          badge: "Finaliste",
          title: "Orivie",
          text: "Plateforme santé fondée sur les données ouvertes",
          event: "IvoireTech Forum, ANSUT, 2025",
        },
        {
          rank: "first",
          badge: "1er prix",
          title: "Forum d'échange académique",
          text: "Interface et intégration back-end en Go",
          event: "Hackathon DigiFemmes, 2024",
        },
      ],
    },
    languages: {
      eyebrow: "Langues",
      title: "Mes langues",
      items: [
        { code: "fr", name: "Français", level: "Langue maternelle" },
        {
          code: "de",
          name: "Allemand",
          level: "Intermédiaire · licence d'études allemandes",
        },
        {
          code: "en",
          name: "Anglais",
          level: "Notions · lecture de documentation technique",
        },
      ],
    },
    beyond: {
      eyebrow: "Au-delà du code",
      title: "Ce qui nourrit mon travail",
      items: [
        {
          icon: "design",
          title: "Le graphisme",
          text: "Mon travail de graphiste affine mon regard sur la hiérarchie, la couleur et la typographie.",
        },
        {
          icon: "motion",
          title: "Le vibe motion design",
          text: "Des vidéos de présentation que je génère avec des outils d'IA.",
        },
        {
          icon: "languages",
          title: "Les langues",
          text: "Elles m'ont appris la rigueur, et elles m'ont inspiré Fassbar.",
        },
      ],
    },
    roadmap: {
      eyebrow: "Et ensuite",
      title: "Là où je veux aller",
      intro:
        "Le front-end est ma base, et je construis déjà le back-end de mes propres produits. J'élargis progressivement vers l'infrastructure, la sécurité et l'IA responsable.",
      steps: [
        {
          stage: "Aujourd'hui",
          title: "Front-end, orientée full-stack",
          text: "Interfaces et tableaux de bord en production, back-end sur mes propres produits.",
        },
        {
          stage: "Prochaine étape",
          title: "Cloud et DevSecOps",
          text: "Déployer et sécuriser des applications de bout en bout.",
        },
        {
          stage: "Ensuite",
          title: "IA et cybersécurité",
          text: "Comprendre les modèles de langage et leurs risques.",
        },
        {
          stage: "Objectif",
          title: "Gouvernance de l'IA",
          text: "Aider les organisations à utiliser l'IA de façon sûre et conforme.",
        },
      ],
    },
    contactBand: {
      eyebrow: "Contact",
      title: "Travaillons ensemble",
      cta: "Écrire un message",
    },
  },
  contactPage: {
    seoTitle: "Contact · Raïssa Bohité",
    seoDescription:
      "Un poste, une mission ou une question ? Écrivez-moi en français, en allemand ou en anglais.",
    eyebrow: "Contact",
    title: "Un poste, une mission, une question ?",
    intro:
      "Décrivez votre besoin en quelques lignes, en français, en allemand ou en anglais.",
    directEmail: "Email direct",
    copy: "Copier l'email",
    copied: "L'adresse est dans votre presse-papiers.",
    copyFailed:
      "La copie n'a pas fonctionné : sélectionnez l'adresse à la main.",
    elsewhere: "Ailleurs",
    whereWhen: "Où et quand",
    location: "Abidjan, Côte d'Ivoire",
    timezone: "Heure de Greenwich (GMT), ouverte au travail à distance.",
  },
  legalPage: {
    tocLabel: "Sommaire des mentions légales",
  },
  footer: {
    copyright: "© 2026 Raïssa Bohité, Abidjan",
    secondaryLabel: "Liens secondaires",
    cv: "CV",
    legal: "Mentions légales",
  },
} as const;

export type Dictionary = Widen<typeof dictionary>;

export const fr: Dictionary = dictionary;
