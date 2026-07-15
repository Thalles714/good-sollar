import { ClipboardList, Wrench, Zap } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import useScrollReveal from '../../hooks/useScrollReveal'

const steps = [
  {
    step: '01',
    icon: ClipboardList,
    title: 'Análise e proposta',
    description:
      'Você envia a conta de energia e fotos do local. Analisamos o consumo e apresentamos uma proposta clara e alinhada ao projeto.',
  },
  {
    step: '02',
    icon: Wrench,
    title: 'Projeto e instalação',
    description:
      'A Good Sollar dimensiona o sistema, cuida da documentação e executa a instalação completa.',
  },
  {
    step: '03',
    icon: Zap,
    title: 'Ativação e economia',
    description:
      'Após os testes e a aprovação da concessionária, o sistema começa a gerar energia e você passa a acompanhar os resultados.',
  },
]

function ProcessTimeline() {
  const { ref, visible } = useScrollReveal({ threshold: 0.25 })

  return (
    <div ref={ref} className="process-timeline" aria-hidden="true">
      <div className={`process-line-fill h-full w-full ${visible ? 'is-visible' : ''}`} />
    </div>
  )
}

export default function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-heading"
      className="section-glow section-spacing section-surface-white"
    >
      <Container>
        <ScrollReveal variant="fade-up">
          <SectionHeading
            titleId="como-funciona-heading"
            badge="Passo a passo"
            title="Da análise à economia em 3 etapas"
            subtitle="Você envia as informações. A Good Sollar cuida do projeto, da instalação e da ativação."
          />
        </ScrollReveal>

        <div className="process-track relative">
          <ProcessTimeline />

          <div className="grid gap-4 md:grid-cols-3 lg:gap-4">
            {steps.map((item, index) => (
              <ScrollReveal
                key={item.step}
                as="article"
                variant="fade-up"
                delay={index * 100}
                className="process-step feature-card text-center lg:text-left"
              >
                <div className="process-step-dot mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary-700 text-white transition-colors duration-500 lg:mx-0">
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="mt-3 inline-block text-[0.6875rem] font-bold uppercase tracking-wider text-accent-600">
                  Etapa {item.step}
                </span>
                <h3 className="mt-1 text-[0.9375rem] font-semibold text-primary-900 sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
