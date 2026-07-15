import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import ScrollReveal from '../ui/ScrollReveal'
import useScrollReveal from '../../hooks/useScrollReveal'
import { WHATSAPP_URL } from '../../data/contact'

const reasons = [
  {
    number: '01',
    value: 'até 80%',
    title: 'Menos na conta',
    description:
      'Consumo, tarifa e dimensionamento definem a economia alcançada em cada projeto.',
    featured: true,
  },
  {
    number: '02',
    value: 'mês a mês',
    title: 'Mais previsibilidade',
    description:
      'Geração própria reduz a exposição aos reajustes e facilita o planejamento dos custos.',
  },
  {
    number: '03',
    value: '+ valor',
    title: 'Patrimônio mais atrativo',
    description:
      'Um sistema bem instalado agrega valor ao imóvel e fortalece a estrutura da operação.',
  },
  {
    number: '04',
    value: 'longo prazo',
    title: 'Retorno competitivo',
    description:
      'A economia acumulada favorece o retorno do investimento e mantém benefícios no longo prazo.',
  },
  {
    number: '05',
    value: 'sob medida',
    title: 'Projeto que faz sentido',
    description:
      'A Good Sollar analisa consumo, espaço e objetivo para evitar soluções sub ou superdimensionadas.',
  },
]

function ReasonCard({ reason, index }) {
  return (
    <li
      className={`ps-reason-card ${reason.featured ? 'ps-reason-card--featured' : ''}`}
      style={{ '--reason-index': index }}
    >
      <div className="ps-reason-topline">
        <span className="ps-reason-number" aria-hidden="true">
          {reason.number}
        </span>
        <span className="ps-reason-value">{reason.value}</span>
      </div>
      <div className="ps-reason-copy">
        <h3 className="ps-reason-title">{reason.title}</h3>
        <p className="ps-reason-description">{reason.description}</p>
      </div>
    </li>
  )
}

export default function PorqueSolarSection() {
  const { ref: reasonsRef, visible: reasonsVisible } = useScrollReveal({
    threshold: 0.12,
    rootMargin: '0px 0px -6% 0px',
  })

  return (
    <section
      id="porque-solar"
      aria-labelledby="porque-solar-heading"
      className="porque-solar scroll-mt-header"
    >
      <div className="ps-editorial-grid" aria-hidden="true" />
      <Container className="porque-solar-container relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="ps-editorial-shell">
          <header className="ps-editorial-header">
            <ScrollReveal variant="fade-up">
              <p className="ps-editorial-eyebrow">Por que solar</p>
              <h2
                id="porque-solar-heading"
                className="ps-editorial-title"
              >
                5 motivos para transformar consumo em investimento
              </h2>
              <p className="ps-editorial-lead">Economia agora. Mais controle no longo prazo.</p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={100}>
              <div className="ps-editorial-note">
                <span>Decisão orientada por dados</span>
                <p>Consumo, tarifa e espaço definem o projeto certo — não uma fórmula pronta.</p>
              </div>
            </ScrollReveal>
          </header>

          <ol
            ref={reasonsRef}
            className={`ps-reasons-grid ${reasonsVisible ? 'is-visible' : ''}`}
            aria-label="Cinco motivos para investir em energia solar"
          >
            {reasons.map((reason, index) => (
              <ReasonCard key={reason.number} reason={reason} index={index} />
            ))}
          </ol>

          <div className="ps-editorial-cta">
            <div>
              <span className="ps-editorial-cta-label">Próximo passo</span>
              <p>Descubra quanto a energia solar pode representar no seu caso.</p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ps-editorial-cta-button inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-primary-900 transition-colors hover:bg-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            >
              Analisar meu projeto
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
