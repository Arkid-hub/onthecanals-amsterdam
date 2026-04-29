import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import NextLink from 'next/link'
import { getActivityBySlug, getAllActivitiesData } from '@/lib/data'
import { ActivityJsonLd } from '@/components/seo/JsonLd'
import { ActivityCard } from '@/components/ui/ActivityCard'
import { locales } from '@/i18n'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type Props = { params: { locale: string; slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activity = await getActivityBySlug(params.slug)
  if (!activity) return {}
  return {
    title: activity.title,
    description: activity.description,
    openGraph: {
      title: activity.title,
      description: activity.description,
      images: [{ url: activity.photo, alt: activity.photoAlt || activity.title }],
    },
  }
}

const categoryLabels: Record<string, string> = {
  'self-guided': 'Self-guided', 'canal-tour': 'Canal tour',
  'watersport': 'Watersport', 'private': 'Private & events', 'unique': 'Unique',
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const empty = 5 - Math.ceil(rating)
  return (
    <span className="text-amber-400">
      {'★'.repeat(full)}{'½'.repeat(Math.ceil(rating) - full)}{'☆'.repeat(empty)}
    </span>
  )
}

function lhref(locale: string, path: string) {
  return locale === 'en' ? path : `/${locale}${path}`
}

export default async function ActivityDetailPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale)
  const activity = await getActivityBySlug(slug)
  if (!activity) notFound()

  const all = await getAllActivitiesData()
  const related = all
    .filter(a => a.category === activity.category && a.id !== activity.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-16">
      <ActivityJsonLd activity={activity} />

      {/* Hero */}
      <div className="bg-[#0a3d52] pt-12 pb-0">
        <div className="max-w-5xl mx-auto px-5">
          <NextLink href={lhref(locale, '/activities')}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
            ← Back to all activities
          </NextLink>

          <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{ backgroundColor: activity.bgColor }}>
              {activity.emoji}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-semibold bg-white/10 text-white/80 px-3 py-1 rounded-full">
                  {categoryLabels[activity.category]}
                </span>
                {activity.popular && (
                  <span className="text-xs font-semibold bg-amber text-white px-3 py-1 rounded-full">Popular</span>
                )}
                {activity.isNew && (
                  <span className="text-xs font-semibold bg-canal text-white px-3 py-1 rounded-full">New</span>
                )}
              </div>
              <h1 className="font-display font-black text-white text-3xl md:text-4xl mb-2">{activity.title}</h1>
              <p className="text-white/60 text-lg">{activity.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Photo */}
        <div className="max-w-5xl mx-auto px-5">
          <div className="relative rounded-t-2xl overflow-hidden h-64 md:h-96"
            style={{ backgroundImage: `url('${activity.photo}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            role="img" aria-label={activity.photoAlt || activity.title} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left — main info */}
          <div className="md:col-span-2 space-y-8">

            {/* Quick facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                ['⏱', 'Duration', activity.duration],
                ['👥', 'Group size', activity.groupSize],
                ['📍', 'Location', activity.location],
                ['⭐', 'Rating', `${activity.rating} (${activity.reviewCount} reviews)`],
              ].map(([icon, label, value]) => (
                <div key={label} className="bg-white rounded-xl border border-stone-200 p-4 text-center">
                  <div className="text-2xl mb-1">{icon}</div>
                  <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-canal-dark">{value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="font-display font-bold text-canal-dark text-xl mb-3">About this activity</h2>
              <p className="text-slate-600 leading-relaxed">{activity.description}</p>
            </div>

            {/* Highlights */}
            {activity.highlights?.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-canal-dark text-xl mb-3">Highlights</h2>
                <ul className="space-y-2">
                  {activity.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                      <span className="text-canal mt-0.5">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Included */}
            {activity.included?.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-canal-dark text-xl mb-3">What's included</h2>
                <ul className="space-y-2">
                  {activity.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Review */}
            {activity.reviewQuote && (
              <div className="bg-canal-light rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <Stars rating={activity.rating} />
                  <span className="font-bold text-canal-dark">{activity.rating}</span>
                  <span className="text-slate-400 text-sm">· {activity.reviewCount.toLocaleString()} reviews</span>
                </div>
                <p className="text-slate-600 italic leading-relaxed mb-3">"{activity.reviewQuote}"</p>
                <p className="text-sm font-semibold text-canal-dark">— {activity.reviewAuthor}</p>
              </div>
            )}
          </div>

          {/* Right — booking card */}
          <div className="md:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl border border-stone-200 shadow-lg p-6">
              <div className="mb-4">
                <span className="text-3xl font-bold text-slate-800">€{activity.price}</span>
                <span className="text-slate-400 text-sm ml-1">/ {activity.priceUnit}</span>
              </div>

              <div className="space-y-3 mb-6 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-medium text-slate-800">{activity.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Group size</span>
                  <span className="font-medium text-slate-800">{activity.groupSize}</span>
                </div>
                <div className="flex justify-between">
                  <span>Provider</span>
                  <a href={activity.providerUrl} target="_blank" rel="noopener noreferrer"
                    className="font-medium text-canal hover:underline">{activity.provider}</a>
                </div>
              </div>

              <a href={activity.bookingUrl} target="_blank" rel="noopener noreferrer"
                className="block w-full bg-amber hover:bg-amber-dark text-white font-bold text-center py-4 rounded-xl transition-colors text-lg">
                Book now →
              </a>
              <p className="text-xs text-slate-400 text-center mt-3">
                You'll be taken to {activity.provider}'s website to complete your booking.
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display font-bold text-canal-dark text-2xl mb-6">Similar activities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((a, i) => (
                <ActivityCard key={a.id} activity={a} delay={i * 0.07} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
