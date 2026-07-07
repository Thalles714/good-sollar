import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import BrandImage from '../ui/BrandImage'
import { WHATSAPP_URL } from '../../data/contact'
import { images } from '../../data/images'

const stats = [
  { value: '500+', label: 'Projetos instalados' },
  { value: '6 anos', label: 'De experiência no mercado' },
  { value: '24h', label: 'Atendimento todos os dias' },
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
      className="brand-bg-hero relative overflow-hidden pt-24 lg:pt-32"
    >
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-accent-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-primary-100/60 blur-3xl" />

      <Container className="relative pb-16 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <Badge>Energia Solar On-Grid e Off-Grid</Badge>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Economize até{' '}
              <span className="bg-gradient-to-r from-accent-500 to-accent-400 bg-clip-text text-transparent">
                95% na sua conta
              </span>{' '}
              de energia
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Energia limpa, renovável e que cabe no seu bolso. A Good Sollar
              instala sistemas solares em Brasília e região com baixo custo de
              aquisição.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                href={WHATSAPP_URL}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar orçamento gratuito
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="#servicos" variant="secondary" size="lg">
                Conhecer soluções
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {clients.map((client) => (
                  <div
                    key={client.initials}
                    title={client.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-accent-400 to-accent-500 text-xs font-bold text-primary-900"
                  >
                    {client.initials}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">500+ projetos</p>
                <p className="text-sm text-slate-500">
                  realizados em 6 anos de mercado
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <BrandImage
              src={images.hero}
              alt="Família em frente à casa com painéis solares instalados pela Good Sollar"
              aspectRatio="aspect-[4/5] sm:aspect-square lg:aspect-[4/5]"
              className="shadow-2xl shadow-primary-200/30"
            />
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-bottom-6 sm:-left-6">
              <p className="text-2xl font-bold text-accent-500">500+</p>
              <p className="text-sm text-slate-500">projetos instalados</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 border-t border-slate-100/80 pt-12 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
