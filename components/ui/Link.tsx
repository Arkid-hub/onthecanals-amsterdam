'use client'

import { useLocale } from 'next-intl'
import NextLink from 'next/link'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof NextLink>

export function Link({ href, ...props }: Props) {
  const locale = useLocale()
  const hrefString = href.toString()
  // Don't prefix external links or already-prefixed links
  const localizedHref = hrefString.startsWith('http') || hrefString.startsWith(`/${locale}`)
    ? hrefString
    : `/${locale}${hrefString}`

  return <NextLink href={localizedHref} {...props} />
}
