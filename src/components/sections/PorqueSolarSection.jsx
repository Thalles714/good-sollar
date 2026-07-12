import { ArrowRight, Sun } from 'lucide-react'
import Container from '../ui/Container'
import ScrollReveal from '../ui/ScrollReveal'
import useScrollReveal from '../../hooks/useScrollReveal'
import { WHATSAPP_URL } from '../../data/contact'

const reasons = [
  {
    number: '01',
    title: 'Conta de energia menor',
    description:
      'Produza parte da eletricidade que consome e pague menos à concessionária, mês após mês.',
  },
  {
    number: '02',
    title: 'Gastos mais previsíveis',
    description:
      'Com geração própria, fica mais fácil planejar despesas e se proteger de reajustes frequentes na tarifa.',
  },
  {
    number: '03',
    title: 'Valorização do imóvel ou negócio',
    description:
      'Propriedades com sistema solar instalado tendem a ser mais atrativas na venda ou locação.',
  },
  {
    number: '04',
    title: 'Energia limpa gerada no local',
    description:
      'Geração distribuída onde você consome, com menos dependência da rede e menor impacto ambiental.',
  },
  {
    number: '05',
    title: 'Solução para residências, empresas e campo',
    description:
      'Projeto dimensionado para residências, comércios e propriedades rurais em todo o Brasil.',
  },
]

const comparison = {
  traditional: {
    label: 'Consumo tradicional',
    items: ['Tarifa variável todo mês', 'Dependência total da rede', 'Gasto sem retorno direto'],
  },
  solar: {
    label: 'Geração solar',
    microcopy: 'Parte da energia passa a ser produzida no próprio imóvel.',
    items: ['Energia produzida no telhado', 'Redução recorrente na fatura', 'Investimento com potencial de retorno'],
  },
}

function BenefitRow({ reason, isLast }) {
  const { ref, visible } = useScrollReveal({
    threshold: 0.35,
    rootMargin: '0px 0px -4% 0px',
  })

  return (
    <li
      ref={ref}
      className={`ps-benefit ${visible ? 'is-visible' : ''} ${isLast ? 'ps-benefit--last' : ''}`}
    >
      <span className="ps-benefit-number" aria-hidden="true">
        {reason.number}
      </span>
      <div className="ps-benefit-body">
        <h3 className="text-base font-semibold text-primary-900 sm:text-lg">{reason.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
          {reason.description}
        </p>
      </div>
    </li>
  )
}

export default function PorqueSolarSection() {
  const { ref: compareRef, visible: compareVisible } = useScrollReveal({ threshold: 0.2 })

  return (
    <section
      id="porque-solar"
      aria-labelledby="porque-solar-heading"
      className="porque-solar scroll-mt-header"
    >
      <Container className="porque-solar-container py-14 sm:py-16 lg:py-20">
        <div className="porque-solar-panel">
          <header className="porque-solar-intro">
            <ScrollReveal variant="fade-up">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">
                Por que solar
              </p>
              <h2
                id="porque-solar-heading"
                className="mt-3 max-w-3xl text-[1.75rem] font-bold leading-[1.12] tracking-tight text-primary-900 sm:text-4xl lg:text-[2.5rem]"
              >
                Menos dependência da rede, mais controle sobre o consumo
              </h2>
              <p className="prose-width mt-4 text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg">
                Depender só da concessionária significa tarifa que muda e conta difícil de prever.
                Com energia solar, você produz no telhado, paga menos e ganha mais controle,
                seja em residência, comércio ou propriedade rural, em qualquer região do Brasil.
              </p>
            </ScrollReveal>
          </header>

          <div
            ref={compareRef}
            className={`ps-compare ${compareVisible ? 'is-visible' : ''}`}
            aria-label="Comparação entre consumo tradicional e geração solar"
          >
            <div className="ps-compare-col ps-compare-col--before">
              <p className="ps-compare-label">{comparison.traditional.label}</p>
              <ul className="ps-compare-list ps-compare-list--muted">
                {comparison.traditional.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="ps-compare-divider" aria-hidden="true">
              <span className="ps-compare-transition">
                <span className="ps-compare-transition-line" />
                <ArrowRight className="ps-compare-transition-arrow h-4 w-4" />
              </span>
            </div>

            <div className="ps-compare-col ps-compare-col--after">
              <div className="ps-compare-col-header">
                <span className="ps-compare-badge">Benefício</span>
                <div className="ps-compare-title-row">
                  <p className="ps-compare-label">{comparison.solar.label}</p>
                  <Sun className="ps-compare-sun-icon h-4 w-4" aria-hidden="true" />
                </div>
                <p className="ps-compare-microcopy">{comparison.solar.microcopy}</p>
              </div>
              <ul className="ps-compare-list ps-compare-list--solar">
                {comparison.solar.items.map((item, index) => (
                  <li key={item} style={{ '--item-index': index }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ps-benefits">
            <p className="ps-benefits-label">Cinco motivos para investir</p>
            <ol className="ps-benefits-list" aria-label="Motivos para investir em energia solar">
              {reasons.map((reason, index) => (
                <BenefitRow
                  key={reason.number}
                  reason={reason}
                  isLast={index === reasons.length - 1}
                />
              ))}
            </ol>
          </div>

          <div className="ps-cta">
            <p className="ps-cta-text">
              Quer saber qual sistema combina com a sua conta de luz? Fale com a nossa equipe pelo WhatsApp.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ps-cta-button inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            >
              Falar com especialista
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
