/**
 * Shopify ユーティリティ
 *
 * - カートはブラウザの localStorage で管理し、Shopify チェックアウト URL へリダイレクト
 * - Storefront API の代わりに Admin API を使えるよう設計しているが、
 *   現時点では静的データ（data.ts）のみ使用。将来 Storefront API へ移行しやすいよう型を定義。
 */

export const SHOPIFY_STORE_DOMAIN = 'cqs1ru-bs.myshopify.com';

// ---------------------------------------------------------------------------
// カート行
// ---------------------------------------------------------------------------

export type CartItem = {
  variantId: string;
  quantity: number;
};

// ---------------------------------------------------------------------------
// Shopify チェックアウト URL 生成
// 形式: https://{domain}/cart/{variantId}:{qty},{variantId}:{qty}
// ---------------------------------------------------------------------------

export function buildShopifyCheckoutUrl(items: CartItem[]): string {
  const lineItems = items
    .filter((item) => item.quantity > 0)
    .map((item) => `${item.variantId}:${item.quantity}`)
    .join(',');

  if (!lineItems) {
    return `https://${SHOPIFY_STORE_DOMAIN}/cart`;
  }

  return `https://${SHOPIFY_STORE_DOMAIN}/cart/${lineItems}`;
}
