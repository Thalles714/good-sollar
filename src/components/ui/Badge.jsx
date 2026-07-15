export default function Badge({ children, className = '' }) {
  return (
    <span className={`section-badge ${className}`.trim()}>
      {children}
    </span>
  )
}
