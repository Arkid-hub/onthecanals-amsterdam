'use client'

import { useEffect, useRef, useState } from 'react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

const LOCATIONS = [
  { id: 1,  name: 'Mokumboot',           category: 'self-guided', emoji: '⛵', address: 'Nassaukade 351',        lat: 52.3728, lng: 4.8823, price: '€45/hr',    slug: 'electric-boat-hire-mokumboot' },
  { id: 2,  name: 'Boaty',               category: 'self-guided', emoji: '⛵', address: 'De Pijp',               lat: 52.3556, lng: 4.8950, price: '€89/boat',  slug: 'electric-boat-hire-boaty' },
  { id: 3,  name: 'Sloepdelen',          category: 'self-guided', emoji: '⛵', address: 'Nassaukade 69',          lat: 52.3735, lng: 4.8795, price: '€70/hr',    slug: 'electric-boat-hire-sloepdelen' },
  { id: 4,  name: 'Eco Boats Amsterdam', category: 'self-guided', emoji: '♻️', address: 'Zandhoek 22',           lat: 52.3812, lng: 4.8910, price: '€60/hr',    slug: 'electric-boat-hire-eco-boats' },
  { id: 5,  name: 'Canal Bike',          category: 'self-guided', emoji: '🚲', address: 'Keizersgracht',         lat: 52.3642, lng: 4.8840, price: '€24/boat',  slug: 'water-bike-canal-bike' },
  { id: 6,  name: 'Lovers Canal Cruises',category: 'canal-tour',  emoji: '🚣', address: 'Prins Hendrikkade 25',  lat: 52.3779, lng: 4.9003, price: '€18/p.p.', slug: 'classic-canal-tour-lovers' },
  { id: 7,  name: 'Rederij Kooij',       category: 'canal-tour',  emoji: '🚣', address: 'Rokin',                 lat: 52.3723, lng: 4.8952, price: '€14/p.p.', slug: 'classic-canal-tour-rederij-kooij' },
  { id: 8,  name: 'Stromma',             category: 'canal-tour',  emoji: '🚣', address: 'Damrak Pier 4',         lat: 52.3756, lng: 4.8989, price: '€14/p.p.', slug: 'classic-canal-tour-stromma' },
  { id: 9,  name: 'Captain Jack',        category: 'private',     emoji: '🍾', address: 'Rijksmuseum steiger',   lat: 52.3600, lng: 4.8852, price: '€40/p.p.', slug: 'cruise-captain-jack' },
  { id: 10, name: 'Flagship Amsterdam',  category: 'private',     emoji: '🍾', address: 'Meerdere locaties',     lat: 52.3676, lng: 4.9041, price: '€50/p.p.', slug: 'cruise-flagship-amsterdam' },
  { id: 11, name: 'Voyage Amsterdam',    category: 'private',     emoji: '⚓', address: 'Op aanvraag',           lat: 52.3690, lng: 4.8970, price: '€150/boat', slug: 'cruise-voyage-amsterdam' },
  { id: 12, name: 'Kayak in Amsterdam',  category: 'watersport',  emoji: '🛶', address: 'Nieuwe Herengracht',    lat: 52.3662, lng: 4.9089, price: '€55/p.p.', slug: 'kayak-tour-kayak-in-amsterdam' },
  { id: 13, name: 'Zeebaard Kayak',      category: 'watersport',  emoji: '🛶', address: 'Amstel',                lat: 52.3581, lng: 4.9072, price: '€45/p.p.', slug: 'kayak-tour-zeebaard' },
  { id: 14, name: 'Amsterdam Suppen',    category: 'watersport',  emoji: '🏄', address: 'Amstelpark',            lat: 52.3334, lng: 4.8974, price: '€35/p.p.', slug: 'sup-lesson-amsterdam-suppen' },
  { id: 15, name: 'SUP SUP CLUB',        category: 'watersport',  emoji: '🏄', address: 'Marineterrein',         lat: 52.3697, lng: 4.9234, price: '€15/hr',   slug: 'sup-rental-supsupclub' },
]

const CATEGORY_COLORS: Record<string, string> = {
  'self-guided': '#3b82f6',
  'canal-tour':  '#10b981',
  'watersport':  '#f59e0b',
  'private':     '#8b5cf6',
}

const CATEGORIES = [
  { id: 'all',         label: 'All',            color: '#0a3d52' },
  { id: 'self-guided', label: 'Boat hire',       color: '#3b82f6' },
  { id: 'canal-tour',  label: 'Canal tours',     color: '#10b981' },
  { id: 'watersport',  label: 'Watersport',      color: '#f59e0b' },
  { id: 'private',     label: 'Private cruises', color: '#8b5cf6' },
]

type Location = typeof LOCATIONS[0]

export function MapComponent({ locale }: { locale: string }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [selected, setSelected] = useState<Location | null>(null)
  const [mapReady, setMapReady] = useState(false)

  function lhref(path: string) {
    return locale === 'en' ? path : `/${locale}${path}`
  }

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    // Add mapbox CSS
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
        center: [4.9041, 52.3676],
        zoom: 13,
      })

      map.addControl(new mapboxgl.NavigationControl(), 'top-right')

      map.on('load', () => {
        map.resize()
        mapRef.current = map
        setMapReady(true)
      })

      // Resize when container changes size
      const ro = new ResizeObserver(() => map.resize())
      if (mapContainer.current) ro.observe(mapContainer.current)

      return () => {
        ro.disconnect()
        markersRef.current.forEach(m => m.remove())
        markersRef.current = []
        map.remove()
        mapRef.current = null
      }
  }, [])

  // Add markers when map is ready or category changes
  useEffect(() => {
    if (!mapReady || !mapRef.current) return

    import('mapbox-gl').then((mod) => {
      const mapboxgl = mod.default

      // Remove old markers
      markersRef.current.forEach(m => m.remove())
      markersRef.current = []

      const filtered = activeCategory === 'all'
        ? LOCATIONS
        : LOCATIONS.filter(l => l.category === activeCategory)

      filtered.forEach(location => {
        const color = CATEGORY_COLORS[location.category] || '#0a3d52'

        const el = document.createElement('div')
        el.style.cssText = `
          width: 38px;
          height: 38px;
          border-radius: 50% 50% 50% 0;
          background-color: ${color};
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
          transform: rotate(-45deg);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        `

        const inner = document.createElement('span')
        inner.style.cssText = 'transform: rotate(45deg); font-size: 15px; line-height: 1; display: block;'
        inner.textContent = location.emoji
        el.appendChild(inner)

        el.addEventListener('mouseenter', () => {
          el.style.transform = 'rotate(-45deg) scale(1.25)'
          el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.45)'
        })
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'rotate(-45deg) scale(1)'
          el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.35)'
        })
        el.addEventListener('click', () => setSelected(location))

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([location.lng, location.lat])
          .addTo(mapRef.current)

        markersRef.current.push(marker)
      })
    })
  }, [mapReady, activeCategory])

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-stone-200" style={{ height: '480px', minHeight: '480px' }}>
      <div ref={mapContainer} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }} />

      {/* Loading */}
      {!mapReady && (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center z-10">
          <p className="text-canal text-sm font-medium animate-pulse">Loading map…</p>
        </div>
      )}

      {/* Category filters */}
      {mapReady && (
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2 max-w-xs">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setSelected(null) }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all"
              style={{
                backgroundColor: activeCategory === cat.id ? cat.color : 'white',
                color: activeCategory === cat.id ? 'white' : '#374151',
                border: `2px solid ${activeCategory === cat.id ? cat.color : '#e5e7eb'}`,
              }}>
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Popup */}
      {selected && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 w-72">
          <button
            onClick={() => setSelected(null)}
            className="absolute top-2 right-3 text-slate-400 hover:text-slate-700 text-xl font-light leading-none">
            ×
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ backgroundColor: (CATEGORY_COLORS[selected.category] || '#0a3d52') + '20' }}>
              {selected.emoji}
            </div>
            <div>
              <p className="font-bold text-canal-dark text-sm leading-tight">{selected.name}</p>
              <p className="text-xs text-slate-400">{selected.address}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-800">{selected.price}</span>
            <a href={lhref(`/activities/${selected.slug}`)}
              className="bg-canal hover:bg-canal-dark text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">
              View details →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
