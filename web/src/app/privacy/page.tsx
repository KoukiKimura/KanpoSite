import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: '山草の恵みのプライバシーポリシーです。',
};

export default function PrivacyPage() {
  return (
    <>
      {/* ページヘッダー */}
      <div className="bg-primary-dark text-white pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-site text-center">
          <h1
            className="heading-lg text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            プライバシーポリシー
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
          <p className="text-white/50 text-xs mt-4">最終更新日: 2024年7月1日</p>
        </div>
      </div>

      <section className="section-padding bg-brand-bg">
        <div className="container-site max-w-3xl mx-auto">
          <div className="prose-brand text-brand-muted space-y-10">

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                1. 基本方針
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <p className="text-sm leading-loose">
                山草の恵み（以下「当社」）は、お客様の個人情報の保護を重要な責務と考え、
                個人情報の保護に関する法律（個人情報保護法）およびその他関連法令を遵守します。
                お客様の個人情報を適切に管理し、目的外の利用を行いません。
              </p>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                2. 個人情報の収集
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <p className="text-sm leading-loose mb-3">
                当社は、以下の場合に個人情報を収集することがあります。
              </p>
              <ul className="text-sm leading-loose list-disc list-inside space-y-1 pl-2">
                <li>商品のご注文・お問い合わせの際</li>
                <li>ゲストハウスのご予約の際</li>
                <li>メールマガジンへのご登録の際</li>
                <li>アンケートへのご回答の際</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                3. 収集する個人情報の種類
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <ul className="text-sm leading-loose list-disc list-inside space-y-1 pl-2">
                <li>氏名</li>
                <li>住所</li>
                <li>電話番号</li>
                <li>メールアドレス</li>
                <li>その他お問い合わせの際にご提供いただいた情報</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                4. 個人情報の利用目的
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <p className="text-sm leading-loose mb-3">
                収集した個人情報は、以下の目的で利用します。
              </p>
              <ul className="text-sm leading-loose list-disc list-inside space-y-1 pl-2">
                <li>商品の発送およびご注文対応</li>
                <li>お問い合わせへの返答</li>
                <li>ゲストハウスの予約管理</li>
                <li>新商品・イベント情報のご案内（同意をいただいた場合）</li>
                <li>サービス改善のための統計分析（個人を特定しない形式）</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                5. 個人情報の第三者提供
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <p className="text-sm leading-loose">
                当社は、法令に定める場合を除き、お客様の個人情報を事前の同意なしに
                第三者に提供することはありません。ただし、商品配送のために宅配業者へ
                必要最小限の情報を提供する場合があります。
              </p>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                6. 個人情報の管理
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <p className="text-sm leading-loose">
                当社は、収集した個人情報の漏洩、滅失、毀損を防ぐために、
                適切なセキュリティ対策を実施します。
              </p>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                7. 個人情報の開示・訂正・削除
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <p className="text-sm leading-loose">
                お客様は、当社が保有するご自身の個人情報について、開示・訂正・削除を
                求める権利を有します。ご希望の場合は、以下の連絡先までお問い合わせください。
              </p>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                8. Cookie等の使用
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <p className="text-sm leading-loose">
                当サイトでは、より良いサービスを提供するためにCookieを使用することがあります。
                お使いのブラウザの設定でCookieを無効にすることが可能ですが、
                一部機能が利用できなくなる場合があります。
              </p>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                9. お問い合わせ窓口
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <p className="text-sm leading-loose">
                個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。
              </p>
              <div className="mt-3 p-4 bg-brand-cream border border-brand-border text-sm text-brand-muted">
                <p>山草の恵み プライバシー担当</p>
                <p>メール: info@sansou-megumi.jp（仮）</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                10. 本ポリシーの変更
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <p className="text-sm leading-loose">
                本プライバシーポリシーは、必要に応じて改定する場合があります。
                重要な変更がある場合はウェブサイト上でお知らせします。
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-brand-border">
            <Link href="/contact" className="text-sm text-primary hover:text-primary-dark tracking-widest underline hover:no-underline">
              プライバシーに関するお問い合わせはこちら
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
