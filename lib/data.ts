import type { Activity } from '@/types'
import { fallbackActivities } from '@/data/fallback'
import { getAllActivities, getFeaturedActivities as getNotion, getActivityBySlug as getNotionBySlug, getAllSlugs as getNotionSlugs } from './notion'

const hasNotion = !!(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID)

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasNotion) return fallback
  try {
    const result = await fn()
    if (Array.isArray(result) && result.length === 0) return fallback
    return result ?? fallback
  } catch (err) {
    console.warn('[data] Notion error, using fallback:', err)
    return fallback
  }
}

export async function getAllActivitiesData(): Promise<Activity[]> {
  return safe(() => getAllActivities(), fallbackActivities)
}

export async function getFeaturedActivities(): Promise<Activity[]> {
  return safe(
    () => getNotion(),
    fallbackActivities.filter((a) => a.popular || a.isNew)
  )
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  return safe(
    () => getNotionBySlug(slug),
    fallbackActivities.find((a) => a.slug === slug) ?? null
  )
}

export async function getAllSlugs(): Promise<string[]> {
  return safe(
    () => getNotionSlugs(),
    fallbackActivities.map((a) => a.slug)
  )
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  if (!hasNotion) return {}
  try {
    const { getSiteSettings } = await import('./notion')
    return getSiteSettings()
  } catch {
    return {}
  }
}
