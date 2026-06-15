# RachelBurman.com

Personal website. Built as a nautical point-and-click adventure game rather than a normal About Me page. The parrot is load-bearing.

## Stack

- **Framework:** TanStack Start (React, file-based routing)
- **Styling:** Tailwind CSS + inline styles
- **Deployment:** Cloudflare Pages
- **Auth/writing:** AT Protocol (Bluesky) for federated post support

## Structure

Content lives in `src/content.ts` — projects, writing posts, photos, journal entries, and site metadata are all defined there. No CMS, no database.

Writing posts support plain paragraphs, section headings, and external links via the `BodyItem` union type.

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
