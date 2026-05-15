import type { Metadata } from 'next';
import Link from 'next/link';
import ProductsClientFilter from '@/components/ui/ProductsClientFilter';

export const metadata: Metadata = {
  title: '商品一覧',
  description:
    '四国ボタニカの商品一覧。四国の植物・薬草の背景を大切にした茶葉、粉末、錠剤、セット商品をご覧ください。',
  openGraph: {
    title: '商品一覧 | 四国ボタニカ',
    description: '四国の植物・薬草の背景を大切にした商品。茶葉、粉末、錠剤、セット商品を取り揃えています。',
  },
};

export default function ProductsPage() {
  return (
    <>
      {/* ページヘッダー */}
      <div className="bg-primary-dark text-white pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-site text-center">
          <p
            className="text-xs tracking-[0.3em] text-white/50 uppercase mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Products
          </p>
          <h1
            className="heading-lg text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            商品一覧
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
        </div>
      </div>

      {/* 商品一覧（クライアントフィルター） */}
      <ProductsClientFilter />

      {/* 下部CTA */}
      <section className="py-16 bg-brand-cream text-center">
        <div className="container-site max-w-xl">
          <p className="text-sm text-brand-muted leading-loose mb-6">
            商品についてご不明な点がございましたら、<br />
            お気軽にお問い合わせください。
          </p>
          <Link href="/contact" className="btn-outline">
            お問い合わせ
          </Link>
        </div>
      </section>
    </>
  );
}
