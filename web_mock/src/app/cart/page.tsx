import type { Metadata } from 'next';
import CartPageClient from '@/components/cart/CartPageClient';

export const metadata: Metadata = {
  title: 'カート',
};

export default function CartPage() {
  return <CartPageClient />;
}
