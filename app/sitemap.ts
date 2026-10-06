import { MetadataRoute } from 'next'
import { locales } from '@/i18n'
import { getAllActivitiesData } from '@/lib/data'
import { getAllBlogPosts } from '@/lib/notion'

const siteUrl = 'https://onthecanals.nl'

function url(path: string) {
  return `${siteUrl}${path}`
}

function localePath(locale: string, path: string) {
  return locale === 'en' ? path || '/' : `/${locale}${path}`
}

function alternatesFor(path: string) {
  return {
    languages: Object.fromEntries(
      locales.map((l) => [l, url(localePath(l, path))])
    ),
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Static pages
  const staticPages = ['', '/activities', '/about', '/contact', '/blog', '/privacy', '/terms']

  // Custom landing pages
  const landingPages = ['/electric-boat-rental-amsterdam']

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: url(localePath(locale, page)),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1.0 : page === '/activities' ? 0.9 : 0.8,
      alternates: alternatesFor(page),
    }))
  )

  const landingEntries = locales.flatMap((locale) =>
    landingPages.map((page) => ({
      url: url(localePath(locale, page)),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
      alternates: alternatesFor(page),
    }))
  )

  // Activity detail pages
  let activitySlugs: string[] = []
  try {
    const activities = await getAllActivitiesData()
    activitySlugs = activities.map((a) => a.slug)
  } catch {
    // silent fallback
  }

  const activityEntries = locales.flatMap((locale) =>
    activitySlugs.map((slug) => ({
      url: url(localePath(locale, `/activities/${slug}`)),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: alternatesFor(`/activities/${slug}`),
    }))
  )

  // Blog posts
  let blogSlugs: string[] = []
  try {
    const posts = await getAllBlogPosts()
    blogSlugs = posts.map((p) => p.slug)
  } catch {
    // ignore
  }

  const blogEntries = locales.flatMap((locale) =>
    blogSlugs.map((slug) => ({
      url: url(localePath(locale, `/blog/${slug}`)),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: alternatesFor(`/blog/${slug}`),
    }))
  )

  return [...staticEntries, ...landingEntries, ...activityEntries, ...blogEntries]
}
