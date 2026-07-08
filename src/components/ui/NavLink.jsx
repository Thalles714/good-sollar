export default function NavLink({ href, children, onClick, className = '' }) {
  return (
    <a href={href} onClick={onClick} className={`nav-link ${className}`.trim()}>
      <span className="nav-link-label">{children}</span>
    </a>
  )
}
