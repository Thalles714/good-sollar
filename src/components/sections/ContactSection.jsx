import { useState } from 'react'
import { ArrowRight, MapPin, Phone, Clock, Share2 } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Card from '../ui/Card'
import Button from '../ui/Button'
import ScrollReveal from '../ui/ScrollReveal'
import ImageSlot from '../ui/ImageSlot'
import useScrollReveal from '../../hooks/useScrollReveal'
import {
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
  ADDRESS,
  SERVICE_AREA,
  HOURS,
  CNPJ,
  INSTAGRAM_URL,
  BRAZILIAN_STATES,
  buildWhatsAppUrl,
} from '../../data/contact'
import { images } from '../../data/images'

const projectTypes = [
  'Residencial',
  'Rural / Agronegócio',
  'Empresarial',
  'Sistema isolado da rede',
]

const contactDetails = [
  { icon: MapPin, title: 'Sede', content: ADDRESS, detail: SERVICE_AREA },
  { icon: Phone, title: 'WhatsApp', content: WHATSAPP_DISPLAY, href: WHATSAPP_URL },
  { icon: Clock, title: 'Atendimento', content: HOURS },
  { icon: Share2, title: 'Instagram', content: '@goodsollar', href: INSTAGRAM_URL },
]

export default function ContactSection() {
  const [nome, setNome] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [servico, setServico] = useState('')
  const { ref: warmthRef, visible: warmthVisible } = useScrollReveal({ threshold: 0.2 })

  function handleSubmit(e) {
    e.preventDefault()

    const message = [
      'Olá! Gostaria de solicitar um orçamento gratuito de energia solar.',
      '',
      `Nome: ${nome.trim()}`,
      `Cidade: ${cidade.trim()}`,
      `Estado: ${estado}`,
      `Tipo de projeto: ${servico}`,
    ].join('\n')

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  const isValid = nome.trim() && cidade.trim() && estado && servico

  return (
    <section
      id="contato"
      aria-labelledby="contato-heading"
      className="section-glow section-spacing section-surface-warm"
    >
      <Container>
        <div
          ref={warmthRef}
          className={`contact-warmth ${warmthVisible ? 'is-visible' : ''}`}
        >
          <ScrollReveal variant="fade-up">
            <SectionHeading
              titleId="contato-heading"
              badge="Fale conosco"
              title="Vamos entender o seu projeto"
              subtitle="Informe seu nome, cidade e tipo de projeto. Abrimos o WhatsApp com sua mensagem pronta para atendimento em todo o Brasil."
            />
          </ScrollReveal>

          <ScrollReveal variant="scale-in" delay={100}>
            <div className="mx-auto max-w-md">
              <Card className="!shadow-[0_8px_32px_rgba(13,27,51,0.08)]">
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label htmlFor="nome" className="mb-1 block text-sm font-medium text-slate-700">
                      Seu nome
                    </label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Ex.: Maria Silva"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cidade" className="mb-1 block text-sm font-medium text-slate-700">
                        Cidade
                      </label>
                      <input
                        id="cidade"
                        name="cidade"
                        type="text"
                        required
                        autoComplete="address-level2"
                        placeholder="Ex.: Brasília"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="estado" className="mb-1 block text-sm font-medium text-slate-700">
                        Estado
                      </label>
                      <select
                        id="estado"
                        name="estado"
                        required
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                      >
                        <option value="" disabled>
                          UF
                        </option>
                        {BRAZILIAN_STATES.map((uf) => (
                          <option key={uf} value={uf}>
                            {uf}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="servico" className="mb-1 block text-sm font-medium text-slate-700">
                      Tipo de projeto
                    </label>
                    <select
                      id="servico"
                      name="servico"
                      required
                      value={servico}
                      onChange={(e) => setServico(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                    >
                      <option value="" disabled>
                        Selecione uma opção
                      </option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={!isValid}
                    className="w-full disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Enviar e abrir WhatsApp
                    <ArrowRight className="h-5 w-5" />
                  </Button>

                  <p className="text-center text-xs text-slate-500">
                    Orçamento gratuito · Atendimento direto pelo WhatsApp
                  </p>
                </form>
              </Card>
            </div>
          </ScrollReveal>
        </div>

        <div className="split-layout mt-9">
          <ScrollReveal variant="fade-left" className="order-2 lg:order-1">
            <div className="feature-card !p-6">
              <h3 className="text-lg font-semibold text-primary-900">Prefere falar direto?</h3>
              <p className="prose-width mt-1 text-sm text-slate-600">
                Sede em Brasília, DF. Atendemos clientes em todo o Brasil.
              </p>

              <ul className="mt-5 space-y-3">
                {contactDetails.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <div className="feature-card-icon !h-10 !w-10">
                      <item.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary-900">{item.title}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 block text-sm text-slate-600 transition-colors hover:text-primary-600"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <div>
                          <p className="mt-0.5 text-sm text-slate-600">{item.content}</p>
                          {item.detail ? (
                            <p className="mt-0.5 text-sm text-slate-500">{item.detail}</p>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-xs text-slate-400">CNPJ: {CNPJ}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-right" delay={120} className="order-1 lg:order-2">
            <ImageSlot
              src={images.contact}
              alt="Atendimento Good Sollar"
              placeholder="Atendimento especializado Good Sollar"
              aspectRatio="aspect-[3/2]"
            />
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
