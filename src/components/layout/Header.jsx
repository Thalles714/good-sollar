import { useState } from 'react'
import { Menu } from 'lucide-react'
import BrandLogo from '../ui/BrandLogo'
import NavLink from '../ui/NavLink'
import Container from '../ui/Container'
import Button from '../ui/Button'
import MobileMenu from './MobileMenu'
import { WHATSAPP_URL } from '../../data/contact'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-primary-200/50 bg-primary-100/95 backdrop-blur-xl lg:h-20">
      <Container className="h-full">
        <div className="flex h-full items-center justify-between gap-4">
          <a href="#inicio" className="flex shrink-0 items-center">
            <BrandLogo />
          </a>

          <nav className="hidden min-w-0 items-center gap-0.5 xl:flex" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href={WHATSAPP_URL}
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              target="_blank"
              rel="noopener noreferrer"
            >
              Orçamento grátis
            </Button>

            <button
              type="button"
              className="btn-motion btn-motion-icon inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-primary-200/60 xl:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </Container>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
      />
    </header>
  )
}
