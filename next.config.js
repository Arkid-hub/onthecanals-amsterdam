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
