import { ArrowRight, BatteryCharging, Building2, House, Tractor } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import ImageSlot from '../ui/ImageSlot'
import { WHATSAPP_URL } from '../../data/contact'
import { images } from '../../data/images'

const services = [
  {
    id: 'residencial',
    number: '01',
    icon: House,
    title: 'Residencial',
    audience: 'Para sua casa',
    description:
      'Reduza a conta de luz e tenha mais previsibilidade no orçamento da família.',
    tags: ['On-grid', 'Telhado', 'Consumo residencial'],
    image: images.services.residencial,
    alt: 'Casa com painéis solares instalados em telhado de cerâmica',
    position: 'center 45%',
    popular: true,
    featured: true,
  },
  {
    id: 'empresarial',
    number: '02',
    icon: Building2,
    title: 'Empresarial',
    audience: 'Para sua empresa',
    description:
      'Reduza um custo recorrente e planeje melhor os gastos de energia da operação.',
    tags: ['On-grid', 'Comércio e indústria'],
    image: images.services.empresarial,
    alt: 'Empresa com painéis solares instalados no telhado de um galpão comercial',
    position: 'center 48%',
  },
  {
    id: 'rural',
    number: '03',
    icon: Tractor,
    title: 'Rural',
    audience: 'Para sua propriedade rural',
    description:
      'Tenha energia para irrigação, equipamentos, galpões e outras atividades do campo.',
    tags: ['Solo ou telhado', 'Atividade produtiva'],
    image: images.services.rural,
    alt: 'Painéis solares no solo ao lado de reservatório e estrutura de propriedade rural',
    position: 'center 55%',
  },
  {
    id: 'offgrid',
    number: '04',
    icon: BatteryCharging,
    title: 'Sistemas isolados',
    audience: 'Para quem precisa de autonomia',
    description:
      'Gere e armazene energia onde a rede elétrica não chega ou não atende bem.',
    tags: ['Off-grid', 'Baterias', 'Autonomia'],
    image: images.services.offgrid,
    alt: 'Sistema off-grid com painéis solares, inversores e banco de baterias',
    position: 'center 50%',
    band: true,
  },
]

function ServiceTags({ tags }) {
  return (
    <ul className="service-card-tags" aria-label="Características do projeto">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  )
}

function ServiceCard({ service }) {
  const Icon = service.icon

  return (
    <article
      className={[
        'service-card',
        service.featured ? 'service-card--featured' : '',
        service.band ? 'service-card--band' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="service-card-media">
        <ImageSlot
          src={service.image}
          alt={service.alt}
          placeholder={`Projeto de energia solar ${service.title.toLowerCase()}`}
          aspectRatio="service-card-frame"
          objectPosition={service.position}
          framed={false}
          className="service-card-image"
        />
        {service.popular && <span className="service-card-badge">Mais pedido</span>}
      </div>

      <div className="service-card-body">
        <div className="service-card-topline">
          <span className="service-card-number" aria-hidden="true">
            {service.number}
          </span>
          <span className="service-card-audience">{service.audience}</span>
        </div>

        <div className="service-card-heading">
          <span className="service-card-icon" aria-hidden="true">
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <h3 className="service-card-title">{service.title}</h3>
        </div>

        <p className="service-card-copy">{service.description}</p>
        <ServiceTags tags={service.tags} />
      </div>
    </article>
  )
}

export default function ServicesSection() {
  const featured = services.find((service) => service.featured)
  const secondary = services.filter((service) => !service.featured && !service.band)
  const band = services.find((service) => service.band)

  return (
    <section
      id="servicos"
      aria-labelledby="servicos-heading"
      className="services-editorial section-glow section-spacing section-surface-slate"
    >
      <Container>
        <ScrollReveal variant="fade-up">
          <SectionHeading
            titleId="servicos-heading"
            badge="Tipos de projeto"
            title="Encontre o projeto certo para o seu consumo"
            subtitle="Para sua casa, empresa, propriedade rural ou um local sem rede elétrica: a Good Sollar dimensiona a solução para sua necessidade."
            align="left"
            className="services-editorial-heading !max-w-3xl"
          />
        </ScrollReveal>

        <div className="services-editorial-grid">
          <ScrollReveal variant="fade-up" className="services-editorial-featured">
            <ServiceCard service={featured} />
          </ScrollReveal>

          <div className="services-editorial-stack">
            {secondary.map((service, index) => (
              <ScrollReveal key={service.id} variant="fade-up" delay={(index + 1) * 80}>
                <ServiceCard service={service} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="fade-up" delay={180} className="services-editorial-band">
            <ServiceCard service={band} />
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fade-up" delay={120}>
          <div className="services-editorial-cta">
            <div>
              <p className="services-editorial-cta-label">Próximo passo</p>
              <p className="services-editorial-cta-text">
                Ainda em dúvida? Envie sua conta de luz e o espaço disponível.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="services-editorial-cta-button"
            >
              Quero avaliar meu projeto
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
