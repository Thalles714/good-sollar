import {
  Zap,
  PiggyBank,
  Award,
  ChartBar,
  Clock,
  MapPin,
} from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { WHATSAPP_URL } from '../../data/contact'

const differentiators = [
  {
    icon: Zap,
    title: 'Sistemas On-Grid e Off-Grid',
    description:
      'Trabalhamos com os dois modelos de geração de energia, indicando a melhor solução conforme sua necessidade e localização.',
  },
  {
    icon: PiggyBank,
    title: 'Baixo custo de aquisição',
    description:
      'Oferecemos sistemas solares com excelente custo-benefício, tornando o investimento em energia limpa mais acessível.',
  },
  {
    icon: Award,
    title: '6 anos de experiência',
    description:
      'Desde 2020 no mercado de energia solar, com equipe técnica qualificada e processos consolidados em cada projeto.',
  },
  {
    icon: ChartBar,
    title: '+500 projetos instalados',
    description:
      'Mais de 500 sistemas fotovoltaicos entregues para residências, fazendas, escritórios e outros segmentos.',
  },
  {
    icon: Clock,
    title: 'Atendimento 24 horas',
    description:
      'Disponíveis todos os dias, a qualquer hora, para tirar dúvidas, agendar visitas e dar suporte aos nossos clientes.',
  },
  {
    icon: MapPin,
    title: 'Base em Brasília/DF',
    description:
      'Atendemos Brasília e região com conhecimento local das concessionárias e particularidades de cada tipo de instalação.',
  },
]

export default function DifferentiatorsSection() {
  return (
    <section id="diferenciais" className="bg-primary-900 py-20 text-white lg:py-28">
      <Container>
        <SectionHeading
          badge="Nossos diferenciais"
          title="Por que escolher a Good Sollar"
          subtitle="Sistemas on-grid e off-grid, baixo custo de aquisição e mais de 500 projetos entregues em 6 anos de atuação."
          className="[&_h2]:text-white [&_p]:text-slate-300 [&_span]:bg-accent-400/15 [&_span]:text-accent-400 [&_span]:ring-accent-400/30"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item) => (
            <Card
              key={item.title}
              hover
              className="border border-primary-700/50 bg-primary-800/50 !p-6 backdrop-blur-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500 text-primary-900">
                <item.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
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
            Falar com um especialista
          </Button>
        </div>
      </Container>
    </section>
  )
}
