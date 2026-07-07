import { ClipboardList, PenTool, Wrench, Zap } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

const steps = [
  {
    step: '01',
    icon: ClipboardList,
    title: 'Análise e orçamento gratuito',
    description:
      'Entendemos seu consumo de energia, avaliamos o espaço disponível e apresentamos uma proposta personalizada sem compromisso.',
  },
  {
    step: '02',
    icon: PenTool,
    title: 'Projeto sob medida',
    description:
      'Desenvolvemos o dimensionamento ideal do sistema fotovoltaico para maximizar sua economia e garantir a melhor performance.',
  },
  {
    step: '03',
    icon: Wrench,
    title: 'Instalação profissional',
    description:
      'Nossa equipe técnica certificada realiza a instalação com segurança, agilidade e os melhores equipamentos do mercado.',
  },
  {
    step: '04',
    icon: Zap,
    title: 'Homologação e economia',
    description:
      'Cuidamos de toda a documentação junto à concessionária. Após a homologação, você começa a economizar na conta de luz.',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-slate-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Como funciona"
          title="Do orçamento à economia em 4 passos"
          subtitle="Um processo simples, transparente e acompanhado de perto pela nossa equipe em cada etapa da sua transição para a energia solar."
        />

        <div className="relative mt-4 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute top-16 hidden h-0.5 w-full bg-gradient-to-r from-transparent via-primary-200 to-transparent lg:block" />

          {steps.map((item) => (
            <div key={item.step} className="relative text-center lg:text-left">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/20 lg:mx-0">
                <item.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-accent-500">
                Passo {item.step}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
