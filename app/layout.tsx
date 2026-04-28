import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    template: '%s | OnTheCanals.Amsterdam',
    default: 'OnTheCanals.Amsterdam — All water activities in Amsterdam',
  },
  description: 'Discover all water activities on the Amsterdam canals in one place. Electric boat hire, canal tours, SUP, kayak, private cruises. Compare and book.',
  keywords: ['amsterdam canals', 'boat hire amsterdam', 'canal tour', 'sup amsterdam', 'kayak amsterdam', 'water activities'],
  openGraph: {
    title: 'OnTheCanals.Amsterdam',
    description: 'All water activities on the Amsterdam canals — in one place.',
    locale: 'en_US',
    type: 'website',
    siteName: 'OnTheCanals.Amsterdam',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
