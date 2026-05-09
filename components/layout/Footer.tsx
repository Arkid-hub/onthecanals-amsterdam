import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'

const ACTIVITY_CATEGORIES: { tkey: string, href: string }[] = [
  { tkey: 'selfGuided', href: '/activities?cat=self-guided' },
  { tkey: 'canalTour',  href: '/activities?cat=canal-tour' },
  { tkey: 'watersport', href: '/activities?cat=watersport' },
  { tkey: 'private',    href: '/activities?cat=private' },
  { tkey: 'unique',     href: '/activities?cat=unique' },
]

const PLATFORM: { tkey: string, ns: 'nav' | 'footer', href: string }[] = [
  { tkey: 'canalGuide',     ns: 'nav',    href: '/blog' },
  { tkey: 'about',          ns: 'footer', href: '/about' },
  { tkey: 'becomeProvider', ns: 'footer', href: '/contact#provider' },
  { tkey: 'contact',        ns: 'footer', href: '/contact' },
  { tkey: 'privacy',        ns: 'footer', href: '/privacy' },
  { tkey: 'terms',          ns: 'footer', href: '/terms' },
]

function lhref(locale: string, path: string) {
  return locale === 'en' ? path : `/${locale}${path}`
}

export async function Footer() {
  const tFoot = await getTranslations('footer')
  const tNav  = await getTranslations('nav')
  const tFx   = await getTranslations('footerExtras')
  const tCat  = await getTranslations('categories')
  const locale = await getLocale()
  return (
    <footer className="bg-[#0a3d52] text-white/60">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <svg width="200" height="52" viewBox="0 0 260 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4"  y1="2"  x2="18" y2="16" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <line x1="18" y1="2"  x2="4"  y2="16" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <line x1="4"  y1="20" x2="18" y2="34" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <line x1="18" y1="20" x2="4"  y2="34" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <line x1="4"  y1="38" x2="18" y2="52" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <line x1="18" y1="38" x2="4"  y2="52" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M6,59 C8,55 10,62 11,59 C12,56 14,61 16,59" stroke="#7dd3ea" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85"/>
                <text x="28" y="30" fontFamily="var(--font-caveat), cursive" fontSize="34" fontWeight="700" fill="white" letterSpacing="-0.5">OnTheCanals</text>
                <text x="33" y="47" fontFamily="var(--font-dm-sans), sans-serif" fontSize="9" fill="rgba(255,255,255,0.35)" letterSpacing="2.5">of Amsterdam</text>
              </svg>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              {tFoot('desc')}
            </p>
            <p className="text-xs text-white/30 leading-relaxed max-w-xs mt-3">
              {tFx('affiliate')}{' '}
              <Link href={lhref(locale, "/privacy#affiliate")} className="underline hover:text-white/60 transition-colors">{tFx('learnMore')}</Link>
            </p>
          </div>

          {/* Activities */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">{tFoot('activitiesTitle')}</p>
            <ul className="space-y-2">
              {ACTIVITY_CATEGORIES.map(({ tkey, href }) => (
                <li key={href}>
                  <Link href={lhref(locale, href)} className="text-sm hover:text-white transition-colors">{tCat(tkey)}</Link>
                </li>
              ))}
              <li>
                <Link href={lhref(locale, '/activities')} className="text-sm font-semibold text-white/80 hover:text-white transition-colors">{tCat('all')}</Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">{tFoot('platformTitle')}</p>
            <ul className="space-y-2">
              {PLATFORM.map(({ tkey, ns, href }) => (
                <li key={href}>
                  <Link href={lhref(locale, href)} className="text-sm hover:text-white transition-colors">{ns === 'nav' ? tNav(tkey) : tFoot(tkey)}</Link>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-4">📍 {tFx('amsterdam')}</p>
            <p className="text-sm">🌍 EN · DE · FR · IT · ES · 中文 · NL</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <span>© {new Date().getFullYear()} OnTheCanals.Amsterdam. {tFoot('rights')}</span>
          <div className="flex gap-4">
            <Link href={lhref(locale, "/privacy")} className="hover:text-white transition-colors">{tFoot('privacyLink')}</Link>
            <Link href={lhref(locale, "/terms")} className="hover:text-white transition-colors">{tFoot('terms')}</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">{tFoot('sitemap')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
