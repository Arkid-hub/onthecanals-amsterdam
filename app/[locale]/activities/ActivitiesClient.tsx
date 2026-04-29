'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { ActivityCard } from '@/components/ui/ActivityCard'
import type { Activity, Category } from '@/types'

const CATEGORIES = [
  { id: 'all',          label: 'All',              emoji: '🌊' },
  { id: 'self-guided',  label: 'Self-guided',       emoji: '⛵' },
  { id: 'canal-tour',   label: 'Canal tours',       emoji: '🚣' },
  { id: 'watersport',   label: 'Watersport',        emoji: '🏄' },
  { id: 'private',      label: 'Private & events',  emoji: '🍾' },
  { id: 'unique',       label: 'Unique',            emoji: '✨' },
]

export function ActivitiesClient({ activities }: { activities: Activity[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [maxPrice, setMaxPrice] = useState(200)
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular')

  useEffect(() => {
    const cat = searchParams?.get('cat') as Category | 'all' | null
    const q = searchParams?.get('q')
    if (cat) setActiveCategory(cat)
    if (q) setSearchQuery(q)
  }, [searchParams])

  const handleCategory = (cat: Category | 'all') => {
    setActiveCategory(cat)
    const params = new URLSearchParams(searchParams?.toString() ?? '')
    if (cat === 'all') params.delete('cat')
    else params.set('cat', cat)
    router.replace(`${pathname}?${params.toString()}`)
  }

  const filtered = useMemo(() => {
    let result = [...activities]
    if (activeCategory !== 'all') result = result.filter(a => a.category === activeCategory)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q) ||
        a.tags?.some(t => t.toLowerCase().includes(q))
      )
    }
    result = result.filter(a => a.price <= maxPrice)
    switch (sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'rating':     result.sort((a, b) => b.rating - a.rating); break
      default:
        result.sort((a, b) => {
          if (a.popular && !b.popular) return -1
          if (!a.popular && b.popular) return 1
          return (b.reviewCount || 0) - (a.reviewCount || 0)
        })
    }
    return result
  }, [activities, activeCategory, searchQuery, maxPrice, sortBy])

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-16">
      <div className="bg-[#0a3d52] pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-5">
          <h1 className="font-display font-black text-white text-4xl mb-2">All activities</h1>
          <p className="text-white/60">{filtered.length} activities on the Amsterdam canals</p>
        </div>
      </div>

      <div className="bg-[#0a3d52] overflow-hidden" style={{ height: 32 }}>
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ height: 32, width: '100%' }}>
          <path d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z" fill="#faf7f2" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-8">
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-5 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              <input type="text" placeholder="Search activity, style, keyword..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-stone-200 rounded-xl outline-none focus:border-canal bg-stone-50" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 whitespace-nowrap">Max: €{maxPrice}</span>
              <input type="range" min={10} max={200} step={5} value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-canal" />
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm border border-stone-200 rounded-xl px-3 py-2.5 outline-none bg-stone-50 text-slate-700">
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
              <option value="price-asc">Price: low → high</option>
              <option value="price-desc">Price: high → low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => handleCategory(cat.id as Category | 'all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? 'bg-canal-dark text-white border-canal-dark shadow-sm'
                  : 'bg-white text-canal border-stone-200 hover:border-canal'
              }`}>
              <span>{cat.emoji}</span><span>{cat.label}</span>
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((activity, i) => (
              <ActivityCard key={activity.id} activity={activity} delay={i * 0.06} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">🌊</span>
            <h3 className="text-xl font-bold text-canal-dark mb-2">No results found</h3>
            <p className="text-slate-400 text-sm mb-6">Try different keywords or adjust the filters.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); setMaxPrice(200) }}
              className="bg-canal text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-canal-dark transition-colors">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
