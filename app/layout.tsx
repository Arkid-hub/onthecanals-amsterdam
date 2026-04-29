import './globals.css'

const siteUrl = 'https://onthecanals.nl'
const locales = ['en', 'de', 'fr', 'it', 'es', 'zh', 'nl']

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        {/* hreflang in <head> — guaranteed correct placement */}
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
