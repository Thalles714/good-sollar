import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { WHATSAPP_URL } from '../../data/contact'
import { images } from '../../data/images'

const stats = [
  { value: '500+', label: 'Projetos entregues' },
  { value: '6 anos', label: 'De experiência' },
  { value: '24h', label: 'Atendimento no WhatsApp' },
]

const clients = [
  { initials: 'CM', name: 'Carlos M.' },
  { initials: 'JR', name: 'Juliana R.' },
  { initials: 'MA', name: 'Marcos e Ana' },
  { initials: 'GS', name: 'Good Sollar' },
]

export default function HeroSection() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="hero-offset relative min-h-[min(580px,88vh)] overflow-hidden pb-12 md:min-h-[min(640px,86vh)] md:pb-14 lg:pb-16"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={images.hero}
          alt=""
          className="h-full w-full scale-105 object-cover object-[70%_center] lg:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white from-30% via-white/90 via-50% to-white/5 to-75% sm:from-28% sm:via-48% lg:from-22% lg:via-42% lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-50/95 via-transparent to-white/40 sm:to-transparent" />
        <div className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-accent-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-primary-600/5 blur-3xl" />
      </div>

      <Container className="relative z-10 flex min-h-[inherit] flex-col justify-center">
        <div className="max-w-xl lg:max-w-[34rem]">
          <Badge>Atendemos todo o Brasil</Badge>

          <h1
            id="hero-heading"
            className="mt-4 text-[2rem] font-extrabold leading-[1.12] tracking-tight text-primary-900 sm:text-4xl lg:text-[2.875rem]"
          >
            Reduza até{' '}
            <span className="bg-gradient-to-r from-accent-500 to-accent-400 bg-clip-text text-transparent">
              95% na conta de luz
            </span>{' '}
            da sua casa ou empresa
          </h1>

          <p className="prose-width mt-4 text-base leading-relaxed text-slate-700 sm:text-[1.0625rem]">
            Instalação para residências, comércios e fazendas em qualquer estado.
            Orçamento gratuito pelo WhatsApp — sem burocracia.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              href={WHATSAPP_URL}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Quero meu orçamento grátis
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href="#servicos" variant="secondary" size="lg">
              Ver tipos de projeto
            </Button>
          </div>

          <div className="glass-panel mt-7 inline-flex flex-col gap-2.5 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex -space-x-2">
              {clients.map((client) => (
                <div
                  key={client.initials}
                  title={client.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-accent-400 to-accent-500 text-xs font-bold text-primary-900 shadow-sm"
                >
                  {client.initials}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">+500 clientes atendidos</p>
              <p className="text-sm text-slate-600">desde 2020 em todo o país</p>
            </div>
          </div>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:max-w-2xl">
          {stats.map((stat) => (
            <div key={stat.label} className="hero-stat">
              <p className="text-2xl font-bold text-primary-900 sm:text-[1.75rem]">{stat.value}</p>
              <p className="mt-0.5 text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
