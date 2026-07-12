import { ClipboardList, PenTool, Wrench, Zap } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import useScrollReveal from '../../hooks/useScrollReveal'

const steps = [
  {
    step: '01',
    icon: ClipboardList,
    title: 'Análise gratuita',
    description:
      'Você informa o consumo e manda fotos do telhado ou da área disponível. Montamos a proposta sem custo e sem compromisso.',
  },
  {
    step: '02',
    icon: PenTool,
    title: 'Projeto personalizado',
    description:
      'Calculamos quantos painéis fazem sentido para o seu perfil de uso, com dimensionamento alinhado ao consumo real.',
  },
  {
    step: '03',
    icon: Wrench,
    title: 'Instalação completa',
    description:
      'Nossa equipe instala, testa e deixa tudo funcionando. Você acompanha cada etapa com clareza sobre o que está sendo feito.',
  },
  {
    step: '04',
    icon: Zap,
    title: 'Homologação e acompanhamento',
    description:
      'Cuidamos da documentação com a concessionária. Após a aprovação, o sistema passa a gerar energia no seu imóvel.',
  },
]

function ProcessTimeline() {
  const { ref, visible } = useScrollReveal({ threshold: 0.25 })

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-6 top-[1.375rem] hidden h-0.5 overflow-hidden rounded-full bg-primary-200/80 lg:block"
      aria-hidden="true"
    >
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
            title="Um processo claro do primeiro contato à energia gerada"
            subtitle="Quatro etapas simples. Você sabe o que acontece em cada fase antes de fechar o projeto."
          />
        </ScrollReveal>

        <div className="process-track relative">
          <ProcessTimeline />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            {steps.map((item, index) => (
              <ScrollReveal
                key={item.step}
                as="article"
                variant="fade-up"
                delay={index * 100}
                className="process-step feature-card text-center lg:text-left"
              >
                <div className="process-step-dot mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary-700 text-white shadow-md shadow-primary-700/15 transition-colors duration-500 lg:mx-0">
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
