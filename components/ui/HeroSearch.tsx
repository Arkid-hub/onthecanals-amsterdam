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
      className="bg-white rounded-2xl shadow-lg border border-canal/10 overflow-hidden max-w-[560px] mb-4">
      <div className="flex items-center">
        <div className="flex items-center gap-3 px-4 flex-1 min-w-0">
          <span className="text-slate-400">🔍</span>
          <input type="text" placeholder={t('searchPlaceholder')}
            value={q} onChange={e => setQ(e.target.value)}
            className="flex-1 py-4 text-sm text-slate-700 placeholder-slate-300 outline-none bg-transparent min-w-0" />
        </div>
        <button type="submit"
          className="bg-canal hover:bg-canal-dark text-white text-sm font-bold px-6 py-4 transition-colors flex-shrink-0">
          {t('search')}
        </button>
      </div>
    </form>
  )
}
