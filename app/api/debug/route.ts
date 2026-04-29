import { NextResponse } from 'next/server'
import { getFeaturedActivities } from '@/lib/data'

export const dynamic = 'force-dynamic'

export async function GET() {
  const token = process.env.NOTION_TOKEN
  const dbId = process.env.NOTION_DATABASE_ID

  try {
    const activities = await getFeaturedActivities()
    return NextResponse.json({
      hasToken: !!token,
      hasDbId: !!dbId,
      tokenPrefix: token?.substring(0, 8) ?? 'none',
      activitiesCount: activities.length,
      firstProvider: activities[0]?.provider ?? 'none',
      firstTitle: activities[0]?.title ?? 'none',
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message })
  }
}