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
  url?: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'my-website',
    title: 'This website',
    full: 'Personal site, RachelBurman.com',
    blurb:
      'Built an entire nautical point-and-click adventure game rather than write a normal About Me page. The parrot is load-bearing.',
    status: 'Active',
    year: '2026',
    url: 'https://github.com/RachelBurman/MyWebsite',
  },
  {
    slug: 'alchemists-tower',
    title: "The Alchemist's Tower",
    full: 'DQN agent in a procedurally generated roguelike',
    blurb:
      'A procedurally generated roguelike tower where a Deep Q-Network (DQN) agent learns to collect ingredients, craft potions, and climb as high as possible.',
    status: 'Complete',
    year: '2026',
    url: 'https://github.com/RachelBurman/TheAlchemistsTower',
  },
  {
    slug: 'meridian',
    title: 'MERIDIAN',
    full: 'Autonomous FCA publication monitor and briefing agent',
    blurb:
      'An autonomous agent that monitors FCA publications, classifies by urgency, and delivers structured briefings.',
    status: 'Complete',
    year: '2026',
    url: 'https://github.com/RachelBurman/MERIDIAN',
  },
  {
    slug: 'holdfast',
    title: 'HOLDFAST',
    full: 'LLM evaluation for factual sycophancy resistance',
    blurb:
      'An Inspect (UK AISI) evaluation that measures whether language models maintain correct factual answers when a user confidently asserts a wrong alternative — without providing any supporting evidence.',
    status: 'Active',
    year: '2026',
    url: 'https://github.com/RachelBurman/Holdfast',
  },
  {
    slug: 'scalpel',
    title: 'SCALPEL',
    full: 'Scientific Critique & Analysis Pipeline for Evidence Literature',
    blurb:
      'A personal AI research assistant that summarises, critiques, and cross-references academic papers. Features a Bullshit Score — because some papers need one.',
    status: 'Active',
    year: '2025',
    url: 'https://github.com/RachelBurman/SCALPEL',
  },
  {
    slug: 'fenetre',
    title: 'FENETRE',
    full: 'Quality-Assured Integrated Clinical Care Model for Community Monitoring of nAMD',
    blurb:
      'Multicentre, non-inferiority randomised controlled trial examining community-based monitoring of nAMD in optometry practices. Responsible for all statistical analysis per the SAP.',
    status: 'Published',
    year: '2024',
    url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5278556',
  },
  {
    slug: 'food-graph',
    title: 'A Data-Driven Exploration of Food',
    full: 'Graph neural networks for novel ingredient combinations',
    blurb:
      'Built a GNN on a Neo4j flavour knowledge graph to generate novel ingredient combinations using GPT-3.5. Because someone had to.',
    status: 'Completed',
    year: '2023',
    url: 'https://github.com/RachelBurman/MScDissWork',
  },
  {
    slug: 'pose',
    title: '3D Multi-view Pose Estimation',
    full: 'Edge-device array for real-time human action recognition',
    blurb:
      'Multi-camera 3D pose estimation system using a coordinated array of Nvidia Jetson TX2 edge devices for real-time human action recognition.',
    status: 'Rebuilding',
    year: '2023',
    url: 'https://github.com/RachelBurman/Dissertation',
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

export type BodyItem =
  | string
  | { heading: string; level?: 2 | 3 }
  | { link: string; href: string }

export interface Post {
  slug: string
  title: string
  date: string
  readTime: string
  tag: string
  body: BodyItem[]
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
  {
    slug: 'fable-recipe-app',
    title: 'I Built the Recipe App That People With Food Allergies Actually Need',
    date: 'Jun 2026',
    readTime: '9 min',
    tag: 'Building',
    body: [
      "There's a moment that a lot of people with food allergies know well.",
      "You're standing in your kitchen. You have ingredients. You're hungry. You open a recipe app and you're immediately confronted with a wall of dishes you can't eat — or worse, recipes that claim to be \"gluten-free\" but are built on string matching and good intentions rather than actual ingredient knowledge. Oat milk is safe for dairy allergies but contains gluten — unsafe for coeliac users. Almond milk is safe for dairy allergies but not for tree nut allergies. A \"nut-free\" recipe that still calls for marzipan.",
      "For someone with a straightforward intolerance, that's annoying. For someone with MCAS — Mast Cell Activation Syndrome — or a severe allergy, it's not just annoying. It can be dangerous. And for someone in Safe Foods Mode, where they can only eat a specific list of ten ingredients they know won't trigger a reaction, every existing recipe app is essentially useless.",
      "I built Fable because nobody had built this properly.",
      { heading: 'The backstory' },
      "Three years ago, my MSc dissertation built an ingredient embedding system using Neo4j, GraphSAGE, and GPT-3.5 to generate novel recipes. Part of that research identified the western bias in food datasets and flagged allergen-aware generation as the obvious next step. I flagged it and moved on.",
      "Then, on 26 May 2026 — three weeks before the submission deadline — Epicure was published on arXiv by Radzikowski and Chen at KAIKAKU.AI. The largest multilingual food embedding model ever trained: 4.14 million recipes, 7 languages, 1,790 ingredients compressed into 2MB of vector space. They'd solved the dataset problem I'd been thinking about for three years. But they hadn't built the application layer.",
      "Hack the Zero Stack with Vercel and AWS Databases gave me the reason to finally build it. Fable is that application layer.",
      { heading: 'What Fable does' },
      "Fable is an allergen-aware recipe discovery and generation app. You tell it what you can't eat. It tells you what you can cook.",
      "Every one of Epicure's 1,790 ingredients is explicitly classified against the EU Big 14 allergens — O(1) lookup, no string matching, no false positives. Oat milk is safe for dairy allergies but contains gluten — unsafe for coeliac users. Almond milk is safe for dairy allergies but not for tree nut allergies. Apple cider is alcoholic in the UK. Fable knows all of this because it was taught it, not because it guessed.",
      "Safe Foods Mode — the feature no other recipe app has. For MCAS and severe allergy users who can only eat a specific list of ingredients, recipe generation is strictly constrained to that list. \"Liquid of choice\" and \"seasoning of choice\" placeholders exist because for some users, even water isn't a safe assumption.",
      "\"Why is this safe for me?\" — a Claude Haiku call that reads your specific allergen profile, diet presets, and Safe Foods Mode and explains in plain English exactly why this recipe is safe for you. Not a generic disclaimer. A personalised explanation. For someone with a severe allergy, that transparency is the difference between trusting the app and not.",
      "Agentic recipe generation — two-step flow where Claude Haiku reasons over your taste history and writes a recipe brief before Claude Sonnet generates the recipe. The agent thinks out loud. You can see its reasoning while it works. You can steer it mid-flight with nudge buttons — make it spicier, go vegetarian, try a different cuisine — and AbortController silently cancels the in-flight request while the brief card updates seamlessly. It never feels like a restart.",
      "Role-aware substitution — when a recipe calls for something you can't have, Fable finds the nearest safe substitute using Epicure's embedding geometry. The engine understands what the ingredient does in the dish — fat, binding, acidity — and finds something that performs the same function. Pasta cannot substitute for cheese in a pasta bake, even if they frequently appear together in the training data.",
      "Personalised taste profile — every like and dislike feeds a preference model. A drift-aware background process running on EventBridge Scheduler detects emerging and fading tastes. Flavour territory is computed from the geometric intersection of your top-5 preferred ingredients' embedding neighbourhoods. Pre-computed recipe suggestions surface in the Discover tab before you ask for them.",
      "Diet and lifestyle presets — Vegan, Vegetarian, Keto, Low-FODMAP, Lactose Intolerance (two sub-modes), No Alcohol (UK-aware, two sub-modes), Low Histamine (85+ Epicure-verified keys, medical disclaimer).",
      "7 languages — ships in all 7 languages Epicure was trained on: English, Spanish, French, German, Italian, Simplified Chinese, Japanese. Browser locale auto-detected. Adding a new language is one JSON file.",
      { heading: 'The technical story' },
      "The AWS architecture is the spine of the product, not a bolt-on.",
      "Seven DynamoDB tables, each deliberate. fable-feedback has a DynamoDB Stream enabled. Every like and dislike fires a Lambda — fable-feedback-stream-processor — that extracts ingredient preference signals and writes them to fable-users. A GSI on needsRecompute means a separate Lambda only processes users who have new feedback, not the entire table.",
      "That second Lambda — fable-taste-profile-writer — is triggered by EventBridge Scheduler every six hours. It runs computeDriftAwareProfile, comparing recent taste history against all-time preferences to surface emerging and fading ingredients. Then it calls Claude Haiku to generate personalised recipe suggestions and writes a StoredTasteProfile back to DynamoDB.",
      "This all runs in the background, independent of user action. When you open the Discover tab, those suggestions are already there. When you tap one, generation is instant — the background Lambda did the work hours ago.",
      "Four Lambda functions, each scoped to least-privilege IAM. The barcode scanner has zero DynamoDB access because it doesn't touch DynamoDB. Every permission is justified, documented, and enforced.",
      "The monetisation boundary is already enforced at the infrastructure level. Guests cost nothing to serve — allergen filtering, Safe Foods Mode, community recipes, all free. Authenticated users are rate-limited by atomic dual-window counters in fable-rate-limits using TransactWriteItems. The free/paid split is not a future feature. It's how the app works today. Nobody should be locked out of knowing what they can safely eat — but AI generation costs money to run, and Fable is one Stripe webhook away from a sustainable freemium model.",
      "Fable ships in all 7 languages Epicure was trained on. If Epicure's training corpus spans 7 languages, the application layer should too. Adding a new language is a single JSON file — no code changes, no infrastructure changes.",
      { heading: 'Two things that broke and what I learned' },
      { heading: 'next-intl 404\'d the entire app on Vercel.', level: 3 },
      "The integration worked perfectly in development. On Vercel, every route returned 404.",
      "The root cause: createMiddleware from next-intl internally rewrites / to /en/ via x-middleware-rewrite, even with localePrefix: 'never' explicitly set. Without an app/[locale]/ directory structure, every rewritten path returns 404.",
      "The fix: stop using next-intl's middleware for routing entirely. Locale is now detected in i18n/request.ts directly from the NEXT_LOCALE cookie with Accept-Language header as fallback. The middleware is a no-op. No rewrites, no 404s, locale detection still works.",
      "The lesson: the behaviour was spec-correct but the sharp edge wasn't visible from the docs alone. Reading the middleware source would have caught it sooner.",
      { heading: 'The substitution scoring threshold that wasn\'t.', level: 3 },
      "The substitution engine originally penalised candidates whose average cosine similarity to the other ingredients in the dish exceeded 0.7 — treating them as co-ingredients rather than genuine substitutes.",
      "The problem: 0.7 is an arbitrary number against Epicure's embedding space. A dense five-ingredient context could push a legitimate substitute above 0.7 by coincidence. There was also a cliff artefact: a score of 0.699 got a bonus, 0.701 got a penalty — a 0.41 point swing with no semantic justification.",
      "The fix: self-calibrating relative penalty. Instead of \"is contextFit above 0.7?\", the engine asks \"is this candidate more similar to the surrounding dish than to the ingredient it's replacing?\" If averageContextFit > similarityToOriginal + 0.15, it's penalised as a co-ingredient.",
      "The lesson: empirical thresholds in embedding spaces need justification. When you can't validate a threshold against the distribution, make it relative. Self-calibrating penalties are more honest than magic numbers.",
      { heading: 'Try it' },
      { link: 'Live app', href: 'https://v0-allergen-recipe-app.vercel.app' },
      "The app works fully without an account — allergen filtering, kitchen management, Safe Foods Mode, community recipes. Sign up to unlock AI generation.",
      { link: 'GitHub', href: 'https://github.com/RachelBurman/Fabel' },
      { heading: "What's next" },
      "After the hackathon: migrating auth from Neon to AWS RDS Postgres, adding social auth, and thinking seriously about what Fable looks like as a real product.",
      "The monetisation model is usage-based freemium. The infrastructure already enforces it. The question worth taking seriously is the right price point for users who genuinely need this — people for whom a bad recipe suggestion isn't an inconvenience but a health risk.",
      "If you have food allergies or know someone who does — try it. Tell me what's missing.",
      "— Rachel Burman",
      "Research Assistant, King's College London",
      "Hack the Zero Stack with Vercel and AWS Databases — June 2026 · #H0Hackathon",
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
