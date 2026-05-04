import { Metadata } from 'next';
import Link from 'next/link';
import CartPageClient from '@/components/cart/CartPageClient';

export const metadata: Metadata = {
  title: 'カート',
  description: 'お買い物カート',
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <>
      {/* ページヘッダー */}
      <div className="bg-primary-dark text-white pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="container-site">
          <nav className="flex items-center gap-2 text-xs text-white/50 tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition-colors">トップ</Link>
            <span>/</span>
            <span className="text-white/80">カート</span>
          </nav>
          <h1 className="heading-lg text-white" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            カート
          </h1>
        </div>
      </div>

      <CartPageClient />
    </>
  );
}

