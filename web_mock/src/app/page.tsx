import Link from 'next/link';
import HeroSlider from '@/components/ui/HeroSlider';
import { mockHomeImages, mockKominka, mockProducts } from '@/lib/mock/site';

const featuredProducts = mockProducts;

const topSlides = [
  mockHomeImages.hero,
  mockHomeImages.guestRoom,
  mockHomeImages.fieldWalk,
  mockHomeImages.morningTea,
  mockProducts[0].mainImage,
];

export default function HomePage() {
  return (
    <>
      <HeroSlider id="home-hero-slider" slides={topSlides} />

      <section id="home-story-section" className="mock-section">
        <div id="home-story-inner" className="mock-shell space-y-20">
          <div id="home-farm-story" className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div id="home-farm-story-image" className="mock-image-frame mock-surface-1 min-h-[340px]">
              <img src={mockHomeImages.fieldWalk.src} alt={mockHomeImages.fieldWalk.alt} />
            </div>
            <div id="home-farm-story-copy" className="max-w-md space-y-4">
              <h2 id="home-farm-story-title" className="font-serif text-2xl text-mock-ink md:text-3xl">
                農園の風景
              </h2>
              <p id="home-farm-story-body" className="text-sm leading-8 text-mock-muted">
                古民家の庭先から続く畑で、季節の草木を育てています。受け継いだ家の時間と土の気配をそのままに、
                香りのやわらかな和漢素材へ整えています。
              </p>
            </div>
          </div>

          <div id="home-kominka-story" className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div id="home-kominka-story-copy" className="max-w-md space-y-4 lg:order-1">
              <h2 id="home-kominka-story-title" className="font-serif text-2xl text-mock-ink md:text-3xl">
                古民家の導線
              </h2>
              <p id="home-kominka-story-body" className="text-sm leading-8 text-mock-muted">
                土間から縁側へ、縁側から畑の景色へ。派手に整えすぎず、この家に残っていた静けさをそのまま宿にした、
                余白の多い一棟です。
              </p>
              <div id="home-kominka-story-actions" className="pt-2">
                <Link id="home-kominka-story-link" href="/kominka" className="mock-button-secondary">
                  古民家を見る
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>

            <div id="home-kominka-story-gallery" className="grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
              <div id="home-kominka-story-image-main" className="mock-image-frame mock-surface-2 min-h-[360px]">
                <img src={mockHomeImages.guestRoom.src} alt={mockHomeImages.guestRoom.alt} />
              </div>
              <div id="home-kominka-story-image-stack" className="grid gap-5">
                <div id="home-kominka-story-image-sub-1" className="mock-image-frame mock-surface-3 min-h-[170px]">
                  <img src={mockHomeImages.morningTea.src} alt={mockHomeImages.morningTea.alt} />
                </div>
                <div id="home-kominka-story-image-sub-2" className="mock-image-frame mock-surface-4 min-h-[170px]">
                  <img src={mockKominka.images.morningField.src} alt={mockKominka.images.morningField.alt} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="home-products-section" className="border-y border-mock-border bg-[rgba(255,255,255,0.45)]">
        <div id="home-products-inner" className="mock-shell py-20 md:py-24">
          <div id="home-products-layout" className="grid gap-10 lg:grid-cols-[0.42fr_1.58fr]">
            <div id="home-products-copy" className="max-w-sm space-y-4">
              <h2 id="home-products-title" className="font-serif text-2xl text-mock-ink md:text-3xl">
                商品
              </h2>
              <p id="home-products-body" className="text-sm leading-8 text-mock-muted">
                お茶、粉薬、錠剤、季節の箱物まで。畑で育てた草木を、暮らしの中で続けやすい形に整えています。
              </p>
              <div id="home-products-actions" className="pt-2">
                <Link id="home-products-link" href="/products" className="mock-button-secondary">
                  商品一覧へ
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
              <div id="home-products-ingredient-links" className="space-y-3 pt-6">
                <h3 id="home-products-ingredient-links-title" className="font-serif text-2xl text-mock-ink">
                  成分表示ページ
                </h3>
                <div id="home-products-ingredient-links-list" className="space-y-2">
                  {featuredProducts.map((product) => (
                    <Link
                      id={`home-products-ingredient-link-${product.slug}`}
                      key={product.slug}
                      href={`/products/${product.slug}/ingredients/#product-ingredients-${product.slug}-list`}
                      className="block border-t border-mock-border py-4 transition hover:translate-x-1"
                    >
                      <p
                        id={`home-products-ingredient-link-${product.slug}-category`}
                        className="text-xs uppercase tracking-[0.28em] text-mock-gold"
                      >
                        {product.category}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-4">
                        <p
                          id={`home-products-ingredient-link-${product.slug}-title`}
                          className="font-serif text-xl text-mock-ink"
                        >
                          {product.name}
                        </p>
                        <span
                          id={`home-products-ingredient-link-${product.slug}-cta`}
                          className="text-xs uppercase tracking-[0.28em] text-mock-muted"
                        >
                          成分表示
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div id="home-products-grid" className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {featuredProducts.map((product) => (
                <article id={`home-product-preview-${product.slug}`} key={product.slug} className="mock-card overflow-hidden">
                  <div
                    id={`home-product-preview-${product.slug}-image`}
                    className="mock-image-frame mock-surface-1 min-h-[260px] border-x-0 border-t-0 border-white/0 shadow-none"
                  >
                    <img src={product.mainImage.src} alt={product.mainImage.alt} />
                  </div>
                  <div id={`home-product-preview-${product.slug}-content`} className="space-y-3 p-6">
                    <p id={`home-product-preview-${product.slug}-category`} className="text-xs uppercase tracking-[0.3em] text-mock-gold">
                      {product.category}
                    </p>
                    <h3 id={`home-product-preview-${product.slug}-title`} className="font-serif text-2xl text-mock-ink">
                      {product.name}
                    </h3>
                    <p id={`home-product-preview-${product.slug}-summary`} className="text-sm leading-7 text-mock-muted">
                      {product.summary}
                    </p>
                    <p id={`home-product-preview-${product.slug}-price`} className="text-sm tracking-[0.16em] text-mock-muted">
                      {product.priceLabel}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
