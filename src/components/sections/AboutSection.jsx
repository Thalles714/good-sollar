import { Award, Sun, CheckCircle2 } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import ImagePlaceholder from '../ui/ImagePlaceholder'
import Button from '../ui/Button'

const highlights = [
  'Sistemas on-grid e off-grid para cada necessidade',
  'Baixo custo de aquisição e excelente custo-benefício',
  'Mais de 500 projetos instalados em 6 anos de mercado',
  'Atendimento 24 horas por dia, todos os dias',
]

export default function AboutSection() {
  return (
    <section id="sobre" className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <ImagePlaceholder
              label="Equipe técnica Good Sollar — Brasília/DF"
              aspectRatio="aspect-[4/5]"
              icon={Sun}
              className="shadow-xl shadow-slate-200/50"
            />
            <div className="absolute -right-4 top-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg sm:-right-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-400/15 text-accent-600">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">6 anos</p>
                  <p className="text-xs text-slate-500">de experiência no mercado</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              badge="Sobre a empresa"
              title="Good Sollar"
              subtitle="Especialistas em energia solar fotovoltaica em Brasília/DF, com sistemas on-grid e off-grid e baixo custo de aquisição."
              align="left"
              className="mb-8 lg:mb-10"
            />

            <div className="space-y-4 leading-relaxed text-slate-600">
              <p>
                A Good Sollar é uma empresa brasiliense com 6 anos de atuação no
                mercado de energia solar. Já realizamos mais de 500 projetos para
                residências, fazendas, escritórios e outros segmentos, sempre com foco
                em economia real e qualidade de instalação.
              </p>
              <p>
                Trabalhamos com sistemas on-grid e off-grid, oferecendo soluções com
                baixo custo de aquisição e acompanhamento completo — do orçamento
                gratuito à entrega do sistema. Nosso atendimento funciona 24 horas
                por dia, todos os dias.
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href="#contato" variant="primary" size="md">
                Solicitar orçamento gratuito
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
