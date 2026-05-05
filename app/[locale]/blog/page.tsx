import { setRequestLocale } from 'next-intl/server'
import NextLink from 'next/link'
import { getAllBlogPosts } from '@/lib/notion'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Amsterdam Canal Guide',
  description: 'Tips, guides and inspiration for your Amsterdam canal experience. Boat hire, canal tours, SUP and more.',
}

function lhref(locale: string, path: string) {
  return locale === 'en' ? path : `/${locale}${path}`
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const posts = await getAllBlogPosts()

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-16">
      <div className="bg-[#0a3d52] pt-12 pb-16">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-xs font-bold tracking-widest text-sky-300 uppercase mb-3">Amsterdam on the water</p>
          <h1 className="font-display font-black text-white text-4xl md:text-5xl mb-4">Canal Guide</h1>
          <p className="text-white/60 text-lg max-w-xl">Tips, guides and inspiration for your Amsterdam canal experience.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-12">
        {posts.length === 0 ? (
          <p className="text-slate-400 text-center py-20">No articles yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <NextLink key={post.id} href={lhref(locale, `/blog/${post.slug}`)}
                className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow">
                {post.coverImage && (
                  <div className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url('${post.coverImage}')` }} />
                )}
                <div className="p-5">
                  {post.category && (
                    <span className="text-xs font-bold text-canal uppercase tracking-wide">{post.category}</span>
                  )}
                  <h2 className="font-display font-bold text-canal-dark text-lg mt-1 mb-2 group-hover:text-canal transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">{post.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{formatDate(post.publishedAt)}</span>
                    <span className="text-xs font-semibold text-canal">Read more</span>
                  </div>
                </div>
              </NextLink>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
