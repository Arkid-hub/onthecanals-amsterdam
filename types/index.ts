export type Category = 'self-guided' | 'canal-tour' | 'watersport' | 'private' | 'unique'
export type Lang = 'en' | 'de' | 'fr' | 'it' | 'es' | 'zh' | 'nl'

export interface Activity {
  id: string
  slug: string
  title: string
  subtitle: string
  category: Category
  emoji: string
  photo: string
  bgColor: string
  price: number
  priceUnit: 'hr' | 'p.p.' | 'boat' | 'day'
  duration: string
  groupSize: string
  location: string
  rating: number
  reviewCount: number
  reviewQuote: string
  reviewAuthor: string
  description: string
  highlights: string[]
  included: string[]
  bookingUrl: string
  provider: string
  providerUrl: string
  popular?: boolean
  isNew?: boolean
  tags: string[]
}
