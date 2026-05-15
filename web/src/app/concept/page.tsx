import type { Metadata } from 'next';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'コンセプト',
  description:
    '四国ボタニカのコンセプト。四国の植物・薬草と自然に向き合う理念、価値観、世界観をご紹介します。',
};

export default function ConceptPage() {
  return (
    <>
      {/* ヒーローセクション */}
      <div
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 text-white overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1E3610 0%, #2D5016 50%, #3D6B1F 100%)' }}
      >
        <div className="container-site text-center">
          <p
            className="text-xs tracking-[0.4em] text-white/50 uppercase mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Our Concept
          </p>
          <h1
            className="heading-xl text-white mb-5"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            コンセプト
          </h1>
          <div className="w-12 h-px bg-accent mx-auto my-6" />
          <p className="text-white/70 max-w-lg mx-auto text-base leading-loose">
            土と草と光。自然と人をつなぐ漢方の理念をお伝えします。
          </p>
        </div>
      </div>

      {/* コンテンツ（準備中） */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site max-w-3xl mx-auto text-center">
          <SectionTitle
            title="理念・価値観"
            titleEn="Philosophy & Values"
          />
          <p className="text-brand-muted leading-loose mb-10">
            コンテンツは準備中です。
          </p>
          <Link href="/about" className="btn-outline">
            ブランド紹介を見る
          </Link>
        </div>
      </section>
    </>
  );
}
