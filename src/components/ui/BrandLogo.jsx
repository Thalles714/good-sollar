import { useState } from 'react'
import { images } from '../../data/images'

const logoSources = [images.logo, images.logoFallback]

export default function BrandLogo({ className = '' }) {
  const [sourceIndex, setSourceIndex] = useState(0)

  function handleError() {
    setSourceIndex((current) => {
      const next = current + 1
      return next < logoSources.length ? next : current
    })
  }

  return (
    <div
      className={[
        'flex h-14 w-48 shrink-0 items-center justify-start md:w-60 lg:w-72',
        className,
      ].join(' ')}
    >
      <img
        src={logoSources[sourceIndex]}
        alt="Good Sollar — Energia Solar"
        className="max-h-full max-w-full object-contain object-left"
        decoding="async"
        onError={handleError}
      />
    </div>
  )
}
