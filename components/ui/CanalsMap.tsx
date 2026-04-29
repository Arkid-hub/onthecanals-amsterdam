'use client'

import { useEffect, useRef, useState } from 'react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

const LOCATIONS = [
  { id: 1, name: 'Mokumboot', category: 'self-guided', emoji: '⛵', color: '#3b82f6', lat: 52.3762, lng: 4.8857, address: 'Nassaukade 351', price: '€45/hr', slug: 'electric-boat-hire-mokumboot' },
  { id: 2, name: 'Boaty', category: 'self-guided', emoji: '⛵', color: '#3b82f6', lat: 52.3547, lng: 4.8917, address: 'De Pijp', price: '€89/boat', slug: 'electric-boat-hire-boaty' },
  { id: 3, name: 'Sloepdelen', category: 'self-guided', emoji: '⛵', color: '#3b82f6', lat: 52.3771, lng: 4.8843, address: 'Nassaukade 69', price: '€70/hr', slug: 'electric-boat-hire-sloepdelen' },
  { id: 4, name: 'Eco Boats Amsterdam', category: 'self-guided', emoji: '⛵', color: '#3b82f6', lat: 52.3844, lng: 4.9006, address: 'Zandhoek 22', price: '€60/hr', slug: 'electric-boat-hire-eco-boats' },
  { id: 5, name: 'Lovers Canal Cruises', category: 'canal-tour', emoji: '🚣', color: '#22c55e', lat: 52.3791, lng: 4.9003, address: 'Prins Hendrikkade 25', price: '€18/p.p.', slug: 'classic-canal-tour-lovers' },
  { id: 6, name: 'Rederij Kooij', category: 'canal-tour', emoji: '🚣', color: '#22c55e', lat: 52.3721, lng: 4.8951, address: 'Rokin', price: '€14/p.p.', slug: 'classic-canal-tour-rederij-kooij' },
  { id: 7, name: 'Stromma', category: 'canal-tour', emoji: '🚣', color: '#22c55e', lat: 52.3756, lng: 4.8989, address: 'Damrak Pier 4', price: '€14/p.p.', slug: 'classic-canal-tour-stromma' },
  { id: 8, name: 'Captain Jack Amsterdam', category: 'private', emoji: '🍾', color: '#a855f7', lat: 52.3600, lng: 4.8852, address: 'Rijksmuseum area', price: '€40/p.p.', slug: 'cruise-captain-jack' },
  { id: 9, name: 'Flagship Amsterdam', category: 'private', emoji: '🍾', color: '#a855f7', lat: 52.3676, lng: 4.9041, address: 'Meerdere locaties', price: '€50/p.p.', slug: 'cruise-flagship-amsterdam' },
  { id: 10, name: 'Voyage Amsterdam', category: 'private', emoji: '⚓', color: '#a855f7', lat: 52.3702, lng: 4.8952, address: 'Op aanvraag', price: '€150/boot', slug: 'cruise-voyage-amsterdam' },
  { id: 11, name: 'Kayak in Amsterdam', category: 'watersport', emoji: '🛶', color: '#f59e0b', lat: 52.3631, lng: 4.9198, address: 'Nieuwe Herengracht', price: '€55/p.p.', slug: 'kayak-tour-kayak-in-amsterdam' },
  { id: 12, name: 'Amsterdam Suppen', category: 'watersport', emoji: '🏄', color: '#f59e0b', lat: 52.3369, lng: 4.8707, address: 'Amstelpark', price: '€35/p.p.', slug: 'sup-lesson-amsterdam-suppen' },
  { id: 13, name: 'SUP SUP CLUB', category: 'watersport', emoji: '🏄', color: '#f59e0b', lat: 52.3676, lng: 4.9041, address: 'Marineterrein', price: '€15/hr', slug: 'sup-rental-supsupclub' },
  { id: 14, name: 'Canal Bike', category: 'self-guided', emoji: '🚲', color: '#3b82f6', lat: 52.3628, lng: 4.8909, address: 'Keizersgracht', price: '€24/boot', slug: 'water-bike-canal-bike' },
]

const CATEGORIES = [
  { id: 'all', label: 'All', emoji: '🌊' },
  { id: 'self-guided', label: 'Self-guided', emoji: '⛵', color: '#3b82f6' },
  { id: 'canal-tour', label: 'Canal tours', emoji: '🚣', color: '#22c55e' },
  { id: 'private', label: 'Private', emoji: '🍾', color: '#a855f7' },
  { id: 'watersport', label: 'Watersport', emoji: '🏄', color: '#f59e0b' },
]

export function CanalsMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeLocation, setActiveLocation] = useState<typeof LOCATIONS[0] | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    // Dynamically load mapbox-gl
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js'
    script.onload = () => {
      const mapboxgl = (window as any).mapboxgl
      mapboxgl.accessToken = MAPBOX_TOKEN

      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [4.9041, 52.3676],
        zoom: 13,
      })

      map.addControl(new mapboxgl.NavigationControl(), 'top-right')

      map.on('load', () => {
        setMapLoaded(true)
        addMarkers(map, mapboxgl, 'all')
        mapRef.current = map
      })
    }
    document.head.appendChild(script)

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  function addMarkers(map: any, mapboxgl: any, category: string) {
    // Remove existing markers
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    const filtered = category === 'all' ? LOCATIONS : LOCATIONS.filter(l => l.category === category)

    filtered.forEach(loc => {
      const el = document.createElement('div')
      el.innerHTML = `<div style="
        width: 36px; height: 36px; border-radius: 50%;
        background: ${loc.color}; border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        display: flex; align-items: center; justify-content: center;
        font-size: 16px; cursor: pointer;
        transition: transform 0.15s;
      ">${loc.emoji}</div>`
      el.style.cursor = 'pointer'
      el.addEventListener('mouseenter', () => {
        el.querySelector('div')!.style.transform = 'scale(1.2)'
      })
      el.addEventListener('mouseleave', () => {
        el.querySelector('div')!.style.transform = 'scale(1)'
      })
      el.addEventListener('click', () => setActiveLocation(loc))

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([loc.lng, loc.lat])
        .addTo(map)

      markersRef.current.push(marker)
    })
  }

  function handleCategory(cat: string) {
    setActiveCategory(cat)
    setActiveLocation(null)
    if (mapRef.current && mapLoaded) {
      const mapboxgl = (window as any).mapboxgl
      addMarkers(mapRef.current, mapboxgl, cat)
    }
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-stone-200" style={{ height: 480 }}>
      {/* Map container */}
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Category filter */}
      <div className="absolute top-4 left-4 z-10 flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => handleCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all ${
              activeCategory === cat.id
                ? 'bg-canal-dark text-white'
                : 'bg-white text-slate-700 hover:bg-canal-light'
            }`}>
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Popup */}
      {activeLocation && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 z-10
          bg-white rounded-2xl shadow-xl border border-stone-200 p-4">
          <button onClick={() => setActiveLocation(null)}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-lg leading-none">×</button>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ backgroundColor: activeLocation.color + '20' }}>
              {activeLocation.emoji}
            </div>
            <div>
              <p className="font-bold text-canal-dark text-sm">{activeLocation.name}</p>
              <p className="text-xs text-slate-400">{activeLocation.address}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">{activeLocation.price}</span>
            <a href={`/activities/${activeLocation.slug}`}
              className="bg-canal hover:bg-canal-dark text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">
              View details →
            </a>
          </div>
        </div>
      )}

      {/* Loading state */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-[#e8f4f8] flex items-center justify-center">
          <div className="text-canal text-sm font-medium animate-pulse">Loading map...</div>
        </div>
      )}
    </div>
  )
}
