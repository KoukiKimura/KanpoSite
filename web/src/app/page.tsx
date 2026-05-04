import Link from 'next/link';
import { getFeaturedProducts, getNewsPosts, formatDate } from '@/lib/data';
import { getLatestNotionBlogPosts } from '@/lib/notion/queries';
import ProductCard from '@/components/ui/ProductCard';
import SectionTitle from '@/components/ui/SectionTitle';
import HeroSlider from '@/components/ui/HeroSlider';
import ResponsiveImage from '@/components/ui/ResponsiveImage';

export default async function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 3);
  const latestPosts = await getLatestNotionBlogPosts(3);
  const newsPosts = getNewsPosts(3);

  const heroSlides = [
    { src: '/images/home/hero-satoyama.webp', alt: '里山の風景' },
    { src: '/images/home/kominka-guest-room.webp', alt: '古民家のゲストルーム' },
    { src: '/images/home/field-walk.webp', alt: '畑を歩く' },
    { src: '/images/home/morning-tea.webp', alt: '朝のお茶' },
    { src: '/images/products/mountain-herb-blend/main.webp', alt: '山のハーブブレンド' },
  ];

  return (
    <>
      {/* ヒーローセクション */}
      <HeroSlider slides={heroSlides} />

      {/* ブランド紹介セクション */}
      <section className="section-padding bg-brand-cream">
        <div className="container-site max-w-3xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.3em] text-accent uppercase mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Our Philosophy
          </p>
          <h2
            className="heading-md text-brand-text mb-6"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            土から育む、本物の漢方
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mb-8" />
          <p className="text-brand-muted leading-loose text-base mb-6">
            山草の恵みは、自分たちの畑で丁寧に育てた生薬だけを使います。
            農薬に頼らず、土の力を信じて。季節と対話しながら育てた草たちが、
            あなたの毎日に静かな活力を届けます。
          </p>
          <p className="text-brand-muted leading-loose text-base mb-10">
            漢方の知恵は、何千年もの時間をかけて人々が自然と向き合い、
            積み重ねてきたものです。私たちはその伝統を誠実に受け取り、
            現代の暮らしに寄り添う形にして、お届けしています。
          </p>
          <Link href="/about" className="btn-outline">
            ブランドストーリーを読む
          </Link>
        </div>
      </section>

      {/* おすすめ商品セクション */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site">
          <SectionTitle
            title="おすすめ商品"
            titleEn="Featured Products"
            subtitle="自然の恵みを凝縮した、山草の恵みの代表的な生薬茶をご紹介します。"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products" className="btn-outline">
              すべての商品を見る
            </Link>
          </div>
        </div>
      </section>

      {/* ブランドストーリーセクション */}
      <section className="section-padding bg-primary-dark text-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionTitle
                title="私たちのこと"
                titleEn="Our Story"
                align="left"
                light
                subtitle="山里に根ざし、自然と共に生きる私たちが、なぜ漢方茶を作るのか。その物語をお話しします。"
              />
              <div className="space-y-4 text-white/70 leading-loose text-sm">
                <p>
                  創業者の祖父は、山村で薬草を育てる農家でした。幼い頃から祖父の背中を見て育った私は、
                  自然の植物が人の体と心に働きかける力を、身近で感じてきました。
                </p>
                <p>
                  大学で東洋医学を学び、漢方の深さを知るにつれ、祖父の仕事の尊さを改めて実感しました。
                  その思いを形にしたのが、山草の恵みです。
                </p>
              </div>
              <Link href="/about" className="btn-outline-white mt-8 inline-flex">
                ストーリー全文を読む
              </Link>
            </div>
            {/* 農園イメージ */}
            <div className="relative overflow-hidden min-h-[300px] md:min-h-[400px]">
              <ResponsiveImage
                src="/images/home/field-walk.webp"
                alt="農園を歩く"
                pictureClassName="absolute inset-0 block h-full w-full"
                className="h-full w-full object-cover"
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 畑紹介セクション */}
      <section className="section-padding bg-brand-cream">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
            <div>
              <SectionTitle
                title="農園の風景"
                titleEn="Our Field"
                align="left"
                subtitle="古民家の庭先から続く畑で、季節の草木を育てています。受け継いだ家の時間と土の気配をそのままに、香りのやわらかな和漢素材へ整えています。"
              />
              <Link href="/farm" className="btn-outline">
                畑のことをもっと知る
              </Link>
            </div>
            {/* 畑の画像グリッド */}
            <div className="grid gap-3 md:grid-cols-[1.05fr_0.95fr]">
              <div className="relative overflow-hidden min-h-[240px] md:min-h-[360px]">
                <ResponsiveImage
                  src="/images/home/field-walk.webp"
                  alt="畑を歩く"
                  pictureClassName="absolute inset-0 block h-full w-full"
                  className="h-full w-full object-cover"
                  sizes="(max-width: 767px) 100vw, 40vw"
                />
              </div>
              <div className="grid gap-3">
                <div className="relative overflow-hidden min-h-[150px] md:min-h-[170px]">
                  <ResponsiveImage
                    src="/images/home/morning-tea.webp"
                    alt="朝のお茶"
                    pictureClassName="absolute inset-0 block h-full w-full"
                    className="h-full w-full object-cover"
                    sizes="(max-width: 767px) 100vw, 30vw"
                  />
                </div>
                <div className="relative overflow-hidden min-h-[150px] md:min-h-[170px]">
                  <ResponsiveImage
                    src="/images/products/mountain-herb-blend/main.webp"
                    alt="山のハーブブレンド"
                    pictureClassName="absolute inset-0 block h-full w-full"
                    className="h-full w-full object-cover"
                    sizes="(max-width: 767px) 100vw, 30vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ゲストハウスセクション */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* 古民家画像 */}
            <div className="grid gap-3 md:grid-cols-2 order-2 lg:order-1">
              <div className="relative overflow-hidden min-h-[240px] md:min-h-[360px] md:col-span-2">
                <ResponsiveImage
                  src="/images/kominka/hero-stay.webp"
                  alt="古民家の宿"
                  pictureClassName="absolute inset-0 block h-full w-full"
                  className="h-full w-full object-cover"
                  sizes="(max-width: 767px) 100vw, 50vw"
                />
              </div>
              <div className="relative overflow-hidden min-h-[180px]">
                <ResponsiveImage
                  src="/images/kominka/living-room.webp"
                  alt="居間"
                  pictureClassName="absolute inset-0 block h-full w-full"
                  className="h-full w-full object-cover"
                  sizes="(max-width: 767px) 50vw, 25vw"
                />
              </div>
              <div className="relative overflow-hidden min-h-[180px]">
                <ResponsiveImage
                  src="/images/kominka/morning-field.webp"
                  alt="朝の畑"
                  pictureClassName="absolute inset-0 block h-full w-full"
                  className="h-full w-full object-cover"
                  sizes="(max-width: 767px) 50vw, 25vw"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionTitle
                title="古民家での滞在"
                titleEn="Kominka Stay"
                align="left"
                subtitle="土間から縁側へ、縁側から畑の景色へ。古い家に残る静けさをそのまま宿にした、余白の多い一棟です。"
              />
              <div className="space-y-4 text-brand-muted leading-loose text-sm mb-8">
                <p>
                  朝は畑の空気を吸い、夜は木の香りの中で休む。古民家を改修した宿で、
                  漢方と自然に触れる体験をお届けします。
                </p>
                <p className="text-accent font-medium">近日公開予定。</p>
              </div>
              <Link href="/kominka" className="btn-outline">
                古民家を見る →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 最新ブログ記事セクション */}
      <section className="section-padding bg-brand-cream">
        <div className="container-site">
          <SectionTitle
            title="最新記事"
            titleEn="Latest Articles"
            subtitle="漢方茶のレシピ、畑だより、読み物など最新の記事をお届けします。"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {latestPosts.map((post) => (
              <article key={post.slug} className="card-product group flex flex-col bg-white">
                <div className="aspect-video bg-brand-cream flex items-center justify-center overflow-hidden">
                  <span className="text-4xl opacity-20">📝</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <time dateTime={post.publishedAt} className="text-xs text-brand-muted tracking-wide mb-2 block">
                    {formatDate(post.publishedAt)}
                  </time>
                  <h3
                    className="text-base font-serif tracking-wide text-brand-text mb-2 line-clamp-2"
                    style={{ fontFamily: "'Noto Serif JP', serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed mb-4 flex-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-brand-border">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs tracking-widest text-primary border border-primary px-4 py-2 hover:bg-primary hover:text-white transition-colors duration-200 inline-block"
                    >
                      続きを読む
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/blog" className="btn-outline">
              ブログ一覧を見る
            </Link>
          </div>
        </div>
      </section>

      {/* お知らせセクション */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site max-w-3xl mx-auto">
          <SectionTitle title="お知らせ" titleEn="News" />
          <ul className="divide-y divide-brand-border">
            {newsPosts.map((item) => (
              <li key={item.slug} className="py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-3 flex-shrink-0">
                  <time dateTime={item.publishedAt} className="text-xs text-brand-muted tracking-wide">
                    {formatDate(item.publishedAt)}
                  </time>
                  <span className="text-xs tracking-widest text-accent bg-accent/10 px-2 py-0.5">
                    お知らせ
                  </span>
                </div>
                <Link
                  href={`/blog/${item.slug}`}
                  className="text-sm text-brand-text tracking-wide hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-center mt-8">
            <Link href="/blog/category/news" className="text-sm tracking-widest text-primary hover:text-primary-dark transition-colors">
              お知らせ一覧 →
            </Link>
          </div>
        </div>
      </section>

      {/* お問い合わせCTAセクション */}
      <section
        className="py-20 lg:py-28 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #2D5016, #8B6914)' }}
      >
        <div className="container-site">
          <p
            className="text-xs tracking-[0.3em] text-white/50 uppercase mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Contact
          </p>
          <h2
            className="heading-md text-white mb-4"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            お気軽にご相談ください
          </h2>
          <div className="w-12 h-px bg-white/30 mx-auto mb-6" />
          <p className="text-white/70 text-sm leading-loose mb-10 max-w-md mx-auto">
            商品のこと、漢方のこと、畑のことなど、<br />
            どんなことでもお気軽にお問い合わせください。
          </p>
          <Link href="/contact" className="btn-outline-white">
            お問い合わせはこちら
          </Link>
        </div>
      </section>
    </>
  );
}
