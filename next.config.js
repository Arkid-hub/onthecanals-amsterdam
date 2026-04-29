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
  experimental: {
    // Target modern browsers only — no legacy polyfills
    browsersListForSwc: true,
  },
}

module.exports = withNextIntl(nextConfig)
