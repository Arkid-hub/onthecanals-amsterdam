'use client'

import { useState, useEffect, useTransition } from 'react'
import NextLink from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const LANGS = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'it', flag: '🇮🇹', label: 'Italiano' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
  { code: 'nl', flag: '🇳🇱', label: 'Nederlands' },
]

function lhref(locale: string, path: string) {
  return locale === 'en' ? path : `/${locale}${path}`
}

function Logo({ scrolled }: { scrolled: boolean }) {
  const c = scrolled ? '#0a3d52' : 'white'
  const w = scrolled ? '#0f7a9e' : '#7dd3ea'
  const s = scrolled ? '#9ca3af' : 'rgba(255,255,255,0.6)'
  return (
    <svg width="230" height="56" viewBox="0 0 260 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="4"  y1="2"  x2="18" y2="16" stroke={c} strokeWidth="3" strokeLinecap="round"/>
      <line x1="18" y1="2"  x2="4"  y2="16" stroke={c} strokeWidth="3" strokeLinecap="round"/>
      <line x1="4"  y1="20" x2="18" y2="34" stroke={c} strokeWidth="3" strokeLinecap="round"/>
      <line x1="18" y1="20" x2="4"  y2="34" stroke={c} strokeWidth="3" strokeLinecap="round"/>
      <line x1="4"  y1="38" x2="18" y2="52" stroke={c} strokeWidth="3" strokeLinecap="round"/>
      <line x1="18" y1="38" x2="4"  y2="52" stroke={c} strokeWidth="3" strokeLinecap="round"/>
      <path d="M6,59 C8,55 10,62 11,59 C12,56 14,61 16,59" stroke={w} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.85"/>
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
  const sp       = useSearchParams()
  const active   = LANGS.find(l => l.code === locale) || LANGS[0]

  // Only homepage gets transparent navbar — all other pages start solid
  const isHomePage = pathname === '/' || /^\/(de|fr|it|es|zh|nl)\/?$/.test(pathname)

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true)
      return
    }
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [isHomePage])

  function switchLocale(next: string) {
    setLangOpen(false)
    const stripped = pathname.replace(/^\/(en|de|fr|it|es|zh|nl)/, '') || '/'
    const basePath = next === 'en' ? stripped : `/${next}${stripped}`
    const qs       = sp?.toString()
    const hash     = typeof window !== 'undefined' ? window.location.hash : ''
    const newPath  = `${basePath}${qs ? `?${qs}` : ''}${hash}`
    startTransition(() => router.push(newPath, { scroll: false }))
  }

  const isLight = scrolled
  const linkCls = `text-sm font-semibold transition-colors ${isLight ? 'text-slate-700 hover:text-canal-dark' : 'text-white hover:text-white/80'}`

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-100' : ''}`}>
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">

          <NextLink href={lhref(locale, '/')} aria-label="OnTheCanals Amsterdam — homepage" className="mt-1">
            <Logo scrolled={scrolled} />
          </NextLink>

          <nav className="hidden md:flex items-center gap-6">
            <NextLink href={lhref(locale, '/activities')} className={linkCls}>{t('activities')}</NextLink>
            <NextLink href={lhref(locale, '/activities?cat=self-guided')} className={linkCls}>{t('selfGuided')}</NextLink>
            <NextLink href={lhref(locale, '/activities?cat=private')} className={linkCls}>{t('groups')}</NextLink>
            <NextLink href={lhref(locale, '/blog')} className={linkCls}>{t('canalGuide')}</NextLink>
            <NextLink href={lhref(locale, '/about')} className={linkCls}>{t('about')}</NextLink>
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                  scrolled ? 'bg-canal-light text-canal border border-blue-100' : 'bg-white/20 backdrop-blur text-white border border-white/30'
                }`}>
                <span>{active.flag}</span>
                <span>{active.code.toUpperCase()}</span>
                <span className="text-[10px] opacity-60">▾</span>
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden min-w-[160px] z-50">
                  {LANGS.map(lang => (
                    <button key={lang.code} onClick={() => switchLocale(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                        locale === lang.code ? 'bg-canal-light text-canal font-semibold' : 'text-slate-700 hover:bg-stone-50'
                      }`}>
                      <span>{lang.flag}</span><span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <NextLink href={lhref(locale, '/activities')}
              className="hidden md:inline-flex bg-amber text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-amber-dark transition-colors">
              {t('bookNow')}
            </NextLink>

            <button
              className={`md:hidden p-1 ${scrolled ? 'text-slate-700' : 'text-white'}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 px-5 py-4 space-y-1">
            {[
              { path: '/activities',                      label: t('activities') },
              { path: '/activities?cat=self-guided',      label: tCat('selfGuided') },
              { path: '/activities?cat=canal-tour',       label: tCat('canalTour') },
              { path: '/activities?cat=watersport',       label: tCat('watersport') },
              { path: '/activities?cat=private',          label: tCat('private') },
              { path: '/about',                           label: t('about') },
              { path: '/contact',                         label: tFoot('contact') },
            ].map(({ path, label }) => (
              <NextLink key={path} href={lhref(locale, path)}
                className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-canal-light hover:text-canal rounded-xl transition-colors"
                onClick={() => setMenuOpen(false)}>
                {label}
              </NextLink>
            ))}
          </div>
        )}
      </header>
    </>
  )
}
