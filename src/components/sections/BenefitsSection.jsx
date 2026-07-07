import {
  PiggyBank,
  Leaf,
  Home,
  Globe,
} from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Card from '../ui/Card'
import BrandImage from '../ui/BrandImage'
import { images } from '../../data/images'

const benefits = [
  {
    icon: PiggyBank,
    title: 'Até 95% de economia',
    description:
      'Reduza drasticamente o valor da sua conta de luz e proteja-se contra reajustes tarifários.',
  },
  {
    icon: Leaf,
    title: 'Energia limpa e renovável',
    description:
      'Gere sua própria energia a partir do sol e contribua para um planeta mais sustentável.',
  },
  {
    icon: Home,
    title: 'Valorização do seu imóvel',
    description:
      'Imóveis com sistema solar fotovoltaico ganham mais valor e atratividade no mercado.',
  },
  {
    icon: Globe,
    title: 'Sustentabilidade para o futuro',
    description:
      'Invista em energia limpa com retorno financeiro e impacto positivo para as próximas gerações.',
  },
]

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Por que energia solar"
          title="Benefícios que fazem a diferença"
          subtitle="Economia na conta de luz, sistemas on-grid e off-grid e baixo custo de aquisição para residências, fazendas e escritórios."
        />

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <BrandImage
            src={images.benefits}
            alt="Casa com painéis solares — benefícios da energia fotovoltaica"
            aspectRatio="aspect-[4/3]"
            className="shadow-xl shadow-primary-200/20"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <Card key={benefit.title} hover className="text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-400/15 text-accent-600">
                  <benefit.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
