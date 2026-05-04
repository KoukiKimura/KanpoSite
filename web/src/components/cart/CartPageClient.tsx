'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';
import { buildShopifyCheckoutUrl } from '@/lib/shopify';

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

  function handleCheckout() {
    const lineItems = items.map((item) => ({
      variantId: item.product.variantId,
      quantity: item.quantity,
    }));
    const url = buildShopifyCheckoutUrl(lineItems);
    window.location.href = url;
  }

  if (!hydrated) {
    return (
      <section className="section-padding">
        <div className="container-site max-w-3xl">
          <p className="text-sm text-brand-muted">カートを読み込んでいます...</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="section-padding bg-brand-bg">
        <div className="container-site max-w-3xl space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Cart</p>
            <h1 className="heading-lg text-brand-text" style={{ fontFamily: "'Noto Serif JP', serif" }}>カート</h1>
            <p className="text-sm text-brand-muted leading-8">カートに商品は入っていません。</p>
          </div>
          <Link href="/products" className="btn-primary inline-flex">
            商品一覧へ →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-brand-bg">
      <div className="container-site space-y-8">
        {/* ヘッダー */}
        <div className="flex flex-col gap-4 border-b border-brand-border pb-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Cart</p>
            <h1 className="heading-lg text-brand-text" style={{ fontFamily: "'Noto Serif JP', serif" }}>カート</h1>
            <p className="text-sm text-brand-muted">{cartCountLabel}点の商品</p>
          </div>
          <Link href="/products" className="btn-outline inline-flex">
            商品を追加する
          </Link>
        </div>

        {/* カートレイアウト */}
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* 商品リスト */}
          <div className="space-y-4">
            {items.map(({ product, quantity }) => (
              <article key={product.handle} className="border border-brand-border bg-white grid gap-4 p-4 md:grid-cols-[180px_1fr_auto] md:p-5">
                <Link href={`/products/${product.handle}`} aria-label={`${product.name}の詳細へ`} className="block overflow-hidden relative min-h-[160px] md:min-h-0">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                </Link>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.28em] text-accent">
                      {product.collectionHandles[0]}
                    </p>
                    <h2 className="font-serif text-xl text-brand-text">
                      <Link href={`/products/${product.handle}`} className="hover:text-primary transition-colors">
                        {product.name}
                      </Link>
                    </h2>
                    <p className="text-sm tracking-[0.16em] text-brand-muted">
                      ¥{product.price.toLocaleString()}
                    </p>
                    <p className="text-xs tracking-wide text-primary">在庫あり</p>
                  </div>

                  <div className="flex flex-wrap items-end gap-3">
                    <label className="grid gap-1.5 text-xs tracking-[0.18em] text-brand-muted">
                      数量
                      <div className="flex h-11 border border-brand-border bg-white">
                        <button
                          type="button"
                          aria-label={`${product.name}を1点減らす`}
                          disabled={quantity <= 1}
                          onClick={() => setItemQuantity(product.handle, quantity - 1)}
                          className="w-10 text-lg text-brand-text hover:bg-brand-cream transition-colors disabled:cursor-not-allowed disabled:opacity-35"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={1}
                          max={product.stock}
                          value={quantity}
                          onChange={(e) => { if (e.target.value) setItemQuantity(product.handle, Number(e.target.value)); }}
                          className="w-16 border-x border-brand-border bg-transparent text-center text-sm text-brand-text [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        <button
                          type="button"
                          aria-label={`${product.name}を1点増やす`}
                          disabled={quantity >= product.stock}
                          onClick={() => setItemQuantity(product.handle, quantity + 1)}
                          className="w-10 text-lg text-brand-text hover:bg-brand-cream transition-colors disabled:cursor-not-allowed disabled:opacity-35"
                        >
                          +
                        </button>
                      </div>
                    </label>
                    <button
                      type="button"
                      onClick={() => removeItem(product.handle)}
                      className="h-11 border border-brand-border px-4 text-xs uppercase tracking-[0.2em] text-brand-muted hover:border-brand-text hover:text-brand-text transition-colors"
                    >
                      削除
                    </button>
                  </div>
                </div>

                <div className="text-left md:text-right space-y-1">
                  <p className="text-xs uppercase tracking-[0.22em] text-brand-muted">小計</p>
                  <p className="text-lg tracking-[0.16em] text-brand-text">
                    {formatCurrency(product.price * quantity)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* 注文サマリー */}
          <aside className="border border-brand-border bg-white space-y-6 p-6 lg:sticky lg:top-32">
            <div className="space-y-2">
              <h2 className="font-serif text-2xl text-brand-text" style={{ fontFamily: "'Noto Serif JP', serif" }}>注文内容</h2>
              <p className="text-sm text-brand-muted">{cartCountLabel}点</p>
            </div>

            <dl className="space-y-3 border-y border-brand-border py-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-brand-muted">商品点数</dt>
                <dd className="text-brand-text">{totalQuantity}点</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-brand-muted">小計</dt>
                <dd className="text-brand-text">{formatCurrency(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-xs text-brand-muted">送料</dt>
                <dd className="text-xs text-brand-muted">チェックアウト時に計算</dd>
              </div>
            </dl>

            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-brand-muted">合計</p>
              <p className="text-2xl tracking-[0.12em] text-accent">{formatCurrency(subtotal)}</p>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="btn-primary w-full justify-center"
            >
              Shopifyでレジへ進む →
            </button>

            <p className="text-xs text-center text-brand-muted leading-6">
              Shopify の安全な決済ページへ移動します。<br />
              クレジットカード・その他お支払い方法を選択いただけます。
            </p>

            <button
              type="button"
              onClick={clearCart}
              className="w-full border border-brand-border px-4 py-3 text-xs uppercase tracking-[0.22em] text-brand-muted hover:border-brand-text hover:text-brand-text transition-colors"
            >
              カートを空にする
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
