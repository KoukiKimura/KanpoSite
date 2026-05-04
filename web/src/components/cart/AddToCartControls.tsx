'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/lib/data';
import { useCart } from '@/components/cart/CartProvider';

type Props = {
  product: Product;
  variant?: 'card' | 'detail';
};

export default function AddToCartControls({ product, variant = 'card' }: Props) {
  const { addItem, getItemQuantity } = useCart();
  const inCartQty = getItemQuantity(product.handle);
  const remainingStock = Math.max(product.stock - inCartQty, 0);
  const maxSelectable = Math.min(remainingStock, 9);
  const canAdd = product.availableForSale && product.stock > 0 && maxSelectable > 0;
  const [quantity, setQuantity] = useState(canAdd ? 1 : 0);
  const [message, setMessage] = useState('');

  const options = useMemo(
    () => Array.from({ length: maxSelectable }, (_, i) => i + 1),
    [maxSelectable],
  );

  useEffect(() => {
    setQuantity((q) => {
      if (!canAdd) return 0;
      return Math.min(Math.max(q, 1), maxSelectable);
    });
  }, [canAdd, maxSelectable]);

  const stockLabel = !product.availableForSale
    ? '販売停止中'
    : product.stock > 0
      ? '在庫あり'
      : '在庫切れ';

  const stockNote =
    product.stock > 0 && remainingStock === 0
      ? '（カート内で在庫上限まで追加済み）'
      : inCartQty > 0
        ? `（カート内 ${inCartQty}点）`
        : '';

  const stockColor =
    !product.availableForSale || product.stock === 0
      ? 'text-accent'
      : 'text-primary';

  function handleAdd() {
    if (!canAdd || quantity <= 0) return;
    addItem(product.handle, quantity);
    setMessage(`${product.name}を${quantity}点カートに追加しました。`);
    setTimeout(() => setMessage(''), 3000);
  }

  return (
    <div className={variant === 'detail' ? 'space-y-4' : 'space-y-3 border-t border-brand-border pt-4'}>
      <p className={`text-xs font-medium tracking-[0.16em] ${stockColor}`}>
        {stockLabel}{stockNote}
      </p>

      <div className={variant === 'detail' ? 'flex flex-col gap-3 sm:flex-row sm:items-end' : 'grid gap-3'}>
        <label className="grid gap-1.5 text-xs tracking-[0.18em] text-brand-muted">
          数量
          <select
            value={quantity}
            disabled={!canAdd}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="h-11 min-w-24 border border-brand-border bg-white px-3 text-sm text-brand-text disabled:cursor-not-allowed disabled:opacity-45"
          >
            {canAdd ? (
              options.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))
            ) : (
              <option value={0}>-</option>
            )}
          </select>
        </label>

        <button
          type="button"
          disabled={!canAdd}
          onClick={handleAdd}
          className={`h-11 px-6 text-xs uppercase tracking-[0.22em] font-medium transition-colors duration-200 ${
            variant === 'detail' ? 'sm:min-w-40' : 'w-full'
          } ${
            canAdd
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-brand-border text-brand-muted cursor-not-allowed'
          }`}
        >
          カートに追加
        </button>
      </div>

      {message && (
        <p className="text-xs text-primary tracking-wide" role="status" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
}
