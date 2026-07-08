export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={[
        'rounded-2xl border border-slate-200/90 bg-white p-6',
        'shadow-[0_1px_2px_rgba(13,27,51,0.04),0_4px_16px_rgba(13,27,51,0.03)]',
        hover &&
          'transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-400/20 hover:shadow-[0_4px_12px_rgba(13,27,51,0.06),0_8px_24px_rgba(13,27,51,0.04)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
