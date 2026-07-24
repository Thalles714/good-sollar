import { assetUrl } from '../utils/assetUrl'

export const REAL_PROJECTS_WHATSAPP_MESSAGE =
  'Olá! Vi os projetos realizados pela Good Sollar e gostaria de solicitar uma avaliação.'

const projectImage = (file) => assetUrl(`images/projetos-reais/${file}`)

/** Curated mosaic (7). Source: public/images/projetos-reais only. */
export const realProjects = [
  {
    id: 'residencial-telhado',
    image: projectImage('instalacao-solar-residencial.jpg'),
    alt: 'Painéis solares instalados sobre telhado de cerâmica em residência',
    title: 'Instalação residencial',
    position: 'center 35%',
    featured: true,
  },
  {
    id: 'rural-grande',
    image: projectImage('instalacao-solar-rural-grande.jpg'),
    alt: 'Grande instalação de painéis solares em estrutura metálica no solo',
    title: 'Instalação rural em escala',
    position: 'center 40%',
  },
  {
    id: 'off-grid-easun',
    image: projectImage('sistema-inversor-baterias-off-grid.jpg'),
    alt: 'Inversor híbrido com quadros de proteção e banco de baterias',
    title: 'Sistema off-grid',
    position: 'center 42%',
  },
  {
    id: 'quadro-organizado',
    image: projectImage('quadro-eletrico-organizado.jpg'),
    alt: 'Quadro de distribuição elétrica com fiação organizada e disjuntores',
    title: 'Quadro elétrico',
    position: 'center center',
  },
  {
    id: 'rural-solo',
    image: projectImage('estrutura-paineis-rural-solo.jpg'),
    alt: 'Painéis solares em estrutura de madeira no solo em ambiente rural',
    title: 'Estrutura no solo',
    position: 'center 45%',
  },
  {
    id: 'off-grid-deye',
    image: projectImage('quadro-inversor-hibrido-baterias.jpg'),
    alt: 'Inversor híbrido, bateria e quadros de proteção na parede',
    title: 'Inversor e armazenamento',
    position: 'center 38%',
  },
  {
    id: 'rural-madeira',
    image: projectImage('instalacao-solar-rural-madeira.jpg'),
    alt: 'Painéis solares em estrutura de madeira diante de edificação rural',
    title: 'Sistema rural',
    position: 'center 30%',
  },
]
