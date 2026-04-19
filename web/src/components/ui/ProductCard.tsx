import Link from 'next/link';
import { Product } from '@/lib/dummy-data';

type ProductCardProps = {
  product: Product;
  showDescription?: boolean;
};

export default function ProductCard({ product, showDescription = true }: ProductCardProps) {
  return (
    <article className="card-product group flex flex-col">
      {/* 商品画像プレースホルダー */}
      <div className="aspect-square image-placeholder w-full overflow-hidden">
        <div className="w-full h-full bg-brand-cream flex flex-col items-center justify-center gap-2 group-hover:bg-brand-border transition-colors duration-300">
          <span className="text-4xl opacity-30">🌿</span>
          <span className="text-xs text-brand-muted tracking-widest">{product.nameEn}</span>
        </div>
      </div>

      {/* 商品情報 */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <span className="text-xs tracking-widest text-accent bg-accent/10 px-2 py-0.5">
            {product.category}
          </span>
        </div>

        <h3
          className="text-lg font-serif tracking-wide text-brand-text mt-2 mb-1"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          {product.name}
        </h3>
        <p
          className="text-xs italic tracking-widest text-brand-muted mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {product.nameEn}
        </p>

        {showDescription && (
          <p className="text-sm text-brand-muted leading-relaxed mb-4 flex-1">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-border">
          <p className="text-lg font-medium tracking-wide">
            ¥{product.price.toLocaleString()}
            <span className="text-xs text-brand-muted ml-1">（税込）</span>
          </p>
          <Link
            href={`/products/${product.id}`}
            className="text-xs tracking-widest text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-white transition-colors duration-200"
          >
            詳細を見る
          </Link>
        </div>
      </div>
    </article>
  );
}
