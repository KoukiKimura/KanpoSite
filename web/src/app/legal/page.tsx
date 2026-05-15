import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記',
  description: '四国ボタニカの特定商取引法に基づく表記ページです。',
};

const legalItems = [
  { label: '販売業者', value: '四国ボタニカ（Shikoku Botanica）' },
  { label: '運営統括責任者', value: '○○○○（準備中）' },
  { label: '所在地', value: '〒000-0000 ○○県○○市○○町0-0-0（準備中）' },
  { label: '電話番号', value: '000-000-0000（準備中）\n受付時間: 平日 10:00〜17:00' },
  { label: 'メールアドレス', value: 'info@shikoku-botanica.jp（準備中）' },
  {
    label: '販売URL',
    value: 'https://shikoku-botanica.jp（準備中）',
  },
  {
    label: '販売価格',
    value: '各商品ページに記載の金額（税込）',
  },
  {
    label: '商品代金以外の必要料金',
    value: '消費税・送料\n送料は地域・注文内容により異なります。注文確定時にお知らせします。',
  },
  {
    label: '支払い方法',
    value: '銀行振込・その他（詳細は注文確定後にご案内します）\n※ 現在、オンライン決済機能は準備中です。',
  },
  {
    label: '支払い時期',
    value: '注文確定後、ご案内の期日までにお支払いください。',
  },
  {
    label: '商品の引き渡し時期',
    value: 'お支払い確認後、通常5〜10営業日以内に発送いたします。',
  },
  {
    label: '返品・交換について',
    value:
      '商品に不良がある場合は到着後7日以内にご連絡ください。お客様都合による返品はお受けしておりません。\n食品の特性上、開封後の返品はお受けできません。',
  },
  {
    label: '返品送料',
    value: '商品の不良・誤送の場合は当社負担。お客様都合による返品の場合はお客様負担。',
  },
];

export default function LegalPage() {
  return (
    <>
      {/* ページヘッダー */}
      <div className="bg-primary-dark text-white pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-site text-center">
          <h1
            className="heading-lg text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            特定商取引法に基づく表記
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
        </div>
      </div>

      <section className="section-padding bg-brand-bg">
        <div className="container-site max-w-3xl mx-auto">
          <p className="text-sm text-brand-muted mb-10 leading-loose">
            特定商取引に関する法律に基づき、以下の事項を表示します。
          </p>

          <div className="border border-brand-border divide-y divide-brand-border">
            {legalItems.map((item) => (
              <div key={item.label} className="grid grid-cols-1 sm:grid-cols-3 gap-0">
                <div className="bg-brand-cream px-5 py-4 text-xs font-medium tracking-wide text-brand-text sm:border-r border-brand-border">
                  {item.label}
                </div>
                <div className="px-5 py-4 text-sm text-brand-muted leading-loose sm:col-span-2 whitespace-pre-line">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-brand-muted/60 mt-8 leading-loose">
            ※ 上記の情報は順次更新いたします。最新情報についてはお問い合わせください。
          </p>
        </div>
      </section>
    </>
  );
}
