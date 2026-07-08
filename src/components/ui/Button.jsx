const variants = {
  primary:
    'bg-accent-500 text-primary-900 shadow-lg shadow-accent-500/25 hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-500/40 focus:ring-accent-500',
  secondary:
    'bg-white text-primary-700 border border-primary-200 shadow-sm hover:bg-primary-50 hover:border-primary-300 hover:shadow-md focus:ring-primary-500',
  outline:
    'bg-transparent text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md focus:ring-slate-400',
  whatsapp:
    'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/35 focus:ring-emerald-500',
}

const sizes = {
  sm: 'px-4 py-2 text-sm gap-2',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-3',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  ...props
}) {
  const classes = [
    'btn-motion group/btn inline-flex items-center justify-center font-semibold rounded-xl',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    '[&_svg]:transition-transform [&_svg]:duration-200 group-hover/btn:[&_svg]:translate-x-0.5',
    'disabled:transform-none disabled:shadow-none disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className,
  ].join(' ')

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
