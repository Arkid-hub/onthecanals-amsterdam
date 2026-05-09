'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { LOCATIONS, type MapLocation } from '@/data/map-locations'


const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!


const CATEGORY_COLORS: Record<string, string> = {
  'self-guided': '#3b82f6',
  'canal-tour':  '#10b981',
  'watersport':  '#f59e0b',
  'private':     '#8b5cf6',
  'unique':      '#ec4899',
}

const CATEGORIES = [
  { id: 'all',         label: 'All',            color: '#0a3d52' },
  { id: 'self-guided', label: 'Boat hire',       color: '#3b82f6' },
  { id: 'canal-tour',  label: 'Canal tours',     color: '#10b981' },
  { id: 'watersport',  label: 'Watersport',      color: '#f59e0b' },
  { id: 'private',     label: 'Cruises',         color: '#8b5cf6' },
  { id: 'unique',      label: 'Unique',          color: '#ec4899' },
]

type Location = MapLocation

export function MapComponent({ locale, validSlugs }: { locale: string; validSlugs?: string[] }) {
  const validSet = validSlugs ? new Set(validSlugs) : null
  const tMap = useTranslations('map')
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [selected, setSelected] = useState<Location | null>(null)
  const [mapReady, setMapReady] = useState(false)

  function lhref(path: string) {
    return locale === 'en' ? path : `/${locale}${path}`
  }

  function getGeoJSON(category: string) {
    const filtered = category === 'all' ? LOCATIONS : LOCATIONS.filter(l => l.category === category)
    return {
      type: 'FeatureCollection' as const,
      features: filtered.map(loc => ({
        type: 'Feature' as const,
        geometry: { type: 'Point' as const, coordinates: [loc.lng, loc.lat] },
        properties: {
          id: loc.id,
          name: loc.name,
          category: loc.category,
          address: loc.address,
          price: loc.price,
          slug: loc.slug,
          color: CATEGORY_COLORS[loc.category] || '#0a3d52',
        },
      })),
    }
  }

  useEffect(() => {
    if (!mapContainer.current) return

    if (!document.getElementById('mapbox-css')) {
      const link = document.createElement('link')
      link.id = 'mapbox-css'
      link.rel = 'stylesheet'
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css'
      document.head.appendChild(link)
    }

    import('mapbox-gl').then((mod) => {
      const mapboxgl = mod.default
      mapboxgl.accessToken = MAPBOX_TOKEN

      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [4.9100, 52.3820],
        zoom: 11.8,
      })

      map.addControl(new mapboxgl.NavigationControl(), 'top-right')

      map.on('load', () => {
        map.addSource('locations', {
          type: 'geojson',
          data: getGeoJSON('all'),
        })

        map.addLayer({
          id: 'location-circles',
          type: 'circle',
          source: 'locations',
          paint: {
            'circle-radius': 12,
            'circle-color': ['get', 'color'],
            'circle-stroke-width': 3,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 0.95,
          },
        })

        map.addLayer({
          id: 'location-labels',
          type: 'symbol',
          source: 'locations',
          layout: {
            'text-field': ['get', 'name'],
            'text-size': 11,
            'text-offset': [0, 1.6],
            'text-anchor': 'top',
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          },
          paint: {
            'text-color': '#1e3a5f',
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
          },
        })

        map.on('click', 'location-circles', (e: any) => {
          const props = e.features[0].properties
          const loc = LOCATIONS.find(l => l.id === props.id)
          if (loc) setSelected(loc)
        })

        map.on('mouseenter', 'location-circles', () => {
          map.getCanvas().style.cursor = 'pointer'
        })
        map.on('mouseleave', 'location-circles', () => {
          map.getCanvas().style.cursor = ''
        })

        mapRef.current = map
        setMapReady(true)
      })
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapReady || !mapRef.current) return
    const source = mapRef.current.getSource('locations')
    if (source) source.setData(getGeoJSON(activeCategory))
    setSelected(null)
  }, [mapReady, activeCategory])

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-stone-200" style={{ height: '480px' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />

      {!mapReady && (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center z-10">
          <p className="text-canal text-sm font-medium animate-pulse">{tMap('loading')}</p>
        </div>
      )}

      {mapReady && (
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2 max-w-sm">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all"
              style={{
                backgroundColor: activeCategory === cat.id ? cat.color : 'white',
                color: activeCategory === cat.id ? 'white' : '#374151',
                border: `2px solid ${activeCategory === cat.id ? cat.color : '#e5e7eb'}`,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 w-72">
          <button
            onClick={() => setSelected(null)}
            aria-label="Close"
            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-slate-700 hover:text-white bg-stone-100 hover:bg-canal-dark text-lg font-semibold leading-none transition-colors"
          >×</button>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ backgroundColor: (CATEGORY_COLORS[selected.category] || '#0a3d52') + '25' }}
            >
              {selected.emoji}
            </div>
            <div>
              <p className="font-bold text-canal-dark text-sm leading-tight">{selected.name}</p>
              <p className="text-xs text-slate-400">{selected.address}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-800">{selected.price}</span>
            {(!validSet || validSet.has(selected.slug)) ? (
              <a
                href={lhref(`/activities/${selected.slug}`)}
                className="bg-canal hover:bg-canal-dark text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
              >
                View details →
              </a>
            ) : (
              <span className="text-xs text-slate-400 italic">Coming soon</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
