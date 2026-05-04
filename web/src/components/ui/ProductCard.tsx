import Link from 'next/link';
import { Product, productCollections } from '@/lib/data';
import PhotoPanel from '@/components/ui/PhotoPanel';
import AddToCartControls from '@/components/cart/AddToCartControls';

type ProductCardProps = {
  product: Product;
  showDescription?: boolean;
};

export default function ProductCard({ product, showDescription = true }: ProductCardProps) {
  const collection = productCollections.find(
    (c) => c.handle === product.collectionHandles[0]
  );
  return (
    <article className="overflow-hidden border border-brand-border bg-white flex flex-col">
      <Link href={`/products/${product.handle}`} aria-label={`${product.name}の商品詳細を見る`}>
        <PhotoPanel
          label={product.name}
          caption={collection?.title}
          from={product.palette.from}
          to={product.palette.to}
          src={product.imageUrl}
          alt={product.name}
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />
      </Link>

      <div className="p-4 md:p-5 space-y-3 flex flex-col flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-accent">{collection?.title}</p>
            <h3 className="mt-1 font-serif text-xl text-brand-text">
              <Link href={`/products/${product.handle}`} className="hover:text-primary transition-colors">
                {product.name}
              </Link>
            </h3>
          </div>
          <p className="text-sm tracking-[0.16em] text-brand-muted sm:pt-1">
            ¥{product.price.toLocaleString()}
          </p>
        </div>

        {showDescription && (
          <p className="text-sm text-brand-muted leading-7 flex-1">{product.summary}</p>
        )}

        <AddToCartControls product={product} />

        <Link
          href={`/products/${product.handle}`}
          className="inline-flex items-center gap-2 border-b border-brand-text pb-0.5 text-xs uppercase tracking-[0.22em] text-brand-text"
        >
          詳細を見る
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

