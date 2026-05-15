import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  blogCategories,
  formatDate,
} from '@/lib/data';
import { getNotionBlogPostsByCategory } from '@/lib/notion/queries';

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return blogCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = blogCategories.find((c) => c.slug === category);
  if (!cat) return { title: 'カテゴリが見つかりません' };
  return {
    title: `${cat.label} | ブログ`,
    description: `四国ボタニカのブログ — ${cat.label}の記事一覧です。`,
    openGraph: {
      title: `${cat.label} | 四国ボタニカ`,
      description: `${cat.label}に関する記事をお届けします。`,
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = blogCategories.find((c) => c.slug === category);

  if (!cat) {
    notFound();
  }

  const posts = await getNotionBlogPostsByCategory(category).catch(() => []);

  return (
    <>
      {/* ページヘッダー */}
      <div className="bg-primary-dark text-white pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-site text-center">
          <nav className="flex items-center justify-center gap-2 text-xs text-white/50 tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition-colors">トップ</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">ブログ</Link>
            <span>/</span>
            <span className="text-white/80">{cat.label}</span>
          </nav>
          <p
            className="text-xs tracking-[0.3em] text-white/50 uppercase mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Blog — {cat.label}
          </p>
          <h1
            className="heading-lg text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            {cat.label}
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
        </div>
      </div>

      {/* カテゴリナビ */}
      <div className="bg-brand-cream border-b border-brand-border py-4">
        <div className="container-site">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-brand-muted tracking-widest">カテゴリ：</span>
            <Link
              href="/blog"
              className="text-xs tracking-widest text-brand-muted border border-brand-border px-4 py-1.5 hover:border-primary hover:text-primary transition-colors"
            >
              すべて
            </Link>
            {blogCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/blog/category/${c.slug}`}
                className={`text-xs tracking-widest px-4 py-1.5 border transition-colors ${
                  c.slug === category
                    ? 'bg-primary text-white border-primary'
                    : 'text-brand-muted border-brand-border hover:border-primary hover:text-primary'
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 記事一覧 */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site">
          {posts.length > 0 ? (
            <>
              <p className="text-sm text-brand-muted mb-8 tracking-wide">
                {posts.length}件の記事
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {posts.map((post) => (
                  <article key={post.slug} className="card-product group flex flex-col">
                    <div className="aspect-video bg-brand-cream flex items-center justify-center overflow-hidden">
                      <span className="text-4xl opacity-20">📝</span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <time
                        dateTime={post.publishedAt}
                        className="text-xs text-brand-muted tracking-wide mb-3 block"
                      >
                        {formatDate(post.publishedAt)}
                      </time>
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
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-brand-muted">
              <p className="text-lg mb-4">このカテゴリの記事はまだありません</p>
              <Link href="/blog" className="btn-outline">
                すべての記事を見る
              </Link>
            </div>
          )}
        </div>
      </section>

      <div className="py-10 bg-brand-cream border-t border-brand-border text-center">
        <Link
          href="/blog"
          className="text-sm tracking-widest text-primary hover:text-primary-dark transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <span>←</span> ブログ一覧に戻る
        </Link>
      </div>
    </>
  );
}
