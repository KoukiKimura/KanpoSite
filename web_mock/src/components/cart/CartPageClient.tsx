'use client';

import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';
import ResponsiveImage from '@/components/ui/ResponsiveImage';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CartPageClient() {
  const { items, totalQuantity, subtotal, hydrated, setItemQuantity, removeItem, clearCart } = useCart();
  const cartCountLabel = totalQuantity > 99 ? '99+' : String(totalQuantity);

  if (!hydrated) {
    return (
      <section id="cart-page-loading" className="mock-section">
        <div className="mock-shell">
          <p className="text-sm leading-8 text-mock-muted">カートを読み込んでいます。</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section id="cart-page-empty" className="mock-section">
        <div className="mock-shell max-w-3xl space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-mock-gold">Cart</p>
            <h1 className="font-serif text-4xl text-mock-ink md:text-5xl">カート</h1>
            <p className="text-sm leading-8 text-mock-muted">カートに商品は入っていません。</p>
          </div>
          <Link href="/products" className="mock-button-primary">
            商品一覧へ
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="cart-page" className="mock-section">
      <div className="mock-shell space-y-8">
        <div id="cart-page-heading" className="flex flex-col gap-4 border-b border-mock-border pb-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-mock-gold">Cart</p>
            <h1 className="font-serif text-4xl text-mock-ink md:text-5xl">カート</h1>
            <p className="text-sm leading-8 text-mock-muted">追加した商品の数量を確認できます。</p>
          </div>
          <Link href="/products" className="mock-button-secondary">
            商品を追加する
          </Link>
        </div>

        <div id="cart-page-layout" className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <div id="cart-page-items" className="space-y-4">
            {items.map(({ product, quantity }) => (
              <article
                id={`cart-page-item-${product.slug}`}
                key={product.slug}
                className="mock-card grid gap-4 p-4 md:grid-cols-[180px_1fr_auto] md:p-5"
              >
                <Link
                  id={`cart-page-item-${product.slug}-image-link`}
                  href={`/products/${product.slug}`}
                  aria-label={`${product.name}の商品詳細を見る`}
                  className="mock-image-frame mock-surface-1 min-h-[160px] overflow-hidden md:min-h-0"
                >
                  <ResponsiveImage
                    src={product.mainImage.src}
                    alt={product.mainImage.alt}
                    className="h-full w-full object-cover"
                    pictureClassName="block h-full w-full"
                    sizes="(max-width: 767px) 100vw, 180px"
                  />
                </Link>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.28em] text-mock-gold">{product.category}</p>
                    <h2 className="font-serif text-2xl text-mock-ink">
                      <Link href={`/products/${product.slug}`} className="transition hover:text-mock-earth">
                        {product.name}
                      </Link>
                    </h2>
                    <p className="text-sm tracking-[0.16em] text-mock-muted">{product.priceLabel}</p>
                    <p className="text-xs tracking-[0.16em] text-mock-moss">在庫あり</p>
                  </div>

                  <div className="flex flex-wrap items-end gap-3">
                    <label className="grid gap-2 text-xs tracking-[0.18em] text-mock-muted">
                      数量
                      <div className="flex h-11 border border-mock-border bg-mock-paper">
                        <button
                          type="button"
                          aria-label={`${product.name}を1点減らす`}
                          disabled={quantity <= 1}
                          onClick={() => setItemQuantity(product.slug, quantity - 1)}
                          className="w-10 text-lg text-mock-ink transition hover:bg-mock-background disabled:cursor-not-allowed disabled:opacity-35"
                        >
                          -
                        </button>
                        <input
                          id={`cart-page-item-${product.slug}-quantity`}
                          type="number"
                          min={1}
                          max={product.stock}
                          value={quantity}
                          onChange={(event) => {
                            if (event.target.value) {
                              setItemQuantity(product.slug, Number(event.target.value));
                            }
                          }}
                          className="w-16 border-x border-mock-border bg-transparent text-center text-sm text-mock-ink [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        <button
                          type="button"
                          aria-label={`${product.name}を1点増やす`}
                          disabled={quantity >= product.stock}
                          onClick={() => setItemQuantity(product.slug, quantity + 1)}
                          className="w-10 text-lg text-mock-ink transition hover:bg-mock-background disabled:cursor-not-allowed disabled:opacity-35"
                        >
                          +
                        </button>
                      </div>
                    </label>
                    <button
                      id={`cart-page-item-${product.slug}-remove`}
                      type="button"
                      onClick={() => removeItem(product.slug)}
                      className="h-11 border border-mock-border px-4 text-xs uppercase tracking-[0.2em] text-mock-muted transition hover:border-mock-ink hover:text-mock-ink"
                    >
                      削除
                    </button>
                  </div>
                </div>

                <div className="space-y-1 text-left md:text-right">
                  <p className="text-xs uppercase tracking-[0.22em] text-mock-muted">小計</p>
                  <p className="text-lg tracking-[0.16em] text-mock-ink">
                    {formatCurrency(product.price * quantity)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <aside id="cart-page-summary" className="mock-card space-y-6 p-6 lg:sticky lg:top-32">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl text-mock-ink">注文内容</h2>
              <p className="text-sm leading-7 text-mock-muted">カート内の商品数: {cartCountLabel}点</p>
            </div>

            <dl className="space-y-3 border-y border-mock-border py-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-mock-muted">商品点数</dt>
                <dd className="text-mock-ink">{totalQuantity}点</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-mock-muted">商品小計</dt>
                <dd className="text-mock-ink">{formatCurrency(subtotal)}</dd>
              </div>
            </dl>

            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-mock-muted">合計</p>
              <p className="text-2xl tracking-[0.12em] text-mock-earth">{formatCurrency(subtotal)}</p>
            </div>

            <button type="button" className="mock-button-primary" disabled>
              レジへ進む
            </button>
            <button
              id="cart-page-clear"
              type="button"
              onClick={clearCart}
              className="w-full border border-mock-border px-4 py-3 text-xs uppercase tracking-[0.22em] text-mock-muted transition hover:border-mock-ink hover:text-mock-ink"
            >
              カートを空にする
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
