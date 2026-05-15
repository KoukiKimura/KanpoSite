import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * /returns — 返品・交換について
 * Shopify 側設定が正本。公開後は Shopify 設定との差分確認日を更新すること。
 * lastVerifiedAt: '2026-04-29'
 */

export const metadata: Metadata = {
  title: '返品・交換について',
  description: '四国ボタニカの返品・交換条件、連絡方法についてご案内します。',
};

export default function ReturnsPage() {
  return (
    <>
      {/* ページヘッダー */}
      <div className="bg-primary-dark text-white pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="container-site">
          <nav className="flex items-center gap-2 text-xs text-white/50 tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition-colors">トップ</Link>
            <span>/</span>
            <span className="text-white/80">返品・交換について</span>
          </nav>
          <h1
            className="heading-lg text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            返品・交換について
          </h1>
        </div>
      </div>

      <section className="section-padding bg-brand-bg">
        <div className="container-site max-w-2xl">
          <div className="space-y-10">

            <div>
              <h2
                className="text-xl font-serif tracking-wide text-brand-text mb-4"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                返品・交換をお受けできる場合
              </h2>
              <div className="w-8 h-px bg-accent mb-5" />
              <ul className="text-sm text-brand-muted leading-loose space-y-2">
                <li>• 商品到着後 7 日以内にご連絡いただいた場合</li>
                <li>• 商品の破損・汚損・誤発送があった場合</li>
                <li>• 当社の過失による場合</li>
              </ul>
            </div>

            <div>
              <h2
                className="text-xl font-serif tracking-wide text-brand-text mb-4"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                返品・交換をお受けできない場合
              </h2>
              <div className="w-8 h-px bg-accent mb-5" />
              <ul className="text-sm text-brand-muted leading-loose space-y-2">
                <li>• お客様都合による返品・交換（サイズ違い、イメージ違いなど）</li>
                <li>• 開封後の商品</li>
                <li>• 使用済みの商品</li>
                <li>• 商品到着後 8 日以上経過した場合</li>
                <li>• セール・特価商品</li>
              </ul>
            </div>

            <div>
              <h2
                className="text-xl font-serif tracking-wide text-brand-text mb-4"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                返品・交換の手順
              </h2>
              <div className="w-8 h-px bg-accent mb-5" />
              <ol className="text-sm text-brand-muted leading-loose space-y-3 list-none">
                <li className="flex gap-3">
                  <span className="text-accent font-medium flex-shrink-0">1.</span>
                  <span>
                    お問い合わせページより「返品・交換希望」の旨と、注文番号・理由をご連絡ください。
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-medium flex-shrink-0">2.</span>
                  <span>当社より返送先住所をご案内いたします。</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-medium flex-shrink-0">3.</span>
                  <span>商品到着確認後、交換品の発送または返金手続きを行います。</span>
                </li>
              </ol>
              <p className="text-sm text-brand-muted mt-4">
                返品送料は、当社の過失の場合は当社負担、お客様都合の場合はお客様負担となります。
              </p>
            </div>

            <div className="p-5 bg-brand-cream border border-brand-border text-xs text-brand-muted leading-loose">
              ※ 返品・交換条件の詳細および最新情報は Shopify チェックアウト画面をご確認ください。<br />
              本ページの記載内容は 2026年4月現在のものです。
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/contact" className="btn-primary">
              返品・交換のお問い合わせ
            </Link>
            <Link href="/products" className="btn-outline">
              商品一覧に戻る
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
