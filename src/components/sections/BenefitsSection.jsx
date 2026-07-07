import {
  PiggyBank,
  Leaf,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Card from '../ui/Card'

const benefits = [
  {
    icon: PiggyBank,
    title: 'Economia imediata',
    description:
      'Reduza drasticamente o valor da sua conta de luz e proteja-se contra os constantes reajustes tarifários.',
  },
  {
    icon: TrendingUp,
    title: 'Retorno do investimento',
    description:
      'Sistemas fotovoltaicos se pagam em poucos anos e continuam gerando economia por mais de 25 anos.',
  },
  {
    icon: Leaf,
    title: 'Energia limpa e sustentável',
    description:
      'Contribua para um planeta mais verde gerando sua própria energia renovável a partir do sol.',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança e garantia',
    description:
      'Equipamentos certificados, instalação profissional e suporte completo em todas as etapas do projeto.',
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <Card key={benefit.title} hover className="text-center lg:text-left">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-400/15 text-accent-600 lg:mx-0">
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
      </Container>
    </section>
  )
}
