import useScrollReveal from '../../hooks/useScrollReveal'

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  className = '',
  as: Tag = 'div',
  threshold,
  rootMargin,
  once = true,
}) {
  const { ref, visible } = useScrollReveal({ threshold, rootMargin, once })

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
