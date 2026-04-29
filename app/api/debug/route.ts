import { NextResponse } from 'next/server'
import { getFeaturedActivities, getAllActivitiesData as getAllActivities } from '@/lib/data'

export const dynamic = 'force-dynamic'

export async function GET() {
  const all = await getAllActivities()
  const featured = await getFeaturedActivities()
  
  return NextResponse.json({
    allCount: all.length,
    featuredCount: featured.length,
    allProviders: all.map(a => ({ title: a.title, provider: a.provider, popular: a.popular, isNew: a.isNew })),
    featuredProviders: featured.map(a => ({ title: a.title, provider: a.provider })),
  })
}