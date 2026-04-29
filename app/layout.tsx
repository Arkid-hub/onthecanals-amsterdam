import { Playfair_Display, DM_Sans, Caveat } from 'next/font/google'
import type { Metadata } from 'next'
import Script from 'next/script'
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${caveat.variable}`}>
      <head>
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        {locales.map((locale) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={locale === 'en' ? siteUrl : `${siteUrl}/${locale}`}
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
