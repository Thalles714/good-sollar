import { MapPin, Phone, Clock } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Card from '../ui/Card'
import Button from '../ui/Button'
import ImagePlaceholder from '../ui/ImagePlaceholder'
import {
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
  ADDRESS,
  HOURS,
} from '../../data/contact'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Endereço',
    content: ADDRESS,
  },
  {
    icon: Phone,
    title: 'WhatsApp',
    content: WHATSAPP_DISPLAY,
    href: WHATSAPP_URL,
  },
  {
    icon: Clock,
    title: 'Horário de atendimento',
    content: HOURS,
  },
]

export default function ContactSection() {
  return (
    <section id="contato" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Contato"
          title="Solicite seu orçamento gratuito"
          subtitle="Estamos disponíveis 24 horas por dia para apresentar a melhor solução em energia solar para você."
        />

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="space-y-4 lg:col-span-2">
            {contactInfo.map((item) => (
              <Card key={item.title} className="flex gap-4 !p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-400/15 text-accent-600">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block whitespace-pre-line text-sm text-slate-600 hover:text-primary-600"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="mt-1 whitespace-pre-line text-sm text-slate-600">
                      {item.content}
                    </p>
                  )}
                </div>
              </Card>
            ))}

            <ImagePlaceholder
              label={`Mapa — ${ADDRESS}`}
              aspectRatio="aspect-video"
              icon={MapPin}
              className="mt-2"
            />
          </div>

          <Card className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-slate-900">
              Envie uma mensagem
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Formulário demonstrativo — em breve estará funcional.
            </p>

            <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Nome completo
                  </label>
                  <input
                    id="nome"
                    type="text"
                    placeholder="Seu nome"
                    disabled
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label htmlFor="telefone" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    placeholder={WHATSAPP_DISPLAY}
                    disabled
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="servico" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Tipo de projeto
                </label>
                <select
                  id="servico"
                  disabled
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione o tipo de projeto
                  </option>
                  <option>Energia Solar Residencial</option>
                  <option>Energia Solar para Fazendas</option>
                  <option>Energia Solar para Escritórios</option>
                  <option>Outros Projetos</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensagem" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  rows={4}
                  placeholder="Conte-nos sobre seu projeto ou consumo de energia..."
                  disabled
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400 placeholder:text-slate-400"
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button variant="primary" size="md" disabled className="opacity-60">
                  Enviar mensagem
                </Button>
                <span className="text-xs text-slate-400">* Formulário não funcional nesta versão</span>
              </div>
            </form>

            <div className="mt-8 rounded-xl bg-accent-400/10 p-5 text-center sm:text-left">
              <p className="text-sm font-medium text-primary-800">
                Prefere falar agora?
              </p>
              <p className="mt-1 text-sm text-primary-700/80">
                Chame no WhatsApp {WHATSAPP_DISPLAY} — atendimento 24h, todos os dias.
              </p>
              <Button
                href={WHATSAPP_URL}
                variant="whatsapp"
                size="md"
                className="mt-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chamar no WhatsApp
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  )
}
