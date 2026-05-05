import { Client } from '@notionhq/client'
import type { Activity } from '@/types'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const DATABASE_ID = process.env.NOTION_DATABASE_ID!

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

function num(prop: any): number { return prop?.number ?? 0 }
function bool(prop: any): boolean { return prop?.checkbox ?? false }
function multi(prop: any): string[] {
  return prop?.multi_select?.map((t: any) => t.name) ?? []
}

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
    photoAlt:     text(p['PhotoAlt']),
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

// No sorts — we sort in code to avoid Notion API errors
export async function getAllActivities(): Promise<Activity[]> {
  const response = await notion.databases.query({ database_id: DATABASE_ID })
  return response.results
    .map(mapPage)
    .sort((a, b) => {
      if (a.popular && !b.popular) return -1
      if (!a.popular && b.popular) return 1
      return b.reviewCount - a.reviewCount
    })
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
  const response = await notion.databases.query({ database_id: DATABASE_ID })
  return response.results
    .map(mapPage)
    .filter(a => a.popular || a.isNew)
    .slice(0, 6)
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

// ─── Site Settings ────────────────────────────────────────────────────────────
const SETTINGS_DATABASE_ID = process.env.NOTION_SETTINGS_DATABASE_ID!

export async function getSiteSettings(): Promise<Record<string, string>> {
  const response = await notion.databases.query({
    database_id: SETTINGS_DATABASE_ID,
  })
  
  const settings: Record<string, string> = {}
  for (const page of response.results) {
    const p = (page as any).properties
    const key = p['Key']?.title?.[0]?.plain_text
    const value = p['Value']?.rich_text?.[0]?.plain_text
    if (key && value) settings[key] = value
  }
  return settings
}

// ─── Blog ─────────────────────────────────────────────────────────────────────
const BLOG_DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID!

export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  coverImage: string
  coverImageAlt: string
  category: string
  publishedAt: string
  body: string
  tags: string[]
}

function mapBlogPost(page: any): BlogPost {
  const p = page.properties
  return {
    id:            page.id,
    slug:          text(p['Slug']),
    title:         text(p['Title']),
    description:   text(p['Description']),
    coverImage:    text(p['CoverImage']),
    coverImageAlt: text(p['CoverImageAlt']),
    category:      text(p['Category']),
    publishedAt:   p['PublishedAt']?.date?.start ?? '',
    body:          text(p['Body']),
    tags:          multi(p['Tags']),
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const response = await notion.databases.query({
    database_id: BLOG_DATABASE_ID,
    filter: { property: 'Published', checkbox: { equals: true } },
  })
  return response.results
    .map(mapBlogPost)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const response = await notion.databases.query({
    database_id: BLOG_DATABASE_ID,
    filter: {
      and: [
        { property: 'Slug', rich_text: { equals: slug } },
        { property: 'Published', checkbox: { equals: true } },
      ],
    },
  })
  if (!response.results.length) return null
  return mapBlogPost(response.results[0])
}

export async function getBlogPostBlocks(pageId: string): Promise<string> {
  const response = await notion.blocks.children.list({ block_id: pageId })
  
  const lines: string[] = []
  
  for (const block of response.results as any[]) {
    const b = block as any
    switch (b.type) {
      case 'paragraph':
        const text = b.paragraph.rich_text.map((t: any) => t.plain_text).join('')
        if (text) lines.push(text)
        break
      case 'heading_1':
        lines.push('# ' + b.heading_1.rich_text.map((t: any) => t.plain_text).join(''))
        break
      case 'heading_2':
        lines.push('## ' + b.heading_2.rich_text.map((t: any) => t.plain_text).join(''))
        break
      case 'heading_3':
        lines.push('### ' + b.heading_3.rich_text.map((t: any) => t.plain_text).join(''))
        break
      case 'bulleted_list_item':
        lines.push('• ' + b.bulleted_list_item.rich_text.map((t: any) => t.plain_text).join(''))
        break
      case 'numbered_list_item':
        lines.push('- ' + b.numbered_list_item.rich_text.map((t: any) => t.plain_text).join(''))
        break
      case 'quote':
        lines.push('"' + b.quote.rich_text.map((t: any) => t.plain_text).join('') + '"')
        break
      case 'divider':
        lines.push('---')
        break
    }
  }
  
  return lines.join('\n')
}

