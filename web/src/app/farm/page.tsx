import type { Metadata } from 'next';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '畑のこと',
  description: '四国ボタニカの生薬畑について。四国の植物・薬草を土づくりから収穫まで丁寧に育てる様子をご紹介します。',
};

const seasons = [
  {
    season: '春',
    seasonEn: 'Spring',
    herbs: ['当帰', '芍薬', '柴胡'],
    description:
      '大地が目覚める春は、多くの生薬の芽吹きの季節。土を起こし、種を蒔き、新しい命の始まりを見守ります。春の柔らかな日差しの中で育つ芽は、力強く清々しい香りを持ちます。',
  },
  {
    season: '夏',
    seasonEn: 'Summer',
    herbs: ['薄荷', '藿香', '荷葉'],
    description:
      '太陽の力をたっぷり受けた夏の生薬は、エネルギーに満ちています。暑さに負けず育つ植物たちを、草取りや水やりをしながら丁寧に管理します。',
  },
  {
    season: '秋',
    seasonEn: 'Autumn',
    herbs: ['黄耆', '人参', '山楂子'],
    description:
      '収穫の季節、秋。一年かけて育てた根薬類を掘り起こす時期でもあります。土の恵みが凝縮された根には、力強い薬効が宿っています。',
  },
  {
    season: '冬',
    seasonEn: 'Winter',
    herbs: ['附子', '桂枝', '生姜'],
    description:
      '静かな冬は、土を休ませ来年に備える大切な季節。乾燥・保存・ブレンドの作業を丁寧に行い、春の準備をします。',
  },
];

export default function FieldPage() {
  return (
    <>
      {/* ヒーローセクション */}
      <div
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 text-white overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1E3610 0%, #2D5016 60%, #3D6B1F 100%)' }}
      >
        <div className="container-site text-center">
          <p
            className="text-xs tracking-[0.4em] text-white/50 uppercase mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Our Field
          </p>
          <h1
            className="heading-xl text-white mb-5"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            畑のこと
          </h1>
          <div className="w-12 h-px bg-accent mx-auto my-6" />
          <p className="text-white/70 max-w-lg mx-auto text-base leading-loose">
            標高○○メートルの山間に広がる私たちの畑。<br />
            自然と対話しながら、丁寧に育てています。
          </p>
        </div>
      </div>

      {/* 畑について */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site max-w-3xl mx-auto">
          <SectionTitle
            title="私たちの畑"
            titleEn="About Our Field"
          />
          <div className="prose-brand text-brand-muted space-y-4">
            <p>
              四国ボタニカの生薬畑は、四国の山あいに位置しています。
              澄んだ空気と清らかな湧き水、寒暖差のある気候が、
              薬効豊かな生薬の栽培に適した環境を作り出しています。
            </p>
            <p>
              私たちの栽培の基本は「土づくり」です。化学肥料を使わず、
              堆肥と緑肥で土の微生物を育てることで、根から豊かな栄養を吸い上げる力を持った植物が育ちます。
              農薬を使わないため、虫との共存も必要ですが、その中で植物自身も強くなります。
            </p>
            <p>
              現在、約○○種類の生薬を栽培しています。全てを自社で管理することは大変ですが、
              「どこで誰が育てたか」を自信を持って伝えられることが、私たちの誇りです。
            </p>
          </div>
        </div>
      </section>

      {/* 季節の畑 */}
      <section className="section-padding bg-brand-cream">
        <div className="container-site">
          <SectionTitle
            title="季節の畑"
            titleEn="Through the Seasons"
            subtitle="四季それぞれに、畑には異なる表情があります。"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {seasons.map((s) => (
              <div key={s.season} className="bg-brand-bg border border-brand-border p-8">
                {/* 画像プレースホルダー */}
                <div className="aspect-video bg-brand-cream border border-brand-border flex items-center justify-center mb-6">
                  <span className="text-4xl opacity-30">🌿</span>
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <h3
                    className="text-2xl font-serif text-primary"
                    style={{ fontFamily: "'Noto Serif JP', serif" }}
                  >
                    {s.season}
                  </h3>
                  <span
                    className="text-xs italic text-brand-muted tracking-widest"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {s.seasonEn}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {s.herbs.map((herb) => (
                    <span
                      key={herb}
                      className="text-xs text-accent bg-accent/10 px-2 py-0.5 tracking-wide"
                    >
                      {herb}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-brand-muted leading-loose">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 土と生薬 */}
      <section className="section-padding bg-primary-dark text-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionTitle
                title="土と生薬の関係"
                titleEn="Soil & Plants"
                align="left"
                light
              />
              <div className="space-y-4 text-white/70 text-sm leading-loose">
                <p>
                  良い生薬は、良い土から生まれます。
                  土の中には無数の微生物が生き、それが植物に栄養を届けます。
                  農薬はその微生物を殺してしまいます。
                  だから私たちは、農薬を使いません。
                </p>
                <p>
                  土づくりには毎年膨大な時間を使います。
                  落ち葉を集め、堆肥を仕込み、緑肥として蕎麦やレンゲを育て、
                  すき込む。この繰り返しで、土は年々豊かになっていきます。
                </p>
                <p>
                  「土が良ければ、植物は自分で育つ」——
                  これが私たちの栽培哲学の根底にある考えです。
                </p>
              </div>
            </div>
            {/* 画像プレースホルダー */}
            <div className="aspect-[4/3] bg-primary/50 border border-white/10 flex items-center justify-center">
              <div className="text-center text-white/30">
                <span className="text-6xl block mb-3">🌱</span>
                <p className="text-xs tracking-widest">畑の土の写真</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ギャラリープレースホルダー */}
      <section className="section-padding bg-brand-bg">
        <div className="container-site">
          <SectionTitle
            title="畑のギャラリー"
            titleEn="Field Gallery"
            subtitle="四季折々の畑の様子をお届けします。（写真準備中）"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-brand-cream border border-brand-border flex items-center justify-center"
              >
                <span className="text-3xl opacity-20">🌿</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-cream text-center">
        <div className="container-site">
          <p className="text-sm text-brand-muted mb-6">
            畑で育てた生薬を使ったお茶を、ぜひお試しください。
          </p>
          <Link href="/products" className="btn-primary">
            商品を見る
          </Link>
        </div>
      </section>
    </>
  );
}
