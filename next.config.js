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
