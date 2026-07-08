import { assetUrl } from '../utils/assetUrl'

const brand = (file) => assetUrl(`images/brand/${file}`)

export const images = {
  logo: brand('goodsollar-logo.svg'),
  logoFallback: brand('goodsollar-logo.jpeg'),
  hero: brand('01-hero.png'),
  about: brand('02-sobre.png'),
  benefits: `${brand('04-beneficios.png')}?v=2`,
  contact: brand('06-contato.png'),
  services: {
    residencial: brand('03-residencial.png'),
    empresarial: brand('03-empresarial.png'),
    rural: brand('03-rural.png'),
    offgrid: brand('03-offgrid.png'),
  },
  testimonials: {
    carlos: brand('05-depoimento-1.png'),
    juliana: brand('05-depoimento-2.png'),
    marcos: brand('05-depoimento-3.png'),
  },
}
