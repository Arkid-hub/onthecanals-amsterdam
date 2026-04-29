import Link from 'next/link'

const ACTIVITIES = [
  ['Electric boat hire',    '/activities/electric-boat-hire'],
  ['Classic canal tour',    '/activities/classic-canal-tour'],
  ['SUP lesson',            '/activities/sup-lesson-beginners'],
  ['Private cruise',        '/activities/private-borrel-cruise'],
  ['Water bike rental',     '/activities/water-bike-rental'],
  ['Kayak rental',          '/activities/kayak-rental'],
]

const PLATFORM = [
  ['About us',          '/about'],
  ['Become a provider', '/contact#provider'],
  ['Contact',           '/contact'],
  ['Privacy policy',    '/privacy'],
]

export function Footer() {
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
              The platform for all water activities on the Amsterdam canals. Compare, discover and book — in 7 languages.
            </p>
          </div>

          {/* Activities */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">Activities</h4>
            <ul className="space-y-2">
              {ACTIVITIES.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4">Platform</h4>
            <ul className="space-y-2">
              {PLATFORM.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-4">📍 Amsterdam, Netherlands</p>
            <p className="text-sm">🌍 EN · DE · FR · IT · ES · 中文 · NL</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <span>© {new Date().getFullYear()} OnTheCanals.Amsterdam. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
