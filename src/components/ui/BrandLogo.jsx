import { images } from '../../data/images'

export default function BrandLogo({ className = '' }) {
  return (
    <div
      className={[
        'flex h-14 w-48 shrink-0 items-center justify-start md:w-60 lg:w-72',
        className,
      ].join(' ')}
    >
      <img
        src={images.logo}
        alt="Good Sollar, energia solar"
        className="max-h-full max-w-full object-contain object-left"
        decoding="async"
      />
    </div>
  )
}
