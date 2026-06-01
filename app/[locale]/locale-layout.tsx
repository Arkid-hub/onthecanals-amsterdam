import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { locales } from '@/i18n'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const siteUrl = 'https://onthecanals.nl'

function buildUrl(locale: string, path: string = '') {
  return locale === 'en'
    ? `${siteUrl}${path || '/'}`
    : `${siteUrl}/${locale}${path || ''}`
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  return {
    alternates: {
      canonical: buildUrl(locale),
      languages: Object.fromEntries(
        locales.map((l) => [l, buildUrl(l)])
      ),
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}
