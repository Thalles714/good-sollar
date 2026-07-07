import {
  House,
  Tractor,
  Building2,
  BatteryCharging,
} from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Card from '../ui/Card'
import Button from '../ui/Button'
import BrandImage from '../ui/BrandImage'
import { WHATSAPP_URL } from '../../data/contact'
import { images } from '../../data/images'

const services = [
  {
    icon: House,
    title: 'Residencial',
    description: 'Soluções completas para sua casa e família.',
    image: images.services.residencial,
    popular: true,
  },
  {
    icon: Building2,
    title: 'Empresarial',
    description: 'Reduza custos e aumente a competitividade da sua empresa.',
    image: images.services.empresarial,
  },
  {
    icon: Tractor,
    title: 'Rural / Agronegócio',
    description: 'Energia sustentável para o campo produzir mais.',
    image: images.services.rural,
  },
  {
    icon: BatteryCharging,
    title: 'Sistemas Off Grid',
    description: 'Energia independente, onde você estiver.',
    image: images.services.offgrid,
  },
]

export default function ServicesSection() {
  return (
    <section id="servicos" className="brand-bg-servicos py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Nossas soluções"
          title="Energia solar para cada necessidade"
          subtitle="Residencial, fazendas, escritórios e outros projetos — com sistemas on-grid e off-grid e baixo custo de aquisição."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title} hover className="relative overflow-hidden !p-0">
              {service.popular && (
                <span className="absolute right-4 top-4 z-10 rounded-full bg-accent-400/90 px-3 py-1 text-xs font-semibold text-primary-900">
                  Mais procurado
                </span>
              )}
              <BrandImage
                src={service.image}
                alt={service.title}
                aspectRatio="aspect-[16/10]"
                className="rounded-b-none rounded-t-2xl"
              />
              <div className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-800 text-white">
                  <service.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            href={WHATSAPP_URL}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tirar dúvidas no WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  )
}
