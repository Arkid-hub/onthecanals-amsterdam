'use client'

import { useEffect, useRef, useState } from 'react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

const LOCATIONS = [
  // ── SELF-GUIDED ───────────────────────────────────────────────────────────

  // Canal Motorboats (5 locaties)
  { id: 1,  name: 'Canal Motorboats',     category: 'self-guided', emoji: '⛵', address: 'Zandhoek 22',            lat: 52.3879, lng: 4.8903, price: '€89/boat',  slug: 'self-drive-boat-rental-canal-motorboats' },
  { id: 2,  name: 'Canal Motorboats',     category: 'self-guided', emoji: '⛵', address: 'Nassaukade 341',         lat: 52.3678, lng: 4.8768, price: '€89/boat',  slug: 'self-drive-boat-rental-canal-motorboats' },
  { id: 3,  name: 'Canal Motorboats',     category: 'self-guided', emoji: '⛵', address: 'Westerdoksdijk 705',     lat: 52.3891, lng: 4.8913, price: '€89/boat',  slug: 'self-drive-boat-rental-canal-motorboats' },
  { id: 4,  name: 'Canal Motorboats',     category: 'self-guided', emoji: '⛵', address: 'Polonceaukade 20',       lat: 52.3858, lng: 4.8719, price: '€89/boat',  slug: 'self-drive-boat-rental-canal-motorboats' },
  { id: 5,  name: 'Canal Motorboats',     category: 'self-guided', emoji: '⛵', address: 'Borneosteiger 8',        lat: 52.3698, lng: 4.9377, price: '€89/boat',  slug: 'self-drive-boat-rental-canal-motorboats' },

  // Eco Boats / Captain For a Day
  { id: 6,  name: 'Captain For a Day',    category: 'self-guided', emoji: '♻️', address: 'Zandhoek 22',           lat: 52.3880, lng: 4.8905, price: '€50/hr',    slug: 'captain-for-a-day-eco-boats' },

  // Boaty
  { id: 7,  name: 'Boaty',               category: 'self-guided', emoji: '⛵', address: 'Leidsekade 97',          lat: 52.3629, lng: 4.8820, price: '€89/boat',  slug: 'electric-boat-hire-boaty' },

  // Boats4rent
  { id: 8,  name: 'Boats4rent',          category: 'self-guided', emoji: '⛵', address: 'Nassaukade 155',         lat: 52.3714, lng: 4.8741, price: '€69/boat',  slug: 'self-drive-boat-rental-boats4rent' },

  // Canal Bike (waterfiets)
  { id: 9,  name: 'Canal Bike',          category: 'self-guided', emoji: '🚲', address: 'Keizersgracht',         lat: 52.3635, lng: 4.8826, price: '€24/boot',  slug: 'water-bike-rental-canal-bike' },
  { id: 10, name: 'Canal Bike',          category: 'self-guided', emoji: '🚲', address: 'Rijksmuseum / Stadhouderskade', lat: 52.3596, lng: 4.8885, price: '€24/boot', slug: 'water-bike-rental-canal-bike' },

  // ── CANAL TOURS ───────────────────────────────────────────────────────────

  // Stromma
  { id: 11, name: 'Stromma Canal Tour',  category: 'canal-tour',  emoji: '🚣', address: 'Damrak Pier 4',         lat: 52.3756, lng: 4.8989, price: '€14/p.p.',  slug: 'classic-canal-tour-stromma' },

  // Lovers / NEMO combo
  { id: 12, name: 'Lovers / NEMO Cruise',category: 'canal-tour',  emoji: '🚣', address: 'Prins Hendrikkade 25',  lat: 52.3779, lng: 4.9003, price: '€32/p.p.',  slug: 'canal-cruise-nemo-science-museum' },

  // ── PRIVATE & DRINKS ──────────────────────────────────────────────────────

  // Flagship Amsterdam (3 locaties)
  { id: 13, name: 'Flagship Amsterdam',  category: 'private',     emoji: '🍾', address: 'Prins Hendrikkade 33A', lat: 52.3783, lng: 4.9007, price: '€50/p.p.',  slug: 'cruise-flagship-amsterdam' },
  { id: 14, name: 'Flagship Amsterdam',  category: 'private',     emoji: '🍾', address: 'Museumbrug 1',          lat: 52.3597, lng: 4.8852, price: '€50/p.p.',  slug: 'cruise-flagship-amsterdam' },
  { id: 15, name: 'Flagship Amsterdam',  category: 'private',     emoji: '🍾', address: 'Prinsengracht 267',     lat: 52.3752, lng: 4.8839, price: '€50/p.p.',  slug: 'cruise-flagship-amsterdam' },

  // Captain Jack (2 locaties)
  { id: 16, name: 'Captain Jack',        category: 'private',     emoji: '🍾', address: 'Prins Hendrikkade 33A', lat: 52.3784, lng: 4.9009, price: '€40/p.p.',  slug: 'cruise-captain-jack' },
  { id: 17, name: 'Captain Jack',        category: 'private',     emoji: '🍾', address: 'Museumbrug 2',          lat: 52.3596, lng: 4.8855, price: '€40/p.p.',  slug: 'cruise-captain-jack' },

  // Stromma Pizza Cruise
  { id: 18, name: 'Pizza Cruise Stromma',category: 'private',     emoji: '🍕', address: 'Damrak Pier 4',         lat: 52.3757, lng: 4.8990, price: '€42/p.p.',  slug: 'cruise-pizza-stromma' },

  // Voyage Amsterdam
  { id: 19, name: 'Voyage Amsterdam',    category: 'private',     emoji: '⚓', address: 'Op aanvraag',           lat: 52.3690, lng: 4.8970, price: '€150/boot', slug: 'cruise-voyage-amsterdam' },

  // Those Dam Boat Guys — saloon cruise
  { id: 20, name: 'Saloon Cruise',       category: 'private',     emoji: '🧀', address: 'Centraal Station steiger', lat: 52.3784, lng: 4.8977, price: '€35/p.p.', slug: 'classic-saloon-boat-cruise-cheese-wine' },
  { id: 21, name: 'Saloon Cruise',       category: 'private',     emoji: '🧀', address: 'Anne Frank House',       lat: 52.3752, lng: 4.8840, price: '€35/p.p.',  slug: 'classic-saloon-boat-cruise-cheese-wine' },

  // ── WATERSPORT ────────────────────────────────────────────────────────────

  // SUP canal tour Westerpark
  { id: 22, name: 'SUP Canal Tour',      category: 'watersport',  emoji: '🏄', address: 'Westerpark / Bakkerswinkel', lat: 52.3878, lng: 4.8719, price: '€49/p.p.', slug: 'sup-canal-tour-westerpark' },

  // ── UNIQUE ────────────────────────────────────────────────────────────────

  // Sunset canoe tour
  { id: 23, name: 'Sunset Canoe Tour',   category: 'unique',      emoji: '🛶', address: 'Amsterdam Noord (metro)', lat: 52.4022, lng: 4.9325, price: '€49/p.p.',  slug: 'sunset-canoe-tour-dutch-countryside' },
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
  { id: 'private',     label: 'Cruises',         color: '#8b5cf6' },
  { id: 'unique',      label: 'Unique',          color: '#ec4899' },
]

type Location = typeof LOCATIONS[0]

export function MapComponent({ locale }: { locale: string }) {
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
        center: [4.9041, 52.3676],
        zoom: 12.5,
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
          <p className="text-canal text-sm font-medium animate-pulse">Loading map…</p>
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
            className="absolute top-2 right-3 text-slate-400 hover:text-slate-700 text-xl font-light leading-none"
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
            <a
              href={lhref(`/activities/${selected.slug}`)}
              className="bg-canal hover:bg-canal-dark text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
            >
              View details →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
