# Elevate — Figma "UI" page (node 3:7) in React

Vite + React 19 + TypeScript + Tailwind v4 + framer-motion + react-router 7.

```
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build → dist/
npm run preview    # http://localhost:4173 (SPA fallback on)
node scripts/screenshot.mjs     # full-page 1440 + 375 renders of every route → screenshots/
node scripts/interactions.mjs   # routing / filters / accordion / carousel / form / menu / reduced-motion smoke tests
```

## Routes (one per Figma frame)
| Figma frame | Implementation |
|---|---|
| Homepage | `/` |
| Preloader | first-load overlay (once per tab session) |
| Homepage – Change BG / Change BG 2 / Banner Alternative | **state** of the homepage hero: campaign carousel (sneaker thumb), slides 0/1/2; deep link `/?hero=carousel&slide=0..2` |
| Works | `/works` (Project Type filter chips) |
| Works – Detailed | `/works/:slug` |
| About | `/about` |
| News | `/news` (filter chips) |
| News – Detailed | `/news/:slug` |
| Services | `/services` (accordion) |
| Services – Detailed | `/services/:slug` |
| Contact | `/contact` ("Write us" tab) |
| Contact – Book | `/contact/book` ("Book a calendar" tab, nested route of the same page) |
| Careers | `/careers` (job accordion, marquee footer variant) |

Content lives in `src/data/site.ts`. Shared components: `PageBanner`, `FilterChips`, `Accordion`, `WorkCard`, `NewsCard`, `NextUp`, `ArticleBody`, `Blocks`, `TeamGrid`, `Partners` (`ClientsGrid`/`Testimonials`), `HeroCarousel`, `Layout`.
Reduced motion: `MotionConfig reducedMotion="user"` + CSS kill-switch; preloader, curtain and carousel autoplay are skipped.

## Content from Wix CMS

Page content is read at runtime from the Wix headless site **Elevate**
(site ID `81496a40-76f4-49e3-88fb-09af79431baf`, dashboard: https://manage.wix.com/dashboard/81496a40-76f4-49e3-88fb-09af79431baf).

| Wix collection | Fields | Used by |
| --- | --- | --- |
| `Works` | title, slug, client, category, tag, projectType[], year, coverImage, gallery[], description, order | Home "Recent Works", /works, /works/:slug, Service detail "Related Works" |
| `News` | title, slug, category, date, author, coverImage, coverAlt, excerpt, body, order | Home "Recent News", /news, /news/:slug |
| `Services` | title, slug, shortDescription, body, image, order | /services accordion, /services/:slug |
| `Careers` | title, location, type, description, order | /careers accordion (type · location shown when filled) |
| `Testimonials` | name, quote, avatar, order | Partners section, Contact |
| `Clients` | name, logo, description, order | Partners / About client grid |

How it works:

- `src/wix/client.ts` mints an anonymous **visitor** token from the public OAuth client ID
  (`VITE_WIX_CLIENT_ID` in `.env`, see `.env.example`), caches/refreshes it in localStorage and
  queries `POST https://www.wixapis.com/wix-data/v2/items/query` (sorted by `order`). Plain `fetch`, no SDK.
- `src/data/cms.ts` maps each collection onto the app's types. Design-only settings (card crops,
  background colours, logo sizes) stay local in `src/data/site.ts`, matched by slug / name; new CMS
  items get neutral defaults.
- `src/data/content.tsx` (`ContentProvider` / `useContent()`) loads all six collections in parallel on
  first load. While loading, a small "Loading content…" pill shows and detail pages for unknown slugs
  show a skeleton. Each collection falls back to the bundled `src/data/site.ts` copy on its own if
  Wix is unreachable, errors, times out (8 s) or is empty. `<html data-content="loading|wix|partial|local">`
  reflects the state.
- Collections are public-read (`read: ANYONE`), admin-only write. Edit content in the Wix dashboard → CMS.
  Images uploaded in the dashboard (`wix:image://…`) are converted to static.wixstatic.com URLs.

Verify: `npm run build && npm run preview`, then `node scripts/verify-wix.mjs`
(checks the token + six queries succeed on every route and the offline fallback).
