import { Suspense } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { getAllActivitiesData } from '@/lib/data'
import { locales } from '@/i18n'
import { ActivitiesClient } from './ActivitiesClient'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const dynamic = 'force-dynamic'

export default async function ActivitiesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const activities = await getAllActivitiesData()

  return (
    <Suspense>
      <ActivitiesClient activities={activities} />
    </Suspense>
  )
}
