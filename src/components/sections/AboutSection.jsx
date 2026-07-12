import { CheckCircle2 } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import ScrollReveal from '../ui/ScrollReveal'
import useScrollReveal from '../../hooks/useScrollReveal'
import useCountUp from '../../hooks/useCountUp'
import { images } from '../../data/images'

const highlights = [
  'Sistema conectado à rede ou isolado: indicamos o melhor para o seu caso',
  'Financiamento disponível. Consulte condições e disponibilidade.',
  'Mais de 500 instalações concluídas desde 2020',
  'WhatsApp disponível a qualquer momento',
]

function MetricItem({ target, suffix, label }) {
  const { ref, visible } = useScrollReveal({ threshold: 0.35 })
  const value = useCountUp(target, visible)

  return (
    <div ref={ref} className="text-center">
      <p className="text-2xl font-bold tabular-nums text-white sm:text-3xl">
        {value}
        {suffix}
      </p>
      <p className="mt-1 text-[0.6875rem] font-medium uppercase tracking-wide text-slate-300 sm:text-xs">
        {label}
      </p>
    </div>
  )
}

export default function AboutSection() {
  const { ref: visualRef, visible: visualVisible } = useScrollReveal({ threshold: 0.2 })

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="about-section section-spacing section-surface-brand"
    >
      <Container>
        <ScrollReveal variant="fade-up" className="mb-8 lg:mb-10">
          <SectionHeading
            titleId="sobre-heading"
            badge="Quem somos"
            title="De Brasília para todo o Brasil"
            subtitle="Empresa registrada no DF, com instalações em residências, comércios e propriedades rurais por todo o país. Conhecemos as regras de cada concessionária regional."
            align="left"
            className="max-w-3xl"
          />
        </ScrollReveal>

        <div className="about-layout grid items-start gap-8 lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:gap-y-0">
          <div
            ref={visualRef}
            className={`about-visual lg:col-span-6 ${visualVisible ? 'is-visible' : ''}`}
          >
            <div className="about-visual-main media-frame overflow-hidden rounded-2xl">
              <img
                src={images.about}
                alt="Equipe Good Sollar instalando painéis solares em residência"
                className="about-visual-photo h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="about-metrics-bar grid grid-cols-3 gap-3 rounded-2xl bg-primary-900 px-4 py-4 sm:px-5 sm:py-5">
              <MetricItem target={500} suffix="+" label="Projetos entregues" />
              <MetricItem target={6} suffix=" anos" label="De experiência" />
              <MetricItem target={24} suffix="h" label="WhatsApp disponível" />
            </div>
          </div>

          <div className="about-content lg:col-span-6">
            <ScrollReveal variant="fade-up" delay={60}>
              <div className="space-y-4 text-[0.9375rem] leading-relaxed text-slate-600 sm:text-base">
                <p>
                  A Good Sollar nasceu em Brasília e hoje atende clientes em todo o
                  Brasil: proprietários de residências, empresários, produtores rurais e quem
                  precisa de energia onde a rede não chega.
                </p>
                <p>
                  Do orçamento à instalação, nossa equipe acompanha você em todo o
                  processo. Sem intermediários, com projeto dimensionado e suporte
                  depois que o sistema entra em operação.
                </p>
              </div>
            </ScrollReveal>

            <ul className="about-highlights mt-6 grid gap-3 sm:grid-cols-2">
              {highlights.map((item, index) => (
                <ScrollReveal
                  key={item}
                  as="li"
                  variant="fade-up"
                  delay={100 + index * 60}
                  className="flex items-start gap-2.5 rounded-xl border border-primary-200/60 bg-white/80 px-3 py-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                  <span className="text-sm leading-snug text-slate-700">{item}</span>
                </ScrollReveal>
              ))}
            </ul>

            <ScrollReveal variant="fade-up" delay={280}>
              <div className="mt-7">
                <Button href="#contato" variant="primary" size="md">
                  Avaliar meu projeto
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
