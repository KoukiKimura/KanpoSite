type ResponsiveImageProps = {
  src: string;
  alt: string;
  className?: string;
  pictureClassName?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
};

function getMobileImageSrc(src: string) {
  return src.replace(/\.webp($|[?#])/, '.mobile.webp$1');
}

export default function ResponsiveImage({
  src,
  alt,
  className,
  pictureClassName,
  loading = 'lazy',
  fetchPriority,
  sizes,
}: ResponsiveImageProps) {
  const mobileSrc = src.endsWith('.webp') ? getMobileImageSrc(src) : undefined;

  return (
    <picture className={pictureClassName}>
      {mobileSrc ? <source media="(max-width: 767px)" srcSet={mobileSrc} /> : null}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        sizes={sizes}
      />
    </picture>
  );
}
