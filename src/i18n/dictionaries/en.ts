import type { Dictionary } from './fr';

export const en: Dictionary = {
  meta: {
    homeTitle: 'Raïssa Bohité · Front-end developer, full-stack leaning',
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
      'Front-end developer, full-stack leaning, based in Abidjan. I design and build clear, accessible and secure interfaces and dashboards, and I build the back end when the project needs it.',
    ctaProjects: 'View projects',
    heroBadges: ["Front-end developer", "Dashboards", "Web security"],
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
          text: 'Readable screens that make data useful, from showcase sites to back offices.',
          skills: ["React", "Next.js", "Astro", "SvelteKit", "Tailwind CSS"]
        },
        {
          icon: 'security',
          title: 'Web security',
          text: 'OWASP best practices built in from the start, not bolted on at the end.',
          skills: ["OWASP", "CSP", "Zod validation", "Cisco certification"]
        },
        {
          icon: 'ai',
          title: 'AI and agentic development',
          text: 'I integrate AI APIs into my products and develop with coding agents. I know where they help, where they fail, and I always review their output.',
          skills: ["Claude API", "Coding agents"]
        }
      ]
    },
    method: {
      eyebrow: 'My approach',
      title: 'Every project follows the same order',
      listLabel: 'The four steps of my approach, in order',
      step: 'Step {n} of 4',
      deliverableLabel: "Deliverable",
      steps: [
        { code: "comprendre()", text: 'The need, the users and the constraints, before the first line of code.', deliverable: "Requirements document" },
        { code: "concevoir()", text: 'User flows and screens, approved before development.', deliverable: "Approved mockups" },
        { code: "construire()", text: 'Typed, tested and well-structured code that is easy to evolve.', deliverable: "Typed, tested code" },
        { code: "vérifier()", text: 'Accessibility, performance and security checked before launch.', deliverable: "Audit report" }
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
      text: 'You can write to me in French, German or English.'
    }
  },
  contactForm: {
    label: 'Contact form',
    name: 'Your name',
    nameError: "Enter your name so I know who I'm replying to.",
    email: 'Your email',
    emailPlaceholder: 'name@domain.com',
    emailError: 'Enter a full address, for example name@domain.com.',
    typeLegend: 'Your request is about',
    typeHints: {
      job: 'Permanent, fixed-term or apprenticeship',
      project: 'Freelance work',
      other: 'Question, collaboration'
    },
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
      'An AI tutor, an online shop, school management software and two product websites. Open a project to read its case study.',
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
    enlarge: "Enlarge screenshot: {caption}",
    closePreview: "Close preview",
    screenshotsLabel: "Project screenshots",
    previousShot: "Previous screenshot",
    nextShot: "Next screenshot",
    shotPosition: "Screenshot {current} of {total}",
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
  aboutPage: {
    seoTitle: 'About · Raïssa Bohité',
    seoDescription: "From linguistics to code: my path, my working languages and where I'm heading.",
    eyebrow: 'About',
    title: 'From linguistics to code',
    intro:
      "I'm Raïssa Bohité, a full-stack-leaning front-end developer in Abidjan. Before writing code, I learned to break down a foreign language. I apply the same method to every interface today.",
    contactCta: 'Get in touch',
    location: "Abidjan, Côte d'Ivoire",
    story: {
      eyebrow: 'My story',
      title: 'An unconventional path, by choice',
      paragraphs: [
        "I started with a bachelor's degree in German at Alassane Ouattara University in Bouaké. Studying a language means learning to understand a structure before producing anything.",
        "I then trained in full-stack development at DigiFemmes through hands-on projects, and in cybersecurity at WeCode. Today I build the front end of LEBEDOO, Freewan's fintech product, and my own products, such as Fassbar.",
        'This path gave me a habit I keep: understanding the need, the context and the users before building.'
      ]
    },
    timeline: {
      eyebrow: 'Background',
      title: 'Key milestones',
      codeLabel: 'My path summarised in code',
      codeCaption: 'Each step lights up as you scroll through the timeline.',
      steps: [
        { period: '2020 – 2023', title: "Bachelor's degree in German language and literature", place: 'Alassane Ouattara University, Bouaké', code: 'allemand' },
        { period: 'Oct. 2023 – 2025', title: 'Full-stack development training', place: 'DigiFemmes, project-based learning', code: 'full-stack' },
        { period: '2025', title: 'Junior cybersecurity analyst', place: 'WeCode, with a Cisco cybersecurity certification', code: 'cybersécurité' },
        { period: 'Alongside', title: 'Graphic designer', place: 'La Ruche Universelle, visual identity and print materials', code: 'graphisme' },
        { period: 'Today', title: 'Front-end developer at Freewan', place: "On LEBEDOO, Freewan's fintech product, and creator of Fassbar", code: 'front-end' }
      ]
    },
    awards: {
      eyebrow: 'Awards',
      title: 'Three hackathon first prizes',
      items: [
        { rank: 'first', badge: '1st prize', title: 'DiplomaChain', text: 'Blockchain-based diploma authentication', event: 'WeCode Hackathon, 2025' },
        { rank: 'first', badge: '1st prize', title: 'AI credit scoring', text: 'Assessing credit risk with alternative data', event: 'Féminitement Digital, DigiFemmes, 2025' },
        { rank: 'finalist', badge: 'Finalist', title: 'Orivie', text: 'Health platform built on open data', event: 'IvoireTech Forum, ANSUT, 2025' },
        { rank: 'first', badge: '1st prize', title: 'Academic exchange forum', text: 'Interface and back-end integration in Go', event: 'DigiFemmes Hackathon, 2024' }
      ]
    },
    languages: {
      eyebrow: 'Languages',
      title: 'My languages',
      items: [
        { code: 'fr', name: 'French', level: 'Native' },
        { code: 'de', name: 'German', level: "Intermediate · bachelor's degree in German studies" },
        { code: 'en', name: 'English', level: 'Basic · reading technical documentation' }
      ]
    },
    beyond: {
      eyebrow: 'Beyond code',
      title: 'What feeds my work',
      items: [
        { icon: 'design', title: 'Graphic design', text: 'My graphic design work sharpens my eye for hierarchy, colour and typography.' },
        { icon: 'motion', title: 'Motion design', text: 'Promo videos produced in code with Remotion, as for Moomen Pro.' },
        { icon: 'languages', title: 'Languages', text: 'They taught me rigour, and they inspired Fassbar.' }
      ]
    },
    roadmap: {
      eyebrow: "What's next",
      title: "Where I'm heading",
      intro: "Front-end is my foundation, and I already build the back end of my own products. I'm gradually expanding into infrastructure, security and responsible AI.",
      steps: [
        { stage: 'Today', title: 'Front-end, full-stack leaning', text: 'Interfaces and dashboards in production, back end on my own products.' },
        { stage: 'Next step', title: 'Cloud and DevSecOps', text: 'Deploying and securing applications end to end.' },
        { stage: 'Then', title: 'AI and cybersecurity', text: 'Understanding language models and their risks.' },
        { stage: 'Goal', title: 'AI governance', text: 'Helping organisations use AI safely and compliantly.' }
      ]
    },
    contactBand: {
      eyebrow: 'Contact',
      title: "Let's work together",
      cta: 'Write a message'
    }
  },
  contactPage: {
    seoTitle: 'Contact · Raïssa Bohité',
    seoDescription: 'A job, a project or a question? Write to me in French, German or English.',
    eyebrow: 'Contact',
    title: 'A job, a project, a question?',
    intro: 'Describe what you need in a few lines, in French, German or English.',
    directEmail: 'Direct email',
    copy: 'Copy email',
    copied: 'The address is in your clipboard.',
    copyFailed: "Copying didn't work: please select the address manually.",
    elsewhere: 'Elsewhere',
    whereWhen: 'Where and when',
    location: "Abidjan, Côte d'Ivoire",
    timezone: 'Greenwich Mean Time (GMT), open to remote work.'
  },
  legalPage: {
    tocLabel: 'Legal notice contents'
  },
  footer: {
    copyright: '© 2026 Raïssa Bohité, Abidjan',
    secondaryLabel: 'Secondary links',
    cv: 'CV',
    legal: 'Legal notice'
  }
};
