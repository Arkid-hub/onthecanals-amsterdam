import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // /en/ is default, others get prefix
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
