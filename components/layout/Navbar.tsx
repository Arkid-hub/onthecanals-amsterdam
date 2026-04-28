'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const LANGS = [
  { code: 'EN', flag: '🇬🇧', label: 'English' },
  { code: 'DE', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'FR', flag: '🇫🇷', label: 'Français' },
  { code: 'IT', flag: '🇮🇹', label: 'Italiano' },
  { code: 'ES', flag: '🇪🇸', label: 'Español' },
  { code: 'ZH', flag: '🇨🇳', label: '中文' },
  { code: 'NL', flag: '🇳🇱', label: 'Nederlands' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [activeLang, setActiveLang] = useState(LANGS[0])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-100' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="font-display font-bold text-lg flex-shrink-0">
          <span className={scrolled ? 'text-canal-dark' : 'text-white drop-shadow-sm'}>
            OnThe<span className={scrolled ? 'text-amber' : 'text-yellow-200'}>Canals</span>.Amsterdam
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { href: '/activities', label: 'Activities' },
            { href: '/activities?cat=self-guided', label: 'Self-guided' },
            { href: '/activities?cat=private', label: 'Groups' },
            { href: '/about', label: 'About' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                scrolled ? 'text-slate-600 hover:text-canal-dark' : 'text-white/90 hover:text-white drop-shadow-sm'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                scrolled
                  ? 'bg-canal-light text-canal border border-blue-100'
                  : 'bg-white/20 backdrop-blur text-white border border-white/30'
              }`}
            >
              <span>{activeLang.flag}</span>
              <span>{activeLang.code}</span>
              <span className="text-[10px] opacity-60">▾</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden min-w-[160px] z-50">
                {LANGS.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setActiveLang(lang); setLangOpen(false) }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                      activeLang.code === lang.code
                        ? 'bg-canal-light text-canal font-semibold'
                        : 'text-slate-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Book CTA */}
          <Link
            href="/activities"
            className="hidden md:inline-flex items-center gap-1 bg-amber text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-amber-dark transition-colors"
          >
            Book now
          </Link>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-1 ${scrolled ? 'text-slate-700' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-5 py-4 space-y-1">
          {[
            { href: '/activities', label: 'All activities' },
            { href: '/activities?cat=self-guided', label: 'Self-guided' },
            { href: '/activities?cat=canal-tour', label: 'Canal tours' },
            { href: '/activities?cat=watersport', label: 'Watersport' },
            { href: '/activities?cat=private', label: 'Private & groups' },
            { href: '/about', label: 'About us' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-canal-light hover:text-canal rounded-xl transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
