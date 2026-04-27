import PageTitleHero from '@/components/ui/PageTitleHero';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import { mockKominka } from '@/lib/mock/site';

export default function KominkaPage() {
  const galleryHeights = [
    'min-h-[220px] md:min-h-[420px]',
    'min-h-[190px] md:min-h-[320px]',
    'min-h-[210px] md:min-h-[360px]',
    'min-h-[180px] md:min-h-[300px]',
    'min-h-[200px] md:min-h-[340px]',
    'min-h-[220px] md:min-h-[400px]',
    'min-h-[190px] md:min-h-[320px]',
  ];

  return (
    <>
      <PageTitleHero
        id="kominka-page-hero"
        title="古民家"
        eyebrow="Kominka"
        imageSrc={mockKominka.images.hero.src}
        imageAlt={mockKominka.images.hero.alt}
      />

      <section id="kominka-overview-section" className="mock-section-kominka relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_24%),linear-gradient(145deg,_rgba(173,139,87,0.18),_transparent_42%)]" />
        <div
          id="kominka-overview-layout"
          className="mock-shell mock-sticky-stage relative grid gap-8 py-10 md:gap-10 md:py-16 lg:min-h-[165vh] lg:grid-cols-[0.76fr_1.24fr] lg:items-start lg:py-20"
        >
          <div id="kominka-overview-copy" className="mock-sticky-copy">
            <div id="kominka-overview-intro" className="max-w-md space-y-5">
              <h2 id="kominka-overview-title" className="font-serif text-2xl text-mock-ink md:text-3xl">
                古民家
              </h2>
              <p id="kominka-overview-body" className="mock-section-body text-sm leading-8 md:text-base">
                朝は畑の空気を吸い、夜は木の香りの中で休む。古い家に残る静けさをそのまま受け取れる、一棟の宿です。
              </p>
            </div>

            <div id="kominka-schedule" className="mock-section-line max-w-sm space-y-4 border-t pt-6">
              <h3 id="kominka-schedule-title" className="font-serif text-2xl text-mock-ink">
                滞在の流れ
              </h3>
              <div id="kominka-schedule-list" className="mock-section-body space-y-4 text-sm leading-8">
                {mockKominka.schedule.map((item, index) => (
                  <p id={`kominka-schedule-item-${index + 1}`} key={item} className="mock-section-line border-b pb-4">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div id="kominka-overview-visual" className="mock-sticky-visual space-y-4">
            <div id="kominka-overview-visual-main" className="mock-image-frame mock-surface-8 min-h-[260px] md:min-h-[420px]">
              <ResponsiveImage
                src={mockKominka.images.hero.src}
                alt={mockKominka.images.hero.alt}
                sizes="(max-width: 767px) 100vw, 58vw"
              />
              <div id="kominka-overview-visual-overlay" className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent px-6 py-6">
                <p id="kominka-overview-visual-overlay-text" className="mt-3 max-w-sm font-serif text-2xl text-white md:text-3xl">
                  木の匂い、畑の風、朝の光がゆっくり重なる、静かな滞在です。
                </p>
              </div>
            </div>
            <div id="kominka-overview-visual-grid" className="grid gap-4 md:grid-cols-2">
              <div id="kominka-overview-visual-sub-1" className="mock-image-frame mock-surface-9 min-h-[170px] md:min-h-[220px]">
                <ResponsiveImage
                  src={mockKominka.images.livingRoom.src}
                  alt={mockKominka.images.livingRoom.alt}
                  sizes="(max-width: 767px) 100vw, 29vw"
                />
              </div>
              <div id="kominka-overview-visual-sub-2" className="mock-image-frame mock-surface-10 min-h-[170px] md:min-h-[220px]">
                <ResponsiveImage
                  src={mockKominka.images.morningField.src}
                  alt={mockKominka.images.morningField.alt}
                  sizes="(max-width: 767px) 100vw, 29vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="kominka-faded-band" className="mock-faded-band relative min-h-[32vh] overflow-hidden md:min-h-[44vh]">
        <ResponsiveImage
          src={mockKominka.images.hero.src}
          alt={mockKominka.images.hero.alt}
          pictureClassName="absolute inset-0 block h-full w-full"
          className="h-full w-full object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(41,28,19,0.26),rgba(41,28,19,0.48))]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(251,248,241,0.02),_rgba(43,32,24,0.08))]" />
        <div id="kominka-faded-band-inner" className="mock-shell relative flex min-h-[32vh] items-end py-10 md:min-h-[44vh] md:py-20">
          <div id="kominka-faded-band-copy" className="max-w-md border-l border-white/35 pl-6 text-white/82">
            <p id="kominka-faded-band-body" className="mt-4 text-sm leading-8">
              音の少ない場所で過ごす時間が、気持ちをゆっくりほどいていきます。畑へ向かう朝も、灯りを落とす夜も、
              この家の静けさがそのまま残る滞在です。
            </p>
          </div>
        </div>
      </section>

      <section id="kominka-stay-section" className="mock-section bg-[rgba(255,255,255,0.38)]">
        <div id="kominka-stay-layout" className="mock-shell grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div id="kominka-stay-copy-card" className="mock-card p-6 md:p-10">
            <h2 id="kominka-stay-title" className="font-serif text-2xl text-mock-ink md:text-3xl">
              過ごし方
            </h2>
            <p id="kominka-stay-body" className="mt-4 text-sm leading-8 text-mock-muted">
              朝は畑を歩き、昼は縁側で休み、夜はお茶の湯気に包まれる。急がず過ごすことそのものが、この古民家での滞在になります。
            </p>
          </div>

          <div id="kominka-stay-cards" className="grid gap-5 md:grid-cols-2">
            <div id="kominka-scenes-card" className="mock-card p-6 md:p-8">
              <h3 id="kominka-scenes-title" className="font-serif text-2xl text-mock-ink">
                滞在の景色
              </h3>
              <div id="kominka-scenes-list" className="mt-6 space-y-4 text-sm leading-8 text-mock-muted">
                <p id="kominka-scene-1" className="border-b border-mock-border pb-4">
                  土間から客室へ抜ける、静かな廊下の空気
                </p>
                <p id="kominka-scene-2" className="border-b border-mock-border pb-4">
                  縁側に差し込む朝の光と、庭先のやわらかな風
                </p>
                <p id="kominka-scene-3" className="border-b border-mock-border pb-4">
                  夜にお茶を淹れたくなる、音の少ない一棟
                </p>
              </div>
            </div>
            <div id="kominka-seasons-card" className="mock-card p-6 md:p-8">
              <h3 id="kominka-seasons-title" className="font-serif text-2xl text-mock-ink">
                季節の楽しみ
              </h3>
              <p id="kominka-seasons-body" className="mt-6 text-sm leading-8 text-mock-muted">
                春は畑の芽吹き、夏は朝の風、秋は木の匂い、冬は湯気のあたたかさ。季節ごとの空気が、
                古民家の表情を少しずつ変えていきます。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="kominka-gallery-section" className="mock-gallery-section mock-section border-t border-mock-border">
        <div id="kominka-gallery-inner" className="mock-shell space-y-10">
          <div id="kominka-gallery-copy" className="max-w-2xl space-y-4">
            <h2 id="kominka-gallery-title" className="font-serif text-2xl text-mock-ink md:text-3xl">
              ギャラリー
            </h2>
            <p id="kominka-gallery-body" className="text-sm leading-8 text-mock-muted">
              土間、客室、庭先、畑への道。古民家に流れる時間を、静かなまま並べています。
            </p>
          </div>

          <div id="kominka-gallery-grid" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mockKominka.gallery.map((image, index) => (
              <div
                id={`kominka-gallery-item-${index + 1}`}
                key={`${image.src}-${index}`}
                className={`mock-image-frame mock-surface-11 ${galleryHeights[index % galleryHeights.length]}`}
              >
                <ResponsiveImage
                  src={image.src}
                  alt={image.alt}
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
