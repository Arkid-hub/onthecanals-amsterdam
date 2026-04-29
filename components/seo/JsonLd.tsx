import type { Activity } from '@/types'

// Later: swap fallbackActivities for Notion data — structure stays identical
export function ActivityJsonLd({ activity }: { activity: Activity }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: activity.title,
    description: activity.description,
    url: `https://onthecanals.nl/activities/${activity.slug}`,
    image: activity.photo,
    touristType: ['Tourist', 'Family', 'Couples'],
    location: {
      '@type': 'Place',
      name: activity.location,
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
    },
    offers: {
      '@type': 'Offer',
      price: activity.price,
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: activity.price,
        priceCurrency: 'EUR',
        unitText: activity.priceUnit,
      },
      availability: 'https://schema.org/InStock',
      url: activity.bookingUrl,
      seller: {
        '@type': 'LocalBusiness',
        name: activity.provider,
        url: activity.providerUrl,
      },
    },
    aggregateRating: activity.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: activity.rating,
      reviewCount: activity.reviewCount,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// For the homepage — list of activities
export function ActivityListJsonLd({ activities }: { activities: Activity[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Water activities on the Amsterdam canals',
    description: 'All water activities available on the Amsterdam canals',
    url: 'https://onthecanals.nl/activities',
    numberOfItems: activities.length,
    itemListElement: activities.map((activity, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'TouristAttraction',
        name: activity.title,
        url: `https://onthecanals.nl/activities/${activity.slug}`,
        image: activity.photo,
        offers: {
          '@type': 'Offer',
          price: activity.price,
          priceCurrency: 'EUR',
        },
        aggregateRating: activity.reviewCount > 0 ? {
          '@type': 'AggregateRating',
          ratingValue: activity.rating,
          reviewCount: activity.reviewCount,
        } : undefined,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// For the website itself — local business
export function WebsiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OnTheCanals Amsterdam',
    url: 'https://onthecanals.nl',
    description: 'All water activities on the Amsterdam canals in one place',
    inLanguage: ['en', 'de', 'fr', 'it', 'es', 'zh', 'nl'],
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
