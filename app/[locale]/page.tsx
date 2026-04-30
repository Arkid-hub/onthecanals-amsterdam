import { setRequestLocale } from 'next-intl/server'
import { getFeaturedActivities, getSiteSettings } from '@/lib/data'
import { ActivityCard } from '@/components/ui/ActivityCard'
import { WebsiteJsonLd, ActivityListJsonLd } from '@/components/seo/JsonLd'
import { locales } from '@/i18n'
import NextLink from 'next/link'
import { LazyMap } from '@/components/ui/LazyMap'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const dynamic = 'force-dynamic'

const CATEGORIES = [
  { id: 'self-guided', emoji: '⛵', bg: '#dbeafe', label: 'Self-guided',     count: 4 },
  { id: 'canal-tour',  emoji: '🚣', bg: '#dcfce7', label: 'Canal tours',     count: 3 },
  { id: 'watersport',  emoji: '🏄', bg: '#fef9c3', label: 'Watersport',      count: 3 },
  { id: 'private',     emoji: '🍾', bg: '#ede9fe', label: 'Private & events', count: 2 },
  { id: 'unique',      emoji: '🧘', bg: '#fce7f3', label: 'Unique',          count: 2 },
]

const REVIEWS = [
  { stars: 5, text: "We had the most amazing afternoon on the electric sloep. Super easy to book — everything in one place. Saw parts of the city we'd never have found otherwise.", name: 'Sophie van Dijk', origin: 'Amsterdam', activity: 'Electric boat hire', initials: 'SvD', color: '#0f5e7a', source: 'Google Reviews' },
  { stars: 5, text: "Finally one website that shows everything! Booked the SUP lesson for my partner's birthday. Easy and exactly as expected.", name: 'Thomas Meyer', origin: 'Berlin, Germany', activity: 'SUP lesson', initials: 'TM', color: '#d97706', source: 'Trustpilot' },
  { stars: 5, text: "We organized a hen party on a private cruise — booked in 5 minutes. The canal at sunset was absolutely stunning.", name: 'Anouk Peeters', origin: 'Antwerp, Belgium', activity: 'Private cruise', initials: 'AP', color: '#7c3aed', source: 'Google Reviews' },
]

function lhref(locale: string, path: string) {
  return locale === 'en' ? path : `/${locale}${path}`
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const featured = await getFeaturedActivities()
  const settings = await getSiteSettings()

  return (
    <>
      <WebsiteJsonLd />
      <ActivityListJsonLd activities={featured} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 'clamp(520px, 65vh, 680px)' }}>
        <img
          src={settings.heroPhoto || 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1200&q=75&fm=webp'}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay for contrast — stronger at bottom where text is */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 flex flex-col justify-end h-full pb-2 pt-32">
          <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-4 self-start">
            <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">
              Amsterdam canals · All water activities · One platform
            </span>
          </div>

          <h1 className="font-display font-black text-white leading-[1.05] tracking-tight mb-3"
            style={{ fontSize: 'clamp(34px,5vw,58px)', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
            Everything on the canals,<br />
            <em className="text-sky-300 not-italic font-display">in one place</em>
          </h1>

          <p className="text-white/90 font-medium leading-relaxed mb-5 max-w-xl"
            style={{ fontSize: 'clamp(14px,1.6vw,16px)', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
            From electric boat hire to sunset cruises — discover, compare and book every water activity on the Amsterdam canals. Prices from €14 p.p.
          </p>

          <div className="bg-white rounded-2xl shadow-lg border border-canal/10 overflow-hidden max-w-[560px] mb-4">
            <div className="flex items-center">
              <div className="flex items-center gap-3 px-4 flex-1 min-w-0">
                <span className="text-slate-400">🔍</span>
                <input type="text" placeholder="Boat hire, canal tour, SUP lesson..."
                  className="flex-1 py-4 text-sm text-slate-700 placeholder-slate-300 outline-none bg-transparent min-w-0" />
              </div>
              <div className="w-px h-7 bg-stone-200 flex-shrink-0" />
              <div className="flex items-center gap-2 px-4 flex-shrink-0">
                <span>📅</span>
                <label htmlFor="date-select" className="sr-only">Select date</label>
                <select id="date-select" className="text-sm font-medium text-slate-600 bg-transparent outline-none cursor-pointer">
                  <option>Today</option>
                  <option>This weekend</option>
                  <option>Next week</option>
                  <option>Any date</option>
                </select>
              </div>
              <button className="bg-canal hover:bg-canal-dark text-white text-sm font-bold px-6 py-4 transition-colors flex-shrink-0">
                Search →
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {['⛵ Boat hire','🚣 Canal tour','🏄 SUP lesson','🍾 Private cruise','🛶 Kayak','🚲 Water bike'].map((chip) => (
              <button key={chip} className="text-xs font-semibold text-white border-[1.5px] border-white/30 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 hover:bg-white hover:text-canal-dark transition-all">
                {chip}
              </button>
            ))}
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {[['⭐','4.8','avg. rating'],['⚓','15+','verified providers'],['🌊','14+','activities'],['🌍','7 languages','available']].map(([icon,val,label]) => (
              <div key={label} className="flex items-center gap-1.5 whitespace-nowrap text-xs text-white/70">
                <span>{icon}</span><strong className="text-white font-semibold">{val}</strong><span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="bg-[#f2ece1] py-14">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="text-xs font-bold tracking-widest text-canal uppercase mb-1.5">Choose your adventure</p>
              <h2 className="font-display font-bold text-canal-dark" style={{ fontSize: 'clamp(24px,3vw,32px)' }}>What suits you?</h2>
            </div>
            <NextLink href={lhref(locale, '/activities')} className="text-sm font-semibold text-canal hover:text-canal-dark transition-colors hidden sm:block">
              All categories →
            </NextLink>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {CATEGORIES.map((cat) => (
              <NextLink key={cat.id} href={lhref(locale, `/activities?cat=${cat.id}`)}
                className="card-hover bg-white rounded-2xl border border-stone-200 overflow-hidden text-center">
                <div className="h-24 flex items-center justify-center text-4xl" style={{ backgroundColor: cat.bg }}>
                  {cat.emoji}
                </div>
                <div className="px-2 py-2.5">
                  <p className="text-xs font-bold text-canal-dark leading-tight">{cat.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{cat.count} options</p>
                </div>
              </NextLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ACTIVITIES ── */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="text-xs font-bold tracking-widest text-canal uppercase mb-1.5">Popular this week</p>
              <h2 className="font-display font-bold text-canal-dark" style={{ fontSize: 'clamp(24px,3vw,32px)' }}>Top activities</h2>
            </div>
            <NextLink href={lhref(locale, '/activities')} className="text-sm font-semibold text-canal hover:text-canal-dark transition-colors hidden sm:block">
              All activities →
            </NextLink>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((activity, i) => (
              <ActivityCard key={activity.id} activity={activity} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY THE CANALS ── */}
      <section className="bg-canal-dark py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden h-80 md:h-96 fade-up">
              <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${settings.whyCanalsPhoto || 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80'}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-canal-dark/60 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/15 backdrop-blur border border-white/20 rounded-xl p-3">
                <p className="text-2xl font-bold font-display text-white">100 km</p>
                <p className="text-xs text-white/70">of navigable canals</p>
              </div>
            </div>
            <div className="fade-up">
              <p className="text-xs font-bold tracking-widest text-sky-300 uppercase mb-3">Why the canals?</p>
              <h2 className="font-display font-bold text-white leading-tight mb-4" style={{ fontSize: 'clamp(26px,3.5vw,38px)' }}>
                Amsterdam is best seen<br /><em className="text-sky-300">from the water</em>
              </h2>
              <p className="text-white/90 font-light leading-relaxed text-[17px] mb-8">
                The Grachtengordel — Amsterdam's famous canal ring — is a UNESCO World Heritage site. Over 400 years old, lined with merchant houses, hidden courtyards, and drawbridges that only open by water.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[['165','canals'],['1,500+','houseboats'],['400+','bridges']].map(([num,lbl]) => (
                  <div key={lbl} className="text-center">
                    <p className="font-display font-bold text-sky-300 text-3xl">{num}</p>
                    <p className="text-white/50 text-xs mt-1">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="bg-[#f2ece1] py-14">
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-7">
            <p className="text-xs font-bold tracking-widest text-canal uppercase mb-1.5">Find your spot</p>
            <h2 className="font-display font-bold text-canal-dark" style={{ fontSize: 'clamp(24px,3vw,32px)' }}>Departure points</h2>
            <p className="text-slate-500 text-sm mt-1">Click a pin to see details. Filter by activity type.</p>
          </div>
          <LazyMap locale={locale} />
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold tracking-widest text-canal uppercase mb-1.5">What visitors say</p>
              <h2 className="font-display font-bold text-canal-dark" style={{ fontSize: 'clamp(24px,3vw,32px)' }}>Real experiences</h2>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-amber-400">★★★★★</span>
              <span className="text-sm font-bold text-slate-700">4.8</span>
              <span className="text-sm text-slate-400">· 3,200+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-[#faf7f2] rounded-2xl border border-stone-200 p-5 fade-up"
                style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both' }}>
                <div className="text-amber-400 text-sm mb-3">{'★'.repeat(r.stars)}</div>
                <p className="text-sm text-slate-600 italic leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: r.color }}>{r.initials}</div>
                  <div>
                    <p className="text-sm font-bold text-canal-dark">{r.name}</p>
                    <p className="text-xs text-slate-400">{r.origin} · {r.activity}</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 mt-3">⭐ via {r.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-canal-dark to-canal py-20 text-center px-5">
        <p className="text-xs font-bold tracking-widest text-sky-300 uppercase mb-3">Ready to go?</p>
        <h2 className="font-display font-bold text-white mb-3" style={{ fontSize: 'clamp(26px,4vw,42px)' }}>
          The canals are waiting
        </h2>
        <p className="text-white/85 text-base font-bold max-w-md mx-auto mb-8 leading-relaxed">
          Pick an activity, grab a spot, and experience Amsterdam the way it was meant to be seen — from the water.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <NextLink href={lhref(locale, '/activities')} className="bg-amber hover:bg-amber-dark text-white font-bold text-[15px] px-8 py-4 rounded-xl transition-colors">
            Browse all activities →
          </NextLink>
          <NextLink href={lhref(locale, '/contact')} className="text-white/80 hover:text-white border border-white/25 hover:border-white/50 font-medium text-[15px] px-8 py-4 rounded-xl transition-all">
            Are you a provider?
          </NextLink>
        </div>
      </section>
    </>
  )
}
