import Badge from './Badge'

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
  titleId,
}) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <header className={`mb-7 max-w-3xl lg:mb-9 ${alignClass} ${className}`}>
      {badge && (
        <div
          className={`section-badge-wrap ${
            align === 'center' ? 'flex flex-col items-center' : ''
          }`}
        >
          <Badge>{badge}</Badge>
          <span
            className="mt-2 block h-0.5 w-8 rounded-full bg-accent-400/80"
            aria-hidden="true"
          />
        </div>
      )}
      <h2
        id={titleId}
        className="mt-3 text-[1.625rem] font-bold tracking-tight text-primary-900 sm:text-3xl lg:text-[2.125rem] lg:leading-[1.15]"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`prose-width mt-2.5 text-[0.9375rem] leading-relaxed text-slate-600 sm:text-base ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </header>
  )
}
