import { Playfair_Display, DM_Sans, Caveat } from 'next/font/google'
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${playfair.variable} ${dmSans.variable} ${caveat.variable}`}>
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
      <body>{children}</body>
    </html>
  )
}
