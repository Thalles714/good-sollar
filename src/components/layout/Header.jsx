import { useEffect, useRef, useState } from 'react'
import { Menu, MessageCircle } from 'lucide-react'
import BrandLogo from '../ui/BrandLogo'
import NavLink from '../ui/NavLink'
import Container from '../ui/Container'
import MobileMenu from './MobileMenu'
import ThemeToggle from '../ui/ThemeToggle'
import { WHATSAPP_URL } from '../../data/contact'
import { navLinks } from '../../data/nav'
import useHeaderScroll from '../../hooks/useHeaderScroll'
import { playClickSound } from '../../utils/audio'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#inicio')
  const menuButtonRef = useRef(null)
  const scrolled = useHeaderScroll(80)

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean)

    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target?.id) {
          setActiveHref(`#${visible.target.id}`)
        }
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`header--transition fixed inset-x-0 top-0 z-50 h-16 lg:h-20 ${
        scrolled ? 'header--scrolled' : 'header--top'
      }`}
    >
      <Container className="h-full">
        <div className="flex h-full items-center justify-between gap-4">
          <a
            href="#inicio"
            className="flex shrink-0 items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            aria-label="Good Sollar, voltar ao início"
          >
            <BrandLogo className="!w-32 sm:!w-44 lg:!w-56" />
          </a>

          <nav className="hidden min-w-0 items-center gap-0.5 lg:flex" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} active={activeHref === link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="header-cta hidden items-center justify-center rounded-xl bg-accent-500 px-4 py-2 text-sm font-semibold text-primary-900 shadow-lg shadow-accent-500/25 transition-colors hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-500/40 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 sm:inline-flex"
              onClick={playClickSound}
            >
              Orçamento grátis
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="header-cta inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-accent-500 px-3 py-2 text-[0.8125rem] font-semibold text-primary-800 shadow-lg shadow-accent-500/20 transition-colors hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 sm:hidden"
              aria-label="Pedir orçamento grátis pelo WhatsApp"
              onClick={playClickSound}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Orçamento
            </a>

            <button
              type="button"
              ref={menuButtonRef}
              className="btn-motion btn-motion-icon inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-primary-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 lg:hidden"
              onClick={() => {
                playClickSound()
                setMenuOpen(true)
              }}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </Container>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => {
          playClickSound()
          setMenuOpen(false)
          menuButtonRef.current?.focus()
        }}
        links={navLinks}
        activeHref={activeHref}
      />
    </header>
  )
}
