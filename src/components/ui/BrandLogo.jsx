import { images } from '../../data/images'
import useTheme from '../../hooks/useTheme'

export default function BrandLogo({ className = '', variant }) {
  const { isDark } = useTheme()
  const resolvedVariant =
    variant ?? (isDark ? 'light' : 'default')
  const src = resolvedVariant === 'light' ? images.logoLight : images.logo

  return (
    <div
      className={[
        'flex h-14 w-48 shrink-0 items-center justify-start md:w-60 lg:w-72',
        className,
      ].join(' ')}
    >
      <img
        src={src}
        alt="Good Sollar, energia solar"
        className="max-h-full max-w-full object-contain object-left"
        decoding="async"
      />
    </div>
  )
}
