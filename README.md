# OnTheCanals.Amsterdam 🌊

**The platform for all water activities on the Amsterdam canals.**

---

## 🚀 Quick start (local)

```bash
npm install
cp .env.example .env.local
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
npm run dev
```

Open http://localhost:3000

---

## 📋 Notion database setup

### Step 1 — Create the integration

1. Go to https://www.notion.so/my-integrations
2. Click **"New integration"**
3. Name: `OnTheCanals`
4. Copy the **Internal Integration Secret** → this is your `NOTION_TOKEN`

### Step 2 — Set up the database

In your Notion workspace, create a new full-page database.
Add these **exact** column names and types:

| Column name    | Type          | Notes |
|----------------|---------------|-------|
| Title          | Title         | Name of the activity |
| Slug           | Text          | URL slug e.g. `electric-boat-hire` |
| Subtitle       | Text          | Short line e.g. "Self-guided on the canals" |
| Category       | Select        | Options: `self-guided` `canal-tour` `watersport` `private` `unique` |
| Emoji          | Text          | Single emoji e.g. ⛵ |
| Photo          | Text          | Cloudinary URL or Unsplash URL |
| BgColor        | Text          | Hex color e.g. `#dbeafe` |
| Price          | Number        | Number only e.g. `45` |
| PriceUnit      | Select        | Options: `hr` `p.p.` `boat` `day` |
| Duration       | Text          | e.g. `2–8 hrs` |
| GroupSize      | Text          | e.g. `2–8 people` |
| Location       | Text          | e.g. `Prinsengracht 515` |
| Rating         | Number        | e.g. `4.9` |
| ReviewCount    | Number        | e.g. `312` |
| ReviewQuote    | Text          | Short quote for card e.g. `"Absolutely magical!"` |
| ReviewAuthor   | Text          | Initials e.g. `SM` |
| Description    | Text          | Full description paragraph |
| Highlights     | Text          | One highlight per line (press Enter between them) |
| Included       | Text          | One item per line |
| BookingUrl     | URL           | Full URL to booking page |
| Provider       | Text          | Company name |
| ProviderUrl    | URL           | Company website |
| Popular        | Checkbox      | ✅ shows "Popular" badge |
| IsNew          | Checkbox      | ✅ shows "New" badge |
| Tags           | Multi-select  | e.g. `family` `romantic` `group` |

### Step 3 — Connect the integration

1. Open your Notion database
2. Click **"..."** top right → **"Connections"** → add `OnTheCanals`
3. Copy the database ID from the URL:  
   `notion.so/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=...`  
   The part before `?v=` is your `NOTION_DATABASE_ID`

### Step 4 — Add to .env.local

```
NOTION_TOKEN=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
NOTION_DATABASE_ID=34a417faee218018accbe324281e27d5?
```

---

## 🐙 GitHub setup (first time)

1. Go to https://github.com and create a **new repository**
   - Name: `onthecanals-amsterdam`
   - Private ✅ (recommended)
   - Don't add README (we have one)

2. In your terminal, inside this project folder:

```bash
git init
git add .
git commit -m "Initial commit — OnTheCanals.Amsterdam"
git branch -M main
git remote add origin https://github.com/Arkid-hub/onthecanals-amsterdam.git
git push -u origin main
```

---

## ▲ Vercel deployment

1. Go to https://vercel.com → **"Add New Project"**
2. Import your GitHub repo `onthecanals-amsterdam`
3. Under **"Environment Variables"**, add:
   - `NOTION_TOKEN` → your secret
   - `NOTION_DATABASE_ID` → your database ID
4. Click **Deploy** → done ✅

**Connect your domain:**
1. In Vercel → Settings → Domains
2. Add `onthecanals.amsterdam`
3. Follow the DNS instructions (point your domain's A record to Vercel)

From now on: every `git push` → Vercel rebuilds automatically. 🎉

---

## 📸 Adding photos (Cloudinary)

1. Go to https://cloudinary.com → free account
2. Upload your photo (drag & drop)
3. Click the photo → copy the **URL**
4. Paste that URL in the Notion database `Photo` column for that activity

Done — the site picks it up within 5 minutes.

---

## 🗂 Project structure

```
onthecanals/
├── app/
│   ├── page.tsx              ← Homepage
│   ├── layout.tsx            ← Root layout
│   ├── globals.css           ← Global styles
│   ├── activities/
│   │   ├── page.tsx          ← Activities overview with filters
│   │   └── [slug]/page.tsx   ← Activity detail page
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        ← Sticky nav with language switcher
│   │   └── Footer.tsx
│   └── ui/
│       └── ActivityCard.tsx  ← The main card component
├── lib/
│   ├── data.ts               ← Smart data layer (Notion + fallback)
│   └── notion.ts             ← Notion API client
├── data/
│   └── fallback.ts           ← Static data (works without Notion)
├── messages/                 ← Translations
│   ├── en.json               ← English (master — edit this)
│   ├── nl.json
│   ├── de.json
│   ├── fr.json
│   ├── es.json
│   ├── it.json
│   └── zh.json
├── types/index.ts
├── .env.example              ← Copy to .env.local
├── .gitignore                ← .env files are excluded — safe!
└── README.md
```

---

## ✏️ Adding a new activity

**Option A — via Notion (recommended):**
- Open your Notion database
- Add a new row
- Fill in the columns
- Site updates within 5 minutes

**Option B — static fallback (no Notion yet):**
- Open `data/fallback.ts`
- Copy an existing activity object
- Change the values
- Save → the site uses it immediately

---

## 🔒 Security notes

- `.env.local` is in `.gitignore` — it will **never** be pushed to GitHub
- Your Notion token is only used server-side — never exposed to visitors
- The Notion integration has **read-only** access — even if the token leaks, nobody can change your data
- Vercel environment variables are encrypted at rest

---

## 📞 Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 | Framework (routing, SSR, SEO) |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Notion API | CMS — manage content without code |
| Cloudinary | Photo hosting |
| Vercel | Hosting + deployment |
| next-intl | Multilingual (7 languages) |
