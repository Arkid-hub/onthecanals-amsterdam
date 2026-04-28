import type { Activity } from '@/types'
import { fallbackActivities } from '@/data/fallback'

async function withFallback<T>(
  fn: () => Promise<T>,
  fallback: T
): Promise<T> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
    return fallback
  }
  try {
    const result = await fn()
    // If Notion returns empty array, use fallback
    if (Array.isArray(result) && result.length === 0) return fallback
    return result
  } catch (err) {
    console.warn('[onthecanals] Notion fetch failed, using fallback')
    return fallback
  }
}

export async function getAllActivities(): Promise<Activity[]> {
  return withFallback(
    async () => {
      const { getAllActivities } = await import('./notion')
      return getAllActivities()
    },
    fallbackActivities
  )
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  return withFallback(
    async () => {
      const { getActivityBySlug } = await import('./notion')
      return getActivityBySlug(slug)
    },
    fallbackActivities.find((a) => a.slug === slug) ?? null
  )
}

export async function getFeaturedActivities(): Promise<Activity[]> {
  return withFallback(
    async () => {
      const { getFeaturedActivities } = await import('./notion')
      return getFeaturedActivities()
    },
    fallbackActivities.filter((a) => a.popular || a.isNew)
  )
}

export async function getAllSlugs(): Promise<string[]> {
  return withFallback(
    async () => {
      const { getAllSlugs } = await import('./notion')
      return getAllSlugs()
    },
    fallbackActivities.map((a) => a.slug)
  )
}
