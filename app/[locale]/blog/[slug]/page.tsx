import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import NextLink from 'next/link'
import { getBlogPostBySlug, getBlogPostBlocks } from '@/lib/notion'
import type { BlogBlock, BlogInline } from '@/lib/notion'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type Props = { params: { locale: string; slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.coverImageAlt }] : [],
    },
  }
}

function lhref(locale: string, path: string) {
  return locale === 'en' ? path : `/${locale}${path}`
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function Inline({ segment }: { segment: BlogInline }) {
  let content: React.ReactNode = segment.text
  if (segment.bold) content = <strong>{content}</strong>
  if (segment.italic) content = <em>{content}</em>
  if (segment.underline) content = <u>{content}</u>
  if (segment.href) {
    content = (
      <a href={segment.href} className="text-canal underline hover:text-canal-dark transition-colors"
        target={segment.href.startsWith('http') ? '_blank' : undefined}
        rel={segment.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {content}
      </a>
    )
  }
  return <>{content}</>
}

function Block({ block, index }: { block: BlogBlock; index: number }) {
  const inlines = block.content.map((s, i) => <Inline key={i} segment={s} />)

  switch (block.type) {
    case 'heading_1':
      return <h2 className="font-display font-bold text-canal-dark text-2xl mt-10 mb-3">{inlines}</h2>
    case 'heading_2':
      return <h3 className="font-display font-bold text-canal-dark text-xl mt-8 mb-2">{inlines}</h3>
    case 'heading_3':
      return <h4 className="font-semibold text-canal-dark text-lg mt-6 mb-2">{inlines}</h4>
    case 'paragraph':
      // Bold-only paragraphs from Notion are treated as section headings
      const allBold = block.content.length > 0 && block.content.every(s => s.bold)
      if (allBold) {
        return <h3 className="font-display font-bold text-canal-dark text-xl mt-8 mb-2">{inlines}</h3>
      }
      return <p className="text-slate-600 text-base leading-relaxed mb-4">{inlines}</p>
    case 'bulleted_list_item':
      return (
        <li className="flex items-start gap-2 text-slate-600 text-base leading-relaxed mb-2">
          <span className="text-canal mt-1 flex-shrink-0">•</span>
          <span>{inlines}</span>
        </li>
      )
    case 'numbered_list_item':
      return (
        <li className="flex items-start gap-2 text-slate-600 text-base leading-relaxed mb-2">
          <span className="text-canal font-bold mt-0.5 flex-shrink-0 w-5">{index + 1}.</span>
          <span>{inlines}</span>
        </li>
      )
    case 'quote':
      return (
        <blockquote className="border-l-4 border-canal pl-5 py-1 italic text-slate-500 my-5 text-base leading-relaxed">
          {inlines}
        </blockquote>
      )
    case 'divider':
      return <hr className="border-stone-200 my-8" />
    case 'empty':
      return <div className="h-3" />
    default:
      return null
  }
}

export default async function BlogPostPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale)
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const blocks = await getBlogPostBlocks(post.id)

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-16">
      {post.coverImage && (
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-5 pb-8">
            {post.category && (
              <span className="text-xs font-bold text-sky-300 uppercase tracking-wide mb-2 block">{post.category}</span>
            )}
            <h1 className="font-display font-black text-white text-3xl md:text-4xl">{post.title}</h1>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-5 py-10">
        <NextLink href={lhref(locale, '/blog')}
          className="inline-flex items-center gap-2 text-canal text-sm font-medium mb-8 hover:text-canal-dark transition-colors">
          Back to Canal Guide
        </NextLink>

        {!post.coverImage && (
          <h1 className="font-display font-black text-canal-dark text-3xl md:text-4xl mb-4">{post.title}</h1>
        )}

        <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-stone-200">
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          {post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {post.tags.map(tag => (
                <span key={tag} className="bg-canal-light text-canal text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          )}
        </div>

        {post.description && (
          <p className="text-lg text-slate-500 leading-relaxed mb-8 font-medium">{post.description}</p>
        )}

        <div>
          {blocks.map((block, i) => (
            <Block key={i} block={block} index={i} />
          ))}
        </div>

        <div className="mt-12 bg-canal-dark rounded-2xl p-8 text-center">
          <h3 className="font-display font-bold text-white text-xl mb-2">Ready to explore the canals?</h3>
          <p className="text-white/60 text-sm mb-5">Browse all water activities in Amsterdam</p>
          <NextLink href={lhref(locale, '/activities')}
            className="inline-flex bg-amber hover:bg-amber-dark text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
            Browse activities
          </NextLink>
        </div>
      </div>
    </div>
  )
}
