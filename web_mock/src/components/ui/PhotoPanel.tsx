import ResponsiveImage from '@/components/ui/ResponsiveImage';

type PhotoPanelProps = {
  label: string;
  caption?: string;
  from: string;
  to: string;
  tall?: boolean;
  src?: string;
  alt?: string;
};

export default function PhotoPanel({
  label,
  caption,
  from,
  to,
  tall = false,
  src,
  alt,
}: PhotoPanelProps) {
  return (
    <div
      className={`relative overflow-hidden border border-white/40 shadow-frame ${
        tall ? 'min-h-[300px] md:min-h-[420px]' : 'min-h-[210px] md:min-h-[280px]'
      }`}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
      }}
    >
      {src ? (
        <ResponsiveImage
          src={src}
          alt={alt ?? label}
          pictureClassName="absolute inset-0 block h-full w-full"
          className="absolute inset-0 h-full w-full object-cover"
          sizes={tall ? '(max-width: 767px) 100vw, 52vw' : '(max-width: 767px) 100vw, 33vw'}
        />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.26),_transparent_42%),linear-gradient(to_bottom,_rgba(12,12,12,0.04),_rgba(12,12,12,0.28))]" />
      <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-5 text-mock-paper md:p-7">
        <span className="text-[10px] uppercase tracking-[0.28em] text-white/70 md:text-[11px] md:tracking-[0.35em]">
          {src ? 'イメージ' : 'プレースホルダー'}
        </span>
        <div className="space-y-2">
          <p className="font-serif text-2xl leading-none md:text-4xl">{label}</p>
          {caption ? <p className="max-w-sm text-sm leading-7 text-white/80">{caption}</p> : null}
        </div>
      </div>
    </div>
  );
}
