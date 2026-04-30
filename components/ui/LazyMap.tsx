'use client'

import { useEffect, useRef, useState } from 'react'
import nextDynamic from 'next/dynamic'

const MapComponent = nextDynamic(
  () => import('@/components/ui/MapComponent').then(m => m.MapComponent),
  {
    ssr: false,
    loading: () => (
      <div className="w-full rounded-2xl bg-canal-light flex items-center justify-center" style={{ height: 480 }}>
        <p className="text-canal text-sm font-medium animate-pulse">Loading map…</p>
      </div>
    ),
  }
)

export function LazyMap({ locale }: { locale: string }) {
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
        <MapComponent locale={locale} />
      ) : (
        <div className="w-full rounded-2xl bg-canal-light" style={{ height: 480 }} />
      )}
    </div>
  )
}
