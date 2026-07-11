export default function NavLink({
  href,
  children,
  onClick,
  className = '',
  active = false,
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`nav-link ${active ? 'nav-link--active' : ''} ${className}`.trim()}
      aria-current={active ? 'page' : undefined}
    >
      <span className="nav-link-label">{children}</span>
    </a>
  )
}
