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
      style={{
        backgroundImage: `linear-gradient(rgba(12, 12, 12, 0.28), rgba(12, 12, 12, 0.46)), url(${imageSrc})`,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.02),_rgba(8,8,8,0.08))]" />
      <div
        id={`${id}-inner`}
        className="mock-shell relative flex min-h-[34vh] items-center justify-center py-16 text-center md:min-h-[42vh] lg:min-h-[46vh]"
      >
        <div id={`${id}-content`} className="space-y-4 text-white">
            {eyebrow ? (
              <p id={`${id}-eyebrow`} className="text-xs uppercase tracking-[0.4em] text-white/68">
                {eyebrow}
              </p>
            ) : null}
            <h1 id={`${id}-title`} className="font-serif text-5xl leading-none md:text-7xl lg:text-[5.6rem]">
              {title}
            </h1>
        </div>
      </div>
    </section>
  );
}
