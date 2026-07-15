import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BASE_SPEED = 28
const MIN_SPEED = 16
const MAX_SPEED = 86
const SCROLL_BOOST = 0.42
const SPEED_RETURN = 1.25
const DRAG_CLICK_THRESHOLD = 8
const MAX_DRAG_VELOCITY = 2200
const DRAG_VELOCITY_BLEND = 0.38
const MOMENTUM_FRICTION = 3.2
const MOMENTUM_STOP_SPEED = 10
const MAX_DT = 0.048

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value))
}

function normalizeOffset(value, loopWidth) {
  if (!loopWidth) return value

  let normalized = value
  while (normalized <= -loopWidth) normalized += loopWidth
  while (normalized > 0) normalized -= loopWidth
  return normalized
}

function ProfileCard({ profile, logicalIndex, decorative = false }) {
  return (
    <article
      className="testimonial-card group"
      data-logical-index={logicalIndex}
      aria-roledescription={decorative ? undefined : 'slide'}
      aria-label={decorative ? undefined : `Perfil de aplicação: ${profile.name}`}
      aria-hidden={decorative || undefined}
    >
      <div className="testimonial-card-inner flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-shadow duration-200">
        <header className="testimonial-card-header">
          <div className="testimonial-avatar relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
            <img
              src={profile.image}
              alt={decorative ? '' : profile.imageAlt}
              className="h-full w-full object-cover"
              style={{
                aspectRatio: '1 / 1',
                objectPosition: profile.imagePosition ?? 'center',
              }}
              loading="lazy"
              decoding="async"
              draggable="false"
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

function CardSet({ items, decorative = false }) {
  return (
    <div
      className="testimonial-carousel-set"
      aria-hidden={decorative || undefined}
      data-decorative={decorative ? 'true' : undefined}
    >
      {items.map((profile, index) => (
        <ProfileCard
          key={`${decorative ? 'copy' : 'original'}-${profile.id}`}
          profile={profile}
          logicalIndex={index}
          decorative={decorative}
        />
      ))}
    </div>
  )
}

export default function TestimonialCarousel({ items }) {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const rafRef = useRef(null)
  const offsetRef = useRef(0)
  const loopWidthRef = useRef(0)
  const cardStepRef = useRef(0)
  const speedRef = useRef(BASE_SPEED)
  const momentumRef = useRef(0)
  const lastFrameTimeRef = useRef(0)
  const activeIndexRef = useRef(0)
  const inViewportRef = useRef(false)
  const pauseRef = useRef({ hover: false, focus: false, drag: false })
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startOffset: 0,
    lastX: 0,
    lastTime: 0,
    lastMoveTime: 0,
    velocity: 0,
    moved: false,
  })
  const [activeIndex, setActiveIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  const updateActiveIndex = useCallback(
    (offset) => {
      const step = cardStepRef.current
      if (!step || !items.length) return

      const nextIndex = Math.round(-offset / step) % items.length
      if (nextIndex === activeIndexRef.current) return

      activeIndexRef.current = nextIndex
      setActiveIndex(nextIndex)
    },
    [items.length],
  )

  const applyOffset = useCallback(
    (value) => {
      const track = trackRef.current
      if (!track) return

      const normalized = normalizeOffset(value, loopWidthRef.current)
      offsetRef.current = normalized
      track.style.transform = `translate3d(${normalized}px, 0, 0)`
      updateActiveIndex(normalized)
    },
    [updateActiveIndex],
  )

  const measureCarousel = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const firstSet = track.querySelector('.testimonial-carousel-set')
    const cards = firstSet?.querySelectorAll('.testimonial-card')
    if (cards?.length) {
      const firstCard = cards[0]
      const secondCard = cards[1]
      const setStyles = window.getComputedStyle(firstSet)
      const gap = Number.parseFloat(setStyles.columnGap || setStyles.gap) || 0
      cardStepRef.current = secondCard
        ? secondCard.offsetLeft - firstCard.offsetLeft
        : firstCard.offsetWidth + gap
    }

    loopWidthRef.current = reduceMotion ? 0 : track.scrollWidth / 2
  }, [reduceMotion])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => setReduceMotion(media.matches)

    syncPreference()
    media.addEventListener('change', syncPreference)
    return () => media.removeEventListener('change', syncPreference)
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return undefined

    const updateNativeIndex = () => {
      if (!reduceMotion || !cardStepRef.current) return
      const nextIndex = clamp(
        Math.round(viewport.scrollLeft / cardStepRef.current),
        0,
        items.length - 1,
      )
      if (nextIndex === activeIndexRef.current) return
      activeIndexRef.current = nextIndex
      setActiveIndex(nextIndex)
    }

    measureCarousel()

    if (reduceMotion) {
      offsetRef.current = 0
      momentumRef.current = 0
      speedRef.current = BASE_SPEED
      track.style.transform = ''
      track.style.willChange = ''
      viewport.addEventListener('scroll', updateNativeIndex, { passive: true })

      const handleReducedResize = () => {
        measureCarousel()
        updateNativeIndex()
      }
      window.addEventListener('resize', handleReducedResize, { passive: true })

      return () => {
        viewport.removeEventListener('scroll', updateNativeIndex)
        window.removeEventListener('resize', handleReducedResize)
      }
    }

    let lastScrollY = window.scrollY
    let lastScrollTime = performance.now()

    const isAutoplayPaused = () => {
      const pause = pauseRef.current
      return pause.hover || pause.focus || pause.drag
    }

    const stopAnimation = () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      lastFrameTimeRef.current = 0
    }

    const frame = (timestamp) => {
      rafRef.current = null
      if (!inViewportRef.current || document.visibilityState !== 'visible') return

      const previousTime = lastFrameTimeRef.current || timestamp
      const dt = Math.min((timestamp - previousTime) / 1000, MAX_DT)
      lastFrameTimeRef.current = timestamp

      if (!pauseRef.current.drag) {
        if (Math.abs(momentumRef.current) > MOMENTUM_STOP_SPEED) {
          applyOffset(offsetRef.current + momentumRef.current * dt)
          momentumRef.current *= Math.exp(-MOMENTUM_FRICTION * dt)
        } else {
          momentumRef.current = 0
          if (!isAutoplayPaused()) {
            const returnAmount = Math.min(1, dt * SPEED_RETURN)
            speedRef.current += (BASE_SPEED - speedRef.current) * returnAmount
            speedRef.current = clamp(speedRef.current, MIN_SPEED, MAX_SPEED)
            applyOffset(offsetRef.current - speedRef.current * dt)
          }
        }
      }

      rafRef.current = window.requestAnimationFrame(frame)
    }

    const startAnimation = () => {
      if (
        rafRef.current === null &&
        inViewportRef.current &&
        document.visibilityState === 'visible'
      ) {
        lastFrameTimeRef.current = 0
        rafRef.current = window.requestAnimationFrame(frame)
      }
    }

    const handlePageScroll = () => {
      const now = performance.now()
      const elapsed = Math.max((now - lastScrollTime) / 1000, 0.001)
      const currentScrollY = window.scrollY
      const scrollVelocity = Math.abs(currentScrollY - lastScrollY) / elapsed

      speedRef.current = clamp(
        BASE_SPEED + scrollVelocity * SCROLL_BOOST,
        MIN_SPEED,
        MAX_SPEED,
      )
      lastScrollY = currentScrollY
      lastScrollTime = now
    }

    const handleResize = () => {
      measureCarousel()
      speedRef.current = BASE_SPEED
      momentumRef.current = 0
      applyOffset(offsetRef.current)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        stopAnimation()
      } else {
        startAnimation()
      }
    }

    const handleMouseEnter = () => {
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        pauseRef.current.hover = true
      }
    }

    const handleMouseLeave = () => {
      pauseRef.current.hover = false
    }

    const handleFocusIn = () => {
      pauseRef.current.focus = true
    }

    const handleFocusOut = (event) => {
      if (!viewport.contains(event.relatedTarget)) {
        pauseRef.current.focus = false
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewportRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          startAnimation()
        } else {
          stopAnimation()
        }
      },
      { threshold: 0.08 },
    )

    track.style.transform = 'translate3d(0, 0, 0)'
    applyOffset(offsetRef.current)
    observer.observe(viewport)
    window.addEventListener('scroll', handlePageScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    viewport.addEventListener('mouseenter', handleMouseEnter)
    viewport.addEventListener('mouseleave', handleMouseLeave)
    viewport.addEventListener('focusin', handleFocusIn)
    viewport.addEventListener('focusout', handleFocusOut)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handlePageScroll)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      viewport.removeEventListener('mouseenter', handleMouseEnter)
      viewport.removeEventListener('mouseleave', handleMouseLeave)
      viewport.removeEventListener('focusin', handleFocusIn)
      viewport.removeEventListener('focusout', handleFocusOut)
      stopAnimation()
      inViewportRef.current = false
      momentumRef.current = 0
      track.style.transform = ''
    }
  }, [applyOffset, items.length, measureCarousel, reduceMotion])

  const moveByCard = useCallback(
    (direction) => {
      const viewport = viewportRef.current
      const step = cardStepRef.current
      if (!viewport || !step) return

      momentumRef.current = 0
      if (reduceMotion) {
        viewport.scrollBy({ left: direction * step, behavior: 'smooth' })
        return
      }

      applyOffset(offsetRef.current - direction * step)
    },
    [applyOffset, reduceMotion],
  )

  const goToIndex = useCallback(
    (index) => {
      const viewport = viewportRef.current
      const step = cardStepRef.current
      if (!viewport || !step) return

      momentumRef.current = 0
      if (reduceMotion) {
        viewport.scrollTo({ left: index * step, behavior: 'smooth' })
        return
      }

      let distance = index - activeIndexRef.current
      if (distance > items.length / 2) distance -= items.length
      if (distance < -items.length / 2) distance += items.length
      applyOffset(offsetRef.current - distance * step)
    },
    [applyOffset, items.length, reduceMotion],
  )

  const handlePointerDown = useCallback(
    (event) => {
      if (reduceMotion || !event.isPrimary || event.button !== 0) return

      const now = performance.now()
      momentumRef.current = 0
      pauseRef.current.drag = true
      dragRef.current = {
        active: true,
        pointerId: event.pointerId,
        startX: event.clientX,
        startOffset: offsetRef.current,
        lastX: event.clientX,
        lastTime: now,
        lastMoveTime: now,
        velocity: 0,
        moved: false,
      }
      event.currentTarget.setPointerCapture(event.pointerId)
    },
    [reduceMotion],
  )

  const handlePointerMove = useCallback(
    (event) => {
      const drag = dragRef.current
      if (!drag.active || drag.pointerId !== event.pointerId || reduceMotion) return

      const now = performance.now()
      const delta = event.clientX - drag.startX
      const elapsed = Math.max((now - drag.lastTime) / 1000, 0.001)
      const instantVelocity = clamp(
        (event.clientX - drag.lastX) / elapsed,
        -MAX_DRAG_VELOCITY,
        MAX_DRAG_VELOCITY,
      )

      if (Math.abs(delta) > DRAG_CLICK_THRESHOLD) drag.moved = true
      drag.velocity +=
        (instantVelocity - drag.velocity) * DRAG_VELOCITY_BLEND
      drag.lastX = event.clientX
      drag.lastTime = now
      drag.lastMoveTime = now
      applyOffset(drag.startOffset + delta)
    },
    [applyOffset, reduceMotion],
  )

  const finishPointer = useCallback((event, cancelled = false) => {
    const drag = dragRef.current
    if (!drag.active || drag.pointerId !== event.pointerId) return

    const now = performance.now()
    const releaseDelay = Math.max((now - drag.lastMoveTime) / 1000, 0)
    const releaseVelocity = drag.velocity * Math.exp(-8 * releaseDelay)

    momentumRef.current =
      !cancelled && drag.moved ? releaseVelocity : 0
    drag.active = false
    pauseRef.current.drag = false

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }, [])

  const handlePointerCancel = useCallback(
    (event) => finishPointer(event, true),
    [finishPointer],
  )

  const handleClickCapture = useCallback((event) => {
    if (!dragRef.current.moved) return
    event.preventDefault()
    event.stopPropagation()
    dragRef.current.moved = false
  }, [])

  const handlePointerEnter = useCallback((event) => {
    if (
      event.pointerType === 'mouse' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      pauseRef.current.hover = true
    }
  }, [])

  const handlePointerLeave = useCallback(() => {
    pauseRef.current.hover = false
  }, [])

  const handleFocus = useCallback(() => {
    pauseRef.current.focus = true
  }, [])

  const handleBlur = useCallback((event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      pauseRef.current.focus = false
    }
  }, [])

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        moveByCard(-1)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        moveByCard(1)
      }
    },
    [moveByCard],
  )

  return (
    <div className="testimonial-carousel">
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          className="testimonial-carousel-btn inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-accent-500/40 hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          onClick={() => moveByCard(-1)}
          aria-label="Perfil anterior"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="testimonial-carousel-btn inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-accent-500/40 hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          onClick={() => moveByCard(1)}
          aria-label="Próximo perfil"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="testimonial-carousel-window">
        <div
          ref={viewportRef}
          className="testimonial-carousel-viewport"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Perfis de aplicação da energia solar"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointer}
          onPointerCancel={handlePointerCancel}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onFocusCapture={handleFocus}
          onBlurCapture={handleBlur}
          onClickCapture={handleClickCapture}
        >
          <div ref={trackRef} className="testimonial-carousel-track">
            <CardSet items={items} />
            {!reduceMotion && <CardSet items={items} decorative />}
          </div>
        </div>
      </div>

      <div
        className="testimonial-indicators mt-4 flex flex-wrap items-center justify-center"
        role="tablist"
        aria-label="Indicadores de perfis"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-label={`Ir para perfil ${index + 1}: ${item.name}`}
            className={`testimonial-dot rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 ${
              activeIndex === index ? 'is-active' : ''
            }`}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Perfil {activeIndex + 1} de {items.length}: {items[activeIndex]?.name}
      </p>
    </div>
  )
}
