import { Star, Quote } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Card from '../ui/Card'

const testimonials = [
  {
    name: 'Ana Paula Ribeiro',
    role: 'Residencial — Taguatinga, DF',
    text: 'Instalei o sistema on-grid na minha casa e a conta de luz caiu drasticamente. A Good Sollar ofereceu um ótimo custo e o atendimento foi impecável do início ao fim.',
    rating: 5,
    initials: 'AP',
    avatarColor: 'from-rose-400 to-pink-500',
  },
  {
    name: 'Marcos Vieira',
    role: 'Fazenda — Planaltina, DF',
    text: 'Precisávamos de energia off-grid na propriedade e a equipe dimensionou tudo perfeitamente. Investimento acessível e resultado excelente no dia a dia da fazenda.',
    rating: 5,
    initials: 'MV',
    avatarColor: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'Juliana Costa',
    role: 'Escritório — Asa Sul, Brasília',
    text: 'Nosso escritório reduziu os custos fixos com a instalação dos painéis. Projeto rápido, equipe pontual e suporte disponível a qualquer hora pelo WhatsApp.',
    rating: 5,
    initials: 'JC',
    avatarColor: 'from-blue-400 to-indigo-500',
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

function Avatar({ initials, color }) {
  return (
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${color} text-sm font-bold text-white shadow-md`}
      aria-hidden="true"
    >
      {initials}
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
            <Card key={testimonial.name} hover className="flex flex-col">
              <Quote className="h-8 w-8 text-accent-400/40" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="mt-6 border-t border-slate-100 pt-4">
                <StarRating count={testimonial.rating} />
                <div className="mt-3 flex items-center gap-3">
                  <Avatar
                    initials={testimonial.initials}
                    color={testimonial.avatarColor}
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
