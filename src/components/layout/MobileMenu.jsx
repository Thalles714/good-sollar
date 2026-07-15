import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import Button from '../ui/Button'
import NavLink from '../ui/NavLink'
import { WHATSAPP_URL } from '../../data/contact'

export default function MobileMenu({ isOpen, onClose, links, activeHref }) {
  const panelRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      const elements = Array.from(focusable ?? [])

      if (!elements.length) return

      const first = elements[0]
      const last = elements[elements.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 xl:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
    >
      <div
        className="mobile-menu-overlay absolute inset-0 bg-primary-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className="mobile-menu-panel absolute inset-y-0 right-0 w-full max-w-sm bg-primary-50 shadow-2xl"
      >
        <div className="flex h-16 items-center justify-between border-b border-primary-200/60 px-6">
          <span className="font-bold text-slate-900">Menu</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="btn-motion btn-motion-icon inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-primary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4" aria-label="Navegação mobile">
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              onClick={onClose}
              active={activeHref === link.href}
              className="min-h-12 w-full justify-center px-4 py-3 text-base"
            >
              {link.label}
            </NavLink>
          ))}

          <div className="mt-6 border-t border-primary-200/60 pt-6">
            <Button
              href={WHATSAPP_URL}
              variant="primary"
              size="md"
              className="w-full"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              Orçamento grátis
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}
