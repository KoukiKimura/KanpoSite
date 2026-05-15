'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { products, type Product } from '@/lib/data';

type StoredCart = Record<string, number>;

export type CartLine = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  totalQuantity: number;
  subtotal: number;
  hydrated: boolean;
  addItem: (handle: string, quantity: number) => void;
  setItemQuantity: (handle: string, quantity: number) => void;
  removeItem: (handle: string) => void;
  clearCart: () => void;
  getItemQuantity: (handle: string) => number;
};

const CART_STORAGE_KEY = 'shikoku_botanica_cart';
const CartContext = createContext<CartContextValue | undefined>(undefined);

function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

function normalizeLineQuantity(handle: string, quantity: number): number {
  const product = getProductByHandle(handle);
  if (!product || product.stock <= 0 || !product.availableForSale) {
    return 0;
  }
  const safe = Math.floor(Number(quantity));
  if (!Number.isFinite(safe) || safe <= 0) return 0;
  return Math.min(safe, product.stock);
}

function sanitizeStoredCart(value: unknown): StoredCart {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.entries(value).reduce<StoredCart>((acc, [handle, qty]) => {
    const n = normalizeLineQuantity(handle, Number(qty));
    if (n > 0) acc[handle] = n;
    return acc;
  }, {});
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [storedCart, setStoredCart] = useState<StoredCart>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      setStoredCart(raw ? sanitizeStoredCart(JSON.parse(raw)) : {});
    } catch {
      setStoredCart({});
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storedCart));
  }, [hydrated, storedCart]);

  const addItem = useCallback((handle: string, quantity: number) => {
    setStoredCart((current) => {
      const product = getProductByHandle(handle);
      if (!product || product.stock <= 0 || !product.availableForSale) return current;
      const increment = Math.floor(Number(quantity));
      if (!Number.isFinite(increment) || increment <= 0) return current;
      const currentQty = current[handle] ?? 0;
      const nextQty = Math.min(currentQty + increment, product.stock);
      if (nextQty === currentQty) return current;
      return { ...current, [handle]: nextQty };
    });
  }, []);

  const setItemQuantity = useCallback((handle: string, quantity: number) => {
    setStoredCart((current) => {
      const nextQty = normalizeLineQuantity(handle, quantity);
      const next = { ...current };
      if (nextQty > 0) {
        next[handle] = nextQty;
      } else {
        delete next[handle];
      }
      return next;
    });
  }, []);

  const removeItem = useCallback((handle: string) => {
    setStoredCart((current) => {
      if (!(handle in current)) return current;
      const next = { ...current };
      delete next[handle];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setStoredCart({}), []);

  const getItemQuantity = useCallback(
    (handle: string) => storedCart[handle] ?? 0,
    [storedCart],
  );

  const items = useMemo<CartLine[]>(
    () =>
      products.reduce<CartLine[]>((acc, product) => {
        const quantity = storedCart[product.handle];
        if (quantity) acc.push({ product, quantity });
        return acc;
      }, []),
    [storedCart],
  );

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalQuantity,
      subtotal,
      hydrated,
      addItem,
      setItemQuantity,
      removeItem,
      clearCart,
      getItemQuantity,
    }),
    [items, totalQuantity, subtotal, hydrated, addItem, setItemQuantity, removeItem, clearCart, getItemQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
