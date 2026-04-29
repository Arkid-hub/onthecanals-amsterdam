import { NextResponse } from 'next/server'

export async function GET() {
  const token = process.env.NOTION_TOKEN
  const dbId = process.env.NOTION_DATABASE_ID

  if (!token || !dbId) {
    return NextResponse.json({ 
      error: 'Missing env vars',
      hasToken: !!token,
      hasDbId: !!dbId
    })
  }

  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
    const data = await res.json()
    return NextResponse.json({
      status: res.status,
      resultCount: data.results?.length ?? 0,
      firstItem: data.results?.[0]?.properties?.Title?.title?.[0]?.plain_text ?? 'no title',
      firstProvider: data.results?.[0]?.properties?.Provider?.rich_text?.[0]?.plain_text ?? 'no provider',
      error: data.message ?? null,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message })
  }
}
