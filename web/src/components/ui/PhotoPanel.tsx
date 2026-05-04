import Image from 'next/image';

type PhotoPanelProps = {
  label: string;
  caption?: string;
  from: string;
  to: string;
  tall?: boolean;
  src?: string;
  alt?: string;
  sizes?: string;
};

export default function PhotoPanel({
  label,
  caption,
  from,
  to,
  tall = false,
  src,
  alt,
  sizes = '(max-width: 767px) 100vw, 50vw',
}: PhotoPanelProps) {
  return (
    <div
      className={`relative overflow-hidden ${tall ? 'min-h-[300px] md:min-h-[420px]' : 'min-h-[210px] md:min-h-[280px]'}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {src && (
        <Image
          src={src}
          alt={alt ?? label}
          fill
          sizes={sizes}
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),_transparent_40%),linear-gradient(to_bottom,_rgba(12,12,12,0.04),_rgba(12,12,12,0.28))]" />
      <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-5 text-white md:p-7">
        <span className="text-[10px] uppercase tracking-[0.28em] text-white/70">
          {src ? 'イメージ' : 'placeholder'}
        </span>
        <div className="space-y-2">
          <p className="font-serif text-2xl leading-none md:text-4xl">{label}</p>
          {caption && <p className="max-w-sm text-sm leading-7 text-white/80">{caption}</p>}
        </div>
      </div>
    </div>
  );
}
