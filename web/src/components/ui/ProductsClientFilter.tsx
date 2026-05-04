'use client';

import { useState } from 'react';
import { products, productCollections } from '@/lib/data';
import ProductCard from '@/components/ui/ProductCard';

export default function ProductsClientFilter() {
  const [activeHandle, setActiveHandle] = useState<string>('all');

  const filtered =
    activeHandle === 'all'
      ? products
      : products.filter((p) => p.collectionHandles.includes(activeHandle));

  return (
    <section className="section-padding bg-brand-bg">
      <div className="container-site">
        {/* コレクションフィルター */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[{ handle: 'all', title: 'すべて' }, ...productCollections].map((col) => {
            const count =
              col.handle === 'all'
                ? products.length
                : products.filter((p) => p.collectionHandles.includes(col.handle)).length;
            return (
              <button
                key={col.handle}
                onClick={() => setActiveHandle(col.handle)}
                className={`px-6 py-2 text-sm tracking-widest border transition-colors duration-200 ${
                  activeHandle === col.handle
                    ? 'bg-primary text-white border-primary'
                    : 'bg-transparent text-brand-text border-brand-border hover:border-primary hover:text-primary'
                }`}
              >
                {col.title}
                <span className="ml-2 text-xs opacity-60">({count})</span>
              </button>
            );
          })}
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
  );
}
