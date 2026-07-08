import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

export default function ImageSlot({
  src,
  alt = '',
  placeholder = 'Imagem — substituir',
  aspectRatio = 'aspect-video',
  className = '',
  placeholderClassName = 'bg-white border-2 border-dashed border-slate-200 text-slate-400',
  objectPosition = 'center',
  framed = true,
}) {
  const [hasError, setHasError] = useState(false)
  const showPlaceholder = !src || hasError

  return (
    <div
      className={[
        'relative w-full overflow-hidden',
        aspectRatio,
        framed && 'media-frame',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role={showPlaceholder ? 'img' : undefined}
      aria-label={showPlaceholder ? placeholder : undefined}
    >
      {showPlaceholder ? (
        <div
          className={[
            'flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center',
            placeholderClassName,
          ].join(' ')}
        >
          <ImageIcon className="h-8 w-8 opacity-40" strokeWidth={1.5} />
          <span className="text-sm font-medium leading-snug">{placeholder}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}
