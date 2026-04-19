'use client';

import { useState } from 'react';
import { products, categories, type Category } from '@/lib/dummy-data';
import ProductCard from '@/components/ui/ProductCard';
import SectionTitle from '@/components/ui/SectionTitle';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const categoryLabels: Record<Category, string> = {
    all: 'すべて',
    茶葉: '茶葉',
    セット: 'セット',
  };

  return (
    <>
      {/* ページヘッダー */}
      <div className="bg-primary-dark text-white pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-site text-center">
          <p
            className="text-xs tracking-[0.3em] text-white/50 uppercase mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Products
          </p>
          <h1
            className="heading-lg text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            商品一覧
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
        </div>
      </div>

      {/* 商品一覧 */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site">
          {/* カテゴリーフィルター */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-sm tracking-widest border transition-colors duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary text-white border-primary'
                    : 'bg-transparent text-brand-text border-brand-border hover:border-primary hover:text-primary'
                }`}
              >
                {categoryLabels[cat]}
                <span className="ml-2 text-xs opacity-60">
                  ({cat === 'all' ? products.length : products.filter((p) => p.category === cat).length})
                </span>
              </button>
            ))}
          </div>

          {/* 商品グリッド */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-brand-muted">
              <p className="text-lg">該当する商品がありません</p>
            </div>
          )}
        </div>
      </section>

      {/* 下部CTA */}
      <section className="py-16 bg-brand-cream text-center">
        <div className="container-site max-w-xl">
          <p className="text-sm text-brand-muted leading-loose mb-6">
            商品についてご不明な点がございましたら、<br />
            お気軽にお問い合わせください。
          </p>
          <a href="/contact" className="btn-outline">
            お問い合わせ
          </a>
        </div>
      </section>
    </>
  );
}
