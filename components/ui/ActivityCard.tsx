import Link from 'next/link'
import type { Activity } from '@/types'

function optimizeImage(url: string): string {
  if (!url) return url
  // Add Cloudinary transformations
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', '/upload/w_600,q_auto,f_auto/')
  }
  // Add Unsplash optimization
  if (url.includes('images.unsplash.com')) {
    return url.includes('?') ? url.replace(/w=\d+/, 'w=600').replace(/q=\d+/, 'q=75') + '&fm=webp' : url + '?w=600&q=75&fm=webp'
  }
  return url
}

function Stars({ rating }: { rating: number }) {
  const full  = Math.floor(rating)
  const empty = 5 - Math.ceil(rating)
  return (
    <span className="text-amber-400 text-xs tracking-tight">
      {'★'.repeat(full)}{'½'.repeat(Math.ceil(rating) - full)}{'☆'.repeat(empty)}
    </span>
  )
}

const avatarColors: Record<string, string> = {
  SM: '#0f5e7a', LB: '#0f7a9e', AK: '#7c3aed',
  JD: '#d97706', MF: '#059669', RL: '#dc2626',
}

interface Props {
  activity: Activity
  delay?: number
}

export function ActivityCard({ activity, delay = 0 }: Props) {
  const avatarBg = avatarColors[activity.reviewAuthor] || '#0f5e7a'
  const altText = activity.photoAlt || `${activity.title} — wateractiviteit Amsterdam`

  return (
    <article
      className="card-hover bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col fade-up"
      style={{ animationDelay: `${delay}s`, animationFillMode: 'both' }}
    >
      {/* Photo */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <div
          className="photo-zoom absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${optimizeImage(activity.photo)}')` }}
          role="img"
          aria-label={altText}
        />
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          {activity.popular && (
            <span className="text-[10px] font-bold bg-amber text-white px-2.5 py-1 rounded-full">
              Popular
            </span>
          )}
          {activity.isNew && (
            <span className="text-[10px] font-bold bg-canal text-white px-2.5 py-1 rounded-full">
              New
            </span>
          )}
        </div>

        {/* Duration */}
        <div className="absolute bottom-2.5 left-3">
          <span className="text-[11px] font-semibold text-white bg-slate-900/50 backdrop-blur-sm px-2 py-1 rounded-lg">
            ⏱ {activity.duration}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-800 text-[15px] leading-tight mb-1">
          {activity.title}
        </h3>
        <p className="text-xs text-slate-400 mb-3">
          {activity.subtitle} · {activity.location}
        </p>

        {/* Inline review */}
        <div className="flex items-start gap-2.5 bg-canal-light rounded-xl px-3 py-2.5 mb-3">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5"
            style={{ backgroundColor: avatarBg }}
          >
            {activity.reviewAuthor}
          </div>
          <p className="text-[12px] text-slate-600 leading-relaxed italic">
            {activity.reviewQuote}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4 text-xs text-slate-400">
          <Stars rating={activity.rating} />
          <strong className="text-slate-700 font-semibold">{activity.rating}</strong>
          <span>({activity.reviewCount.toLocaleString()} reviews)</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-stone-100 pt-3.5 mt-auto">
          <div>
            <span className="text-xl font-bold text-slate-800">€{activity.price}</span>
            <span className="text-xs text-slate-400 ml-1">/ {activity.priceUnit}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/activities/${activity.slug}`}
              className="text-xs font-semibold text-canal hover:text-canal-dark transition-colors"
            >
              Details
            </Link>
            <a
              href={activity.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-canal hover:bg-canal-dark text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
            >
              Book →
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
