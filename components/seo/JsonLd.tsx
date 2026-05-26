import type { Activity } from '@/types'

// Per-activity JSON-LD — uses LocalBusiness as parent so Google Review snippets validate
export function ActivityJsonLd({ activity }: { activity: Activity }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://onthecanals.nl/activities/${activity.slug}`,
    name: activity.title,
    description: activity.description,
    url: `https://onthecanals.nl/activities/${activity.slug}`,
    image: activity.photo,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Amsterdam',
      addressCountry: 'NL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.3676,
      longitude: 4.9041,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: activity.title,
      itemListElement: [
        {
          '@type': 'Offer',
          price: activity.price,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: activity.bookingUrl,
          seller: {
            '@type': 'Organization',
            name: activity.provider,
            url: activity.providerUrl,
          },
        },
      ],
    },
    ...(activity.reviewCount > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: activity.rating,
        bestRating: 5,
        worstRating: 1,
        reviewCount: activity.reviewCount,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Homepage ItemList — links to each activity detail page
export function ActivityListJsonLd({ activities }: { activities: Activity[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Amsterdam Canal Activities',
    description: 'Water activities on the Amsterdam canals: boat rentals, canal tours, SUP, kayak, private cruises and more.',
    url: 'https://onthecanals.nl/activities',
    numberOfItems: activities.length,
    itemListElement: activities.map((activity, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://onthecanals.nl/activities/${activity.slug}`,
      name: activity.title,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Website-level JSON-LD
export function WebsiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OnTheCanals Amsterdam',
    url: 'https://onthecanals.nl',
    description: 'All water activities on the Amsterdam canals in one place',
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://onthecanals.nl/activities?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
