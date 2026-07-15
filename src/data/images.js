import { assetUrl } from '../utils/assetUrl'

const brand = (file) => assetUrl(`images/brand/${file}`)

export const images = {
  logo: brand('goodsollar-logo.svg'),
  logoLight: brand('goodsollar-logo-light.svg'),
  hero: {
    src: brand('01-hero.webp'),
    srcMobile: brand('01-hero-mobile.webp'),
    fallback: brand('01-hero.png'),
  },
  about: brand('02-quem-somos-equipe.webp'),
  benefits: `${brand('04-beneficios.png')}?v=2`,
  contact: brand('06-contato.png'),
  services: {
    residencial: brand('03-residencial.png'),
    empresarial: brand('03-empresarial.png'),
    rural: brand('03-rural.png'),
    offgrid: brand('03-offgrid.png'),
  },
  testimonials: {
    depoimento1: brand('05-depoimento-1.png'),
    depoimento2: brand('05-depoimento-2.png'),
    depoimento3: brand('05-depoimento-3.png'),
    depoimento4: brand('05-depoimento-4.png'),
    depoimento5: brand('05-depoimento-5.png'),
    depoimento6: brand('05-depoimento-6.png'),
    depoimento7: brand('05-depoimento-7.png'),
    depoimento8: brand('05-depoimento-8.png'),
  },
}
