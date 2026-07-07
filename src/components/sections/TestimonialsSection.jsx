import { Star, Quote } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Card from '../ui/Card'
import BrandImage from '../ui/BrandImage'
import { images } from '../../data/images'

const testimonials = [
  {
    name: 'Carlos M.',
    role: 'Cliente Residencial',
    text: 'Minha conta de luz caiu mais de 90%. Melhor investimento que já fiz!',
    rating: 5,
    image: images.testimonials.carlos,
  },
  {
    name: 'Juliana R.',
    role: 'Cliente Empresarial',
    text: 'Atendimento excelente e instalação super rápida. Recomendo!',
    rating: 5,
    image: images.testimonials.juliana,
  },
  {
    name: 'Marcos e Ana',
    role: 'Produtores Rurais',
    text: 'Energia que não pode faltar na fazenda. Sistema robusto e confiável.',
    rating: 5,
    image: images.testimonials.marcos,
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="bg-slate-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Depoimentos"
          title="O que nossos clientes dizem"
          subtitle="A satisfação de quem já economiza com energia solar é a nossa maior recompensa."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} hover className="flex flex-col overflow-hidden !p-0">
              <BrandImage
                src={testimonial.image}
                alt={`Depoimento de ${testimonial.name}`}
                aspectRatio="aspect-[4/3]"
                className="rounded-b-none rounded-t-2xl"
              />
              <div className="flex flex-1 flex-col p-6">
                <Quote className="h-8 w-8 text-accent-400/40" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <StarRating count={testimonial.rating} />
                  <p className="mt-3 font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
