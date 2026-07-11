import {
  House,
  Tractor,
  Building2,
  BatteryCharging,
} from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import ScrollReveal from '../ui/ScrollReveal'
import ImageSlot from '../ui/ImageSlot'
import { WHATSAPP_URL } from '../../data/contact'
import { images } from '../../data/images'

const services = [
  {
    icon: House,
    title: 'Residencial',
    description:
      'Para famílias que querem reduzir a conta de luz e ganhar mais previsibilidade. O sistema é dimensionado pelo consumo da casa e pelo espaço disponível no telhado.',
    image: images.services.residencial,
    imagePlaceholder: '03-residencial.png',
    popular: true,
  },
  {
    icon: Building2,
    title: 'Empresarial',
    description:
      'Para escritórios, lojas, clínicas e galpões com custo fixo de energia relevante. Quanto maior o consumo, mais sentido faz analisar a geração própria.',
    image: images.services.empresarial,
    imagePlaceholder: '03-empresarial.png',
  },
  {
    icon: Tractor,
    title: 'Rural / Agronegócio',
    description:
      'Para irrigação, ordenha, armazenagem e maquinário no campo. A solução precisa acompanhar a rotina da propriedade e os pontos de maior demanda.',
    image: images.services.rural,
    imagePlaceholder: '03-rural.png',
  },
  {
    icon: BatteryCharging,
    title: 'Sistemas isolados da rede',
    description:
      'Para chácaras, sítios e propriedades longe da concessionária. Você gera e armazena energia no local, com projeto pensado para a autonomia necessária.',
    image: images.services.offgrid,
    imagePlaceholder: '03-offgrid.png',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-heading"
      className="section-glow section-spacing section-surface-slate"
    >
      <Container>
        <ScrollReveal variant="fade-up">
          <SectionHeading
            titleId="servicos-heading"
            badge="Tipos de projeto"
            title="Solução certa para cada tipo de consumo"
            subtitle="Cada projeto é dimensionado de acordo com o seu consumo e o espaço disponível. Você recebe uma proposta clara, com orientação sobre o que faz sentido para o seu caso."
          />
        </ScrollReveal>

        <div className="space-y-10 lg:space-y-12">
          {services.map((service, index) => {
            const imageFirst = index % 2 === 1
            const textVariant = imageFirst ? 'fade-right' : 'fade-left'
            const imageVariant = imageFirst ? 'fade-left' : 'fade-right'

            return (
              <article
                key={service.title}
                className={`service-block split-layout ${index > 0 ? 'pt-10 lg:pt-0' : ''}`}
              >
                <ScrollReveal
                  variant={textVariant}
                  delay={index * 60}
                  className={imageFirst ? 'lg:order-2' : 'lg:order-1'}
                >
                  <div className="max-w-lg">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-800 text-white shadow-md shadow-primary-800/20">
                      <service.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-primary-900 sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="prose-width mt-2 text-[0.9375rem] leading-relaxed text-slate-600 sm:text-base">
                      {service.description}
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal
                  variant={imageVariant}
                  delay={index * 60 + 80}
                  className={`service-image-reveal relative ${imageFirst ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  {service.popular && (
                    <span className="badge-popular">Mais pedido</span>
                  )}
                  <ImageSlot
                    src={service.image}
                    alt={`Energia solar ${service.title}, Good Sollar`}
                    placeholder={`${service.imagePlaceholder}, serviço ${service.title}`}
                    aspectRatio="aspect-[4/3]"
                  />
                </ScrollReveal>
              </article>
            )
          })}
        </div>

        <ScrollReveal variant="scale-in" delay={100}>
          <div className="mt-9 rounded-2xl border border-slate-200/80 bg-white px-6 py-8 text-center shadow-sm">
            <p className="mb-4 text-sm text-slate-600">
              Não sabe qual tipo se encaixa no seu caso? A gente orienta antes de qualquer proposta.
            </p>
            <Button
              href={WHATSAPP_URL}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com especialista
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
