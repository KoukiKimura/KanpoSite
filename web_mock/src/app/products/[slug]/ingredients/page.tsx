import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageTitleHero from '@/components/ui/PageTitleHero';
import { getProductBySlug, mockProducts } from '@/lib/mock/site';
import { getIngredientPageBySlug } from '@/lib/mock/productIngredients';

type ProductIngredientPageProps = {
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

export default async function ProductIngredientPage({ params }: ProductIngredientPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const ingredientPage = getIngredientPageBySlug(slug);

  if (!product || !ingredientPage) {
    notFound();
  }

  const relatedProducts = mockProducts.filter((item) => item.slug !== product.slug);

  return (
    <>
      <PageTitleHero
        id={`product-ingredients-${product.slug}-hero`}
        title={`${product.name} の成分表示`}
        eyebrow={product.category}
        imageSrc={product.mainImage.src}
        imageAlt={product.mainImage.alt}
      />

      <section id={`product-ingredients-${product.slug}-overview`} className="border-b border-mock-border bg-[rgba(255,255,255,0.34)]">
        <div id={`product-ingredients-${product.slug}-overview-inner`} className="mock-shell py-16 md:py-20">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-mock-muted">
            <Link id={`product-ingredients-${product.slug}-back-home`} href="/" className="transition hover:text-mock-ink">
              トップ
            </Link>
            <span aria-hidden="true">/</span>
            <Link id={`product-ingredients-${product.slug}-back-products`} href="/products" className="transition hover:text-mock-ink">
              商品
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              id={`product-ingredients-${product.slug}-back-detail`}
              href={`/products/${product.slug}`}
              className="transition hover:text-mock-ink"
            >
              商品詳細
            </Link>
          </div>

          <div
            id={`product-ingredients-${product.slug}-overview-layout`}
            className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div id={`product-ingredients-${product.slug}-overview-copy`} className="space-y-5">
              <h2
                id={`product-ingredients-${product.slug}-overview-title`}
                className="font-serif text-3xl text-mock-ink md:text-4xl"
              >
                原材料と配合の考え方
              </h2>
              <p
                id={`product-ingredients-${product.slug}-overview-lead`}
                className="text-base leading-8 text-mock-muted"
              >
                {ingredientPage.lead}
              </p>
              <p
                id={`product-ingredients-${product.slug}-overview-summary`}
                className="text-sm leading-8 text-mock-muted"
              >
                {ingredientPage.summary}
              </p>
              <div id={`product-ingredients-${product.slug}-overview-actions`} className="flex flex-wrap gap-3 pt-2">
                <Link
                  id={`product-ingredients-${product.slug}-overview-detail-link`}
                  href={`/products/${product.slug}`}
                  className="mock-button-secondary"
                >
                  商品詳細へ
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  id={`product-ingredients-${product.slug}-overview-list-link`}
                  href={`#product-ingredients-${product.slug}-list`}
                  className="mock-button-primary"
                >
                  配合素材を見る
                  <span aria-hidden="true">&darr;</span>
                </Link>
              </div>
            </div>

            <div id={`product-ingredients-${product.slug}-meta`} className="mock-card p-8">
              <h3 id={`product-ingredients-${product.slug}-meta-title`} className="font-serif text-2xl text-mock-ink">
                表示情報
              </h3>
              <dl id={`product-ingredients-${product.slug}-meta-list`} className="mt-6 space-y-4">
                {ingredientPage.labelRows.map((row, index) => (
                  <div
                    id={`product-ingredients-${product.slug}-meta-row-${index + 1}`}
                    key={row.label}
                    className="border-b border-mock-border pb-4"
                  >
                    <dt
                      id={`product-ingredients-${product.slug}-meta-row-${index + 1}-label`}
                      className="text-xs uppercase tracking-[0.28em] text-mock-gold"
                    >
                      {row.label}
                    </dt>
                    <dd
                      id={`product-ingredients-${product.slug}-meta-row-${index + 1}-value`}
                      className="mt-2 text-sm leading-8 text-mock-muted"
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section id={`product-ingredients-${product.slug}-list-section`} className="mock-section bg-[rgba(255,255,255,0.48)]">
        <div id={`product-ingredients-${product.slug}-list-inner`} className="mock-shell space-y-10">
          <div id={`product-ingredients-${product.slug}-list-heading`} className="max-w-2xl space-y-4">
            <h2 id={`product-ingredients-${product.slug}-list-heading-title`} className="font-serif text-3xl text-mock-ink md:text-4xl">
              配合素材一覧
            </h2>
            <p id={`product-ingredients-${product.slug}-list-heading-body`} className="text-sm leading-8 text-mock-muted">
              参照サイトの成分ページ構成に寄せて、素材名・植物名・使用部位・産地・役割を一覧化したサンプルです。
            </p>
          </div>

          <div id={`product-ingredients-${product.slug}-list`} className="grid gap-4">
            {ingredientPage.entries.map((entry, index) => (
              <article
                id={`product-ingredients-${product.slug}-entry-${index + 1}`}
                key={`${entry.name}-${index}`}
                className="mock-card p-6 md:p-7"
              >
                <div className="grid gap-4 md:grid-cols-[0.8fr_0.55fr_0.65fr] md:items-start">
                  <div id={`product-ingredients-${product.slug}-entry-${index + 1}-heading`} className="space-y-2">
                    <h3
                      id={`product-ingredients-${product.slug}-entry-${index + 1}-title`}
                      className="font-serif text-2xl text-mock-ink"
                    >
                      {entry.name}
                    </h3>
                    <p
                      id={`product-ingredients-${product.slug}-entry-${index + 1}-botanical`}
                      className="text-xs uppercase tracking-[0.24em] text-mock-gold"
                    >
                      {entry.botanical}
                    </p>
                  </div>

                  <div id={`product-ingredients-${product.slug}-entry-${index + 1}-facts`} className="space-y-2 text-sm leading-7 text-mock-muted">
                    <p id={`product-ingredients-${product.slug}-entry-${index + 1}-part`}>
                      使用部位: {entry.part}
                    </p>
                    <p id={`product-ingredients-${product.slug}-entry-${index + 1}-origin`}>
                      産地: {entry.origin}
                    </p>
                  </div>

                  <p
                    id={`product-ingredients-${product.slug}-entry-${index + 1}-note`}
                    className="text-sm leading-8 text-mock-muted"
                  >
                    {entry.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id={`product-ingredients-${product.slug}-related`} className="mock-section border-t border-mock-border">
        <div id={`product-ingredients-${product.slug}-related-inner`} className="mock-shell space-y-8">
          <div className="max-w-2xl space-y-4">
            <h2 id={`product-ingredients-${product.slug}-related-title`} className="font-serif text-3xl text-mock-ink md:text-4xl">
              他の成分表示ページ
            </h2>
            <p id={`product-ingredients-${product.slug}-related-body`} className="text-sm leading-8 text-mock-muted">
              商品紹介欄から遷移できる一覧と同じ導線です。ほかのブレンドや粉末、錠剤の表示例も確認できます。
            </p>
          </div>

          <div id={`product-ingredients-${product.slug}-related-list`} className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((related) => (
              <Link
                id={`product-ingredients-${product.slug}-related-link-${related.slug}`}
                key={related.slug}
                href={`/products/${related.slug}/ingredients/#product-ingredients-${related.slug}-list`}
                className="mock-card block p-5 transition hover:-translate-y-1"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-mock-gold">{related.category}</p>
                <h3 className="mt-3 font-serif text-2xl text-mock-ink">{related.name}</h3>
                <p className="mt-3 text-xs uppercase tracking-[0.28em] text-mock-muted">成分表示を見る</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
