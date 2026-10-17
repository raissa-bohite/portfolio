// Le français est la langue de référence : sa forme définit la structure que l'anglais et l'allemand doivent respecter
type Widen<Value> = Value extends string
  ? string
  : Value extends readonly (infer Item)[]
    ? readonly Widen<Item>[]
    : { readonly [Key in keyof Value]: Widen<Value[Key]> };

const dictionary = {
  meta: {
    homeTitle: 'Raïssa Bohité · Développeuse front-end à Abidjan',
    homeDescription:
      'Interfaces et tableaux de bord clairs, accessibles et sécurisés. Découvrez mes projets : Fassbar, Yofeii Délices, Ateliya, Moomen Pro.',
    portraitAlt: 'Portrait de Raïssa Bohité'
  },
  nav: {
    label: 'Navigation principale',
    home: 'Accueil',
    projects: 'Projets',
    about: 'À propos',
    contact: 'Contact',
    cta: 'Discutons',
    language: 'Changer de langue',
    currentLanguage: 'langue actuelle : {language}',
    themeDark: 'Activer le mode sombre',
    themeLight: 'Activer le mode clair',
    skip: 'Aller au contenu',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu'
  },
  common: {
    cv: 'Télécharger le CV',
    caseStudy: "Lire l'étude de cas",
    allProjects: 'Tous les projets',
    viewProject: 'Voir le projet'
  },
  home: {
    availability: 'Disponible pour un poste ou une mission',
    signature: 'comprendre().then(construire);',
    titleWords: ['Comprendre', 'avant', 'de', 'construire.'],
    intro:
      'Développeuse front-end à Abidjan. Je conçois des interfaces et des tableaux de bord clairs, accessibles et sécurisés.',
    ctaProjects: 'Voir les projets',
    carousel: {
      label: 'Aperçu des projets',
      roleDescription: 'carrousel',
      previous: 'Projet précédent',
      next: 'Projet suivant',
      pause: 'Mettre en pause le défilement des projets',
      play: 'Reprendre le défilement des projets',
      position: 'Projet {current} sur {total}',
      cardLabel: '{name}, {kind}, {action}'
    },
    stack: {
      label: 'Technologies utilisées'
    },
    projects: {
      eyebrow: 'Projets',
      title: 'Cinq produits en ligne'
    },
    domains: {
      eyebrow: 'Ce que je fais',
      title: 'Trois domaines, un même soin',
      items: [
        {
          icon: 'dashboard',
          title: 'Interfaces et tableaux de bord',
          text: 'Des écrans lisibles qui rendent les données utiles, du site vitrine au back-office.'
        },
        {
          icon: 'security',
          title: 'Sécurité web',
          text: 'Les bonnes pratiques OWASP appliquées dès la conception, pas ajoutées à la fin.'
        },
        {
          icon: 'ai',
          title: 'IA dans le flux de travail',
          text: "Des outils d'IA utilisés avec méthode : je sais où ils aident, où ils échouent, et je vérifie ce qu'ils produisent."
        }
      ]
    },
    method: {
      eyebrow: 'Ma démarche',
      title: 'Chaque projet suit le même ordre',
      listLabel: "Les quatre étapes de ma démarche, dans l'ordre",
      step: 'Étape {n} sur 4',
      steps: [
        {
          code: 'comprendre()',
          text: 'Le besoin, les utilisateurs et les contraintes, avant la première ligne de code.'
        },
        { code: 'concevoir()', text: 'Les parcours et les écrans, validés avant le développement.' },
        { code: 'construire()', text: 'Un code typé, testé et structuré, facile à faire évoluer.' },
        {
          code: 'vérifier()',
          text: 'Accessibilité, performance et sécurité contrôlées avant la mise en ligne.'
        }
      ]
    },
    about: {
      eyebrow: 'Parcours',
      title: 'De la linguistique au code',
      text: "Mes études d'allemand m'ont appris à décortiquer une langue avant de la parler. J'applique la même méthode à chaque interface.",
      link: 'Lire mon parcours',
      timeline: [
        {
          period: '2020 – 2023',
          text: "Licence d'allemand, Université Alassane Ouattara de Bouaké",
          current: false
        },
        {
          period: '2023 – 2025',
          text: 'Full-stack chez DigiFemmes, cybersécurité chez WeCode',
          current: false
        },
        {
          period: "Aujourd'hui",
          text: 'Développeuse front-end chez Freewan, créatrice de Fassbar',
          current: true
        }
      ]
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Un poste, une mission, une question ?',
      text: 'Écrivez-moi en français, en allemand ou en anglais.'
    }
  },
  contactForm: {
    label: 'Formulaire de contact',
    name: 'Votre nom',
    nameError: 'Indiquez votre nom pour que je sache à qui je réponds.',
    email: 'Votre email',
    emailPlaceholder: 'nom@domaine.com',
    emailError: 'Saisissez une adresse complète, par exemple nom@domaine.com.',
    type: 'Votre demande',
    types: {
      job: "Une offre d'emploi",
      project: 'Une mission freelance',
      other: 'Autre chose'
    },
    message: 'Votre message',
    messageHelp: 'Le contexte, ce que vous attendez, et une échéance si vous en avez une.',
    messageError: 'Écrivez au moins 20 caractères pour décrire votre besoin.',
    privacy:
      'Vos informations servent uniquement à vous répondre. Elles ne sont ni partagées ni réutilisées.',
    submit: 'Envoyer le message',
    sending: 'Envoi en cours…',
    successTitle: 'Message envoyé',
    successText: 'Merci {name}. Je vous réponds à l’adresse {email} dès que possible.',
    again: 'Envoyer un autre message',
    failure:
      "Le message n'est pas parti. Réessayez, ou écrivez directement à raissabohite@gmail.com.",
    verificationError: 'La vérification anti-robot a échoué. Rechargez la page et réessayez.'
  },
  projectsPage: {
    eyebrow: 'Projets',
    title: 'Cinq produits en ligne, conçus avec soin',
    intro:
      'Un tuteur IA, une boutique en ligne, un logiciel de gestion scolaire, deux sites produits. Survolez un projet pour en voir le résumé, ouvrez-le pour la suite.',
    seoTitle: 'Projets · Raïssa Bohité',
    seoDescription: 'Cinq produits en ligne, du tuteur IA à l’e-commerce, conçus et développés avec soin.'
  },
  projectPage: {
    breadcrumb: "Fil d'Ariane",
    factsLabel: 'Fiche du projet',
    role: 'Rôle',
    team: 'Équipe',
    period: 'Période',
    status: 'Statut',
    stack: 'Technologies',
    kind: 'Type de projet',
    visit: 'Voir le projet en ligne',
    previewLabel: 'Aperçu principal',
    galleryLabel: 'Autres captures',
    caseStudyPending: 'L’étude de cas détaillée de ce projet est en préparation.',
    next: 'Projet suivant',
    tocTitle: 'Sommaire',
    tocLabel: "Sommaire de l'étude de cas",
    sections: {
      context: 'Contexte et problème',
      role: 'Mon rôle',
      approach: 'Démarche',
      technical: 'Choix techniques',
      results: 'Résultats',
      learnings: "Ce que j'ai appris"
    }
  },
  footer: {
    copyright: '© 2026 Raïssa Bohité, Abidjan',
    secondaryLabel: 'Liens secondaires',
    cv: 'CV',
    legal: 'Mentions légales'
  }
} as const;

export type Dictionary = Widen<typeof dictionary>;

export const fr: Dictionary = dictionary;
