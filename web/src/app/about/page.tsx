import type { Metadata } from 'next';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ブランド紹介',
  description:
    '山草の恵みのブランド紹介。創業の想い、理念、漢方への向き合い方についてご紹介します。',
};

const philosophies = [
  {
    title: '自分たちで育てる',
    titleEn: 'We Grow Our Own',
    body: '仕入れに頼らず、自分たちの畑で生薬を育てることにこだわっています。何が入っているか、どう育てられたか。それを自信を持って伝えられる商品だけをお届けします。',
  },
  {
    title: '農薬に頼らない',
    titleEn: 'No Pesticides',
    body: '土の力を信じ、農薬に頼らない栽培を実践しています。時間も手間もかかりますが、それが本物の生薬を育てる唯一の道だと考えています。',
  },
  {
    title: '古典に学ぶ',
    titleEn: 'Rooted in Tradition',
    body: '千年以上の歴史を持つ漢方の古典を丁寧に学び、処方のベースとしています。流行に左右されず、時代を超えた知恵を大切にしています。',
  },
  {
    title: '日常に溶け込む形で',
    titleEn: 'For Everyday Life',
    body: '難しい知識がなくても、毎日の習慣として取り入れやすい形で。お茶として飲むことで、漢方を生活の一部にしてほしいと考えています。',
  },
];

export default function BrandPage() {
  return (
    <>
      {/* ヒーローセクション */}
      <div
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 text-white overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1E3610 0%, #2D5016 50%, #3D6B1F 100%)' }}
      >
        <div className="container-site text-center">
          <p
            className="text-xs tracking-[0.4em] text-white/50 uppercase mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            About Us
          </p>
          <h1
            className="heading-xl text-white mb-5"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            ブランドについて
          </h1>
          <div className="w-12 h-px bg-accent mx-auto my-6" />
          <p className="text-white/70 max-w-lg mx-auto text-base leading-loose">
            山と草と、受け継いだ知恵。<br />
            なぜ私たちが漢方茶を作るのか、その想いをお伝えします。
          </p>
        </div>
        {/* 背景装飾プレースホルダー */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-accent/20 to-transparent" />
        </div>
      </div>

      {/* ブランドコンセプト */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site max-w-3xl mx-auto">
          <SectionTitle
            title="ブランドコンセプト"
            titleEn="Brand Concept"
            subtitle="山草の恵みが大切にしていること"
          />
          <div className="prose-brand text-brand-muted">
            <p>
              「山草の恵み（Sansou no Megumi）」という名前には、山と草が与えてくれる恵みへの感謝が込められています。
              私たちは、特定の山間地で土から丁寧に育てた生薬だけを使い、
              漢方の伝統処方に基づいたお茶をお届けしています。
            </p>
            <p>
              現代の食生活や生活習慣の変化により、多くの方が体の不調を抱えています。
              疲れやすい、眠れない、冷える、胃が重い——そんな日常の小さな悩みに、
              漢方は静かに、でも確かに応えてきました。
            </p>
            <p>
              私たちが目指すのは、「特別なとき」のための漢方ではなく、
              毎朝のお茶のような、「当たり前の習慣」としての漢方です。
              難しい知識がなくても、薬局に行かなくても、自分の体と向き合う時間を持てる——
              そんな日常を、山草の恵みはサポートしたいと思っています。
            </p>
          </div>
        </div>
      </section>

      {/* 創業者ストーリー */}
      <section className="section-padding bg-brand-cream">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* 画像プレースホルダー */}
            <div className="aspect-[3/4] bg-brand-border flex items-center justify-center">
              <div className="text-center text-brand-muted">
                <span className="text-6xl block mb-3">👤</span>
                <p className="text-xs tracking-widest">創業者プロフィール写真</p>
              </div>
            </div>
            <div>
              <SectionTitle
                title="創業者の想い"
                titleEn="Founder's Story"
                align="left"
              />
              <div className="prose-brand text-brand-muted space-y-4">
                <p>
                  子どもの頃、祖父に連れられてよく山に入りました。
                  「これは胃に効く」「これは疲れを取る」と教えてもらいながら、
                  草を摘んだ記憶が今でも鮮明に残っています。
                </p>
                <p>
                  大学で東洋医学を学び、漢方の奥深さを知るにつれ、
                  祖父がしていたことの意味をより深く理解できるようになりました。
                  植物の力を借りて人の体を整える——その知恵は、何千年もの時間を超えて生き続けています。
                </p>
                <p>
                  都会での薬膳レストラン勤務を経て、故郷の山里に戻り、
                  自分で畑を起こしたのが山草の恵みの始まりです。
                  漢方の知恵を「飲むお茶」という形で、より多くの方に届けたいと思いました。
                </p>
                <p className="text-brand-text font-medium">
                  ——代表 ○○○○
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* こだわり */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site">
          <SectionTitle
            title="私たちのこだわり"
            titleEn="Our Commitment"
            subtitle="山草の恵みが守り続ける4つの約束"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {philosophies.map((item) => (
              <div key={item.title} className="p-8 bg-brand-cream border border-brand-border">
                <p
                  className="text-xs tracking-[0.3em] text-accent italic mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.titleEn}
                </p>
                <h3
                  className="text-lg font-serif tracking-wide text-brand-text mb-3"
                  style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                  {item.title}
                </h3>
                <div className="w-8 h-px bg-accent mb-4" />
                <p className="text-sm text-brand-muted leading-loose">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 生産哲学 */}
      <section className="section-padding bg-primary-dark text-white">
        <div className="container-site max-w-3xl mx-auto text-center">
          <SectionTitle
            title="生産への想い"
            titleEn="Production Philosophy"
            light
          />
          <div className="space-y-5 text-white/70 text-sm leading-loose">
            <p>
              私たちの生薬は、すべて自社の畑で育てています。
              農薬を使わず、化学肥料に頼らず、土の力と季節の流れに従って育てることで、
              植物本来の力を最大限に引き出します。
            </p>
            <p>
              収穫のタイミングも、乾燥の方法も、ブレンドの割合も——
              漢方の古典と、長年の試行錯誤の末に導き出した独自の基準で行っています。
              機械には任せられない、手仕事の積み重ねが、山草の恵みの品質を支えています。
            </p>
          </div>
          <div className="mt-10">
            <Link href="/farm" className="btn-outline-white">
              畑のことを詳しく見る
            </Link>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-16 bg-brand-cream text-center">
        <div className="container-site">
          <p className="text-sm text-brand-muted mb-6">
            山草の恵みの商品を、ぜひ試してみてください。
          </p>
          <Link href="/products" className="btn-primary">
            商品を見る
          </Link>
        </div>
      </section>
    </>
  );
}
