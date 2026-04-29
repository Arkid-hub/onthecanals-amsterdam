'use client'

import { useEffect, useRef, useState } from 'react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

// Departure points with coordinates
const LOCATIONS = [
  { id: 1, name: 'Mokumboot', category: 'self-guided', emoji: '⛵', address: 'Nassaukade 351', lat: 52.3728, lng: 4.8823, price: '€45/hr', slug: 'electric-boat-hire-mokumboot' },
  { id: 2, name: 'Boaty', category: 'self-guided', emoji: '⛵', address: 'De Pijp', lat: 52.3556, lng: 4.8950, price: '€89/boat', slug: 'electric-boat-hire-boaty' },
  { id: 3, name: 'Sloepdelen', category: 'self-guided', emoji: '⛵', address: 'Nassaukade 69', lat: 52.3735, lng: 4.8795, price: '€70/hr', slug: 'electric-boat-hire-sloepdelen' },
  { id: 4, name: 'Eco Boats Amsterdam', category: 'self-guided', emoji: '♻️', address: 'Zandhoek 22', lat: 52.3812, lng: 4.8910, price: '€60/hr', slug: 'electric-boat-hire-eco-boats' },
  { id: 5, name: 'Lovers Canal Cruises', category: 'canal-tour', emoji: '🚣', address: 'Prins Hendrikkade 25', lat: 52.3779, lng: 4.9003, price: '€18/p.p.', slug: 'classic-canal-tour-lovers' },
  { id: 6, name: 'Rederij Kooij', category: 'canal-tour', emoji: '🚣', address: 'Rokin', lat: 52.3723, lng: 4.8952, price: '€14/p.p.', slug: 'classic-canal-tour-rederij-kooij' },
  { id: 7, name: 'Stromma', category: 'canal-tour', emoji: '🚣', address: 'Damrak Pier 4', lat: 52.3756, lng: 4.8989, price: '€14/p.p.', slug: 'classic-canal-tour-stromma' },
  { id: 8, name: 'Captain Jack', category: 'private', emoji: '🍾', address: 'Rijksmuseum steiger', lat: 52.3600, lng: 4.8852, price: '€40/p.p.', slug: 'cruise-captain-jack' },
  { id: 9, name: 'Flagship Amsterdam', category: 'private', emoji: '🍾', address: 'Meerdere locaties', lat: 52.3676, lng: 4.9041, price: '€50/p.p.', slug: 'cruise-flagship-amsterdam' },
  { id: 10, name: 'Voyage Amsterdam', category: 'private', emoji: '⚓', address: 'Op aanvraag', lat: 52.3690, lng: 4.8970, price: '€150/boat', slug: 'cruise-voyage-amsterdam' },
  { id: 11, name: 'Kayak in Amsterdam', category: 'watersport', emoji: '🛶', address: 'Nieuwe Herengracht', lat: 52.3662, lng: 4.9089, price: '€55/p.p.', slug: 'kayak-tour-kayak-in-amsterdam' },
  { id: 12, name: 'Amsterdam Suppen', category: 'watersport', emoji: '🏄', address: 'Amstelpark', lat: 52.3334, lng: 4.8974, price: '€35/p.p.', slug: 'sup-lesson-amsterdam-suppen' },
  { id: 13, name: 'SUP SUP CLUB', category: 'watersport', emoji: '🏄', address: 'Marineterrein', lat: 52.3697, lng: 4.9234, price: '€15/hr', slug: 'sup-rental-supsupclub' },
  { id: 14, name: 'Canal Bike', category: 'self-guided', emoji: '🚲', address: 'Keizersgracht', lat: 52.3642, lng: 4.8840, price: '€24/boat', slug: 'water-bike-canal-bike' },
  { id: 15, name: 'Zeebaard Kayak', category: 'watersport', emoji: '🛶', address: 'Amstel', lat: 52.3581, lng: 4.9072, price: '€45/p.p.', slug: 'kayak-tour-zeebaard' },
]

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
  { id: 'private',     label: 'Private cruises', color: '#8b5cf6' },
]

export function MapComponent({ locale }: { locale: string }) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState<typeof LOCATIONS[0] | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  function lhref(path: string) {
    return locale === 'en' ? path : `/${locale}${path}`
  }

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    import('mapbox-gl').then((mapboxgl) => {
      mapboxgl.default.accessToken = MAPBOX_TOKEN

      const map = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [4.9041, 52.3676],
        zoom: 13,
        attributionControl: false,
      })

      map.addControl(new mapboxgl.default.NavigationControl(), 'top-right')
      map.addControl(new mapboxgl.default.AttributionControl({ compact: true }), 'bottom-right')

      map.on('load', () => {
        setMapLoaded(true)
        mapRef.current = map
        addMarkers(map, mapboxgl.default, 'all')
      })
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  function addMarkers(map: any, mapboxgl: any, category: string) {
    // Remove existing markers
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    const filtered = category === 'all' ? LOCATIONS : LOCATIONS.filter(l => l.category === category)

    filtered.forEach(location => {
      const color = CATEGORY_COLORS[location.category] || '#0a3d52'

      // Custom marker element
      const el = document.createElement('div')
      el.className = 'map-marker'
      el.style.cssText = `
        width: 36px; height: 36px; border-radius: 50% 50% 50% 0;
        background: ${color}; border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transform: rotate(-45deg); cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: transform 0.2s, box-shadow 0.2s;
      `
      const inner = document.createElement('div')
      inner.style.cssText = 'transform: rotate(45deg); font-size: 14px;'
      inner.textContent = location.emoji
      el.appendChild(inner)

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'rotate(-45deg) scale(1.2)'
        el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4)'
      })
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'rotate(-45deg) scale(1)'
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)'
      })
      el.addEventListener('click', () => setSelectedLocation(location))

      const marker = new mapboxgl.Marker(el)
        .setLngLat([location.lng, location.lat])
        .addTo(map)

      markersRef.current.push(marker)
    })
  }

  function handleCategoryChange(category: string) {
    setActiveCategory(category)
    setSelectedLocation(null)
    if (mapRef.current) {
      import('mapbox-gl').then((mapboxgl) => {
        addMarkers(mapRef.current, mapboxgl.default, category)
      })
    }
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-stone-200" style={{ height: 480 }}>
      {/* Map container */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Category filter — top left */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => handleCategoryChange(cat.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all"
            style={{
              backgroundColor: activeCategory === cat.id ? cat.color : 'white',
              color: activeCategory === cat.id ? 'white' : '#374151',
              border: `2px solid ${activeCategory === cat.id ? cat.color : '#e5e7eb'}`,
            }}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Popup card — bottom */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 w-72">
          <button onClick={() => setSelectedLocation(null)}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-lg leading-none">×</button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ backgroundColor: CATEGORY_COLORS[selectedLocation.category] + '20' }}>
              {selectedLocation.emoji}
            </div>
            <div>
              <p className="font-bold text-canal-dark text-sm">{selectedLocation.name}</p>
              <p className="text-xs text-slate-400">{selectedLocation.address}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-800">{selectedLocation.price}</span>
            <a href={lhref(`/activities/${selectedLocation.slug}`)}
              className="bg-canal hover:bg-canal-dark text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">
              View details →
            </a>
          </div>
        </div>
      )}

      {/* Loading state */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-canal-light flex items-center justify-center">
          <div className="text-canal text-sm font-medium">Loading map...</div>
        </div>
      )}
    </div>
  )
}
