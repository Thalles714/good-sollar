import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import { buildWhatsAppUrl } from '../../data/contact'
import {
  REAL_PROJECTS_WHATSAPP_MESSAGE,
  realProjects,
} from '../../data/realProjects'

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
      aria-label={project.title}
      onClick={onClose}
    >
      <div className="rp-lightbox-panel" onClick={(event) => event.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          className="rp-lightbox-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <img
          src={project.image}
          alt={project.alt}
          className="rp-lightbox-image"
          style={{ objectPosition: project.position }}
        />
      </div>
    </div>
  )
}

export default function RealProjectsSection() {
  const headingId = useId()
  const [lightboxProject, setLightboxProject] = useState(null)
  const whatsappUrl = buildWhatsAppUrl(REAL_PROJECTS_WHATSAPP_MESSAGE)

  const openLightbox = useCallback((project) => {
    setLightboxProject(project)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxProject(null)
  }, [])

  return (
    <section
      id="projetos-reais"
      aria-labelledby={headingId}
      className="rp section-spacing"
    >
      <Container>
        <ScrollReveal variant="fade-up">
          <SectionHeading
            titleId={headingId}
            badge="Projetos reais"
            title="Instalações feitas pela Good Sollar"
            subtitle="Residencial, rural, off-grid e elétrica — fotos do campo, não de banco de imagem."
            className="rp-header !mb-10 lg:!mb-14"
          />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={80}>
          <ul className="rp-mosaic" aria-label="Fotos de instalações reais">
            {realProjects.map((project, index) => (
              <li
                key={project.id}
                className={`rp-cell ${project.featured ? 'rp-cell--hero' : ''} rp-cell--${index}`}
              >
                <button
                  type="button"
                  className="rp-shot"
                  onClick={() => openLightbox(project)}
                  aria-label={`Ampliar: ${project.title}`}
                >
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="rp-shot-image"
                    style={{ objectPosition: project.position }}
                    loading={project.featured ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={project.featured ? 'high' : 'auto'}
                  />
                </button>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={120}>
          <div className="rp-cta-row">
            <Button
              href={whatsappUrl}
              variant="primary"
              size="md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              Quero um projeto assim
            </Button>
          </div>
        </ScrollReveal>
      </Container>

      {lightboxProject ? (
        <Lightbox project={lightboxProject} onClose={closeLightbox} />
      ) : null}
    </section>
  )
}
