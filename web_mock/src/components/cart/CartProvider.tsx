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
import { getProductBySlug, mockProducts, type MockProduct } from '@/lib/mock/site';

type StoredCart = Record<string, number>;

export type CartLine = {
  product: MockProduct;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  totalQuantity: number;
  subtotal: number;
  hydrated: boolean;
  addItem: (slug: string, quantity: number) => void;
  setItemQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  getItemQuantity: (slug: string) => number;
};

const CART_STORAGE_KEY = 'web_mock_cart';
const CartContext = createContext<CartContextValue | undefined>(undefined);

function normalizeLineQuantity(slug: string, quantity: number) {
  const product = getProductBySlug(slug);

  if (!product || product.stock <= 0) {
    return 0;
  }

  const safeQuantity = Math.floor(Number(quantity));

  if (!Number.isFinite(safeQuantity) || safeQuantity <= 0) {
    return 0;
  }

  return Math.min(safeQuantity, product.stock);
}

function sanitizeStoredCart(value: unknown): StoredCart {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return Object.entries(value).reduce<StoredCart>((nextCart, [slug, quantity]) => {
    const normalizedQuantity = normalizeLineQuantity(slug, Number(quantity));

    if (normalizedQuantity > 0) {
      nextCart[slug] = normalizedQuantity;
    }

    return nextCart;
  }, {});
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [storedCart, setStoredCart] = useState<StoredCart>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);
      setStoredCart(rawCart ? sanitizeStoredCart(JSON.parse(rawCart)) : {});
    } catch {
      setStoredCart({});
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storedCart));
  }, [hydrated, storedCart]);

  const addItem = useCallback((slug: string, quantity: number) => {
    setStoredCart((currentCart) => {
      const product = getProductBySlug(slug);

      if (!product || product.stock <= 0) {
        return currentCart;
      }

      const increment = Math.floor(Number(quantity));

      if (!Number.isFinite(increment) || increment <= 0) {
        return currentCart;
      }

      const currentQuantity = currentCart[slug] ?? 0;
      const nextQuantity = Math.min(currentQuantity + increment, product.stock);

      if (nextQuantity === currentQuantity) {
        return currentCart;
      }

      return {
        ...currentCart,
        [slug]: nextQuantity,
      };
    });
  }, []);

  const setItemQuantity = useCallback((slug: string, quantity: number) => {
    setStoredCart((currentCart) => {
      const nextQuantity = normalizeLineQuantity(slug, quantity);
      const nextCart = { ...currentCart };

      if (nextQuantity > 0) {
        nextCart[slug] = nextQuantity;
      } else {
        delete nextCart[slug];
      }

      return nextCart;
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setStoredCart((currentCart) => {
      if (!(slug in currentCart)) {
        return currentCart;
      }

      const nextCart = { ...currentCart };
      delete nextCart[slug];
      return nextCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    setStoredCart({});
  }, []);

  const getItemQuantity = useCallback(
    (slug: string) => storedCart[slug] ?? 0,
    [storedCart],
  );

  const items = useMemo<CartLine[]>(
    () =>
      mockProducts.reduce<CartLine[]>((cartItems, product) => {
        const quantity = storedCart[product.slug];

        if (quantity) {
          cartItems.push({ product, quantity });
        }

        return cartItems;
      }, []),
    [storedCart],
  );

  const totalQuantity = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.product.price * item.quantity, 0),
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
    [
      items,
      totalQuantity,
      subtotal,
      hydrated,
      addItem,
      setItemQuantity,
      removeItem,
      clearCart,
      getItemQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
