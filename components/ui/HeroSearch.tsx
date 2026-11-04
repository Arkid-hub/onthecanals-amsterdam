'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'

export function HeroSearch() {
  const t      = useTranslations('hero')
  const router = useRouter()
  const locale = useLocale()
  const [q, setQ] = useState('')

  function lhref(path: string) {
    return locale === 'en' ? path : `/${locale}${path}`
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const target = q.trim()
      ? `${lhref('/activities')}?q=${encodeURIComponent(q.trim())}`
      : lhref('/activities')
    router.push(target)
  }

  return (
    <form onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden max-w-[540px] mb-4">
      <div className="flex items-center">
        <div className="flex items-center gap-3 px-4 flex-1 min-w-0">
          <svg className="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="7"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
          <input type="text" placeholder={t('searchPlaceholder')}
            value={q} onChange={e => setQ(e.target.value)}
            className="flex-1 py-4 text-sm text-slate-700 placeholder-slate-300 outline-none bg-transparent min-w-0" />
        </div>
        <button type="submit"
          className="bg-amber hover:bg-amber-dark text-white text-sm font-bold px-6 self-stretch transition-colors flex-shrink-0 flex items-center">
          {t('search')}
        </button>
      </div>
    </form>
  )
}
