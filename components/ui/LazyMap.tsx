'use client'

import { useEffect, useRef, useState } from 'react'
import nextDynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

function LoadingFallback() {
  const t = useTranslations('map')
  return (
    <div className="w-full rounded-2xl bg-canal-light flex items-center justify-center" style={{ height: 480 }}>
      <p className="text-canal text-sm font-medium animate-pulse">{t('loading')}</p>
    </div>
  )
}

const MapComponent = nextDynamic(
  () => import('@/components/ui/MapComponent').then(m => m.MapComponent),
  {
    ssr: false,
    loading: () => <LoadingFallback />,
  }
)

export function LazyMap({ locale, validSlugs }: { locale: string; validSlugs?: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' } // start loading 200px before visible
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {visible ? (
        <MapComponent locale={locale} validSlugs={validSlugs} />
      ) : (
        <div className="w-full rounded-2xl bg-canal-light" style={{ height: 480 }} />
      )}
    </div>
  )
}
