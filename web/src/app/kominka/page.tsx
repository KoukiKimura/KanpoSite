import type { Metadata } from 'next';
import SectionTitle from '@/components/ui/SectionTitle';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '古民家',
  description:
    '四国ボタニカの古民家。四国の植物と自然を体感する滞在施設。近日公開予定。',
};

export default function KominkaPage() {
  return (
    <>
      {/* ヒーローセクション */}
      <div className="relative min-h-[46vh] flex items-center justify-center overflow-hidden">
        <ResponsiveImage
          src="/images/kominka/hero-stay.webp"
          alt="古民家の宿"
          pictureClassName="absolute inset-0 block h-full w-full"
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(12,12,12,0.28),rgba(12,12,12,0.46))]" />
        {/* 近日公開オーバーレイ */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="border border-white/30 px-8 py-3 text-center">
            <p
              className="text-xs tracking-[0.4em] text-white/70 uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Coming Soon
            </p>
          </div>
        </div>
        <div className="relative z-10 container-site text-center text-white py-20 lg:py-32">
          <p
            className="text-xs tracking-[0.4em] text-white/50 uppercase mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Kominka
          </p>
          <h1
            className="heading-xl text-white mb-5"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            古民家
          </h1>
          <div className="w-12 h-px bg-accent mx-auto my-6" />
          <p className="text-white/70 max-w-lg mx-auto text-base leading-loose">
            朝は畑の空気を吸い、夜は木の香りの中で休む。<br />
            <span className="text-accent font-medium">近日公開予定です。</span>
          </p>
        </div>
      </div>

      {/* メインコンテンツ */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* 古民家画像 */}
            <div className="sticky top-24 space-y-3">
              <div className="relative overflow-hidden min-h-[280px] md:min-h-[420px]">
                <ResponsiveImage
                  src="/images/kominka/hero-stay.webp"
                  alt="古民家の宿"
                  pictureClassName="absolute inset-0 block h-full w-full"
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1023px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative overflow-hidden min-h-[150px]">
                  <ResponsiveImage
                    src="/images/kominka/living-room.webp"
                    alt="居間"
                    pictureClassName="absolute inset-0 block h-full w-full"
                    className="h-full w-full object-cover"
                    sizes="25vw"
                  />
                </div>
                <div className="relative overflow-hidden min-h-[150px]">
                  <ResponsiveImage
                    src="/images/kominka/morning-field.webp"
                    alt="朝の畑"
                    pictureClassName="absolute inset-0 block h-full w-full"
                    className="h-full w-full object-cover"
                    sizes="25vw"
                  />
                </div>
              </div>
            </div>

            {/* テキストコンテンツ */}
            <div>
              <SectionTitle
                title="古民家での漢方体験"
                titleEn="Kampo Stay Experience"
                align="left"
              />

              <div className="prose-brand text-brand-muted space-y-5 mb-10">
                <p>
                  築○○年の古民家を丁寧に改修し、宿泊施設として準備を進めています。
                  木の温もりを残しながら、現代の快適さも取り入れた空間で、
                  自然の中のゆったりとした時間をお過ごしいただけます。
                </p>
                <p>
                  宿泊には、生薬畑の朝の見学ツアーと、季節の漢方茶体験が含まれます。
                  普段の生活では感じられない、植物との対話を体験してください。
                </p>
                <p>
                  夕食には、畑でとれた野菜と生薬を使った薬膳料理を提供予定です。
                  食べることで体を整える、漢方の知恵を存分に味わっていただける内容を準備中です。
                </p>
              </div>

              {/* 特徴リスト */}
              <div className="space-y-4 mb-10">
                {[
                  { icon: '🌿', title: '畑見学ツアー付き', desc: '朝の生薬畑を案内します' },
                  { icon: '🍵', title: '漢方茶体験', desc: '自分の体質に合ったお茶を一緒に選びます' },
                  { icon: '🍽️', title: '薬膳夕食', desc: '畑の野菜と生薬を使った料理を提供予定' },
                  { icon: '🏡', title: '古民家宿泊', desc: '木のぬくもりに包まれた静かな夜を' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 bg-brand-cream border border-brand-border">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-brand-text tracking-wide">{item.title}</p>
                      <p className="text-xs text-brand-muted mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 予約セクション */}
              <div className="p-6 border border-brand-border bg-brand-cream">
                <h3
                  className="text-lg font-serif text-brand-text mb-2"
                  style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                  ご予約について
                </h3>
                <div className="w-8 h-px bg-accent mb-4" />
                <p className="text-sm text-brand-muted leading-loose mb-5">
                  現在、ゲストハウスの準備を進めています。オープン時はFacebookページにてお知らせします。
                  また、予約機能は将来実装予定です。
                </p>
                <p className="text-xs text-accent mb-4 font-medium">
                  ※ 予約機能は将来実装予定（現在はFacebookよりお問い合わせください）
                </p>
                {/* FacebookボタンのURLはプレースホルダー */}
                <span
                  aria-disabled="true"
                  className="btn-secondary inline-flex items-center gap-2 opacity-60 cursor-not-allowed select-none"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Facebookでお問い合わせ
                </span>
                <p className="text-xs text-brand-muted/50 mt-2">
                  ※ FacebookページのURLは準備中のプレースホルダーです
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 周辺情報 */}
      <section className="section-padding bg-brand-cream">
        <div className="container-site max-w-3xl mx-auto text-center">
          <SectionTitle
            title="アクセス"
            titleEn="Access"
            subtitle="詳細な交通情報はオープン時に公開いたします。"
          />
          <div className="aspect-video bg-brand-border flex items-center justify-center border border-brand-border">
            <div className="text-brand-muted text-center">
              <span className="text-4xl block mb-3">📍</span>
              <p className="text-sm tracking-wide">地図・アクセス情報（準備中）</p>
              <p className="text-xs mt-1">〒000-0000 ○○県○○市○○町0-0-0（仮）</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <div className="py-14 text-center border-t border-brand-border">
        <div className="container-site">
          <p className="text-sm text-brand-muted mb-6">
            ゲストハウスの最新情報はお問い合わせからどうぞ。
          </p>
          <Link href="/contact" className="btn-outline">
            お問い合わせ
          </Link>
        </div>
      </div>
    </>
  );
}
