import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

export const dynamic = 'force-dynamic'

export async function GET() {
  const token = process.env.NOTION_TOKEN
  const dbId = process.env.NOTION_DATABASE_ID

  // Test 1: direct Notion call
  try {
    const notion = new Client({ auth: token })
    const response = await notion.databases.query({ database_id: dbId! })
    const items = response.results.map((page: any) => ({
      title: page.properties?.Title?.title?.[0]?.plain_text,
      provider: page.properties?.Provider?.rich_text?.[0]?.plain_text,
      popular: page.properties?.Popular?.checkbox,
    }))

    return NextResponse.json({
      source: 'notion_direct',
      count: items.length,
      items,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message, token: token?.substring(0, 10) })
  }
}