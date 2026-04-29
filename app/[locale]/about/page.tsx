import { setRequestLocale } from 'next-intl/server'
import { locales } from '@/i18n'
import NextLink from 'next/link'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

function lhref(locale: string, path: string) {
  return locale === 'en' ? path : `/${locale}${path}`
}

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-16">
      <div className="bg-[#0a3d52] pt-12 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-5">
          <span className="text-5xl block mb-4">⚓</span>
          <h1 className="font-display font-black text-white text-4xl mb-3">About OnTheCanals</h1>
          <p className="text-white/60 text-lg">The platform for everyone who wants to discover Amsterdam on the water.</p>
        </div>
      </div>

      <div className="bg-[#0a3d52] overflow-hidden" style={{ height: 32 }}>
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ height: 32, width: '100%' }}>
          <path d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z" fill="#faf7f2" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-12 space-y-12">
        <section>
          <h2 className="font-display font-bold text-canal-dark text-2xl mb-4">Our story</h2>
          <div className="text-slate-600 leading-relaxed space-y-4">
            <p>Amsterdam has over 100 kilometres of canals and dozens of providers of water activities. But as a tourist it was nearly impossible to get an overview. You had to search ten different websites, compare prices, read reviews — while all you really wanted was to be on the water.</p>
            <p>OnTheCanals.Amsterdam solves that. We bring all water activities together on one platform: from classic canal tours and electric boats to SUP lessons, kayak and private cruises. Compare, choose and book — all in one place, in 7 languages.</p>
          </div>
        </section>

        <section>
          <h2 className="font-display font-bold text-canal-dark text-2xl mb-6">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { step: '1', emoji: '🔍', title: 'Discover', desc: 'Browse all activities on the canals and filter by your preferences.' },
              { step: '2', emoji: '⚖️', title: 'Compare', desc: 'View prices, ratings and details side by side.' },
              { step: '3', emoji: '🎉', title: 'Book', desc: 'Book directly with the provider via their own secure system.' },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-2xl border border-stone-200 p-6 text-center">
                <div className="w-9 h-9 rounded-full bg-canal-dark text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">{item.step}</div>
                <div className="text-3xl mb-2">{item.emoji}</div>
                <h3 className="font-bold text-canal-dark mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-canal-dark rounded-2xl p-8 text-white">
          <h2 className="font-display font-bold text-2xl mb-3">Are you a provider on the canals?</h2>
          <p className="text-white/65 mb-6">Join OnTheCanals.Amsterdam and reach thousands of tourists per month. Free to sign up, commission-based model.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[['Free','to sign up'],['15–25%','commission'],['1,000+','visitors/month'],['24h','live after signup']].map(([val,lbl]) => (
              <div key={lbl} className="text-center">
                <p className="font-display font-bold text-sky-300 text-2xl">{val}</p>
                <p className="text-white/50 text-xs mt-1">{lbl}</p>
              </div>
            ))}
          </div>
          <NextLink href={lhref(locale, '/contact')} className="inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
            Sign up as a provider →
          </NextLink>
        </section>
      </div>
    </div>
  )
}
