# OnTheCanals Amsterdam

The platform for all water activities on the Amsterdam canals — affiliate-driven discovery and booking site.

## Tech stack

- **Next.js 14** (App Router)
- **next-intl** for i18n (7 locales: en, nl, de, fr, it, es, zh)
- **Tailwind CSS** for styling
- **Notion** as headless CMS (activities + blog)
- **Mapbox GL JS** for the departure-points map
- **Vercel** for hosting

## Local dev

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Required (see `.env.example`):

- `NOTION_TOKEN` — Notion integration token
- `NOTION_DATABASE_ID` — activities database
- `NOTION_BLOG_DATABASE_ID` — blog database
- `NOTION_SETTINGS_DATABASE_ID` — site settings database
- `NEXT_PUBLIC_MAPBOX_TOKEN` — Mapbox access token

If Notion vars are missing, the site falls back to `data/fallback.ts`.

## Project structure

- `app/[locale]/` — locale-aware route segments (homepage, activities, blog, etc.)
- `components/` — React components (UI, layout, SEO)
- `lib/` — Notion client + data layer
- `messages/` — translation JSON per locale
- `data/fallback.ts` — fallback activity data

## Translation

UI is fully translated in 7 languages. **Activity descriptions and blog posts are English-only** — a notice banner is shown on non-English locales.

Add new translation keys to all 7 JSON files in `messages/`. The next-intl `t()` function looks up keys by section, e.g. `t('hero.title')` reads `hero.title` from the active locale's JSON.
