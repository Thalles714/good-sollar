import {
  House,
  Tractor,
  Building2,
  LayoutGrid,
} from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { WHATSAPP_URL } from '../../data/contact'

const services = [
  {
    icon: House,
    title: 'Energia Solar Residencial',
    description:
      'Sistemas fotovoltaicos para casas e apartamentos em Brasília e região. Economia na conta de luz com instalação profissional.',
    popular: true,
  },
  {
    icon: Tractor,
    title: 'Energia Solar para Fazendas',
    description:
      'Projetos para propriedades rurais com alto consumo energético. Soluções on-grid e off-grid adaptadas ao seu espaço.',
  },
  {
    icon: Building2,
    title: 'Energia Solar para Escritórios',
    description:
      'Reduza custos operacionais em empresas, consultórios e escritórios com sistemas dimensionados para sua demanda.',
  },
  {
    icon: LayoutGrid,
    title: 'Outros Projetos',
    description:
      'Atendemos comércios, galpões, condomínios e demais necessidades. Cada projeto é personalizado para o seu perfil de consumo.',
  },
]

export default function ServicesSection() {
  return (
    <section id="servicos" className="bg-slate-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Nossas soluções"
          title="Energia solar para cada necessidade"
          subtitle="Residencial, fazendas, escritórios e outros projetos — com sistemas on-grid e off-grid e baixo custo de aquisição."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title} hover className="relative">
              {service.popular && (
                <span className="absolute right-4 top-4 rounded-full bg-accent-400/20 px-3 py-1 text-xs font-semibold text-amber-800">
                  Mais procurado
                </span>
              )}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white">
                <service.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
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
