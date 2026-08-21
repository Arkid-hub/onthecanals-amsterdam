import { Suspense } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { getAllActivitiesData } from '@/lib/data'
import { locales } from '@/i18n'
import { ActivitiesClient } from './ActivitiesClient'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Amsterdam canal activities — boat hire, tours, SUP & more',
  description: 'Browse and book all water activities on the Amsterdam canals. Electric boat hire, canal tours, SUP lessons, kayak, private cruises and water bikes. Prices from €14 p.p.',
}

export default async function ActivitiesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const activities = await getAllActivitiesData()

  return (
    <Suspense>
      <ActivitiesClient activities={activities} />
    </Suspense>
  )
}
