import Link from 'next/link';
import type { Metadata } from 'next';
import { getNotionBlogPosts } from '@/lib/notion/queries';
import { blogCategories, formatDate } from '@/lib/data';

export const metadata: Metadata = {
  title: 'ブログ',
  description: '山草の恵みのブログ。漢方茶のレシピ、畑だより、読み物、お知らせをお届けします。',
  openGraph: {
    title: 'ブログ | 山草の恵み',
    description: '漢方茶のレシピ、畑だより、読み物、お知らせをお届けします。',
  },
};

export default async function BlogPage() {
  const posts = await getNotionBlogPosts().catch(() => []);
  return (
    <>
      {/* ページヘッダー */}
      <div className="bg-primary-dark text-white pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-site text-center">
          <p
            className="text-xs tracking-[0.3em] text-white/50 uppercase mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Blog
          </p>
          <h1
            className="heading-lg text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            ブログ
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
        </div>
      </div>

      {/* カテゴリナビ */}
      <div className="bg-brand-cream border-b border-brand-border py-4">
        <div className="container-site">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-brand-muted tracking-widest">カテゴリ：</span>
            <span className="text-xs tracking-widest text-white bg-primary px-4 py-1.5">
              すべて
            </span>
            {blogCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="text-xs tracking-widest text-brand-muted border border-brand-border px-4 py-1.5 hover:border-primary hover:text-primary transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 記事一覧 */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post) => {
              const category = blogCategories.find((c) => c.slug === post.category);
              return (
                <article key={post.slug} className="card-product group flex flex-col">
                  {/* サムネイルプレースホルダー */}
                  <div className="aspect-video bg-brand-cream flex items-center justify-center overflow-hidden">
                    <span className="text-4xl opacity-20">📝</span>
                  </div>

                  {/* 記事情報 */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {category && (
                        <Link
                          href={`/blog/category/${category.slug}`}
                          className="text-xs tracking-widest text-accent bg-accent/10 px-2 py-0.5 hover:bg-accent/20 transition-colors"
                        >
                          {category.label}
                        </Link>
                      )}
                      <time
                        dateTime={post.publishedAt}
                        className="text-xs text-brand-muted tracking-wide"
                      >
                        {formatDate(post.publishedAt)}
                      </time>
                    </div>

                    <h2
                      className="text-base font-serif tracking-wide text-brand-text mb-2 line-clamp-2"
                      style={{ fontFamily: "'Noto Serif JP', serif" }}
                    >
                      {post.title}
                    </h2>

                    <p className="text-sm text-brand-muted leading-relaxed mb-4 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-4 border-t border-brand-border">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs tracking-widest text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-white transition-colors duration-200 inline-block"
                      >
                        続きを読む
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* お知らせ導線 */}
      <div className="py-10 bg-brand-cream border-t border-brand-border text-center">
        <p className="text-sm text-brand-muted mb-4 tracking-wide">
          お知らせのみをご覧になりたい方はこちら
        </p>
        <Link
          href="/blog/category/news"
          className="btn-outline"
        >
          お知らせ一覧
        </Link>
      </div>
    </>
  );
}
