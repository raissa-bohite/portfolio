import type { Dictionary } from './fr';

export const de: Dictionary = {
  meta: {
    homeTitle: 'Raïssa Bohité · Front-End-Entwicklerin mit Full-Stack-Fokus',
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
  loader: {
    label: 'Portfolio wird geladen',
    progress: 'Ladefortschritt',
    kicker: 'Portfolio',
    tagline: 'Front-End-Entwicklerin mit Full-Stack-Fokus'
  },
  home: {
    availability: 'Verfügbar für eine Stelle oder ein Projekt',
    signature: 'comprendre().then(construire);',
    titleWords: ['Erst', 'verstehen,', 'dann', 'bauen.'],
    intro:
      'Front-End-Entwicklerin mit Full-Stack-Fokus in Abidjan. Ich gestalte und entwickle klare, barrierefreie und sichere Oberflächen und Dashboards und baue das Back-End, wenn das Projekt es braucht.',
    ctaProjects: 'Projekte ansehen',
    heroBadges: ["Frontend-Entwicklerin", "Dashboards", "Websicherheit"],
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
          text: 'Übersichtliche Oberflächen, die Daten nutzbar machen – von der Website bis zum Backoffice.',
          skills: ["React", "Next.js", "Astro", "SvelteKit", "Tailwind CSS"]
        },
        {
          icon: 'security',
          title: 'Websicherheit',
          text: 'OWASP-Best-Practices von Anfang an mitgedacht, nicht erst am Ende ergänzt.',
          skills: ["OWASP", "CSP", "Zod-Validierung", "Cisco-Zertifikat"]
        },
        {
          icon: 'ai',
          title: 'KI und agentische Entwicklung',
          text: 'Ich binde KI-APIs in meine Produkte ein und entwickle mit Coding-Agenten. Ich weiß, wo sie helfen und wo nicht, und prüfe immer ihre Ergebnisse.',
          skills: ["Claude API", "Coding-Agenten"]
        }
      ]
    },
    method: {
      eyebrow: 'Meine Arbeitsweise',
      title: 'Jedes Projekt folgt derselben Reihenfolge',
      listLabel: 'Die vier Schritte meiner Arbeitsweise, in der Reihenfolge',
      step: 'Schritt {n} von 4',
      deliverableLabel: "Ergebnis",
      steps: [
        { code: "comprendre()", text: 'Bedarf, Nutzer und Rahmenbedingungen – vor der ersten Codezeile.', deliverable: "Lastenheft" },
        { code: "concevoir()", text: 'Abläufe und Screens, abgestimmt vor der Entwicklung.', deliverable: "Freigegebene Mockups" },
        { code: "construire()", text: 'Typisierter, getesteter und gut strukturierter Code, der sich leicht weiterentwickeln lässt.', deliverable: "Typisierter, getesteter Code" },
        { code: "vérifier()", text: 'Barrierefreiheit, Performance und Sicherheit geprüft vor dem Livegang.', deliverable: "Audit-Bericht" }
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
      text: 'Sie können mir auf Deutsch, Französisch oder Englisch schreiben.'
    }
  },
  contactForm: {
    label: 'Kontaktformular',
    name: 'Ihr Name',
    nameError: 'Bitte geben Sie Ihren Namen an, damit ich weiß, wem ich antworte.',
    email: 'Ihre E-Mail-Adresse',
    emailPlaceholder: 'name@domain.com',
    emailError: 'Bitte geben Sie eine vollständige Adresse ein, zum Beispiel name@domain.com.',
    typeLegend: 'Ihr Anliegen betrifft',
    typeHints: {
      job: 'Festanstellung, befristet oder dual',
      project: 'Freiberufliche Arbeit',
      other: 'Frage, Zusammenarbeit'
    },
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
      'Ein KI-Tutor, ein Onlineshop, eine Schulverwaltungssoftware und zwei Produktwebsites. Öffnen Sie ein Projekt, um seine Fallstudie zu lesen.',
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
    enlarge: "Screenshot vergrößern: {caption}",
    closePreview: "Vorschau schließen",
    screenshotsLabel: "Screenshots des Projekts",
    previousShot: "Vorheriger Screenshot",
    nextShot: "Nächster Screenshot",
    shotPosition: "Screenshot {current} von {total}",
    pauseShots: "Screenshot-Diashow anhalten",
    playShots: "Screenshot-Diashow fortsetzen",
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
  aboutPage: {
    seoTitle: 'Über mich · Raïssa Bohité',
    seoDescription: 'Von der Linguistik zum Code: mein Werdegang, meine Arbeitssprachen und meine nächsten Schritte.',
    eyebrow: 'Über mich',
    title: 'Von der Linguistik zum Code',
    intro:
      'Ich bin Raïssa Bohité, Front-End-Entwicklerin mit Full-Stack-Fokus in Abidjan. Bevor ich Code geschrieben habe, habe ich gelernt, eine Fremdsprache zu zerlegen. Dieselbe Methode wende ich heute auf jede Oberfläche an.',
    contactCta: 'Kontakt aufnehmen',
    location: 'Abidjan, Côte d’Ivoire',
    story: {
      eyebrow: 'Meine Geschichte',
      title: 'Ein ungewöhnlicher Weg, bewusst gewählt',
      paragraphs: [
        'Angefangen habe ich mit einem Bachelor in Germanistik an der Universität Alassane Ouattara in Bouaké. Eine Sprache zu studieren heißt, eine Struktur zu verstehen, bevor man etwas produziert.',
        'Danach habe ich mich bei DigiFemmes projektbasiert zur Full-Stack-Entwicklerin weitergebildet und bei WeCode in Cybersicherheit. Heute entwickle ich das Front-End von LEBEDOO, dem Fintech-Produkt von Freewan, und eigene Produkte wie Fassbar.',
        'Dieser Weg hat mir eine Gewohnheit mitgegeben: Bedarf, Kontext und Nutzer verstehen, bevor ich baue.'
      ]
    },
    timeline: {
      eyebrow: 'Werdegang',
      title: 'Wichtige Stationen',
      codeLabel: 'Mein Werdegang als Code',
      codeCaption: 'Jede Station leuchtet beim Scrollen durch die Zeitleiste auf.',
      steps: [
        { period: '2020 – 2023', title: 'Bachelor in deutscher Sprache und Literatur', place: 'Universität Alassane Ouattara, Bouaké', code: 'allemand' },
        { period: 'Okt. 2023 – 2025', title: 'Weiterbildung Full-Stack-Entwicklung', place: 'DigiFemmes, projektbasiertes Lernen', code: 'full-stack' },
        { period: '2025', title: 'Junior-Analystin für Cybersicherheit', place: 'WeCode, mit einer Cisco-Zertifizierung in Cybersicherheit', code: 'cybersécurité' },
        { period: 'Heute', title: 'Front-End-Entwicklerin bei Freewan', place: 'An LEBEDOO, dem Fintech-Produkt von Freewan, und Gründerin von Fassbar', code: 'front-end' }
      ]
    },
    awards: {
      eyebrow: 'Auszeichnungen',
      title: 'Drei erste Plätze bei Hackathons',
      items: [
        { rank: 'first', badge: '1. Platz', title: 'DiplomaChain', text: 'Echtheitsprüfung von Diplomen per Blockchain', event: 'WeCode-Hackathon, 2025' },
        { rank: 'first', badge: '1. Platz', title: 'KI-gestütztes Kreditscoring', text: 'Kreditrisiko mit alternativen Daten bewerten', event: 'Féminitement Digital, DigiFemmes, 2025' },
        { rank: 'finalist', badge: 'Finalistin', title: 'Orivie', text: 'Gesundheitsplattform auf Basis offener Daten', event: 'IvoireTech Forum, ANSUT, 2025' },
        { rank: 'first', badge: '1. Platz', title: 'Forum für akademischen Austausch', text: 'Oberfläche und Back-End-Anbindung in Go', event: 'DigiFemmes-Hackathon, 2024' }
      ]
    },
    languages: {
      eyebrow: 'Sprachen',
      title: 'Meine Sprachen',
      items: [
        { code: 'fr', name: 'Französisch', level: 'Muttersprache' },
        { code: 'de', name: 'Deutsch', level: 'Gute Kenntnisse · Bachelor in Germanistik' },
        { code: 'en', name: 'Englisch', level: 'Grundkenntnisse · Lesen technischer Dokumentation' }
      ]
    },
    beyond: {
      eyebrow: 'Jenseits des Codes',
      title: 'Was meine Arbeit prägt',
      items: [
        { icon: 'design', title: 'Grafikdesign', text: 'Meine Arbeit als Grafikdesignerin schärft meinen Blick für Hierarchie, Farbe und Typografie.' },
        { icon: 'motion', title: 'Vibe Motion Design', text: 'Präsentationsvideos, die ich mit KI-Werkzeugen generiere, zum Beispiel für Moomen Pro.' },
        { icon: 'languages', title: 'Sprachen', text: 'Sie haben mich Sorgfalt gelehrt und mich zu Fassbar inspiriert.' }
      ]
    },
    roadmap: {
      eyebrow: 'Wie es weitergeht',
      title: 'Wohin ich will',
      intro: 'Das Front-End ist meine Basis, und das Back-End meiner eigenen Produkte baue ich bereits selbst. Schritt für Schritt erweitere ich mein Profil um Infrastruktur, Sicherheit und verantwortungsvolle KI.',
      steps: [
        { stage: 'Heute', title: 'Front-End mit Full-Stack-Fokus', text: 'Oberflächen und Dashboards im Produktivbetrieb, Back-End in eigenen Produkten.' },
        { stage: 'Nächster Schritt', title: 'Cloud und DevSecOps', text: 'Anwendungen durchgängig bereitstellen und absichern.' },
        { stage: 'Danach', title: 'KI und Cybersicherheit', text: 'Sprachmodelle und ihre Risiken verstehen.' },
        { stage: 'Ziel', title: 'KI-Governance', text: 'Organisationen helfen, KI sicher und regelkonform einzusetzen.' }
      ]
    },
    contactBand: {
      eyebrow: 'Kontakt',
      title: 'Lassen Sie uns zusammenarbeiten',
      cta: 'Nachricht schreiben'
    }
  },
  contactPage: {
    seoTitle: 'Kontakt · Raïssa Bohité',
    seoDescription: 'Eine Stelle, ein Projekt oder eine Frage? Schreiben Sie mir auf Deutsch, Französisch oder Englisch.',
    eyebrow: 'Kontakt',
    title: 'Eine Stelle, ein Projekt, eine Frage?',
    intro: 'Beschreiben Sie Ihr Anliegen in wenigen Zeilen, auf Deutsch, Französisch oder Englisch.',
    directEmail: 'Direkte E-Mail',
    copy: 'E-Mail kopieren',
    copied: 'Die Adresse ist in Ihrer Zwischenablage.',
    copyFailed: 'Das Kopieren hat nicht funktioniert. Bitte markieren Sie die Adresse von Hand.',
    elsewhere: 'Weitere Kanäle',
    whereWhen: 'Wo und wann',
    location: 'Abidjan, Côte d’Ivoire',
    timezone: 'Greenwich-Zeit (GMT), offen für Remote-Arbeit.'
  },
  legalPage: {
    tocLabel: 'Inhalt des Impressums'
  },
  footer: {
    copyright: '© 2026 Raïssa Bohité, Abidjan',
    secondaryLabel: 'Weitere Links',
    cv: 'Lebenslauf',
    legal: 'Impressum'
  }
};
