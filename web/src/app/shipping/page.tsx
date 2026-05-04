import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * /shipping — 配送について
 * Shopify 側設定が正本。公開後は Shopify 設定との差分確認日を更新すること。
 * lastVerifiedAt: '2026-04-29'
 */

export const metadata: Metadata = {
  title: '配送について',
  description: '山草の恵みの配送条件、送料、発送目安についてご案内します。',
};

export default function ShippingPage() {
  return (
    <>
      {/* ページヘッダー */}
      <div className="bg-primary-dark text-white pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="container-site">
          <nav className="flex items-center gap-2 text-xs text-white/50 tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition-colors">トップ</Link>
            <span>/</span>
            <span className="text-white/80">配送について</span>
          </nav>
          <h1
            className="heading-lg text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            配送について
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
                送料
              </h2>
              <div className="w-8 h-px bg-accent mb-5" />
              <div className="bg-brand-cream border border-brand-border p-6">
                <table className="w-full text-sm text-brand-text leading-loose">
                  <tbody>
                    <tr className="border-b border-brand-border">
                      <td className="py-3 pr-6 text-brand-muted w-32">全国一律</td>
                      <td className="py-3">770円（税込）</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 text-brand-muted">5,500円以上</td>
                      <td className="py-3 text-primary font-medium">送料無料</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2
                className="text-xl font-serif tracking-wide text-brand-text mb-4"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                発送目安
              </h2>
              <div className="w-8 h-px bg-accent mb-5" />
              <ul className="text-sm text-brand-muted leading-loose space-y-2">
                <li>• ご注文確認後、通常 2〜4 営業日以内に発送いたします。</li>
                <li>• 在庫状況によってお時間をいただく場合がございます。</li>
                <li>• 発送後、追跡番号をメールにてご連絡します。</li>
              </ul>
            </div>

            <div>
              <h2
                className="text-xl font-serif tracking-wide text-brand-text mb-4"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                配送業者
              </h2>
              <div className="w-8 h-px bg-accent mb-5" />
              <p className="text-sm text-brand-muted leading-loose">
                ヤマト運輸またはゆうパックにて発送いたします。<br />
                お届け日時のご希望は、ご注文時の備考欄にご記入ください。
              </p>
            </div>

            <div>
              <h2
                className="text-xl font-serif tracking-wide text-brand-text mb-4"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                お届けできないエリア
              </h2>
              <div className="w-8 h-px bg-accent mb-5" />
              <p className="text-sm text-brand-muted leading-loose">
                離島・一部山間部については追加送料が発生する場合がございます。<br />
                詳細はお問い合わせください。
              </p>
            </div>

            <div className="p-5 bg-brand-cream border border-brand-border text-xs text-brand-muted leading-loose">
              ※ 配送条件の詳細および最新情報は Shopify チェックアウト画面をご確認ください。<br />
              本ページの記載内容は 2026年4月現在のものです。
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/products" className="btn-outline">
              商品一覧に戻る
            </Link>
            <Link href="/contact" className="text-sm tracking-widest text-primary hover:text-primary-dark transition-colors">
              お問い合わせ →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
