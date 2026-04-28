import { fallbackActivities } from '@/data/fallback'
import { ActivityCard } from '@/components/ui/ActivityCard'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return fallbackActivities.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activity = fallbackActivities.find(a => a.slug === params.slug)
  if (!activity) return {}
  return { title: activity.title, description: activity.description }
}

const categoryLabels: Record<string, string> = {
  'self-guided': 'Self-guided', 'canal-tour': 'Canal tour',
  'watersport': 'Watersport', 'private': 'Private & events', 'unique': 'Unique',
}

export default function ActivityDetailPage({ params }: Props) {
  const activity = fallbackActivities.find(a => a.slug === params.slug)
  if (!activity) notFound()

  const related = fallbackActivities
    .filter(a => a.category === activity.category && a.id !== activity.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-16">
      {/* Hero */}
      <div className="bg-[#0a3d52] pt-12 pb-16">
        <div className="max-w-4xl mx-auto px-5">
          <Link href="/activities" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
            ← Back to all activities
          </Link>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{ backgroundColor: activity.bgColor }}>
              {activity.emoji}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-semibold bg-white/10 text-white/80 px-3 py-1 rounded-full">
                  {categoryLabels[activity.category]}
                </span>
                {activity.popular && <span className="text-[10px] font-bold bg-amber text-white px-2.5 py-1 rounded-full">Popular</span>}
                {activity.isNew && <span className="text-[10px] font-bold bg-canal text-white px-2.5 py-1 rounded-full">New</span>}
              </div>
              <h1 className="font-display font-black text-white text-3xl md:text-4xl mb-2">{activity.title}</h1>
              <p className="text-white/60 text-lg mb-4">{activity.subtitle}</p>
              <div className="flex flex-wrap gap-4 text-sm text-white/50">
                <span>⭐ {activity.rating} ({activity.reviewCount?.toLocaleString()} reviews)</span>
                <span>⏱ {activity.duration}</span>
                <span>👥 {activity.groupSize}</span>
                <span>📍 {activity.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="bg-[#0a3d52] overflow-hidden" style={{ height: 32 }}>
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ height: 32, width: '100%' }}>
          <path d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z" fill="#faf7f2" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display font-bold text-canal-dark text-xl mb-3">About this activity</h2>
              <p className="text-slate-600 leading-relaxed">{activity.description}</p>
            </div>
            {activity.highlights?.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-canal-dark text-xl mb-4">Highlights</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activity.highlights.map(h => (
                    <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-canal font-bold mt-0.5">✓</span>{h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activity.included?.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-canal-dark text-xl mb-4">What's included</h2>
                <div className="bg-canal-light rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activity.included.map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-canal-dark">
                      <span className="w-5 h-5 rounded-full bg-canal/20 flex items-center justify-center text-xs flex-shrink-0">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-white rounded-2xl border border-stone-200 p-5">
              <h2 className="font-bold text-canal-dark mb-3">Provided by</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-canal">{activity.provider}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{activity.location}</p>
                </div>
                <a href={activity.providerUrl} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-semibold text-canal hover:text-canal-dark transition-colors">
                  Website →
                </a>
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-stone-200 shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-canal-dark">€{activity.price}</span>
                  <span className="text-slate-400 text-sm">/ {activity.priceUnit}</span>
                </div>
                <p className="text-xs text-slate-400 mb-5">Prices may vary per provider</p>
                <div className="space-y-3 mb-5 text-sm text-slate-500">
                  {[['Duration', activity.duration], ['Group size', activity.groupSize], ['Location', activity.location]].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-1 border-b border-stone-50 last:border-0">
                      <span>{label}</span>
                      <span className="font-semibold text-canal-dark">{value}</span>
                    </div>
                  ))}
                </div>
                <a href={activity.bookingUrl} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center bg-amber hover:bg-amber-dark text-white font-bold py-4 rounded-xl transition-colors text-base">
                  Book at {activity.provider} →
                </a>
                <p className="text-xs text-center text-slate-400 mt-3">You book directly with the provider</p>
              </div>
              <div className="bg-canal-light px-6 py-3 border-t border-stone-100">
                <p className="text-xs text-canal text-center">🔒 Safe · ⭐ {activity.rating} / 5 · {activity.reviewCount?.toLocaleString()} reviews</p>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display font-bold text-canal-dark text-2xl mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((a, i) => <ActivityCard key={a.id} activity={a} delay={i * 0.07} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
