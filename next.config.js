const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.notion.so' },
      { protocol: 'https', hostname: 'onthecanals.nl' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), browsing-topics=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://widget.getyourguide.com https://cdn.getyourguide.com https://maps.googleapis.com https://api.mapbox.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://res.cloudinary.com https://*.cloudinary.com https://images.unsplash.com https://*.notion.so https://onthecanals.nl https://cdn.getyourguide.com https://*.getyourguide.com",
              "connect-src 'self' https://api.mapbox.com https://events.mapbox.com https://widget.getyourguide.com",
              "frame-src https://www.getyourguide.com https://widget.getyourguide.com",
              "media-src 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Blog slug rename: boat-hire -> boat-rental
      {
        source: '/blog/boat-hire-amsterdam-complete-guide',
        destination: '/blog/boat-rental-amsterdam-complete-guide',
        permanent: true,
      },
      {
        source: '/:locale/blog/boat-hire-amsterdam-complete-guide',
        destination: '/:locale/blog/boat-rental-amsterdam-complete-guide',
        permanent: true,
      },
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent mapbox-gl from being bundled on server
      config.resolve.alias = {
        ...config.resolve.alias,
        'mapbox-gl': 'mapbox-gl',
      }
    }
    return config
  },
}

module.exports = withNextIntl(nextConfig)
