import { setRequestLocale, getTranslations } from 'next-intl/server'
import { locales } from '@/i18n'
import NextLink from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Electric Boat Rental Amsterdam | No License Needed | All Providers',
    description: 'Compare all electric boat rentals in Amsterdam. No boating license required. From 2 hours, multiple departure points, up to 12 people. Book securely via GetYourGuide.',
    alternates: {
      canonical: locale === 'en'
        ? 'https://onthecanals.nl/electric-boat-rental-amsterdam'
        : `https://onthecanals.nl/${locale}/electric-boat-rental-amsterdam`,
    },
  }
}

function lhref(locale: string, path: string) {
  return locale === 'en' ? path : `/${locale}${path}`
}

const PROVIDERS = [
  {
    name: 'Eco Boats Amsterdam',
    slug: 'captain-for-a-day-eco-boats',
    tagline: 'Captain For a Day',
    price: 'from €95',
    duration: '2 hrs',
    capacity: 'up to 12',
    location: 'Nassaukade',
    highlight: 'Optional plastic fishing for €3 p.p.',
    license: false,
  },
  {
    name: 'Canal Motorboats',
    slug: 'self-drive-boat-rental-canal-motorboats',
    tagline: "Amsterdam's original since 1996",
    price: 'from €85',
    duration: '2 hrs',
    capacity: 'up to 8',
    location: 'City centre',
    highlight: 'Most experienced provider in the city',
    license: false,
  },
  {
    name: 'Boaty',
    slug: 'electric-boat-hire-boaty',
    tagline: '4 scenic routes from De Pijp',
    price: 'from €79',
    duration: '2 hrs',
    capacity: 'up to 7',
    location: 'De Pijp',
    highlight: 'Pre-planned routes past Rijksmuseum',
    license: false,
  },
  {
    name: 'Boats4Rent',
    slug: 'self-drive-boat-rental-boats4rent',
    tagline: 'Flexible rentals, multiple durations',
    price: 'from €75',
    duration: '2 hrs',
    capacity: 'up to 8',
    location: 'Jordaan',
    highlight: 'Multiple time slots available daily',
    license: false,
  },
  {
    name: 'Mokumboot',
    slug: 'sloep-rental-amsterdam',
    tagline: 'City-wide, 5 departure locations',
    price: 'from €89',
    duration: '2 hrs',
    capacity: 'up to 10',
    location: '5 locations',
    highlight: 'Tourist tax included, free cancellation',
    license: false,
  },
]

const FAQ = [
  {
    q: 'Do you need a license to rent a boat in Amsterdam?',
    a: 'No. All electric sloep rentals listed here are operated without a boating license. Every provider gives you a short safety briefing before departure, and that is all you need.',
  },
  {
    q: 'How much does it cost to rent a boat in Amsterdam?',
    a: 'Electric boat rentals in Amsterdam start from around €75 to €95 per boat for a 2-hour slot. For a group of 6 to 8 people, that works out to roughly €10 to €15 per person, making it one of the most affordable ways to see the city.',
  },
  {
    q: 'Is it safe to rent a boat in Amsterdam as a tourist?',
    a: 'Yes. Speed is capped at 6 km/h on the canals, the boats are stable and easy to handle, and every provider gives you a full briefing on the rules and navigation before you leave. Thousands of first-time visitors rent boats in Amsterdam every year.',
  },
  {
    q: 'Can I bring food and drinks on the boat?',
    a: 'Yes. All providers listed here allow you to bring your own food and drinks on board. A cooler bag with drinks and snacks is one of the best ways to make the most of your rental.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'For summer weekends (June through August), book at least a week in advance. Weekday slots have more availability. All bookings are made securely via GetYourGuide with free cancellation up to 24 hours before departure.',
  },
  {
    q: 'What is the best area to depart from?',
    a: 'It depends on what you want to see. Departing from the Jordaan or Nassaukade puts you right in the historic canal ring. De Pijp is great if you want to pass the Rijksmuseum. Providers with multiple locations let you choose based on your hotel.',
  },
  {
    q: 'How many people fit in a rental boat?',
    a: 'Most electric sloeps in Amsterdam fit 6 to 8 people. Eco Boats offers larger boats for up to 12 people. If your group is bigger, you can rent two boats and go together.',
  },
]

export default async function ElectricBoatRentalPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-16">

      {/* Hero */}
      <section className="bg-[#0a3d52] pt-14 pb-16 text-center px-5">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-sky-300 uppercase mb-3">Amsterdam on the water</p>
          <h1 className="font-display font-black text-white text-4xl md:text-5xl mb-4 leading-tight">
            Electric boat rental<br />Amsterdam
          </h1>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            No license needed. Compare all providers, pick your departure point and book securely via GetYourGuide. Free cancellation up to 24 hours before.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm">
            {['No license required', 'Free cancellation', 'Up to 12 people', 'From €75 per boat'].map(tag => (
              <span key={tag} className="bg-white/10 text-white/80 border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold">
                {tag}
              </span>
            ))}
          </div>
          <NextLink href={lhref(locale, '/activities?cat=self-guided')}
            className="inline-flex bg-amber hover:bg-amber-dark text-white font-bold px-8 py-4 rounded-xl transition-colors text-base">
            See all self-guided rentals
          </NextLink>
        </div>
      </section>

      {/* Provider comparison */}
      <section className="py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold tracking-widest text-canal uppercase mb-2">Compare providers</p>
            <h2 className="font-display font-bold text-canal-dark text-3xl">All electric boat rentals in Amsterdam</h2>
            <p className="text-slate-500 mt-2 text-sm">All boats are electric, all operators require no boating license.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROVIDERS.map((p) => (
              <div key={p.slug} className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col">
                <div className="mb-4">
                  <p className="text-xs font-bold text-canal uppercase tracking-wide mb-1">{p.name}</p>
                  <h3 className="font-display font-bold text-canal-dark text-lg leading-tight">{p.tagline}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div>
                    <p className="text-slate-400 text-xs mb-0.5">Price</p>
                    <p className="font-semibold text-canal-dark">{p.price}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-0.5">Min. duration</p>
                    <p className="font-semibold text-canal-dark">{p.duration}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-0.5">Capacity</p>
                    <p className="font-semibold text-canal-dark">{p.capacity}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-0.5">Departs from</p>
                    <p className="font-semibold text-canal-dark">{p.location}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-5 flex items-start gap-1.5">
                  <span className="text-canal mt-0.5">✓</span>{p.highlight}
                </p>
                <NextLink href={lhref(locale, `/activities/${p.slug}`)}
                  className="mt-auto block w-full text-center bg-canal-dark hover:bg-canal text-white font-bold py-3 rounded-xl transition-colors text-sm">
                  View details and book
                </NextLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why electric */}
      <section className="bg-[#f2ece1] py-14 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-canal-dark text-2xl mb-6">Why electric boats in Amsterdam?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: '🔇', title: 'Silent on the water', desc: 'No engine noise. You hear the city, the birds, and the water.' },
              { icon: '♻️', title: 'Emission-free', desc: 'Amsterdam is increasingly restricting combustion engines on the canals. Electric is the future.' },
              { icon: '🎯', title: 'Easy to handle', desc: 'Speed is capped at 6 km/h. Even without any experience, you will feel confident within minutes.' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-5 border border-stone-200">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-canal-dark mb-1 text-sm">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-canal-dark text-2xl mb-8">Frequently asked questions</h2>
          <div className="space-y-6">
            {FAQ.map((item) => (
              <div key={item.q} className="border-b border-stone-200 pb-6">
                <h3 className="font-bold text-canal-dark mb-2">{item.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-canal-dark py-16 text-center px-5">
        <p className="text-xs font-bold tracking-widest text-sky-300 uppercase mb-3">Ready to go?</p>
        <h2 className="font-display font-bold text-white text-3xl mb-3">Pick your boat and book in minutes</h2>
        <p className="text-white/60 mb-8 text-sm max-w-md mx-auto">All bookings go through GetYourGuide. Free cancellation up to 24 hours before departure.</p>
        <NextLink href={lhref(locale, '/activities?cat=self-guided')}
          className="inline-flex bg-amber hover:bg-amber-dark text-white font-bold px-8 py-4 rounded-xl transition-colors">
          Compare all boat rentals
        </NextLink>
      </section>

    </div>
  )
}
