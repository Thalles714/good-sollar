import { useEffect, useId, useRef, useState } from 'react'
import {
  ArrowRight,
  Cable,
  Lightbulb,
  Network,
  ShieldCheck,
} from 'lucide-react'
import Container from '../ui/Container'
import { buildWhatsAppUrl } from '../../data/contact'
import {
  BEYOND_SOLAR_WHATSAPP_MESSAGE,
  beyondSolarServices,
} from '../../data/beyondSolar'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const icons = {
  eletrica: Cable,
  iluminacao: Lightbulb,
  seguranca: ShieldCheck,
  rede: Network,
}

const hubPositions = {
  eletrica: { x: 18, y: 22 },
  iluminacao: { x: 82, y: 22 },
  seguranca: { x: 18, y: 78 },
  rede: { x: 82, y: 78 },
}

function ConnectionPaths({ activeId, drawn }) {
  const hub = { x: 50, y: 50 }

  return (
    <svg
      className="beyond-solar-paths"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {beyondSolarServices.map((service) => {
        const node = hubPositions[service.id]
        const midX = (hub.x + node.x) / 2
        const midY = (hub.y + node.y) / 2
        const path = `M ${hub.x} ${hub.y} Q ${midX} ${hub.y} ${midX} ${midY} T ${node.x} ${node.y}`

        return (
          <g key={service.id}>
            <path
              className={`beyond-solar-path ${drawn ? 'is-drawn' : ''} ${
                activeId === service.id ? 'is-active' : ''
              }`}
              d={path}
              pathLength="1"
              style={{ '--path-delay': `${Number(service.number) * 0.12}s` }}
            />
            <circle
              className={`beyond-solar-path-dot ${drawn ? 'is-drawn' : ''} ${
                activeId === service.id ? 'is-active' : ''
              }`}
              cx={node.x}
              cy={node.y}
              r="1.1"
              style={{ '--path-delay': `${Number(service.number) * 0.12 + 0.2}s` }}
            />
          </g>
        )
      })}
      <circle className="beyond-solar-hub-ring" cx={hub.x} cy={hub.y} r="7" />
      <circle className="beyond-solar-hub-pulse" cx={hub.x} cy={hub.y} r="4.8" />
    </svg>
  )
}

function ServiceNode({ service, active, onSelect, index }) {
  const Icon = icons[service.id]
  const position = hubPositions[service.id]

  return (
    <button
      type="button"
      className={`beyond-solar-node beyond-solar-node--${service.id} ${
        active ? 'is-active' : ''
      }`}
      style={{
        '--node-x': `${position.x}%`,
        '--node-y': `${position.y}%`,
        '--node-delay': `${0.35 + index * 0.1}s`,
      }}
      aria-pressed={active}
      aria-controls="beyond-solar-detail"
      onClick={() => onSelect(service.id)}
      onFocus={() => onSelect(service.id)}
      onMouseEnter={() => {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          onSelect(service.id)
        }
      }}
    >
      <span className="beyond-solar-node-ring" aria-hidden="true" />
      <span className="beyond-solar-node-icon">
        <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <span className="beyond-solar-node-copy">
        <span className="beyond-solar-node-number">{service.number}</span>
        <span className="beyond-solar-node-title">{service.title}</span>
        <span className="beyond-solar-node-short">{service.short}</span>
      </span>
    </button>
  )
}

function MobileSpine({ activeId, onSelect }) {
  return (
    <ol className="beyond-solar-spine" aria-label="Soluções complementares">
      {beyondSolarServices.map((service, index) => {
        const Icon = icons[service.id]
        const active = activeId === service.id

        return (
          <li
            key={service.id}
            className="beyond-solar-spine-item"
            data-beyond-observe={service.id}
          >
            <div className="beyond-solar-spine-track" aria-hidden="true">
              <span className={`beyond-solar-spine-dot ${active ? 'is-active' : ''}`} />
              {index < beyondSolarServices.length - 1 ? (
                <span className="beyond-solar-spine-line" />
              ) : null}
            </div>

            <button
              type="button"
              className={`beyond-solar-spine-card ${active ? 'is-active' : ''}`}
              aria-pressed={active}
              aria-controls="beyond-solar-detail"
              onClick={() => onSelect(service.id)}
              onFocus={() => onSelect(service.id)}
            >
              <span className="beyond-solar-spine-icon">
                <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="beyond-solar-spine-body">
                <span className="beyond-solar-spine-meta">
                  <span>{service.number}</span>
                  <span>{service.short}</span>
                </span>
                <span className="beyond-solar-spine-title">{service.title}</span>
                <span className="beyond-solar-spine-desc">{service.description}</span>
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}

export default function BeyondSolarSection() {
  const sectionRef = useRef(null)
  const [activeId, setActiveId] = useState(beyondSolarServices[0].id)
  const [drawn, setDrawn] = useState(prefersReducedMotion)
  const titleId = useId()
  const activeService =
    beyondSolarServices.find((service) => service.id === activeId) ??
    beyondSolarServices[0]
  const ActiveIcon = icons[activeService.id]
  const whatsappUrl = buildWhatsAppUrl(BEYOND_SOLAR_WHATSAPP_MESSAGE)

  useEffect(() => {
    const element = sectionRef.current
    if (!element || drawn) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [drawn])

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return undefined

    const media = window.matchMedia('(max-width: 1023px)')
    if (!media.matches) return undefined

    const nodes = element.querySelectorAll('[data-beyond-observe]')
    if (!nodes.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        const nextId = visible?.target?.getAttribute('data-beyond-observe')
        if (nextId) setActiveId(nextId)
      },
      {
        rootMargin: '-30% 0px -45% 0px',
        threshold: [0.4, 0.65],
      },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="solucoes"
      aria-labelledby={titleId}
      className={`beyond-solar ${drawn ? 'is-drawn' : ''}`}
    >
      <div className="beyond-solar-grid" aria-hidden="true" />
      <div className="beyond-solar-glow" aria-hidden="true" />

      <Container className="relative z-10 py-14 sm:py-16 lg:py-20">
        <header className="beyond-solar-intro">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-400">
            Soluções complementares
          </p>
          <h2
            id={titleId}
            className="mt-3 max-w-3xl text-[1.75rem] font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.5rem]"
          >
            Muito além da energia solar
          </h2>
          <p className="prose-width mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:mt-5 sm:text-lg">
            Além dos projetos solares, a Good Sollar entrega infraestrutura elétrica,
            iluminação, segurança e conectividade para residências, empresas e
            propriedades rurais em todo o Brasil.
          </p>
        </header>

        <div className="beyond-solar-stage mt-10 lg:mt-12">
          <div className="beyond-solar-hub-board hidden lg:block">
            <ConnectionPaths activeId={activeId} drawn={drawn} />

            <div className="beyond-solar-core">
              <span className="beyond-solar-core-eyebrow">Núcleo Good Sollar</span>
              <strong className="beyond-solar-core-title">Infraestrutura completa</strong>
              <p className="beyond-solar-core-text">
                Energia solar no centro. Elétrica, luz, proteção e rede no mesmo projeto.
              </p>
            </div>

            {beyondSolarServices.map((service, index) => (
              <ServiceNode
                key={service.id}
                service={service}
                index={index}
                active={activeId === service.id}
                onSelect={setActiveId}
              />
            ))}
          </div>

          <div className="lg:hidden">
            <MobileSpine activeId={activeId} onSelect={setActiveId} />
          </div>

          <aside
            id="beyond-solar-detail"
            className={`beyond-solar-detail beyond-solar-detail--${activeService.accent} hidden lg:flex`}
            aria-live="polite"
          >
            <div className="beyond-solar-detail-top">
              <span className="beyond-solar-detail-icon">
                <ActiveIcon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div>
                <p className="beyond-solar-detail-number">Solução {activeService.number}</p>
                <h3 className="beyond-solar-detail-title">{activeService.title}</h3>
              </div>
            </div>
            <p className="beyond-solar-detail-text">{activeService.description}</p>
            <p className="beyond-solar-detail-note">
              Integra com o projeto solar ou pode ser contratada de forma independente.
            </p>
          </aside>
        </div>

        <div className="beyond-solar-cta mt-10 flex flex-col items-start gap-4 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-[0.9375rem]">
            Quer montar um projeto completo ou só uma dessas soluções? Fale com a equipe
            e receba orientação sem compromisso.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-primary-900 shadow-lg shadow-accent-500/25 transition-colors hover:bg-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
          >
            Falar com um especialista
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  )
}
