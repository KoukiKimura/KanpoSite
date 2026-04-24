import PageTitleHero from '@/components/ui/PageTitleHero';
import ProductCard from '@/components/ui/ProductCard';
import { mockProducts, productCategories } from '@/lib/mock/site';

const productScenes = [
  {
    title: 'お茶',
    body: '野の香りをそのまま湯気にのせる、朝と夜のためのお茶です。',
  },
  {
    title: '粉薬',
    body: '白湯や食事に合わせやすく、毎日の台所で続けやすい形に整えています。',
  },
  {
    title: '錠剤',
    body: '外出先でも取り入れやすいよう、小さく整えた持ち歩き用の形です。',
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageTitleHero
        id="products-page-hero"
        title="商品"
        eyebrow="Products"
        imageSrc={mockProducts[0].mainImage.src}
        imageAlt={mockProducts[0].mainImage.alt}
      />

      <section id="products-overview-section" className="mock-section-products relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_25%),linear-gradient(135deg,_rgba(173,139,87,0.18),_transparent_42%)]" />
        <div
          id="products-overview-layout"
          className="mock-shell mock-sticky-stage relative grid gap-10 py-12 md:py-16 lg:min-h-[150vh] lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:py-20"
        >
          <div id="products-overview-copy" className="mock-sticky-copy">
            <div id="products-overview-intro" className="max-w-md space-y-5">
              <h2 id="products-overview-title" className="font-serif text-2xl text-mock-ink md:text-3xl">
                商品
              </h2>
              <p id="products-overview-body" className="mock-section-body text-sm leading-8 md:text-base">
                畑で育てた草木を、お茶、粉薬、錠剤、養生セットへ。香りや口当たりを整え、毎日の暮らしに取り入れやすい形にしています。
              </p>
              <div id="products-overview-categories" className="flex flex-wrap gap-3">
                {productCategories.map((category, index) => (
                  <span
                    id={`products-overview-category-${index + 1}`}
                    key={category}
                    className="mock-section-chip border px-4 py-2 text-xs uppercase tracking-[0.28em]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div id="products-overview-scenes" className="space-y-14">
              {productScenes.map((scene, index) => (
                <div id={`products-scene-${index + 1}`} key={scene.title} className="mock-section-line max-w-sm space-y-3 border-t pt-6">
                  <h3 id={`products-scene-${index + 1}-title`} className="font-serif text-2xl text-mock-ink">
                    {scene.title}
                  </h3>
                  <p id={`products-scene-${index + 1}-body`} className="mock-section-body text-sm leading-8">
                    {scene.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div id="products-overview-visual" className="mock-sticky-visual space-y-4">
            <div id="products-overview-visual-main" className="mock-image-frame mock-surface-5 min-h-[380px]">
              <img src={mockProducts[0].mainImage.src} alt={mockProducts[0].mainImage.alt} />
            </div>
            <div id="products-overview-visual-grid" className="grid gap-4 md:grid-cols-2">
              <div id="products-overview-visual-sub-1" className="mock-image-frame mock-surface-6 min-h-[220px]">
                <img src={mockProducts[1].mainImage.src} alt={mockProducts[1].mainImage.alt} />
              </div>
              <div id="products-overview-visual-sub-2" className="mock-image-frame mock-surface-7 min-h-[220px]">
                <img src={mockProducts[3].mainImage.src} alt={mockProducts[3].mainImage.alt} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products-catalog-section" className="mock-section">
        <div id="products-catalog-inner" className="mock-shell">
          <div id="products-catalog-grid" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mockProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
