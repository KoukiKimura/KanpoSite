import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '利用規約',
  description: '山草の恵みの利用規約です。',
};

export default function TermsPage() {
  return (
    <>
      {/* ページヘッダー */}
      <div className="bg-primary-dark text-white pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-site text-center">
          <h1
            className="heading-lg text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            利用規約
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
          <p className="text-white/50 text-xs mt-4">最終更新日: 2024年7月1日</p>
        </div>
      </div>

      <section className="section-padding bg-brand-bg">
        <div className="container-site max-w-3xl mx-auto">
          <p className="text-sm text-brand-muted mb-10 leading-loose">
            本利用規約（以下「本規約」）は、山草の恵み（以下「当社」）が運営するウェブサイト
            および提供するサービスのご利用条件を定めるものです。
            サービスをご利用いただく前に、本規約を必ずお読みください。
          </p>

          <div className="prose-brand text-brand-muted space-y-10">

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                第1条（適用範囲）
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <p className="text-sm leading-loose">
                本規約は、当社が運営するウェブサイト（以下「本サイト」）および
                当社が提供する全てのサービスに適用されます。
                お客様は本サイトをご利用いただくことで、本規約に同意したものとみなします。
              </p>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                第2条（商品の購入）
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <div className="text-sm leading-loose space-y-3">
                <p>
                  当社の商品をご購入いただく際は、以下の事項にご同意いただく必要があります。
                </p>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                  <li>ご注文後、当社からの確認メールをもって売買契約が成立します。</li>
                  <li>商品の在庫状況により、ご注文をお断りする場合があります。</li>
                  <li>商品の価格・仕様は予告なく変更される場合があります。</li>
                  <li>食品の特性上、お客様都合による返品・交換はお受けできません。</li>
                </ol>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                第3条（禁止事項）
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <p className="text-sm leading-loose mb-3">
                お客様は、本サイトのご利用にあたり、以下の行為を行ってはなりません。
              </p>
              <ul className="text-sm leading-loose list-disc list-inside space-y-1 pl-2">
                <li>法令または公序良俗に反する行為</li>
                <li>当社または第三者の知的財産権を侵害する行為</li>
                <li>当社のサービス運営を妨害する行為</li>
                <li>不正アクセス、不正な情報収集等の行為</li>
                <li>虚偽の情報を登録する行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                第4条（知的財産権）
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <p className="text-sm leading-loose">
                本サイトに掲載されているコンテンツ（テキスト、画像、デザイン等）の著作権は、
                当社または正当な権利を有する第三者に帰属します。
                無断転載・複製・改変等は固く禁じます。
              </p>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                第5条（免責事項）
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <div className="text-sm leading-loose space-y-3">
                <p>
                  当社は、以下の事項について責任を負いません。
                </p>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                  <li>お客様の体質・体調等による商品の効果の個人差</li>
                  <li>システムのメンテナンス・障害による一時的なサービス停止</li>
                  <li>天災・事故等の不可抗力によるサービスへの影響</li>
                  <li>第三者による不正アクセス等による損害</li>
                </ol>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                第6条（個人情報の取り扱い）
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <p className="text-sm leading-loose">
                個人情報の取り扱いについては、別途定める
                <Link href="/privacy" className="text-primary underline hover:no-underline mx-1">
                  プライバシーポリシー
                </Link>
                に従います。
              </p>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                第7条（規約の変更）
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <p className="text-sm leading-loose">
                当社は、必要に応じて本規約を変更することがあります。
                変更後の規約は、本サイトに掲載した時点から効力を生じます。
                重要な変更がある場合は、本サイト上でお知らせします。
              </p>
            </div>

            <div>
              <h2 className="text-lg font-serif text-brand-text mb-4 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                第8条（準拠法・管轄裁判所）
              </h2>
              <div className="w-8 h-px bg-accent mb-4" />
              <p className="text-sm leading-loose">
                本規約の解釈にあたっては、日本法を準拠法とします。
                本サービスに関して紛争が生じた場合には、当社所在地を管轄する
                裁判所を専属的合意管轄とします。
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-brand-border">
            <Link href="/contact" className="text-sm text-primary hover:text-primary-dark tracking-widest underline hover:no-underline">
              ご不明な点はお問い合わせください
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
