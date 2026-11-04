'use client'

import { useState, useEffect, useTransition } from 'react'
import NextLink from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'es', label: 'Español' },
  { code: 'zh', label: '中文' },
  { code: 'nl', label: 'Nederlands' },
]

function lhref(locale: string, path: string) {
  return locale === 'en' ? path : `/${locale}${path}`
}

function Logo({ scrolled }: { scrolled: boolean }) {
  const c = scrolled ? '#0a3d52' : 'white'
  const w = scrolled ? '#0f7a9e' : '#7dd3ea'
  const s = scrolled ? '#9ca3af' : 'rgba(255,255,255,0.55)'
  return (
    <svg width="220" height="52" viewBox="0 0 260 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="4"  y1="2"  x2="18" y2="16" stroke={c} strokeWidth="3" strokeLinecap="round"/>
      <line x1="18" y1="2"  x2="4"  y2="16" stroke={c} strokeWidth="3" strokeLinecap="round"/>
      <line x1="4"  y1="20" x2="18" y2="34" stroke={c} strokeWidth="3" strokeLinecap="round"/>
      <line x1="18" y1="20" x2="4"  y2="34" stroke={c} strokeWidth="3" strokeLinecap="round"/>
      <line x1="4"  y1="38" x2="18" y2="52" stroke={c} strokeWidth="3" strokeLinecap="round"/>
      <line x1="18" y1="38" x2="4"  y2="52" stroke={c} strokeWidth="3" strokeLinecap="round"/>
      <path d="M6,59 C8,55 10,62 11,59 C12,56 14,61 16,59" stroke={w} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8"/>
      <text x="28" y="30" fontFamily="var(--font-caveat), cursive" fontSize="34" fontWeight="700" fill={c} letterSpacing="-0.5">OnTheCanals</text>
      <text x="33" y="47" fontFamily="var(--font-dm-sans), sans-serif" fontSize="9" fill={s} letterSpacing="2.5">of Amsterdam</text>
    </svg>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [, startTransition] = useTransition()

  const locale   = useLocale()
  const t        = useTranslations('nav')
  const tCat     = useTranslations('categories')
  const tFoot    = useTranslations('footer')
  const router   = useRouter()
  const pathname = usePathname()
  const active   = LANGS.find(l => l.code === locale) || LANGS[0]

  const isHomePage = pathname === '/' || /^\/(de|fr|it|es|zh|nl)\/?$/.test(pathname)

  useEffect(() => {
    if (!isHomePage) { setScrolled(true); return }
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [isHomePage])

  function switchLocale(next: string) {
    setLangOpen(false)
    const stripped = pathname.replace(/^\/(en|de|fr|it|es|zh|nl)/, '') || '/'
    const basePath = next === 'en' ? stripped : `/${next}${stripped}`
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    startTransition(() => router.push(`${basePath}${hash}`, { scroll: false }))
  }

  // Two palettes: transparent hero vs white scrolled
  const navLink = scrolled
    ? 'text-[13px] font-medium text-slate-500 hover:text-canal-dark tracking-wide transition-colors'
    : 'text-[13px] font-medium text-white/80 hover:text-white tracking-wide transition-colors'

  const langBtn = scrolled
    ? 'text-[13px] font-medium text-slate-400 hover:text-slate-700 tracking-widest transition-colors flex items-center gap-0.5'
    : 'text-[13px] font-medium text-white/70 hover:text-white tracking-widest transition-colors flex items-center gap-0.5'

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/98 backdrop-blur-sm border-b border-slate-100' : ''
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <NextLink href={lhref(locale, '/')} aria-label="OnTheCanals Amsterdam" className="flex-shrink-0 mt-1">
            <Logo scrolled={scrolled} />
          </NextLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            <NextLink href={lhref(locale, '/activities')}             className={navLink}>{t('activities')}</NextLink>
            <NextLink href={lhref(locale, '/activities?cat=self-guided')} className={navLink}>{t('selfGuided')}</NextLink>
            <NextLink href={lhref(locale, '/activities?cat=private')} className={navLink}>{t('groups')}</NextLink>
            <NextLink href={lhref(locale, '/blog')}                   className={navLink}>{t('canalGuide')}</NextLink>
            <NextLink href={lhref(locale, '/about')}                  className={navLink}>{t('about')}</NextLink>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-5">

            {/* Language — bare text, no pill, no icon */}
            <div className="relative hidden md:block">
              <button onClick={() => setLangOpen(!langOpen)} className={langBtn}>
                {active.code.toUpperCase()}
                <svg className="w-2.5 h-2.5 mt-px" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden min-w-[152px] z-50 py-1">
                  {LANGS.map(l => (
                    <button key={l.code} onClick={() => switchLocale(l.code)}
                      className={`w-full text-left flex items-center gap-3 px-4 py-2 text-[13px] transition-colors ${
                        locale === l.code
                          ? 'text-canal-dark font-semibold'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                      }`}>
                      <span className="w-6 text-[11px] font-bold text-slate-300">{l.code.toUpperCase()}</span>
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Book now — amber on white, white on hero */}
            <NextLink href={lhref(locale, '/activities')}
              className={`hidden md:inline-flex items-center text-[13px] font-semibold px-4 py-2 rounded-lg transition-all ${
                scrolled
                  ? 'bg-amber text-white hover:bg-amber-dark'
                  : 'bg-canal text-white hover:bg-canal-dark'
              }`}>
              {t('bookNow')}
            </NextLink>

            {/* Hamburger */}
            <button
              className={`md:hidden p-1 ${scrolled ? 'text-slate-600' : 'text-white'}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close' : 'Menu'}
              aria-expanded={menuOpen}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-5 py-5">
            <div className="space-y-0.5">
              {[
                { path: '/activities',                 label: t('activities') },
                { path: '/activities?cat=self-guided', label: tCat('selfGuided') },
                { path: '/activities?cat=canal-tour',  label: tCat('canalTour') },
                { path: '/activities?cat=watersport',  label: tCat('watersport') },
                { path: '/activities?cat=private',     label: tCat('private') },
                { path: '/blog',                       label: t('canalGuide') },
                { path: '/about',                      label: t('about') },
                { path: '/contact',                    label: tFoot('contact') },
              ].map(({ path, label }) => (
                <NextLink key={path} href={lhref(locale, path)}
                  className="block py-2.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  onClick={() => setMenuOpen(false)}>
                  {label}
                </NextLink>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex gap-3 flex-wrap">
              {LANGS.map(l => (
                <button key={l.code} onClick={() => { switchLocale(l.code); setMenuOpen(false) }}
                  className={`text-xs tracking-widest transition-colors ${
                    locale === l.code ? 'text-canal-dark font-semibold' : 'text-slate-300 hover:text-slate-600'
                  }`}>
                  {l.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
