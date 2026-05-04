'use client';

import Link from 'next/link';
import AddToCartControls from '@/components/cart/AddToCartControls';
import type { MockProduct } from '@/lib/mock/site';
import PhotoPanel from '@/components/ui/PhotoPanel';

type ProductCardProps = {
  product: MockProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article id={`product-card-${product.slug}`} className="overflow-hidden border border-mock-border bg-mock-paper">
      <Link
        id={`product-card-${product.slug}-image-link`}
        href={`/products/${product.slug}`}
        aria-label={`${product.name}の商品詳細を見る`}
        className="block"
      >
        <PhotoPanel
          label={product.name}
          caption={product.category}
          from={product.palette.from}
          to={product.palette.to}
          src={product.mainImage.src}
          alt={product.mainImage.alt}
        />
      </Link>
      <div id={`product-card-${product.slug}-content`} className="space-y-3 p-4 md:space-y-4 md:p-6">
        <div id={`product-card-${product.slug}-meta`} className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-4">
          <div id={`product-card-${product.slug}-heading`}>
            <p id={`product-card-${product.slug}-category`} className="text-xs uppercase tracking-[0.28em] text-mock-gold">{product.category}</p>
            <h3 id={`product-card-${product.slug}-title`} className="mt-2 font-serif text-xl text-mock-ink md:text-2xl">
              <Link
                id={`product-card-${product.slug}-title-link`}
                href={`/products/${product.slug}`}
                className="transition hover:text-mock-earth"
              >
                {product.name}
              </Link>
            </h3>
          </div>
          <p id={`product-card-${product.slug}-price`} className="text-sm tracking-[0.16em] text-mock-muted sm:pt-1 sm:tracking-[0.2em]">{product.priceLabel}</p>
        </div>
        <p id={`product-card-${product.slug}-summary`} className="text-sm leading-7 text-mock-muted">{product.summary}</p>
        <AddToCartControls product={product} idBase={`product-card-${product.slug}-cart`} />
        <Link
          id={`product-card-${product.slug}-link`}
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-3 border-b border-mock-ink pb-1 text-xs uppercase tracking-[0.22em] text-mock-ink md:text-sm md:tracking-[0.28em]"
        >
          詳細を見る
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
