import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import {
  BatteryCharging,
  Camera,
  ChevronLeft,
  ChevronRight,
  Expand,
  Layers,
  MessageCircle,
  Sun,
  TreePine,
  X,
  Zap,
} from 'lucide-react'
import Container from '../ui/Container'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { buildWhatsAppUrl } from '../../data/contact'
import {
  DEFAULT_REAL_PROJECT_ID,
  REAL_PROJECTS_WHATSAPP_MESSAGE,
  filterRealProjects,
  realProjectCategories,
  realProjects,
} from '../../data/realProjects'

const categoryIcons = {
  all: Layers,
  solar: Sun,
  rural: TreePine,
  'off-grid': BatteryCharging,
  eletrica: Zap,
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function Lightbox({ project, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  if (!project) return null

  return (
    <div
      className="rp-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Visualização ampliada: ${project.title}`}
      onClick={onClose}
    >
      <div className="rp-lightbox-panel" onClick={(event) => event.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          className="rp-glass-btn rp-lightbox-close"
          onClick={onClose}
          aria-label="Fechar visualização ampliada"
        >
          <X className="h-4 w-4" />
        </button>
        <img
          src={project.image}
          alt={project.alt}
          className="rp-lightbox-image"
          style={{ objectPosition: project.position }}
        />
        <div className="rp-lightbox-caption">
          <p className="rp-lightbox-title">{project.title}</p>
          <p className="rp-lightbox-text">{project.summary}</p>
        </div>
      </div>
    </div>
  )
}

export default function RealProjectsSection() {
  const sectionId = useId()
  const stripRef = useRef(null)
  const visualRef = useRef(null)
  const filterRefs = useRef({})
  const backdropNaturalWidth = useRef(0)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeProjectId, setActiveProjectId] = useState(DEFAULT_REAL_PROJECT_ID)
  const [lightboxProject, setLightboxProject] = useState(null)
  const [imagePhase, setImagePhase] = useState('idle')
  const [backdropMode, setBackdropMode] = useState('photo')
  const [filterIndicator, setFilterIndicator] = useState({ width: 0, left: 0 })

  const filteredProjects = useMemo(
    () => filterRealProjects(activeCategory),
    [activeCategory],
  )

  const activeProject = useMemo(() => {
    const match = filteredProjects.find((project) => project.id === activeProjectId)
    return match ?? filteredProjects[0] ?? realProjects[0]
  }, [activeProjectId, filteredProjects])

  const activeIndex = filteredProjects.findIndex(
    (project) => project.id === activeProject.id,
  )

  const updateFilterIndicator = useCallback(() => {
    const node = filterRefs.current[activeCategory]
    const rail = node?.parentElement
    if (!node || !rail) return
    setFilterIndicator({
      width: node.offsetWidth,
      left: node.offsetLeft - rail.scrollLeft,
    })
  }, [activeCategory])

  useEffect(() => {
    updateFilterIndicator()
    window.addEventListener('resize', updateFilterIndicator)
    return () => window.removeEventListener('resize', updateFilterIndicator)
  }, [updateFilterIndicator])

  const assessBackdropQuality = useCallback(() => {
    const container = visualRef.current
    const naturalWidth = backdropNaturalWidth.current
    if (!container || !naturalWidth) return

    const deviceRatio = window.devicePixelRatio || 1
    const requiredWidth =
      Math.max(container.clientWidth, container.clientHeight) * deviceRatio * 1.15

    setBackdropMode(naturalWidth >= requiredWidth ? 'photo' : 'gradient')
  }, [])

  useEffect(() => {
    backdropNaturalWidth.current = 0
    setBackdropMode('photo')
  }, [activeProject.id])

  useEffect(() => {
    assessBackdropQuality()
    window.addEventListener('resize', assessBackdropQuality)
    return () => window.removeEventListener('resize', assessBackdropQuality)
  }, [assessBackdropQuality, activeProject.id])

  useEffect(() => {
    if (!activeProject?.image) return undefined

    const preloadLink = document.createElement('link')
    preloadLink.rel = 'preload'
    preloadLink.as = 'image'
    preloadLink.href = activeProject.image
    document.head.appendChild(preloadLink)

    return () => {
      document.head.removeChild(preloadLink)
    }
  }, [activeProject.image])

  const handleBackdropLoad = (event) => {
    backdropNaturalWidth.current = event.currentTarget.naturalWidth
    assessBackdropQuality()
  }

  const selectProject = useCallback((projectId) => {
    if (prefersReducedMotion()) {
      setActiveProjectId(projectId)
      return
    }

    setImagePhase('leaving')
    window.setTimeout(() => {
      setActiveProjectId(projectId)
      setImagePhase('entering')
      window.setTimeout(() => setImagePhase('idle'), 360)
    }, 200)
  }, [])

  const scrollStrip = (direction) => {
    const strip = stripRef.current
    if (!strip) return
    const amount = direction === 'next' ? 300 : -300
    strip.scrollBy({ left: amount, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  const goToRelative = (step) => {
    if (!filteredProjects.length) return
    const nextIndex =
      (activeIndex + step + filteredProjects.length) % filteredProjects.length
    selectProject(filteredProjects[nextIndex].id)
  }

  const whatsappUrl = buildWhatsAppUrl(REAL_PROJECTS_WHATSAPP_MESSAGE)

  return (
    <section
      id="projetos-reais"
      aria-labelledby={`${sectionId}-heading`}
      className="rp section-spacing section-surface-slate"
    >
      <div className="rp-ambient" aria-hidden="true">
        <div className="rp-ambient-glow rp-ambient-glow--gold" />
        <div className="rp-ambient-glow rp-ambient-glow--blue" />
        <div className="rp-ambient-noise" />
      </div>

      <Container className="rp-container">
        <header className="rp-header">
          <div className="rp-header-copy">
            <Badge>Projetos reais</Badge>
            <h2 id={`${sectionId}-heading`} className="rp-header-title">
              Experiência comprovada em cada instalação
            </h2>
            <p className="rp-header-subtitle">
              Instalações executadas pela Good Sollar em residências, empresas e
              propriedades rurais.
            </p>
          </div>
          <p className="rp-authenticity">
            <Camera className="h-3.5 w-3.5 shrink-0 text-accent-500" aria-hidden="true" />
            Fotos reais, sem imagens ilustrativas.
          </p>
        </header>

        <div
          id={`${sectionId}-panel`}
          role="tabpanel"
          aria-labelledby={`${sectionId}-tab-${activeCategory}`}
          className="rp-showcase"
        >
          <div className="rp-glass-board">
            <div className="rp-stage">
              <div
                ref={visualRef}
                className={`rp-visual ${imagePhase !== 'idle' ? `is-${imagePhase}` : ''}`}
              >
                <div className="rp-visual-backdrop" aria-hidden="true">
                  {backdropMode === 'photo' ? (
                    <img
                      key={`backdrop-${activeProject.id}`}
                      src={activeProject.image}
                      alt=""
                      className="rp-visual-backdrop-photo"
                      style={{ objectPosition: activeProject.position }}
                      onLoad={handleBackdropLoad}
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  ) : (
                    <div className="rp-visual-backdrop-gradient" />
                  )}
                </div>
                <div className="rp-visual-shade" aria-hidden="true" />

                <button
                  type="button"
                  className="rp-visual-trigger"
                  onClick={() => setLightboxProject(activeProject)}
                  aria-label={`Ampliar ${activeProject.title}`}
                >
                  <img
                    key={activeProject.id}
                    src={activeProject.image}
                    alt={activeProject.alt}
                    className="rp-visual-photo"
                    style={{ objectPosition: activeProject.position }}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </button>

                <button
                  type="button"
                  className="rp-glass-btn rp-visual-expand"
                  onClick={() => setLightboxProject(activeProject)}
                  aria-label={`Ampliar ${activeProject.title}`}
                >
                  <Expand className="h-3.5 w-3.5" />
                </button>

                <button
                  type="button"
                  className="rp-glass-btn rp-visual-nav rp-visual-nav--prev"
                  onClick={() => goToRelative(-1)}
                  aria-label="Projeto anterior"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  className="rp-glass-btn rp-visual-nav rp-visual-nav--next"
                  onClick={() => goToRelative(1)}
                  aria-label="Próximo projeto"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <article className="rp-story">
                <div className="rp-story-top">
                  <span className="rp-story-eyebrow">Projeto selecionado</span>
                  <span className="rp-story-index" aria-live="polite">
                    {String(activeIndex + 1).padStart(2, '0')}
                    <span className="rp-story-index-sep">/</span>
                    {String(filteredProjects.length).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="rp-story-title">{activeProject.title}</h3>

                <ul className="rp-story-stats">
                  {activeProject.highlights.slice(0, 3).map((item) => (
                    <li key={item}>
                      <span className="rp-story-stat-value">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="rp-story-lead">{activeProject.summary}</p>

                <dl className="rp-story-meta">
                  <div>
                    <dt>Categoria</dt>
                    <dd>{activeProject.badges.join(' · ')}</dd>
                  </div>
                  <div>
                    <dt>Tipo de instalação</dt>
                    <dd>{activeProject.highlights.slice(0, 2).join(' · ')}</dd>
                  </div>
                </dl>

                <div className="rp-story-cta">
                  <Button
                    href={whatsappUrl}
                    variant="primary"
                    size="md"
                    className="rp-cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    Solicitar avaliação do projeto
                  </Button>
                </div>
              </article>
            </div>

            <div className="rp-gallery">
              <button
                type="button"
                className="rp-glass-btn rp-gallery-nav"
                onClick={() => scrollStrip('prev')}
                aria-label="Rolar miniaturas para a esquerda"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>

              <div
                ref={stripRef}
                className="rp-gallery-track rp-scroll-hide"
                role="listbox"
                aria-label="Miniaturas dos projetos"
              >
                {filteredProjects.map((project) => {
                  const selected = project.id === activeProject.id

                  return (
                    <button
                      key={project.id}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={`rp-gallery-item ${selected ? 'is-active' : ''}`}
                      onClick={() => selectProject(project.id)}
                    >
                      <span className="rp-gallery-frame">
                        <img
                          src={project.image}
                          alt=""
                          className="rp-gallery-photo"
                          style={{ objectPosition: project.position }}
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <span className="rp-gallery-label">{project.title}</span>
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                className="rp-glass-btn rp-gallery-nav"
                onClick={() => scrollStrip('next')}
                aria-label="Rolar miniaturas para a direita"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div
            className="rp-filters rp-scroll-hide"
            role="tablist"
            aria-label="Filtrar projetos por categoria"
          >
            <span
              className="rp-filters-indicator"
              aria-hidden="true"
              style={{
                width: filterIndicator.width,
                transform: `translateX(${filterIndicator.left}px)`,
              }}
            />
            {realProjectCategories.map((category) => {
              const Icon = categoryIcons[category.id]
              const selected = activeCategory === category.id

              return (
                <button
                  key={category.id}
                  ref={(node) => {
                    filterRefs.current[category.id] = node
                  }}
                  type="button"
                  role="tab"
                  id={`${sectionId}-tab-${category.id}`}
                  aria-selected={selected}
                  aria-controls={`${sectionId}-panel`}
                  className={`rp-filter ${selected ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveCategory(category.id)
                    requestAnimationFrame(updateFilterIndicator)
                  }}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="rp-filter-label">{category.label}</span>
                  <span className="rp-filter-short">{category.shortLabel}</span>
                </button>
              )
            })}
          </div>
        </div>
      </Container>

      {lightboxProject && (
        <Lightbox project={lightboxProject} onClose={() => setLightboxProject(null)} />
      )}
    </section>
  )
}
