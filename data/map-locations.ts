// Shared data: map departure points.
// Used by MapComponent (rendering pins) and JsonLd (per-activity geo).

export interface MapLocation {
  id: number
  name: string
  category: 'self-guided' | 'canal-tour' | 'watersport' | 'private' | 'unique'
  emoji: string
  address: string
  lat: number
  lng: number
  price: string
  slug: string
}

export const LOCATIONS: MapLocation[] = [
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
  { id: 9,  name: 'Canal Bike',          category: 'self-guided', emoji: '🚲', address: 'Keizersgracht',         lat: 52.3635, lng: 4.8826, price: '€24/boot',  slug: 'water-bike-canal-bike' },
  { id: 10, name: 'Canal Bike',          category: 'self-guided', emoji: '🚲', address: 'Rijksmuseum / Stadhouderskade', lat: 52.3596, lng: 4.8885, price: '€24/boot', slug: 'water-bike-canal-bike' },

  // ── CANAL TOURS ───────────────────────────────────────────────────────────

  // Stromma
  { id: 11, name: 'Stromma Canal Tour',  category: 'canal-tour',  emoji: '🚣', address: 'Damrak Pier 4',         lat: 52.3756, lng: 4.8989, price: '€14/p.p.',  slug: 'classic-canal-tour-stromma' },

  // Lovers / NEMO combo
  { id: 12, name: 'Lovers / NEMO Cruise',category: 'canal-tour',  emoji: '🚣', address: 'Prins Hendrikkade 25',  lat: 52.3779, lng: 4.9003, price: '€32/p.p.',  slug: 'cruise-NEMO-lovers' },

  // Green Saloon
  { id: 31, name: 'The Green Saloon',    category: 'canal-tour',  emoji: '🚣', address: 'Stationsplein 18 (Central Station)', lat: 52.3791, lng: 4.8993, price: '€29/p.p.', slug: 'covered-heated-canal-cruise-bitterballen-green-saloon' },

  // Blue Boat Company
  { id: 30, name: 'Blue Boat Company',   category: 'canal-tour',  emoji: '🚣', address: 'Stadhouderskade 550 (opp. Hard Rock Cafe)', lat: 52.3607, lng: 4.8827, price: '€18/p.p.', slug: '75-minute-city-canal-cruise-blue-boat' },

  // ── PRIVATE & DRINKS ──────────────────────────────────────────────────────

  // Flagship Amsterdam (3 locaties)
  { id: 13, name: 'Flagship Amsterdam',  category: 'private',     emoji: '🍾', address: 'Prins Hendrikkade 33A', lat: 52.3783, lng: 4.9007, price: '€50/p.p.',  slug: 'cruise-flagship-amsterdam' },
  { id: 14, name: 'Flagship Amsterdam',  category: 'private',     emoji: '🍾', address: 'Museumbrug 1',          lat: 52.3597, lng: 4.8852, price: '€50/p.p.',  slug: 'cruise-flagship-amsterdam' },
  { id: 15, name: 'Flagship Amsterdam',  category: 'private',     emoji: '🍾', address: 'Prinsengracht 267',     lat: 52.3752, lng: 4.8839, price: '€50/p.p.',  slug: 'cruise-flagship-amsterdam' },

  // Captain Jack (2 locaties)
  { id: 16, name: 'Captain Jack',        category: 'private',     emoji: '🍾', address: 'Prins Hendrikkade 33A', lat: 52.3784, lng: 4.9009, price: '€40/p.p.',  slug: 'cruise-captain-jack' },
  { id: 17, name: 'Captain Jack',        category: 'private',     emoji: '🍾', address: 'Museumbrug 2',          lat: 52.3596, lng: 4.8855, price: '€40/p.p.',  slug: 'cruise-captain-jack' },

  // Stromma Pizza Cruise
  { id: 18, name: 'Pizza Cruise Stromma',category: 'unique',      emoji: '🍕', address: 'Damrak Pier 4',         lat: 52.3757, lng: 4.8990, price: '€42/p.p.',  slug: 'cruise-pizza-stromma' },

  // Voyage Amsterdam
  { id: 19, name: 'Voyage Amsterdam',    category: 'private',     emoji: '⚓', address: 'Op aanvraag',           lat: 52.3690, lng: 4.8970, price: '€150/boot', slug: 'cruise-voyage-amsterdam' },

  // Those Dam Boat Guys — saloon cruise
  { id: 20, name: 'Saloon Cruise',       category: 'unique',      emoji: '🧀', address: 'Centraal Station steiger', lat: 52.3784, lng: 4.8977, price: '€35/p.p.', slug: 'classic-saloon-boat-cruise-cheese-wine' },
  { id: 21, name: 'Saloon Cruise',       category: 'unique',      emoji: '🧀', address: 'Anne Frank House',       lat: 52.3752, lng: 4.8840, price: '€35/p.p.',  slug: 'classic-saloon-boat-cruise-cheese-wine' },

  // Mokumboot (6 locaties)
  { id: 24, name: 'Mokumboot', category: 'self-guided', emoji: '⛵', address: 'Mauritskade 1-E (Amstel)',    lat: 52.3591, lng: 4.9087, price: '€97.50/boat', slug: 'sloep-rental-amsterdam' },
  { id: 25, name: 'Mokumboot', category: 'self-guided', emoji: '⛵', address: 'Mauritskade 65 (Oost)',      lat: 52.3618, lng: 4.9201, price: '€97.50/boat', slug: 'sloep-rental-amsterdam' },
  { id: 26, name: 'Mokumboot', category: 'self-guided', emoji: '⛵', address: 'Schollenbrugstraat 1 (Weesper)', lat: 52.3647, lng: 4.9253, price: '€97.50/boat', slug: 'sloep-rental-amsterdam' },
  { id: 27, name: 'Mokumboot', category: 'self-guided', emoji: '⛵', address: 'Nassaukade 351 (Centrum)',   lat: 52.3762, lng: 4.8789, price: '€97.50/boat', slug: 'sloep-rental-amsterdam' },
  { id: 28, name: 'Mokumboot', category: 'self-guided', emoji: '⛵', address: 'Jozef Israëlskade (De Pijp)', lat: 52.3511, lng: 4.8952, price: '€97.50/boat', slug: 'sloep-rental-amsterdam' },
  { id: 29, name: 'Mokumboot', category: 'self-guided', emoji: '⛵', address: 'Stadionkade 73b (Zuid)',     lat: 52.3441, lng: 4.8731, price: '€97.50/boat', slug: 'sloep-rental-amsterdam' },

  // Pannenkoekboot
  { id: 32, name: 'Pancake Boat',        category: 'unique',      emoji: '🥞', address: 'Ms. van Riemsdijkweg 33 (Noord)', lat: 52.3997, lng: 4.8982, price: '€26/p.p.', slug: 'pancake-river-cruise-pannenkoekboot' },

  // ── WATERSPORT ────────────────────────────────────────────────────────────

  // SUP canal tour Westerpark
  { id: 22, name: 'SUP Canal Tour',      category: 'watersport',  emoji: '🏄', address: 'Westerpark / Bakkerswinkel', lat: 52.3878, lng: 4.8719, price: '€49/p.p.', slug: 'sup-canal-tour-westerpark' },

  // ── UNIQUE ────────────────────────────────────────────────────────────────

  // Sunset canoe tour
  { id: 23, name: 'Sunset Canoe Tour',   category: 'watersport',  emoji: '🛶', address: 'Amsterdam Noord (metro)', lat: 52.4022, lng: 4.9325, price: '€49/p.p.',  slug: 'sunset-canoe-tour-dutch-countryside' },
]

// Get the first/representative location for an activity slug
export function getLocationForSlug(slug: string): MapLocation | undefined {
  return LOCATIONS.find(l => l.slug === slug)
}
