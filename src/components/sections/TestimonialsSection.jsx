import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import TestimonialCarousel from '../ui/TestimonialCarousel'
import { applicationProfiles } from '../../data/testimonials'

export default function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-heading"
      className="section-glow section-spacing section-surface-slate"
    >
      <Container>
        <ScrollReveal variant="fade-up">
          <SectionHeading
            titleId="depoimentos-heading"
            badge="Energia solar na prática"
            title="Soluções para diferentes formas de consumir energia"
            subtitle="De residências a propriedades rurais, em todo o Brasil. Cada projeto pede análise, dimensionamento e uma solução feita para a rotina de quem usa a energia."
          />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={80}>
          <TestimonialCarousel items={applicationProfiles} />
        </ScrollReveal>
      </Container>
    </section>
  )
}
