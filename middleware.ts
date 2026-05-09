import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale } from './i18n'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
})

export default function middleware(req: NextRequest) {
  const response = intlMiddleware(req)
  // Expose pathname so layouts/pages can build per-page hreflang tags
  response.headers.set('x-pathname', req.nextUrl.pathname)
  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
