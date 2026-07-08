import { Star, Quote } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import ImageSlot from '../ui/ImageSlot'
import { images } from '../../data/images'

const testimonials = [
  {
    name: 'Carlos M.',
    role: 'Residencial — Taguatinga',
    text: 'A conta era R$ 680. Hoje pago menos de R$ 80 de taxa mínima. Em 3 anos já recupero o investimento.',
    rating: 5,
    image: images.testimonials.carlos,
    imagePlaceholder: '05-depoimento-1.png — Carlos M.',
  },
  {
    name: 'Juliana R.',
    role: 'Comércio — Asa Norte',
    text: 'Instalaram em 2 dias e cuidaram de toda a papelada. Minha loja gasta muito com ar-condicionado — a diferença na fatura já apareceu.',
    rating: 5,
    image: images.testimonials.juliana,
    imagePlaceholder: '05-depoimento-2.png — Juliana R.',
  },
  {
    name: 'Marcos e Ana',
    role: 'Fazenda — Entorno do DF',
    text: 'Precisávamos de energia confiável para o poço e o galpão. O sistema aguenta o uso pesado do dia a dia no campo.',
    rating: 5,
    image: images.testimonials.marcos,
    imagePlaceholder: '05-depoimento-3.png — Marcos e Ana',
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} de 5 estrelas`}>
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-heading"
      className="section-glow section-spacing section-surface-slate"
    >
      <Container>
        <SectionHeading
          titleId="depoimentos-heading"
          badge="Clientes reais"
          title="Quem instalou, recomenda"
          subtitle="Histórias de quem já sente a economia na prática — em casa, no comércio e no campo."
        />

        <div className="space-y-8 lg:space-y-10">
          {testimonials.map((testimonial, index) => {
            const imageFirst = index % 2 === 1

            return (
              <article key={testimonial.name} className="split-layout">
                <div
                  className={`feature-card justify-center !p-6 ${imageFirst ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <Quote className="h-6 w-6 text-accent-400/60" aria-hidden="true" />
                  <blockquote className="prose-width mt-3 text-[0.9375rem] leading-relaxed text-slate-700 sm:text-base">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <StarRating count={testimonial.rating} />
                    <p className="mt-2 font-semibold text-primary-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>

                <ImageSlot
                  src={testimonial.image}
                  alt={`Depoimento de ${testimonial.name}`}
                  placeholder={testimonial.imagePlaceholder}
                  aspectRatio="aspect-[4/3]"
                  className={imageFirst ? 'lg:order-1' : 'lg:order-2'}
                />
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
