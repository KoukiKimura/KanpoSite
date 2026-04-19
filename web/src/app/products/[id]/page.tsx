import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, getProductById } from '@/lib/dummy-data';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: '商品が見つかりません' };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      {/* ページヘッダー */}
      <div className="bg-primary-dark text-white pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="container-site">
          {/* パンくずリスト */}
          <nav className="flex items-center gap-2 text-xs text-white/50 tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition-colors">トップ</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">商品一覧</Link>
            <span>/</span>
            <span className="text-white/80">{product.name}</span>
          </nav>
          <h1
            className="heading-lg text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            {product.name}
          </h1>
          <p
            className="text-sm italic text-white/50 mt-2 tracking-widest"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {product.nameEn}
          </p>
        </div>
      </div>

      {/* 商品詳細 */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* 商品画像プレースホルダー */}
            <div className="aspect-square bg-brand-cream border border-brand-border flex items-center justify-center">
              <div className="text-center text-brand-muted">
                <span className="text-8xl block mb-4">🌿</span>
                <p className="text-xs tracking-widest">{product.nameEn}</p>
                <p className="text-xs text-brand-muted/50 mt-2">商品画像（準備中）</p>
              </div>
            </div>

            {/* 商品情報 */}
            <div className="flex flex-col">
              {/* カテゴリーバッジ */}
              <div className="mb-4">
                <span className="text-xs tracking-widest text-accent bg-accent/10 px-3 py-1">
                  {product.category}
                </span>
              </div>

              {/* 商品名 */}
              <h2
                className="heading-md text-brand-text mb-1"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                {product.name}
              </h2>
              <p
                className="text-sm italic text-brand-muted mb-4 tracking-widest"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {product.nameEn}
              </p>

              {/* 価格 */}
              <div className="py-5 border-y border-brand-border mb-6">
                <p className="text-3xl font-medium tracking-wide">
                  ¥{product.price.toLocaleString()}
                  <span className="text-sm text-brand-muted ml-2 font-normal">（税込）</span>
                </p>
                <p className="text-xs text-brand-muted mt-1">
                  在庫: {product.stock > 0 ? `残り${product.stock}点` : '在庫切れ'}
                </p>
              </div>

              {/* 商品説明 */}
              <p className="text-brand-muted leading-loose text-sm mb-8">
                {product.longDescription}
              </p>

              {/* カートボタン（TODO: カート機能は将来実装予定） */}
              <div className="space-y-3">
                <button
                  className="btn-primary w-full opacity-50 cursor-not-allowed"
                  disabled
                  title="カート機能は将来実装予定です"
                >
                  カートに追加する
                </button>
                <p className="text-xs text-center text-brand-muted">
                  ※ 現在、オンライン購入機能は準備中です。お問い合わせよりご注文ください。
                </p>
                <Link
                  href="/contact"
                  className="btn-outline w-full text-center"
                >
                  購入についてお問い合わせ
                </Link>
              </div>
            </div>
          </div>

          {/* 詳細情報タブエリア */}
          <div className="mt-16 lg:mt-24 border-t border-brand-border pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              {/* 原材料 */}
              <div>
                <h3
                  className="text-lg font-serif tracking-wide text-brand-text mb-4"
                  style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                  原材料・生薬
                </h3>
                <div className="w-8 h-px bg-accent mb-5" />
                <ul className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <li
                      key={ing}
                      className="text-sm text-brand-muted bg-brand-cream border border-brand-border px-3 py-1 tracking-wide"
                    >
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 飲み方・使い方 */}
              <div>
                <h3
                  className="text-lg font-serif tracking-wide text-brand-text mb-4"
                  style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                  飲み方・使い方
                </h3>
                <div className="w-8 h-px bg-accent mb-5" />
                <p className="text-sm text-brand-muted leading-loose">{product.usage}</p>
              </div>
            </div>

            {/* 注意事項 */}
            <div className="mt-10 p-6 bg-brand-cream border border-brand-border">
              <h4 className="text-sm font-medium tracking-wide text-brand-text mb-3">ご注意事項</h4>
              <ul className="text-xs text-brand-muted space-y-1.5 leading-relaxed">
                <li>• 食品アレルギーのある方は原材料をご確認の上、ご使用ください。</li>
                <li>• 妊娠中・授乳中の方、お子様がご使用の際は医師にご相談ください。</li>
                <li>• 薬を服用中の方は医師または薬剤師にご相談ください。</li>
                <li>• 開封後は早めにお召し上がりください。直射日光・高温多湿を避けて保存してください。</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 商品一覧に戻るリンク */}
      <div className="py-10 bg-brand-cream text-center">
        <Link
          href="/products"
          className="text-sm tracking-widest text-primary hover:text-primary-dark transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <span>←</span> 商品一覧に戻る
        </Link>
      </div>
    </>
  );
}
