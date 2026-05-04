'use client';

import { useEffect, useMemo, useState } from 'react';
import type { MockProduct } from '@/lib/mock/site';
import { useCart } from '@/components/cart/CartProvider';

type AddToCartControlsProps = {
  product: MockProduct;
  idBase: string;
  variant?: 'card' | 'detail';
};

export default function AddToCartControls({
  product,
  idBase,
  variant = 'card',
}: AddToCartControlsProps) {
  const { addItem, getItemQuantity } = useCart();
  const inCartQuantity = getItemQuantity(product.slug);
  const remainingStock = Math.max(product.stock - inCartQuantity, 0);
  const maxSelectableQuantity = Math.min(remainingStock, 9);
  const canAddToCart = product.stock > 0 && maxSelectableQuantity > 0;
  const [quantity, setQuantity] = useState(canAddToCart ? 1 : 0);
  const [message, setMessage] = useState('');

  const quantityOptions = useMemo(
    () => Array.from({ length: maxSelectableQuantity }, (_, index) => index + 1),
    [maxSelectableQuantity],
  );

  useEffect(() => {
    setQuantity((currentQuantity) => {
      if (!canAddToCart) {
        return 0;
      }

      return Math.min(Math.max(currentQuantity, 1), maxSelectableQuantity);
    });
  }, [canAddToCart, maxSelectableQuantity]);

  const stockLabel = product.stock > 0 ? '在庫あり' : '在庫なし';
  const stockSupplement =
    product.stock > 0 && remainingStock === 0
      ? '（カート内で在庫上限まで追加済み）'
      : inCartQuantity > 0
        ? `（カート内 ${inCartQuantity}点）`
        : '';

  function handleAddToCart() {
    if (!canAddToCart || quantity <= 0) {
      return;
    }

    addItem(product.slug, quantity);
    setMessage(`${product.name}を${quantity}点カートに追加しました。`);
  }

  return (
    <div
      id={idBase}
      className={variant === 'detail' ? 'space-y-4' : 'space-y-3 border-t border-mock-border pt-4'}
    >
      <p
        id={`${idBase}-stock`}
        className={`text-xs font-medium tracking-[0.16em] ${
          product.stock > 0 ? 'text-mock-moss' : 'text-mock-earth'
        }`}
      >
        {stockLabel}
        {stockSupplement}
      </p>

      <div
        id={`${idBase}-purchase-row`}
        className={variant === 'detail' ? 'flex flex-col gap-3 sm:flex-row sm:items-end' : 'grid gap-3'}
      >
        <label id={`${idBase}-quantity-label`} className="grid gap-2 text-xs tracking-[0.18em] text-mock-muted">
          数量
          <select
            id={`${idBase}-quantity`}
            value={quantity}
            disabled={!canAddToCart}
            onChange={(event) => setQuantity(Number(event.target.value))}
            className="h-11 min-w-24 border border-mock-border bg-mock-paper px-3 text-sm tracking-normal text-mock-ink disabled:cursor-not-allowed disabled:opacity-45"
          >
            {canAddToCart ? (
              quantityOptions.map((option) => (
                <option id={`${idBase}-quantity-${option}`} key={option} value={option}>
                  {option}
                </option>
              ))
            ) : (
              <option value={0}>-</option>
            )}
          </select>
        </label>

        <button
          id={`${idBase}-add-button`}
          type="button"
          disabled={!canAddToCart}
          onClick={handleAddToCart}
          className="mock-button-primary disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-mock-ink"
        >
          カートに入れる
        </button>
      </div>

      <p id={`${idBase}-message`} aria-live="polite" className="min-h-5 text-xs leading-5 text-mock-muted">
        {message}
      </p>
    </div>
  );
}
