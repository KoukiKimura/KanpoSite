import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getNotionBlogPosts, getNotionBlogPostBySlug, getNotionBlocks } from '@/lib/notion/queries';
import { blogCategories, blogPosts, formatDate } from '@/lib/data';
import NotionArticleBody from '@/components/notion/NotionArticleBody';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const posts = await getNotionBlogPosts();
    // Notionに記事がなければ静的データのスラッグを使用してビルドを継続
    const slugs = posts.length > 0 ? posts.map((p) => p.slug) : blogPosts.map((p) => p.slug);
    return slugs.map((slug) => ({ slug }));
  } catch (e) {
    console.warn('[generateStaticParams] Notion API 取得失敗。静的データで続行します。', e);
    return blogPosts.map((p) => ({ slug: p.slug }));
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getNotionBlogPostBySlug(slug);
    if (!post) return { title: '記事が見つかりません' };
    return {
      title: post.title,
      description: post.excerpt || undefined,
      openGraph: {
        title: `${post.title} | 山草の恵み`,
        description: post.excerpt || undefined,
        type: 'article',
        publishedTime: post.publishedAt,
      },
    };
  } catch {
    return { title: '山草の恵み ブログ' };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNotionBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blocks = await getNotionBlocks(post.id);
  const category = blogCategories.find((c) => c.slug === post.category);

  return (
    <>
      {/* ページヘッダー */}
      <div className="bg-primary-dark text-white pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-site">
          <nav className="flex items-center gap-2 text-xs text-white/50 tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition-colors">トップ</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">ブログ</Link>
            {category && (
              <>
                <span>/</span>
                <Link
                  href={`/blog/category/${category.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {category.label}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-white/80 line-clamp-1">{post.title}</span>
          </nav>

          {category && (
            <div className="mb-4">
              <Link
                href={`/blog/category/${category.slug}`}
                className="text-xs tracking-widest text-accent bg-accent/20 px-3 py-1 hover:bg-accent/30 transition-colors"
              >
                {category.label}
              </Link>
            </div>
          )}

          <h1
            className="heading-lg text-white mb-4 max-w-3xl"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            {post.title}
          </h1>

          {post.publishedAt && (
            <time
              dateTime={post.publishedAt}
              className="text-sm text-white/50 tracking-wide"
            >
              {formatDate(post.publishedAt)}
            </time>
          )}
        </div>
      </div>

      {/* 本文 */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site">
          <div className="max-w-2xl mx-auto">
            {/* リード文 */}
            {post.excerpt && (
              <p className="text-brand-muted leading-loose mb-8 text-base italic border-l-2 border-accent pl-5">
                {post.excerpt}
              </p>
            )}

            {/* Notion ブロックレンダラー */}
            <NotionArticleBody blocks={blocks} />

            {/* 記事フッター */}
            <div className="mt-12 pt-8 border-t border-brand-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {category && (
                  <Link
                    href={`/blog/category/${category.slug}`}
                    className="text-xs tracking-widest text-accent bg-accent/10 px-3 py-1 hover:bg-accent/20 transition-colors"
                  >
                    {category.label}
                  </Link>
                )}
                {post.publishedAt && (
                  <time dateTime={post.publishedAt} className="text-xs text-brand-muted">
                    {formatDate(post.publishedAt)}
                  </time>
                )}
              </div>
              <Link
                href="/blog"
                className="text-sm tracking-widest text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
              >
                <span>←</span> ブログ一覧に戻る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 下部CTA */}
      <section className="py-16 bg-brand-cream border-t border-brand-border text-center">
        <div className="container-site max-w-xl">
          <p
            className="text-sm text-brand-muted leading-loose mb-6"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            商品について詳しくはこちらから
          </p>
          <Link href="/products" className="btn-outline">
            商品一覧を見る
          </Link>
        </div>
      </section>
    </>
  );
}
