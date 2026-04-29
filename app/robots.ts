import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://onthecanals.nl/sitemap.xml',
    host: 'https://onthecanals.nl',
  }
}
