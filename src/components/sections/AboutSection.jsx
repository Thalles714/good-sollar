import { Award, CheckCircle2 } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import ImageSlot from '../ui/ImageSlot'
import Button from '../ui/Button'
import { images } from '../../data/images'

const highlights = [
  'On-grid e off-grid — indicamos o melhor para o seu caso',
  'Financiamento e condições que cabem no seu orçamento',
  'Mais de 500 instalações concluídas desde 2020',
  'WhatsApp aberto 24h, todos os dias',
]

export default function AboutSection() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="section-spacing section-surface-white"
    >
      <Container>
        <div className="split-layout">
          <div className="order-2 lg:order-1">
            <SectionHeading
              titleId="sobre-heading"
              badge="Quem somos"
              title="De Brasília para todo o Brasil"
              subtitle="Empresa registrada no DF, com instalações em residências, comércios e fazendas por todo o país. Conhecemos as regras de cada concessionária regional."
              align="left"
              className="mb-5 max-w-none"
            />

            <div className="feature-card mb-5 inline-flex w-full max-w-xs flex-row items-center gap-3 !p-4 sm:w-auto">
              <div className="feature-card-icon !h-10 !w-10 rounded-full">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary-900">+500 projetos</p>
                <p className="text-xs text-slate-500">residenciais, comerciais e rurais</p>
              </div>
            </div>

            <div className="prose-width space-y-3 text-[0.9375rem] leading-relaxed text-slate-600 sm:text-base">
              <p>
                A Good Sollar nasceu em Brasília e hoje atende clientes em todo o
                Brasil — donos de casa, empresários, produtores rurais e quem
                precisa de energia onde a rede não chega.
              </p>
              <p>
                Do orçamento à instalação, nossa equipe acompanha você em todo o
                processo. Sem intermediários — só um sistema que funciona e economia
                que aparece na fatura.
              </p>
            </div>

            <ul className="mt-5 space-y-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Button href="#contato" variant="primary" size="md">
                Pedir orçamento agora
              </Button>
            </div>
          </div>

          <ImageSlot
            src={images.about}
            alt="Equipe Good Sollar instalando painéis solares"
            placeholder="02-sobre.png — equipe técnica em instalação"
            aspectRatio="aspect-[4/5] lg:aspect-[3/4]"
            className="order-1 lg:order-2"
          />
        </div>
      </Container>
    </section>
  )
}
