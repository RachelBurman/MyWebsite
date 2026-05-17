export const SITE = {
  name: 'Rachel Burman',
  email: 'rachel.burman@gmail.com',
  github: 'https://github.com/RachelBurman',
  linkedin: 'https://www.linkedin.com/in/rachelburman/',
} as const

export interface Project {
  slug: string
  title: string
  full: string
  blurb: string
  status: string
  year: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'scalpel',
    title: 'SCALPEL',
    full: 'Scientific Critique & Analysis Pipeline for Evidence Literature',
    blurb:
      'A personal AI research assistant that summarises, critiques, and cross-references academic papers. Features a Bullshit Score — because some papers need one.',
    status: 'Active',
    year: '2025',
  },
  {
    slug: 'fenetre',
    title: 'FENETRE',
    full: 'Quality-Assured Integrated Clinical Care Model for Community Monitoring of nAMD',
    blurb:
      'Multicentre, non-inferiority randomised controlled trial examining community-based monitoring of nAMD in optometry practices. Responsible for all statistical analysis per the SAP.',
    status: 'Published',
    year: '2024',
  },
  {
    slug: 'food-graph',
    title: 'A Data-Driven Exploration of Food',
    full: 'Graph neural networks for novel ingredient combinations',
    blurb:
      'Built a GNN on a Neo4j flavour knowledge graph to generate novel ingredient combinations using GPT-3.5. Because someone had to.',
    status: 'Completed',
    year: '2023',
  },
  {
    slug: 'pose',
    title: '3D Multi-view Pose Estimation',
    full: 'Edge-device array for real-time human action recognition',
    blurb:
      'Multi-camera 3D pose estimation system using a coordinated array of Nvidia Jetson TX2 edge devices for real-time human action recognition.',
    status: 'Rebuilding',
    year: '2023',
  },
]

export interface TimelineEntry {
  year: string
  event: string
}

export const TIMELINE: TimelineEntry[] = [
  { year: '2026', event: 'Launched personal website.' },
  {
    year: '2024',
    event: 'Joined King\'s College London as a Research Assistant in Data Science and Clinical Trials.',
  },
  { year: '2024', event: 'Joined and left Swarco as a mid-level web developer.' },
  { year: '2024', event: 'Graduated from Swansea with an MSc Distinction in Data Science.' },
  { year: '2022', event: 'Graduated 2:1 in Computer Science.' },
  {
    year: '2020',
    event: 'Year in industry at The Carto Group as a junior web developer.',
  },
]

export interface NowBlock {
  label: string
  body: string
}

export const NOW = {
  asOf: 'April 2026',
  location: 'London, UK',
  blocks: [
    {
      label: 'Working on',
      body: 'Doctoral research in clinical-trial methodology at King\'s College London. Teaching myself to like web dev again, on my own terms.',
    },
    {
      label: 'Reading',
      body: 'Currently re-reading the trial design literature with too many highlighters. Romance novels in the gaps.',
    },
    {
      label: 'Building',
      body: 'SCALPEL — a research assistant for academic papers, with a Bullshit Score. v0.4 is close.',
    },
    {
      label: 'Shooting',
      body: 'Long winter walks around London Bridge, golden hour, anything geometric.',
    },
    {
      label: 'Off-duty',
      body: 'Gym, dance floor, archery range, bike trails. Roughly in that rotation.',
    },
  ] as NowBlock[],
}

export interface Book {
  title: string
  author: string
  status: string
  note?: string
}

export const READING: Book[] = [
  {
    title: 'Statistical Issues in Drug Development',
    author: 'Stephen Senn',
    status: 'Reading',
    note: 'The reference. Hard-won opinions, every paragraph.',
  },
  {
    title: 'Bayesian Approaches to Clinical Trials and Health-Care Evaluation',
    author: 'Spiegelhalter, Abrams & Myles',
    status: 'Reading',
    note: 'Re-read for the third time. New things every time.',
  },
  {
    title: 'How to Read a Paper',
    author: 'Trisha Greenhalgh',
    status: 'Finished',
    note: 'Should be required reading for anyone touching evidence.',
  },
  {
    title: 'The Visual Display of Quantitative Information',
    author: 'Edward Tufte',
    status: 'Reference',
    note: "I open this when I've drawn a bad chart and need to feel ashamed.",
  },
  {
    title: 'Bridgerton',
    author: 'Julia Quinn',
    status: 'Reading',
    note: 'I contain multitudes.',
  },
  {
    title: 'Why Greatness Cannot Be Planned',
    author: 'Stanley & Lehman',
    status: 'Finished',
    note: 'Reframed how I think about open-ended research.',
  },
]

export interface UsesCategory {
  cat: string
  items: string[]
}

export const USES: UsesCategory[] = [
  {
    cat: 'Daily driver',
    items: ['MacBook Pro 14" (M2 Pro)', 'LG 27" 4K external', 'Keychron K3 Pro, low-profile browns'],
  },
  {
    cat: 'Camera',
    items: ['Fujifilm X-T5', 'XF 23mm f/1.4', 'XF 56mm f/1.2', 'Peak Design Everyday Sling'],
  },
  {
    cat: 'Statistics',
    items: ['R + RStudio', 'Python (uv, ruff, pyright)', 'Quarto for reports', 'Stan for Bayesian work'],
  },
  {
    cat: 'Editor',
    items: ['VS Code, Catppuccin Frappé', 'JetBrains Mono', 'Vim bindings (badly)'],
  },
  {
    cat: 'Bike',
    items: ['Specialised Sirrus X, much abused', 'London → south coast at weekends'],
  },
]

export interface Post {
  slug: string
  title: string
  date: string
  readTime: string
  tag: string
  body: string[]
}

export const POSTS: Post[] = [
  {
    slug: 'hello-world',
    title: 'Hello, world',
    date: 'Feb 2026',
    readTime: '1 min',
    tag: 'Note',
    body: [
      "Thank you for checking out my website. Here you'll find writing — tutorials, opinion pieces, creative writing, and anything else I can't stop thinking about.",
      "I tried to build something that feels like a room I'd actually want to sit in. The internet got loud. I want a small, quiet corner of it.",
      'More transmissions soon.',
    ],
  },
  {
    slug: 'non-inferiority',
    title: 'On non-inferiority, in plain English',
    date: 'Mar 2026',
    readTime: '8 min',
    tag: 'Statistics',
    body: [
      "A non-inferiority trial doesn't try to prove a new treatment is better. It tries to prove it isn't meaningfully worse — which is a different (and often more useful) thing.",
      'The whole game lives in the margin: how much worse is acceptable? Pick that number badly, and the trial answers the wrong question, no matter how clean the analysis.',
      "I worked on a non-inferiority RCT for community-based monitoring of macular degeneration. The margin we picked had to be defensible to clinicians, regulators, and patients. Three different audiences, three different intuitions about 'worse'. It was the longest meeting of my year.",
    ],
  },
  {
    slug: 'bullshit-score',
    title: 'Why I built SCALPEL with a Bullshit Score',
    date: 'Apr 2026',
    readTime: '6 min',
    tag: 'Building',
    body: [
      'I read a lot of papers. Some of them are genuinely brilliant. Most are fine. A non-trivial slice are dressed-up nothing.',
      "SCALPEL is a small tool that summarises, critiques, and cross-references academic papers. The Bullshit Score isn't a gimmick — it's a forcing function. If you have to commit to a number, you have to be specific about what's wrong.",
      "It's also funny, which is allowed.",
    ],
  },
]

export interface Photo {
  src: string
  alt: string
  caption: string
}

export const PHOTOS: Photo[] = [
  {
    src: 'https://pub-801b86b739fb4ff7b8056797c204430b.r2.dev/LondonBridgeBlackCab.jpg',
    alt: "A winter's evening near London Bridge.",
    caption: 'London Bridge, January',
  },
  {
    src: 'https://pub-801b86b739fb4ff7b8056797c204430b.r2.dev/TowerBridge.jpg',
    alt: 'Tower Bridge centred among the offices.',
    caption: 'Tower Bridge from the river path',
  },
  {
    src: 'https://pub-801b86b739fb4ff7b8056797c204430b.r2.dev/ATowerInSienna.jpg',
    alt: 'Inside a tower in Sienna, Italy.',
    caption: 'Sienna, looking up',
  },
]

export interface JournalEntry {
  date: string
  body: string
}

export const JOURNAL: JournalEntry[] = [
  {
    date: '23 Apr 2026',
    body: "Reviewer 2 came back. They're right about one thing and dramatically wrong about three. Trying to reply without sounding annoyed.",
  },
  {
    date: '19 Apr 2026',
    body: 'Re-derived a sample-size calculation by hand on the train. Came out wrong. Did it again at the desk and it came out right. Trains are not for arithmetic.',
  },
  {
    date: '11 Apr 2026',
    body: "Bike puncture in Greenwich. Walked the rest. Took the photo I'd been waiting three months for, by accident.",
  },
  {
    date: '02 Apr 2026',
    body: "Had the realisation that 'doing research' and 'looking like I'm doing research' are different jobs and I've been doing both. Going to do less of the second one.",
  },
]

export interface GamingItem {
  name: string
  note: string
}

export const GAMING: GamingItem[] = [
  {
    name: 'PC',
    note: 'Custom build. Mostly used for games I tell myself are educational.',
  },
  {
    name: 'Xbox One',
    note: 'Still going. Mostly: anything with a good story and no time pressure.',
  },
  {
    name: 'Meta Quest 2',
    note: 'Beat Saber counts as cardio. This is non-negotiable.',
  },
]

export interface WorkshopItem {
  name: string
  note: string
}

export const WORKSHOP: WorkshopItem[] = [
  {
    name: 'Bambu Lab A1 Mini',
    note: 'Prints things I then lose. Currently: a replacement part for the toolbox drawer.',
  },
  {
    name: 'Toolbox',
    note: 'More complete than it looks. Ask before you borrow anything.',
  },
  {
    name: 'Knitting',
    note: 'Currently: a dark green jumper. It will be finished eventually. Probably.',
  },
]

export const GUESTBOOK_NOTE = {
  body: [
    'Hi. If you found this site, you probably know me, or you\'re a recruiter, or you got lost. All three are welcome.',
    "I made this place because I wanted something on the internet that felt like mine — not a LinkedIn profile, not a CV PDF. Somewhere I could write down what I'm thinking and put up the photos I like.",
    "If you want to say hello, my email's at the bottom of every page. I read everything, and I reply to most of it.",
  ],
}
