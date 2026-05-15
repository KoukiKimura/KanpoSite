import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  productCollections,
  getCollectionByHandle,
  getProductsByCollection,
} from '@/lib/data';
import ProductCard from '@/components/ui/ProductCard';

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateStaticParams() {
  return productCollections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = getCollectionByHandle(handle);
  if (!collection) return { title: 'カテゴリが見つかりません' };
  return {
    title: `${collection.title} | 商品カテゴリ`,
    description: collection.description,
    openGraph: {
      title: `${collection.title} | 四国ボタニカ`,
      description: collection.description,
    },
  };
}

export default async function ProductCategoryPage({ params }: Props) {
  const { handle } = await params;
  const collection = getCollectionByHandle(handle);

  if (!collection) {
    notFound();
  }

  const items = getProductsByCollection(handle);

  return (
    <>
      {/* ページヘッダー */}
      <div className="bg-primary-dark text-white pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-site text-center">
          <nav className="flex items-center justify-center gap-2 text-xs text-white/50 tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition-colors">トップ</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">商品一覧</Link>
            <span>/</span>
            <span className="text-white/80">{collection.title}</span>
          </nav>
          <p
            className="text-xs tracking-[0.3em] text-white/50 uppercase mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Products — {collection.title}
          </p>
          <h1
            className="heading-lg text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            {collection.title}
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
          {collection.description && (
            <p className="text-white/60 max-w-md mx-auto mt-5 text-sm leading-loose">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      {/* カテゴリナビ */}
      <div className="bg-brand-cream border-b border-brand-border py-4">
        <div className="container-site">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-brand-muted tracking-widest">カテゴリ：</span>
            <Link
              href="/products"
              className="text-xs tracking-widest text-brand-muted border border-brand-border px-4 py-1.5 hover:border-primary hover:text-primary transition-colors"
            >
              すべて
            </Link>
            {productCollections.map((col) => (
              <Link
                key={col.handle}
                href={`/products/category/${col.handle}`}
                className={`text-xs tracking-widest px-4 py-1.5 border transition-colors ${
                  col.handle === handle
                    ? 'bg-primary text-white border-primary'
                    : 'text-brand-muted border-brand-border hover:border-primary hover:text-primary'
                }`}
              >
                {col.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 商品グリッド */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site">
          {items.length > 0 ? (
            <>
              <p className="text-sm text-brand-muted mb-8 tracking-wide">
                {items.length}件の商品
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-brand-muted">
              <p className="text-lg mb-4">このカテゴリに商品がありません</p>
              <Link href="/products" className="btn-outline">
                すべての商品を見る
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 下部CTA */}
      <div className="py-10 bg-brand-cream text-center">
        <Link
          href="/products"
          className="text-sm tracking-widest text-primary hover:text-primary-dark transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <span>←</span> 商品一覧に戻る
        </Link>
      </div>
    </>
  );
}
