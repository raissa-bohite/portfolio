import type { Dictionary } from './fr';

export const en: Dictionary = {
  meta: {
    homeTitle: 'Raïssa Bohité · Front-end developer in Abidjan',
    homeDescription:
      'Clear, accessible and secure interfaces and dashboards. Explore my projects: Fassbar, Yofeii Délices, Ateliya, Moomen Pro.',
    portraitAlt: 'Portrait of Raïssa Bohité'
  },
  nav: {
    label: 'Main navigation',
    home: 'Home',
    projects: 'Projects',
    about: 'About',
    contact: 'Contact',
    cta: "Let's talk",
    language: 'Change language',
    currentLanguage: 'current language: {language}',
    themeDark: 'Switch to dark mode',
    themeLight: 'Switch to light mode',
    skip: 'Skip to content',
    menuOpen: 'Open menu',
    menuClose: 'Close menu'
  },
  common: {
    cv: 'Download my CV',
    caseStudy: 'Read the case study',
    allProjects: 'All projects',
    viewProject: 'View the project'
  },
  home: {
    availability: 'Available for a job or a project',
    signature: 'comprendre().then(construire);',
    titleWords: ['Understand', 'before', 'you', 'build.'],
    intro:
      'Front-end developer based in Abidjan. I design and build clear, accessible and secure interfaces and dashboards.',
    ctaProjects: 'View projects',
    carousel: {
      label: 'Project preview',
      roleDescription: 'carousel',
      previous: 'Previous project',
      next: 'Next project',
      pause: 'Pause the project slideshow',
      play: 'Resume the project slideshow',
      position: 'Project {current} of {total}',
      cardLabel: '{name}, {kind}, {action}'
    },
    stack: {
      label: 'Technologies I use'
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Five products live'
    },
    domains: {
      eyebrow: 'What I do',
      title: 'Three areas, the same care',
      items: [
        {
          icon: 'dashboard',
          title: 'Interfaces and dashboards',
          text: 'Readable screens that make data useful, from showcase sites to back offices.'
        },
        {
          icon: 'security',
          title: 'Web security',
          text: 'OWASP best practices built in from the start, not bolted on at the end.'
        },
        {
          icon: 'ai',
          title: 'AI in the workflow',
          text: 'AI tools used with method: I know where they help, where they fail, and I always review their output.'
        }
      ]
    },
    method: {
      eyebrow: 'My approach',
      title: 'Every project follows the same order',
      listLabel: 'The four steps of my approach, in order',
      step: 'Step {n} of 4',
      steps: [
        {
          code: 'comprendre()',
          text: 'The need, the users and the constraints, before the first line of code.'
        },
        { code: 'concevoir()', text: 'User flows and screens, approved before development.' },
        { code: 'construire()', text: 'Typed, tested and well-structured code that is easy to evolve.' },
        { code: 'vérifier()', text: 'Accessibility, performance and security checked before launch.' }
      ]
    },
    about: {
      eyebrow: 'Background',
      title: 'From linguistics to code',
      text: 'Studying German taught me to break a language down before speaking it. I apply the same method to every interface.',
      link: 'Read my story',
      timeline: [
        {
          period: '2020 – 2023',
          text: "Bachelor's degree in German, Alassane Ouattara University, Bouaké",
          current: false
        },
        {
          period: '2023 – 2025',
          text: 'Full-stack training at DigiFemmes, cybersecurity at WeCode',
          current: false
        },
        {
          period: 'Today',
          text: 'Front-end developer at Freewan, creator of Fassbar',
          current: true
        }
      ]
    },
    contact: {
      eyebrow: 'Contact',
      title: 'A job, a project, a question?',
      text: 'Write to me in English, French or German.'
    }
  },
  contactForm: {
    label: 'Contact form',
    name: 'Your name',
    nameError: "Enter your name so I know who I'm replying to.",
    email: 'Your email',
    emailPlaceholder: 'name@domain.com',
    emailError: 'Enter a full address, for example name@domain.com.',
    type: 'Your request',
    types: {
      job: 'A job offer',
      project: 'A freelance project',
      other: 'Something else'
    },
    message: 'Your message',
    messageHelp: 'The context, what you expect, and a deadline if you have one.',
    messageError: 'Write at least 20 characters to describe what you need.',
    privacy: 'Your details are used only to reply to you. They are never shared or reused.',
    submit: 'Send message',
    sending: 'Sending…',
    successTitle: 'Message sent',
    successText: "Thank you, {name}. I'll reply to {email} as soon as possible.",
    again: 'Send another message',
    failure: "The message wasn't sent. Try again, or email raissabohite@gmail.com directly.",
    verificationError: 'The anti-bot check failed. Reload the page and try again.'
  },
  projectsPage: {
    eyebrow: 'Projects',
    title: 'Five products live, built with care',
    intro:
      'An AI tutor, an online shop, school management software and two product websites. Hover a project to see its summary, open it to read more.',
    seoTitle: 'Projects · Raïssa Bohité',
    seoDescription: 'Five live products, from an AI tutor to e-commerce, designed and built with care.'
  },
  projectPage: {
    breadcrumb: 'Breadcrumb',
    factsLabel: 'Project facts',
    role: 'Role',
    team: 'Team',
    period: 'Period',
    status: 'Status',
    stack: 'Technologies',
    kind: 'Project type',
    visit: 'Visit the live project',
    previewLabel: 'Main preview',
    galleryLabel: 'More screenshots',
    caseStudyPending: 'The full case study for this project is in progress.',
    next: 'Next project',
    tocTitle: 'Contents',
    tocLabel: 'Case study contents',
    sections: {
      context: 'Context and problem',
      role: 'My role',
      approach: 'Approach',
      technical: 'Technical choices',
      results: 'Results',
      learnings: 'What I learned'
    }
  },
  footer: {
    copyright: '© 2026 Raïssa Bohité, Abidjan',
    secondaryLabel: 'Secondary links',
    cv: 'CV',
    legal: 'Legal notice'
  }
};
