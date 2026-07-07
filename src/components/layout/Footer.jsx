import { Share2, MapPin, Phone } from 'lucide-react'
import Container from '../ui/Container'
import {
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
  ADDRESS,
  CNPJ,
  HOURS,
  INSTAGRAM_URL,
} from '../../data/contact'

const footerLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-primary-800 bg-primary-900 text-slate-300">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src="/goodsollar-logo-light.svg"
              alt="Good Sollar — Energia Solar"
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Energia solar on-grid e off-grid em Brasília/DF. Residencial, fazendas,
              escritórios e outros projetos com baixo custo de aquisição.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Navegação
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-accent-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                <span>{ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Phone className="h-4 w-4 shrink-0 text-accent-400" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-400"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Horário
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>{HOURS}</li>
            </ul>

            <div className="mt-6 flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-800 text-slate-400 transition-colors hover:bg-accent-500 hover:text-primary-900"
                aria-label="Instagram Good Sollar"
              >
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-800 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {currentYear} Good Sollar — Energia Solar. Todos os direitos reservados.
          </p>
          <p className="text-xs text-slate-600">CNPJ: {CNPJ}</p>
        </div>
      </Container>
    </footer>
  )
}
