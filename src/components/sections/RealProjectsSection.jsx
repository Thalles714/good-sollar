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
import SectionHeading from '../ui/SectionHeading'
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

function ProjectImage({ project, variant = 'hero', priority = false, onClick }) {
  const isHero = variant === 'hero'

  return (
    <button
      type="button"
      className={`real-projects-media ${isHero ? 'real-projects-media--hero' : ''}`}
      onClick={onClick}
      aria-label={`Ampliar ${project.title}`}
    >
      <img
        src={project.image}
        alt={project.alt}
        className={`real-projects-photo ${isHero ? 'real-projects-photo--hero' : ''}`}
        style={{ objectPosition: project.position }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      {isHero && (
        <span className="real-projects-media-expand" aria-hidden="true">
          <Expand className="h-3.5 w-3.5" />
        </span>
      )}
    </button>
  )
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
      className="real-projects-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Visualização ampliada: ${project.title}`}
      onClick={onClose}
    >
      <div
        className="real-projects-lightbox-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="real-projects-lightbox-close"
          onClick={onClose}
          aria-label="Fechar visualização ampliada"
        >
          <X className="h-5 w-5" />
        </button>
        <img
          src={project.image}
          alt={project.alt}
          className="real-projects-lightbox-image"
          style={{ objectPosition: project.position }}
        />
        <div className="real-projects-lightbox-caption">
          <p className="real-projects-lightbox-title">{project.title}</p>
          <p className="real-projects-lightbox-text">{project.summary}</p>
        </div>
      </div>
    </div>
  )
}

export default function RealProjectsSection() {
  const sectionId = useId()
  const stripRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeProjectId, setActiveProjectId] = useState(DEFAULT_REAL_PROJECT_ID)
  const [lightboxProject, setLightboxProject] = useState(null)
  const [imagePhase, setImagePhase] = useState('idle')

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

  const selectProject = useCallback((projectId) => {
    if (prefersReducedMotion()) {
      setActiveProjectId(projectId)
      return
    }

    setImagePhase('leaving')
    window.setTimeout(() => {
      setActiveProjectId(projectId)
      setImagePhase('entering')
      window.setTimeout(() => setImagePhase('idle'), 280)
    }, 160)
  }, [])

  useEffect(() => {
    if (!filteredProjects.some((project) => project.id === activeProjectId)) {
      setActiveProjectId(filteredProjects[0]?.id ?? DEFAULT_REAL_PROJECT_ID)
    }
  }, [activeCategory, activeProjectId, filteredProjects])

  const scrollStrip = (direction) => {
    const strip = stripRef.current
    if (!strip) return
    const amount = direction === 'next' ? 280 : -280
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
      className="real-projects section-spacing section-surface-white"
    >
      <div className="real-projects-backdrop" aria-hidden="true" />

      <Container>
        <div className="real-projects-intro">
          <SectionHeading
            titleId={`${sectionId}-heading`}
            badge="Projetos reais"
            title="Experiência comprovada em cada instalação"
            subtitle="Projetos executados pela Good Sollar em residências, empresas e propriedades rurais."
            align="left"
            className="real-projects-heading max-w-2xl"
          />
          <p className="real-projects-authenticity">
            <Camera className="real-projects-authenticity-icon" aria-hidden="true" />
            Fotos reais de instalações executadas pela Good Sollar, sem imagens
            ilustrativas.
          </p>
        </div>

        <div className="real-projects-console">
          <div className="real-projects-toolbar">
            <div
              className="real-projects-filters real-projects-scroll-hide"
              role="tablist"
              aria-label="Filtrar projetos por categoria"
            >
              {realProjectCategories.map((category) => {
                const Icon = categoryIcons[category.id]
                const selected = activeCategory === category.id

                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    id={`${sectionId}-tab-${category.id}`}
                    aria-selected={selected}
                    aria-controls={`${sectionId}-panel`}
                    className={`real-projects-filter ${selected ? 'is-active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <Icon className="real-projects-filter-icon" aria-hidden="true" />
                    <span className="real-projects-filter-label">{category.label}</span>
                    <span className="real-projects-filter-short">{category.shortLabel}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div
            id={`${sectionId}-panel`}
            role="tabpanel"
            aria-labelledby={`${sectionId}-tab-${activeCategory}`}
            className="real-projects-body"
          >
            <div className="real-projects-workspace">
              <div
                className={`real-projects-hero ${imagePhase !== 'idle' ? `is-${imagePhase}` : ''}`}
              >
                <ProjectImage
                  project={activeProject}
                  priority
                  onClick={() => setLightboxProject(activeProject)}
                />

                <button
                  type="button"
                  className="real-projects-nav-btn real-projects-nav-btn--prev"
                  onClick={() => goToRelative(-1)}
                  aria-label="Projeto anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="real-projects-nav-btn real-projects-nav-btn--next"
                  onClick={() => goToRelative(1)}
                  aria-label="Próximo projeto"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <aside className="real-projects-detail">
                <div className="real-projects-detail-meta">
                  <span className="real-projects-detail-badge">Projeto selecionado</span>
                  <span className="real-projects-counter" aria-live="polite">
                    {String(activeIndex + 1).padStart(2, '0')}
                    <span className="real-projects-counter-sep">/</span>
                    {String(filteredProjects.length).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="real-projects-detail-title">{activeProject.title}</h3>
                <p className="real-projects-detail-text">{activeProject.summary}</p>

                <div className="real-projects-panel-tags">
                  {activeProject.badges.map((tag) => (
                    <span key={tag} className="real-projects-panel-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <dl className="real-projects-specs">
                  <div>
                    <dt>Enfoque técnico</dt>
                    <dd>{activeProject.highlights.join(' · ')}</dd>
                  </div>
                </dl>

                <div className="real-projects-detail-actions">
                  <Button
                    href={whatsappUrl}
                    variant="primary"
                    size="md"
                    className="real-projects-cta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    Solicitar avaliação do projeto
                  </Button>
                </div>
              </aside>
            </div>

            <div className="real-projects-strip-wrap">
              <button
                type="button"
                className="real-projects-strip-nav real-projects-strip-nav--prev"
                onClick={() => scrollStrip('prev')}
                aria-label="Rolar miniaturas para a esquerda"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>

              <div
                ref={stripRef}
                className="real-projects-strip real-projects-scroll-hide"
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
                      className={`real-projects-thumb ${selected ? 'is-active' : ''}`}
                      onClick={() => selectProject(project.id)}
                    >
                      <img
                        src={project.image}
                        alt=""
                        className="real-projects-thumb-photo"
                        style={{ objectPosition: project.position }}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="real-projects-thumb-label">{project.title}</span>
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                className="real-projects-strip-nav real-projects-strip-nav--next"
                onClick={() => scrollStrip('next')}
                aria-label="Rolar miniaturas para a direita"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Container>

      {lightboxProject && (
        <Lightbox project={lightboxProject} onClose={() => setLightboxProject(null)} />
      )}
    </section>
  )
}
