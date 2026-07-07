export default function BrandImage({
  src,
  alt,
  aspectRatio = 'aspect-video',
  className = '',
  objectPosition = 'center',
}) {
  return (
    <div
      className={['relative overflow-hidden rounded-2xl', aspectRatio, className].join(' ')}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        style={{ objectPosition }}
        loading="lazy"
      />
    </div>
  )
}
