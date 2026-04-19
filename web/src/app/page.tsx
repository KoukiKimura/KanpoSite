import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/dummy-data';
import ProductCard from '@/components/ui/ProductCard';
import SectionTitle from '@/components/ui/SectionTitle';

const newsItems = [
  {
    date: '2024年7月1日',
    category: 'お知らせ',
    title: 'ウェブサイトをリニューアルしました',
  },
  {
    date: '2024年6月15日',
    category: '新商品',
    title: '夏季限定「清涼草茶」を7月より発売予定',
  },
  {
    date: '2024年5月20日',
    category: 'イベント',
    title: '畑の見学会を開催しました（レポートは近日公開）',
  },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 3);

  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 背景グラデーション */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #1E3610 0%, #2D5016 40%, #3D6B1F 65%, #6B500F 85%, #8B6914 100%)',
          }}
        />
        {/* テクスチャオーバーレイ */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="relative container-site text-center text-white py-32 lg:py-48">
          <p
            className="text-xs lg:text-sm tracking-[0.4em] text-white/60 mb-8 uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Sansou no Megumi — Natural Herbal Medicine
          </p>
          <h1
            className="heading-xl text-white mb-6"
            style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            自然の力を、<br className="sm:hidden" />日常へ。
          </h1>
          <div className="w-16 h-px bg-accent mx-auto my-8" />
          <p className="text-base lg:text-lg text-white/80 max-w-lg mx-auto leading-loose tracking-wide mb-12">
            山と草と、受け継いだ知恵。<br />
            漢方の伝統を現代の暮らしに届ける、<br />
            山草の恵みの生薬茶。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="btn-outline-white w-full sm:w-auto"
            >
              商品を見る
            </Link>
            <Link
              href="/brand"
              className="text-sm tracking-widest text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              ブランドについて
              <span className="text-accent">→</span>
            </Link>
          </div>
        </div>

        {/* 下部スクロール矢印 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>scroll</span>
          <div className="w-px h-10 bg-white/30 animate-pulse" />
        </div>
      </section>

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
          <Link href="/brand" className="btn-outline">
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
              <Link href="/brand" className="btn-outline-white mt-8 inline-flex">
                ストーリー全文を読む
              </Link>
            </div>
            {/* 画像プレースホルダー */}
            <div className="aspect-[4/3] bg-primary/50 flex items-center justify-center border border-white/10">
              <div className="text-center text-white/30">
                <span className="text-6xl block mb-3">🌾</span>
                <p className="text-xs tracking-widest">ブランドイメージ写真</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 畑紹介セクション */}
      <section className="relative py-32 lg:py-48 overflow-hidden">
        {/* 背景 */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cream to-brand-bg" />
        <div className="relative container-site text-center">
          <SectionTitle
            title="私たちの畑"
            titleEn="Our Field"
            subtitle="標高○○メートルの山間に広がる、私たちの生薬畑。土と対話しながら、丁寧に育てています。"
          />
          {/* 畑の画像プレースホルダー */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12 max-w-4xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-brand-cream border border-brand-border flex items-center justify-center text-brand-muted"
              >
                <span className="text-3xl opacity-30">🌿</span>
              </div>
            ))}
          </div>
          <Link href="/field" className="btn-outline">
            畑のことをもっと知る
          </Link>
        </div>
      </section>

      {/* ゲストハウスセクション */}
      <section className="section-padding bg-brand-cream">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* 画像プレースホルダー */}
            <div className="aspect-[4/3] bg-brand-border flex items-center justify-center order-2 lg:order-1">
              <div className="text-center text-brand-muted">
                <span className="text-6xl block mb-3">🏡</span>
                <p className="text-xs tracking-widest">ゲストハウス写真</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionTitle
                title="ゲストハウス"
                titleEn="Guesthouse"
                align="left"
                subtitle="古民家を改修した宿で、漢方と自然に触れる体験を。近日公開予定です。"
              />
              <div className="space-y-4 text-brand-muted leading-loose text-sm mb-8">
                <p>
                  築○○年の古民家を丁寧に改修し、宿泊施設として準備を進めています。
                  生薬畑の見学や、漢方茶を楽しむ体験と合わせて、
                  自然の中でゆったりとした時間をお過ごしいただけます。
                </p>
                <p className="text-accent font-medium">現在、準備中です。近日公開予定。</p>
              </div>
              <Link href="/guesthouse" className="btn-outline">
                詳しく見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせセクション */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site max-w-3xl mx-auto">
          <SectionTitle title="お知らせ" titleEn="News" />
          <ul className="divide-y divide-brand-border">
            {newsItems.map((item, i) => (
              <li key={i} className="py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-brand-muted tracking-wide">{item.date}</span>
                  <span className="text-xs tracking-widest text-accent bg-accent/10 px-2 py-0.5">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-brand-text tracking-wide">{item.title}</p>
              </li>
            ))}
          </ul>
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
