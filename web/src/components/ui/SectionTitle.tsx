type SectionTitleProps = {
  title: string;
  titleEn?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
};

export default function SectionTitle({
  title,
  titleEn,
  subtitle,
  align = 'center',
  light = false,
}: SectionTitleProps) {
  const alignClass = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }[align];

  const dividerClass = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
  }[align];

  return (
    <div className={`flex flex-col ${alignClass} mb-12 lg:mb-16`}>
      {titleEn && (
        <p
          className={`text-xs tracking-[0.3em] uppercase mb-3 ${light ? 'text-white/50' : 'text-accent'}`}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {titleEn}
        </p>
      )}
      <h2
        className={`heading-md lg:heading-lg ${light ? 'text-white' : 'text-brand-text'} font-serif`}
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        {title}
      </h2>
      <div className={`w-12 h-px ${light ? 'bg-white/40' : 'bg-accent'} mt-5 ${dividerClass}`} />
      {subtitle && (
        <p
          className={`mt-5 text-sm leading-relaxed max-w-xl ${
            light ? 'text-white/70' : 'text-brand-muted'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
