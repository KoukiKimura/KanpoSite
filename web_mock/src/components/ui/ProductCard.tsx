import Link from 'next/link';
import type { MockProduct } from '@/lib/mock/site';
import PhotoPanel from '@/components/ui/PhotoPanel';

type ProductCardProps = {
  product: MockProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article id={`product-card-${product.slug}`} className="overflow-hidden border border-mock-border bg-mock-paper">
      <PhotoPanel
        label={product.name}
        caption={product.category}
        from={product.palette.from}
        to={product.palette.to}
        src={product.mainImage.src}
        alt={product.mainImage.alt}
      />
      <div id={`product-card-${product.slug}-content`} className="space-y-4 p-6">
        <div id={`product-card-${product.slug}-meta`} className="flex items-start justify-between gap-4">
          <div id={`product-card-${product.slug}-heading`}>
            <p id={`product-card-${product.slug}-category`} className="text-xs uppercase tracking-[0.28em] text-mock-gold">{product.category}</p>
            <h3 id={`product-card-${product.slug}-title`} className="mt-2 font-serif text-2xl text-mock-ink">{product.name}</h3>
          </div>
          <p id={`product-card-${product.slug}-price`} className="pt-1 text-sm tracking-[0.2em] text-mock-muted">{product.priceLabel}</p>
        </div>
        <p id={`product-card-${product.slug}-summary`} className="text-sm leading-7 text-mock-muted">{product.summary}</p>
        <Link
          id={`product-card-${product.slug}-link`}
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-3 border-b border-mock-ink pb-1 text-sm uppercase tracking-[0.28em] text-mock-ink"
        >
          詳細を見る
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
