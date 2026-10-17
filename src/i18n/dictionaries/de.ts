import type { Dictionary } from './fr';

export const de: Dictionary = {
  meta: {
    homeTitle: 'Raïssa Bohité · Front-End-Entwicklerin in Abidjan',
    homeDescription:
      'Klare, barrierefreie und sichere Oberflächen und Dashboards. Entdecken Sie meine Projekte: Fassbar, Yofeii Délices, Ateliya, Moomen Pro.',
    portraitAlt: 'Porträt von Raïssa Bohité'
  },
  nav: {
    label: 'Hauptnavigation',
    home: 'Startseite',
    projects: 'Projekte',
    about: 'Über mich',
    contact: 'Kontakt',
    cta: 'Kontakt aufnehmen',
    language: 'Sprache wechseln',
    currentLanguage: 'aktuelle Sprache: {language}',
    themeDark: 'Dunkelmodus aktivieren',
    themeLight: 'Hellmodus aktivieren',
    skip: 'Zum Inhalt springen',
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schließen'
  },
  common: {
    cv: 'Lebenslauf herunterladen',
    caseStudy: 'Fallstudie lesen',
    allProjects: 'Alle Projekte',
    viewProject: 'Projekt ansehen'
  },
  home: {
    availability: 'Verfügbar für eine Stelle oder ein Projekt',
    signature: 'comprendre().then(construire);',
    titleWords: ['Erst', 'verstehen,', 'dann', 'bauen.'],
    intro:
      'Front-End-Entwicklerin in Abidjan. Ich gestalte und entwickle klare, barrierefreie und sichere Oberflächen und Dashboards.',
    ctaProjects: 'Projekte ansehen',
    carousel: {
      label: 'Projektvorschau',
      roleDescription: 'Karussell',
      previous: 'Vorheriges Projekt',
      next: 'Nächstes Projekt',
      pause: 'Projekt-Diashow anhalten',
      play: 'Projekt-Diashow fortsetzen',
      position: 'Projekt {current} von {total}',
      cardLabel: '{name}, {kind}, {action}'
    },
    stack: {
      label: 'Technologien, die ich nutze'
    },
    projects: {
      eyebrow: 'Projekte',
      title: 'Fünf Produkte online'
    },
    domains: {
      eyebrow: 'Was ich mache',
      title: 'Drei Bereiche, dieselbe Sorgfalt',
      items: [
        {
          icon: 'dashboard',
          title: 'Oberflächen und Dashboards',
          text: 'Übersichtliche Oberflächen, die Daten nutzbar machen – von der Website bis zum Backoffice.'
        },
        {
          icon: 'security',
          title: 'Websicherheit',
          text: 'OWASP-Best-Practices von Anfang an mitgedacht, nicht erst am Ende ergänzt.'
        },
        {
          icon: 'ai',
          title: 'KI im Arbeitsalltag',
          text: 'KI-Werkzeuge mit Methode: Ich weiß, wo sie helfen und wo nicht, und prüfe immer ihre Ergebnisse.'
        }
      ]
    },
    method: {
      eyebrow: 'Meine Arbeitsweise',
      title: 'Jedes Projekt folgt derselben Reihenfolge',
      listLabel: 'Die vier Schritte meiner Arbeitsweise, in der Reihenfolge',
      step: 'Schritt {n} von 4',
      steps: [
        { code: 'comprendre()', text: 'Bedarf, Nutzer und Rahmenbedingungen – vor der ersten Codezeile.' },
        { code: 'concevoir()', text: 'Abläufe und Screens, abgestimmt vor der Entwicklung.' },
        {
          code: 'construire()',
          text: 'Typisierter, getesteter und gut strukturierter Code, der sich leicht weiterentwickeln lässt.'
        },
        { code: 'vérifier()', text: 'Barrierefreiheit, Performance und Sicherheit geprüft vor dem Livegang.' }
      ]
    },
    about: {
      eyebrow: 'Werdegang',
      title: 'Von der Linguistik zum Code',
      text: 'Mein Germanistikstudium hat mich gelehrt, eine Sprache zu zerlegen, bevor ich sie spreche. Dieselbe Methode wende ich auf jede Oberfläche an.',
      link: 'Meinen Werdegang lesen',
      timeline: [
        {
          period: '2020 – 2023',
          text: 'Bachelor Germanistik, Universität Alassane Ouattara, Bouaké',
          current: false
        },
        {
          period: '2023 – 2025',
          text: 'Full-Stack bei DigiFemmes, Cybersicherheit bei WeCode',
          current: false
        },
        {
          period: 'Heute',
          text: 'Front-End-Entwicklerin bei Freewan, Gründerin von Fassbar',
          current: true
        }
      ]
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Eine Stelle, ein Projekt, eine Frage?',
      text: 'Schreiben Sie mir auf Deutsch, Französisch oder Englisch.'
    }
  },
  contactForm: {
    label: 'Kontaktformular',
    name: 'Ihr Name',
    nameError: 'Bitte geben Sie Ihren Namen an, damit ich weiß, wem ich antworte.',
    email: 'Ihre E-Mail-Adresse',
    emailPlaceholder: 'name@domain.com',
    emailError: 'Bitte geben Sie eine vollständige Adresse ein, zum Beispiel name@domain.com.',
    type: 'Ihr Anliegen',
    types: {
      job: 'Ein Stellenangebot',
      project: 'Ein freiberufliches Projekt',
      other: 'Etwas anderes'
    },
    message: 'Ihre Nachricht',
    messageHelp: 'Der Kontext, Ihre Erwartungen und gegebenenfalls eine Frist.',
    messageError: 'Bitte beschreiben Sie Ihr Anliegen in mindestens 20 Zeichen.',
    privacy:
      'Ihre Angaben dienen ausschließlich der Beantwortung Ihrer Nachricht und werden weder weitergegeben noch anderweitig genutzt.',
    submit: 'Nachricht senden',
    sending: 'Wird gesendet …',
    successTitle: 'Nachricht gesendet',
    successText: 'Vielen Dank, {name}. Ich antworte Ihnen so bald wie möglich an {email}.',
    again: 'Weitere Nachricht senden',
    failure:
      'Die Nachricht wurde nicht gesendet. Versuchen Sie es erneut oder schreiben Sie direkt an raissabohite@gmail.com.',
    verificationError: 'Die Anti-Bot-Prüfung ist fehlgeschlagen. Laden Sie die Seite neu und versuchen Sie es erneut.'
  },
  projectsPage: {
    eyebrow: 'Projekte',
    title: 'Fünf Produkte online, mit Sorgfalt gebaut',
    intro:
      'Ein KI-Tutor, ein Onlineshop, eine Schulverwaltungssoftware und zwei Produktwebsites. Fahren Sie über ein Projekt, um die Zusammenfassung zu sehen, und öffnen Sie es für mehr.',
    seoTitle: 'Projekte · Raïssa Bohité',
    seoDescription: 'Fünf Produkte online, vom KI-Tutor bis zum E-Commerce, mit Sorgfalt gestaltet und entwickelt.'
  },
  projectPage: {
    breadcrumb: 'Brotkrumennavigation',
    factsLabel: 'Projektsteckbrief',
    role: 'Rolle',
    team: 'Team',
    period: 'Zeitraum',
    status: 'Status',
    stack: 'Technologien',
    kind: 'Projektart',
    visit: 'Projekt online ansehen',
    previewLabel: 'Hauptansicht',
    galleryLabel: 'Weitere Screenshots',
    caseStudyPending: 'Die ausführliche Fallstudie zu diesem Projekt ist in Vorbereitung.',
    next: 'Nächstes Projekt',
    tocTitle: 'Inhalt',
    tocLabel: 'Inhalt der Fallstudie',
    sections: {
      context: 'Kontext und Problem',
      role: 'Meine Rolle',
      approach: 'Vorgehen',
      technical: 'Technische Entscheidungen',
      results: 'Ergebnisse',
      learnings: 'Was ich gelernt habe'
    }
  },
  footer: {
    copyright: '© 2026 Raïssa Bohité, Abidjan',
    secondaryLabel: 'Weitere Links',
    cv: 'Lebenslauf',
    legal: 'Impressum'
  }
};
