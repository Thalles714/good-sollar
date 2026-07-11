import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function ProfileCard({ profile }) {
  return (
    <article
      className="testimonial-card group"
      aria-roledescription="slide"
      aria-label={`Cenário de ${profile.name}`}
    >
      <div className="testimonial-card-inner flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-shadow duration-200 group-hover:shadow-md">
        <header className="testimonial-card-header">
          <div className="testimonial-avatar relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
            <img
              src={profile.image}
              alt={profile.imageAlt}
              className="h-full w-full object-cover"
              style={{
                aspectRatio: '1 / 1',
                objectPosition: profile.imagePosition ?? 'center',
              }}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="testimonial-card-meta min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-primary-900">{profile.name}</p>
            <p className="truncate text-xs text-slate-500">{profile.location}</p>
          </div>
          <span className="testimonial-segment-badge shrink-0 rounded-full bg-accent-500/15 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-accent-600">
            {profile.category}
          </span>
        </header>

        <p className="testimonial-quote mt-4 flex-1 text-sm leading-relaxed text-slate-700">
          {profile.description}
        </p>
      </div>
    </article>
  )
}

export default function TestimonialCarousel({ items }) {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const cards = Array.from(track.querySelectorAll('.testimonial-card'))
    if (!cards.length) return

    const trackLeft = track.getBoundingClientRect().left
    let closest = 0
    let closestDistance = Number.POSITIVE_INFINITY

    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - trackLeft)
      if (distance < closestDistance) {
        closestDistance = distance
        closest = index
      }
    })

    setActiveIndex(closest)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    track.addEventListener('scroll', updateActiveIndex, { passive: true })
    window.addEventListener('resize', updateActiveIndex, { passive: true })
    updateActiveIndex()

    return () => {
      track.removeEventListener('scroll', updateActiveIndex)
      window.removeEventListener('resize', updateActiveIndex)
    }
  }, [updateActiveIndex, items.length])

  const scrollToIndex = useCallback(
    (index) => {
      const track = trackRef.current
      if (!track) return

      const cards = track.querySelectorAll('.testimonial-card')
      const target = cards[Math.max(0, Math.min(index, cards.length - 1))]
      target?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        inline: 'start',
        block: 'nearest',
      })
    },
    [reduceMotion],
  )

  const scrollByCard = useCallback(
    (direction) => {
      scrollToIndex(activeIndex + direction)
    },
    [activeIndex, scrollToIndex],
  )

  function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollByCard(-1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollByCard(1)
    }
  }

  const atStart = activeIndex <= 0
  const atEnd = activeIndex >= items.length - 1

  return (
    <div className="testimonial-carousel">
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          className="testimonial-carousel-btn inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-accent-500/40 hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="Cenário anterior"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="testimonial-carousel-btn inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-accent-500/40 hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="Próximo cenário"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div
        ref={trackRef}
        className="testimonial-carousel-track"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Perfis de aplicação da energia solar"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {items.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>

      <div
        className="mt-4 flex flex-wrap items-center justify-center gap-2"
        role="tablist"
        aria-label="Indicadores de cenários"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-label={`Ir para cenário ${index + 1}: ${item.name}`}
            className={`testimonial-dot h-2 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 ${
              activeIndex === index ? 'w-6 bg-accent-500' : 'w-2 bg-slate-300'
            }`}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Cenário {activeIndex + 1} de {items.length}: {items[activeIndex]?.name}
      </p>
    </div>
  )
}
