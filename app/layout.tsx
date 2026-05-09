import { Playfair_Display, DM_Sans, Caveat } from 'next/font/google'
import type { Metadata } from 'next'
import Script from 'next/script'
import { getLocale } from 'next-intl/server'
import { headers } from 'next/headers'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-caveat',
  display: 'swap',
})

const siteUrl = 'https://onthecanals.nl'
const locales = ['en', 'de', 'fr', 'it', 'es', 'zh', 'nl']

export const metadata: Metadata = {
  title: {
    template: '%s | OnTheCanals Amsterdam',
    default: 'OnTheCanals Amsterdam — All water activities in one place',
  },
  description: 'Discover, compare and book every water activity on the Amsterdam canals. Electric boat hire, canal tours, SUP lessons, kayak, private cruises and more.',
  metadataBase: new URL(siteUrl),
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  // Build per-page hreflang URLs from the current request path
  const headerList = headers()
  const rawPath = headerList.get('x-pathname') || '/'
  const pathNoLocale = rawPath.replace(/^\/(en|de|fr|it|es|zh|nl)(?=\/|$)/, '') || '/'
  return (
    <html lang={locale} className={`${playfair.variable} ${dmSans.variable} ${caveat.variable}`}>
      <head>
        {/* Preconnect to image CDNs for faster LCP */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://api.mapbox.com" />
        <link rel="dns-prefetch" href="https://api.mapbox.com" />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${pathNoLocale === '/' ? '' : pathNoLocale}`} />
        {locales.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`${siteUrl}${l === 'en' ? '' : `/${l}`}${pathNoLocale === '/' ? '' : pathNoLocale}`}
          />
        ))}
      </head>
      <body>
        {children}
        <Script
          src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"
          data-gyg-partner-id="SA8A0PZ"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
