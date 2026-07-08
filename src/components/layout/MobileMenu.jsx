import { X } from 'lucide-react'
import Button from '../ui/Button'
import NavLink from '../ui/NavLink'
import { WHATSAPP_URL } from '../../data/contact'

export default function MobileMenu({ isOpen, onClose, links }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-primary-50 shadow-2xl">
        <div className="flex h-16 items-center justify-between border-b border-primary-200/60 px-6">
          <span className="font-bold text-slate-900">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="btn-motion btn-motion-icon rounded-lg p-2 text-slate-600 hover:bg-primary-100"
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
              className="w-full justify-center px-4 py-3 text-base"
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
