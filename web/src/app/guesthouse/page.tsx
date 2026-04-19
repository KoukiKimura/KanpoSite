import type { Metadata } from 'next';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ゲストハウス',
  description:
    '山草の恵みの古民家ゲストハウス。漢方と自然を体感する宿泊体験。近日公開予定。',
};

export default function GuesthousePage() {
  return (
    <>
      {/* ヒーローセクション */}
      <div
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 text-white overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #3D3010 0%, #5C4A20 50%, #6B500F 100%)' }}
      >
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

        <div className="relative container-site text-center">
          <p
            className="text-xs tracking-[0.4em] text-white/50 uppercase mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Guesthouse
          </p>
          <h1
            className="heading-xl text-white mb-5"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            ゲストハウス
          </h1>
          <div className="w-12 h-px bg-accent mx-auto my-6" />
          <p className="text-white/70 max-w-lg mx-auto text-base leading-loose">
            古民家を改修した宿で、漢方と自然に触れる体験を。<br />
            <span className="text-accent font-medium">近日公開予定です。</span>
          </p>
        </div>
      </div>

      {/* メインコンテンツ */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* 画像プレースホルダー */}
            <div className="sticky top-24">
              <div className="aspect-[4/3] bg-brand-cream border border-brand-border flex items-center justify-center mb-3">
                <div className="text-center text-brand-muted">
                  <span className="text-7xl block mb-3">🏡</span>
                  <p className="text-xs tracking-widest">古民家外観写真（準備中）</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-square bg-brand-cream border border-brand-border flex items-center justify-center">
                  <span className="text-3xl opacity-20">🌿</span>
                </div>
                <div className="aspect-square bg-brand-cream border border-brand-border flex items-center justify-center">
                  <span className="text-3xl opacity-20">🏮</span>
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
                <a
                  href="https://www.facebook.com/PLACEHOLDER"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Facebookでお問い合わせ
                </a>
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
