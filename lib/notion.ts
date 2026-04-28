import { Client } from '@notionhq/client'
import type { Activity } from '@/types'

// ─── Client ────────────────────────────────────────────────────────────────
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID!

// ─── Helper: safely get text from a Notion property ───────────────────────
function text(prop: any): string {
  if (!prop) return ''
  if (prop.type === 'title')       return prop.title?.[0]?.plain_text ?? ''
  if (prop.type === 'rich_text')   return prop.rich_text?.[0]?.plain_text ?? ''
  if (prop.type === 'select')      return prop.select?.name ?? ''
  if (prop.type === 'url')         return prop.url ?? ''
  if (prop.type === 'number')      return String(prop.number ?? '')
  if (prop.type === 'checkbox')    return prop.checkbox ? 'true' : ''
  if (prop.type === 'multi_select')
    return prop.multi_select?.map((t: any) => t.name).join(',') ?? ''
  return ''
}

function num(prop: any): number {
  return prop?.number ?? 0
}

function bool(prop: any): boolean {
  return prop?.checkbox ?? false
}

function multi(prop: any): string[] {
  return prop?.multi_select?.map((t: any) => t.name) ?? []
}

// ─── Map a Notion page → Activity ─────────────────────────────────────────
function mapPage(page: any): Activity {
  const p = page.properties
  return {
    id:           page.id,
    slug:         text(p['Slug']),
    title:        text(p['Title']),
    subtitle:     text(p['Subtitle']),
    category:     text(p['Category']) as Activity['category'],
    emoji:        text(p['Emoji']),
    photo:        text(p['Photo']),
    bgColor:      text(p['BgColor']) || '#e0f4fb',
    price:        num(p['Price']),
    priceUnit:    text(p['PriceUnit']) as Activity['priceUnit'],
    duration:     text(p['Duration']),
    groupSize:    text(p['GroupSize']),
    location:     text(p['Location']),
    rating:       num(p['Rating']),
    reviewCount:  num(p['ReviewCount']),
    reviewQuote:  text(p['ReviewQuote']),
    reviewAuthor: text(p['ReviewAuthor']),
    description:  text(p['Description']),
    highlights:   text(p['Highlights']).split('\n').filter(Boolean),
    included:     text(p['Included']).split('\n').filter(Boolean),
    bookingUrl:   text(p['BookingUrl']),
    provider:     text(p['Provider']),
    providerUrl:  text(p['ProviderUrl']),
    popular:      bool(p['Popular']),
    isNew:        bool(p['IsNew']),
    tags:         multi(p['Tags']),
  }
}

// ─── Public fetch functions ────────────────────────────────────────────────

export async function getAllActivities(): Promise<Activity[]> {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    sorts: [
      { property: 'Popular', direction: 'descending' },
    ],
  })
  return response.results.map(mapPage)
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: { property: 'Slug', rich_text: { equals: slug } },
  })
  if (!response.results.length) return null
  return mapPage(response.results[0])
}

export async function getFeaturedActivities(): Promise<Activity[]> {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      or: [
        { property: 'Popular', checkbox: { equals: true } },
        { property: 'IsNew',   checkbox: { equals: true } },
      ],
    },
    sorts: [{ property: 'Popular', direction: 'descending' }],
    page_size: 6,
  })
  return response.results.map(mapPage)
}

export async function getAllSlugs(): Promise<string[]> {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter_properties: ['Slug'],
  })
  return response.results
    .map((p: any) => p.properties?.Slug?.rich_text?.[0]?.plain_text)
    .filter(Boolean)
}
