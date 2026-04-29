import { MetadataRoute } from 'next'
import { locales } from '@/i18n'
import { fallbackActivities } from '@/data/fallback'

const siteUrl = 'https://onthecanals.nl'

function url(path: string) {
  return `${siteUrl}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static pages per locale
  const staticPages = ['', '/activities', '/about', '/contact']

  const localePages = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: locale === 'en' ? url(page || '/') : url(`/${locale}${page}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            l,
            l === 'en' ? url(page || '/') : url(`/${l}${page}`),
          ])
        ),
      },
    }))
  )

  // Activity detail pages (English only for now, Google will follow hreflang)
  const activityPages = fallbackActivities.map((activity) => ({
    url: url(`/activities/${activity.slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...localePages, ...activityPages]
}
