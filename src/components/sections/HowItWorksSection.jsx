import { ClipboardList, PenTool, Wrench, Zap } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

const steps = [
  {
    step: '01',
    icon: ClipboardList,
    title: 'Orçamento gratuito',
    description:
      'Você informa o consumo e envia fotos do telhado ou área. Montamos a proposta sem custo e sem compromisso.',
  },
  {
    step: '02',
    icon: PenTool,
    title: 'Projeto personalizado',
    description:
      'Calculamos quantos painéis você precisa para gerar a economia certa — nem a mais, nem a menos.',
  },
  {
    step: '03',
    icon: Wrench,
    title: 'Instalação completa',
    description:
      'Nossa equipe instala, testa e deixa tudo funcionando. Você acompanha cada etapa.',
  },
  {
    step: '04',
    icon: Zap,
    title: 'Homologação e economia',
    description:
      'Cuidamos da documentação com a concessionária. Aprovado, você já começa a ver diferença na fatura.',
  },
]

export default function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-heading"
      className="section-glow section-spacing section-surface-white"
    >
      <Container>
        <SectionHeading
          titleId="como-funciona-heading"
          badge="Passo a passo"
          title="Do primeiro contato à conta de luz menor"
          subtitle="Quatro etapas claras. Você sabe o que vai acontecer antes de assinar qualquer coisa."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
          {steps.map((item) => (
            <article key={item.step} className="feature-card text-center lg:text-left">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary-700 text-white shadow-md shadow-primary-700/15 lg:mx-0">
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
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
