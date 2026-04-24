type SectionHeadingProps = {
  idBase?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
};

export default function SectionHeading({
  idBase,
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center';
  const headingColor = light ? 'text-mock-paper' : 'text-mock-ink';
  const bodyColor = light ? 'text-white/80' : 'text-mock-muted';

  return (
    <div id={idBase} className={`flex flex-col gap-3 ${alignment}`}>
      <span id={idBase ? `${idBase}-eyebrow` : undefined} className="text-xs uppercase tracking-[0.35em] text-mock-gold">
        {eyebrow}
      </span>
      <h2 id={idBase ? `${idBase}-title` : undefined} className={`font-serif text-3xl leading-tight ${headingColor} md:text-5xl`}>
        {title}
      </h2>
      {description ? (
        <p id={idBase ? `${idBase}-description` : undefined} className={`max-w-2xl text-sm leading-8 ${bodyColor} md:text-base`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
