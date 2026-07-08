import {
  PiggyBank,
  Leaf,
  House,
  Globe,
} from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import ImageSlot from '../ui/ImageSlot'
import { images } from '../../data/images'

const benefits = [
  {
    icon: PiggyBank,
    title: 'Conta de luz bem menor',
    description:
      'Produza sua própria energia e pague só o mínimo à concessionária — mesmo com reajuste anual.',
  },
  {
    icon: Leaf,
    title: 'Energia do sol, direto no telhado',
    description:
      'Menos dependência da rede e menos impacto no bolso. Funciona o ano todo, em qualquer região do país.',
  },
  {
    icon: House,
    title: 'Imóvel vale mais na venda',
    description:
      'Quem compra ou aluga prioriza casa e empresa com sistema solar já instalado.',
  },
  {
    icon: Globe,
    title: 'Retorno que você sente no mês',
    description:
      'O investimento se paga ao longo dos anos enquanto a economia aparece na fatura.',
  },
]

export default function BenefitsSection() {
  return (
    <section
      id="beneficios"
      aria-labelledby="beneficios-heading"
      className="section-glow section-spacing section-surface-brand"
    >
      <Container>
        <SectionHeading
          titleId="beneficios-heading"
          badge="Por que instalar"
          title="O que muda na prática"
          subtitle="Para quem paga conta de luz todo mês — dono de casa, empresário ou produtor rural — e quer gastar menos sem complicar."
        />

        <div className="split-layout">
          <ImageSlot
            src={images.benefits}
            alt="Família em casa com energia solar instalada"
            placeholder="04-beneficios.png — ilustração de benefícios"
            aspectRatio="aspect-[4/5] lg:aspect-square"
            className="order-1 lg:order-1"
          />

          <div className="order-2 grid gap-3 sm:grid-cols-2 lg:order-2">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="feature-card">
                <div className="feature-card-icon">
                  <benefit.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-primary-900 sm:text-base">
                  {benefit.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
