import {
  House,
  Tractor,
  Building2,
  BatteryCharging,
} from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import ImageSlot from '../ui/ImageSlot'
import { WHATSAPP_URL } from '../../data/contact'
import { images } from '../../data/images'

const services = [
  {
    icon: House,
    title: 'Residencial',
    description:
      'Painéis no telhado da sua casa, dimensionados pelo seu consumo. Ideal para famílias que querem cortar a conta de luz de uma vez.',
    image: images.services.residencial,
    imagePlaceholder: '03-residencial.png',
    popular: true,
  },
  {
    icon: Building2,
    title: 'Empresarial',
    description:
      'Reduza o custo fixo de energia do seu negócio — escritório, loja, clínica ou galpão. Quanto maior o consumo, maior a economia.',
    image: images.services.empresarial,
    imagePlaceholder: '03-empresarial.png',
  },
  {
    icon: Tractor,
    title: 'Rural / Agronegócio',
    description:
      'Energia estável para irrigação, ordenha, armazenagem e maquinário. Feito para quem não pode ficar sem luz no campo.',
    image: images.services.rural,
    imagePlaceholder: '03-rural.png',
  },
  {
    icon: BatteryCharging,
    title: 'Sistemas Off Grid',
    description:
      'Para chácaras, sítios e propriedades longe da rede. Você gera e armazena energia — sem depender da concessionária.',
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
        <SectionHeading
          titleId="servicos-heading"
          badge="Tipos de projeto"
          title="Casa, empresa ou fazenda: temos o sistema certo"
          subtitle="Cada projeto é dimensionado de acordo com o seu consumo e o espaço disponível. Você recebe uma proposta clara, sem letras miúdas."
        />

        <div className="space-y-10 lg:space-y-12">
          {services.map((service, index) => {
            const imageFirst = index % 2 === 1

            return (
              <article
                key={service.title}
                className={`service-block split-layout ${index > 0 ? 'pt-10 lg:pt-0' : ''}`}
              >
                <div className={imageFirst ? 'lg:order-2' : 'lg:order-1'}>
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
                </div>

                <div
                  className={`relative ${imageFirst ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  {service.popular && (
                    <span className="badge-popular">Mais pedido</span>
                  )}
                  <ImageSlot
                    src={service.image}
                    alt={`Energia solar ${service.title} — Good Sollar`}
                    placeholder={`${service.imagePlaceholder} — serviço ${service.title}`}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-9 rounded-2xl border border-slate-200/80 bg-white px-6 py-8 text-center shadow-sm">
          <p className="mb-4 text-sm text-slate-600">
            Não sabe qual tipo se encaixa no seu caso? A gente te orienta.
          </p>
          <Button
            href={WHATSAPP_URL}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar com especialista no WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  )
}
