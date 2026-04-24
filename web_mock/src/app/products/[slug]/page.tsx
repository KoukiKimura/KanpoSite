import Link from 'next/link';
import { notFound } from 'next/navigation';
import PhotoPanel from '@/components/ui/PhotoPanel';
import SectionHeading from '@/components/ui/SectionHeading';
import { getProductBySlug, mockProducts } from '@/lib/mock/site';

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }));
}

export const dynamicParams = false;

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <section id={`product-detail-${product.slug}-hero`} className="border-b border-mock-border bg-[rgba(255,255,255,0.32)]">
        <div id={`product-detail-${product.slug}-hero-inner`} className="mock-shell py-14 md:py-18">
          <Link
            id={`product-detail-${product.slug}-back-link`}
            href="/products"
            className="text-xs uppercase tracking-[0.3em] text-mock-muted"
          >
            商品一覧へ戻る
          </Link>
          <div
            id={`product-detail-${product.slug}-layout`}
            className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"
          >
            <div id={`product-detail-${product.slug}-gallery`} className="grid gap-5 md:grid-cols-[1.35fr_0.65fr]">
              <PhotoPanel
                label={product.name}
                caption="季節の空気とともに眺めるためのメインイメージです。"
                from={product.palette.from}
                to={product.palette.to}
                tall
                src={product.mainImage.src}
                alt={product.mainImage.alt}
              />
              <div id={`product-detail-${product.slug}-gallery-sub`} className="grid gap-5">
                <PhotoPanel
                  label="原材料の印象"
                  caption="素材ごとのやわらかな香りや質感を見せるための補助イメージです。"
                  from={product.palette.to}
                  to="rgb(var(--mock-panel-soft-1))"
                  src={product.detailImages[0]?.src}
                  alt={product.detailImages[0]?.alt}
                />
                <PhotoPanel
                  label="暮らしの中で"
                  caption="毎日の時間に自然になじむ使い方を想定したシーンです。"
                  from={product.palette.from}
                  to="rgb(var(--mock-panel-soft-2))"
                  src={product.detailImages[1]?.src}
                  alt={product.detailImages[1]?.alt}
                />
              </div>
            </div>

            <div id={`product-detail-${product.slug}-summary`} className="space-y-6">
              <div id={`product-detail-${product.slug}-heading`} className="space-y-3">
                <p id={`product-detail-${product.slug}-category`} className="text-xs uppercase tracking-[0.32em] text-mock-gold">
                  {product.category}
                </p>
                <h1 id={`product-detail-${product.slug}-title`} className="font-serif text-4xl leading-tight text-mock-ink md:text-5xl">
                  {product.name}
                </h1>
              </div>
              <p id={`product-detail-${product.slug}-price`} className="text-2xl tracking-[0.2em] text-mock-earth">
                {product.priceLabel}
              </p>
              <p id={`product-detail-${product.slug}-summary-body`} className="text-base leading-8 text-mock-muted">
                {product.summary}
              </p>
              <p id={`product-detail-${product.slug}-story`} className="text-sm leading-8 text-mock-muted">
                {product.story}
              </p>
              <div id={`product-detail-${product.slug}-actions`} className="flex flex-wrap gap-3">
                <button id={`product-detail-${product.slug}-add-to-cart`} type="button" className="mock-button-primary">
                  カートに入れる
                </button>
                <button id={`product-detail-${product.slug}-shipping-link`} type="button" className="mock-button-secondary">
                  配送について見る
                </button>
                <Link
                  id={`product-detail-${product.slug}-ingredients-link`}
                  href={`/products/${product.slug}/ingredients/#product-ingredients-${product.slug}-list`}
                  className="mock-button-secondary"
                >
                  成分表示を見る
                </Link>
              </div>
              <ul
                id={`product-detail-${product.slug}-notes`}
                className="space-y-3 border-t border-mock-border pt-6 text-sm leading-7 text-mock-muted"
              >
                {product.notes.map((note, index) => (
                  <li id={`product-detail-${product.slug}-note-${index + 1}`} key={note}>
                    ・{note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id={`product-detail-${product.slug}-faq-section`} className="mock-section">
        <div id={`product-detail-${product.slug}-faq-layout`} className="mock-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div id={`product-detail-${product.slug}-faq-heading-card`} className="mock-card p-8">
            <SectionHeading
              idBase={`product-detail-${product.slug}-faq-heading`}
              eyebrow="よくある質問"
              title="お届け前によくいただくご質問"
              description="はじめて取り入れる方にも使い方の雰囲気が伝わるよう、実際の案内で使いそうな内容をまとめています。"
              align="left"
            />
          </div>
          <div id={`product-detail-${product.slug}-faq-list`} className="space-y-4">
            {product.faq.map((item, index) => (
              <article id={`product-detail-${product.slug}-faq-${index + 1}`} key={item.question} className="mock-card p-6">
                <h2 id={`product-detail-${product.slug}-faq-${index + 1}-question`} className="font-serif text-2xl text-mock-ink">
                  {item.question}
                </h2>
                <p id={`product-detail-${product.slug}-faq-${index + 1}-answer`} className="mt-4 text-sm leading-8 text-mock-muted">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
