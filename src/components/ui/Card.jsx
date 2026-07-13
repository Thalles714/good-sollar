export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={[
        'rounded-2xl border border-slate-200/90 bg-white p-6',
        'shadow-[0_1px_2px_rgba(13,27,51,0.04),0_4px_16px_rgba(13,27,51,0.03)]',
        hover && 'card-interactive',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
