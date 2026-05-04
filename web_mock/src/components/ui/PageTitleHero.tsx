import ResponsiveImage from '@/components/ui/ResponsiveImage';

type PageTitleHeroProps = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
};

export default function PageTitleHero({
  id,
  title,
  imageSrc,
  imageAlt,
  eyebrow,
}: PageTitleHeroProps) {
  return (
    <section
      id={id}
      className="mock-faded-band mock-page-title-band relative overflow-hidden"
    >
      <ResponsiveImage
        src={imageSrc}
        alt={imageAlt}
        pictureClassName="absolute inset-0 block h-full w-full"
        className="h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(12,12,12,0.28),rgba(12,12,12,0.46))]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.02),_rgba(8,8,8,0.08))]" />
      <div
        id={`${id}-inner`}
        className="mock-shell relative flex min-h-[30vh] items-center justify-center py-12 text-center md:min-h-[42vh] md:py-16 lg:min-h-[46vh]"
      >
        <div id={`${id}-content`} className="space-y-4 text-white">
            {eyebrow ? (
              <p id={`${id}-eyebrow`} className="text-xs uppercase tracking-[0.4em] text-white/68">
                {eyebrow}
              </p>
            ) : null}
            <h1 id={`${id}-title`} className="font-serif text-4xl leading-none md:text-7xl lg:text-[5.6rem]">
              {title}
            </h1>
        </div>
      </div>
    </section>
  );
}
