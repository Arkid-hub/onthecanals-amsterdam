import { setRequestLocale, getTranslations } from 'next-intl/server'
import { locales } from '@/i18n'
import NextLink from 'next/link'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

function lhref(locale: string, path: string) {
  return locale === 'en' ? path : `/${locale}${path}`
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const t = await getTranslations('about')

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-16">
      <div className="bg-[#0a3d52] pt-12 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-5">
          <span className="text-5xl block mb-4">⚓</span>
          <h1 className="font-display font-black text-white text-4xl mb-3">{t('pageTitle')}</h1>
          <p className="text-white/60 text-lg">{t('pageSub')}</p>
        </div>
      </div>

      <div className="bg-[#0a3d52] overflow-hidden" style={{ height: 32 }}>
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ height: 32, width: '100%' }}>
          <path d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z" fill="#faf7f2" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-12 space-y-12">
        <section>
          <h2 className="font-display font-bold text-canal-dark text-2xl mb-4">{t('storyTitle')}</h2>
          <div className="text-slate-600 leading-relaxed space-y-4">
            <p>{t('storyP1')}</p>
            <p>{t('storyP2')}</p>
          </div>
        </section>

        <section>
          <h2 className="font-display font-bold text-canal-dark text-2xl mb-6">{t('howTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { step: '1', emoji: '🔍', title: t('step1Title'), desc: t('step1Desc') },
              { step: '2', emoji: '⚖️', title: t('step2Title'), desc: t('step2Desc') },
              { step: '3', emoji: '🎉', title: t('step3Title'), desc: t('step3Desc') },
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
          <h2 className="font-display font-bold text-2xl mb-3">{t('providerTitle')}</h2>
          <p className="text-white/65 mb-6">{t('providerSub')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[['Free', t('statFreeLbl')], ['15–25%', t('statCommLbl')], ['1,000+', t('statVisitorsLbl')], ['24h', t('stat24hLbl')]].map(([val,lbl]) => (
              <div key={lbl} className="text-center">
                <p className="font-display font-bold text-sky-300 text-2xl">{val}</p>
                <p className="text-white/50 text-xs mt-1">{lbl}</p>
              </div>
            ))}
          </div>
          <NextLink href={lhref(locale, '/contact')} className="inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
            {t('providerCta')}
          </NextLink>
        </section>
      </div>
    </div>
  )
}
