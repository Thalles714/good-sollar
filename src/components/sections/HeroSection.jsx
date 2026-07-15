import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Container from '../ui/Container'
import { WHATSAPP_URL } from '../../data/contact'
import { images } from '../../data/images'

export default function HeroSection() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimate(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className={`hero-offset hero-viewport relative overflow-hidden bg-primary-50 ${
        animate ? 'hero-animate' : ''
      }`}
    >
      <div className="hero-media absolute inset-0 z-0 hidden lg:block">
        <picture>
          <source media="(min-width: 1024px)" srcSet={images.hero.src} type="image/webp" />
          <img
            src={images.hero.fallback}
            alt="Instalação de painéis solares em residência pela Good Sollar"
            width="1920"
            height="1080"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-right"
          />
        </picture>
        <div className="hero-overlay absolute inset-0" aria-hidden="true" />
      </div>

      <div className="hero-media lg:hidden">
        <picture>
          <source media="(max-width: 1023px)" srcSet={images.hero.srcMobile} type="image/webp" />
          <img
            src={images.hero.fallback}
            alt="Instalação de painéis solares em residência pela Good Sollar"
            width="1200"
            height="750"
            fetchPriority="high"
            decoding="async"
            className="h-full max-h-[45vh] w-full object-cover object-[center_30%]"
          />
        </picture>
      </div>

      <Container className="hero-viewport-inner relative z-10 grid gap-8 pb-12 pt-6 sm:pb-14 sm:pt-8 lg:grid-cols-12 lg:gap-x-8 lg:pb-10 lg:pt-0">
        <div className="hero-copy max-w-xl lg:col-span-6 lg:max-w-[38rem]">
          <h1
            id="hero-heading"
            className="hero-title text-[2rem] font-extrabold leading-[1.1] tracking-tight text-primary-600 sm:text-4xl lg:text-[3rem]"
          >
            Energia solar para residências, empresas e propriedades rurais
          </h1>

          <p className="hero-subtitle prose-width mt-4 text-base leading-relaxed text-slate-600 sm:text-[1.0625rem]">
            Dimensionamos cada projeto conforme sua necessidade e espaço físico disponível.
            Orçamento em minutos pelo WhatsApp.
          </p>

          <div className="hero-actions mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-primary-cta hero-mobile-cta inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-accent-500 px-5 py-4 text-sm font-semibold shadow-lg shadow-accent-500/25 transition-colors hover:bg-accent-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 sm:w-auto sm:px-7 sm:text-base"
            >
              Solicitar orçamento gratuito
              <ArrowRight className="hero-primary-cta-icon h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#servicos"
              className="hero-secondary-link inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-primary-300/80 bg-white/65 px-5 py-3 text-sm font-semibold text-primary-700 shadow-sm backdrop-blur-sm transition-colors hover:border-accent-500/60 hover:bg-white/85 hover:text-primary-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              Conhecer as soluções
            </a>
          </div>
        </div>
      </Container>
      <div className="hero-transition-glow" aria-hidden="true" />
    </section>
  )
}
