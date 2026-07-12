import { assetUrl } from '../utils/assetUrl'

export const REAL_PROJECTS_WHATSAPP_MESSAGE =
  'Olá! Vi os projetos realizados pela Good Sollar e gostaria de solicitar uma avaliação.'

export const DEFAULT_REAL_PROJECT_ID = 'quadro-organizado'

const projectImage = (file) => assetUrl(`images/projetos-reais/${file}`)

export const realProjectCategories = [
  { id: 'all', label: 'Todos os projetos', shortLabel: 'Todos' },
  { id: 'solar', label: 'Energia solar', shortLabel: 'Solar' },
  { id: 'rural', label: 'Rural', shortLabel: 'Rural' },
  { id: 'off-grid', label: 'Sistemas off-grid', shortLabel: 'Off-grid' },
  {
    id: 'eletrica',
    label: 'Instalações elétricas',
    shortLabel: 'Elétrica',
  },
]

export const realProjects = [
  {
    id: 'quadro-organizado',
    categories: ['eletrica', 'quadros'],
    image: projectImage('quadro-eletrico-organizado.jpg'),
    alt: 'Interior de quadro de distribuição elétrica com fiação colorida organizada e disjuntores',
    title: 'Quadro de distribuição organizado',
    summary:
      'Distribuição elétrica com disjuntores, barramentos e fiação identificada por cores, pronta para operação segura.',
    highlights: ['Fiação organizada', 'Disjuntores', 'Segurança elétrica'],
    badges: ['Quadros e inversores', 'Instalações elétricas'],
    fit: 'cover',
    position: 'center center',
  },
  {
    id: 'residencial-telhado',
    categories: ['residencial'],
    image: projectImage('instalacao-solar-residencial.jpg'),
    alt: 'Painéis solares instalados sobre telhado de cerâmica em residência com vegetação ao redor',
    title: 'Instalação residencial em telhado colonial',
    summary:
      'Painéis fixados sobre telhado de cerâmica, com estrutura dimensionada para o tipo de cobertura e inclinação do imóvel.',
    highlights: ['Telhado colonial', 'On-grid', 'Residencial'],
    badges: ['Energia solar residencial'],
    fit: 'cover',
    position: 'center 35%',
  },
  {
    id: 'rural-grande',
    categories: ['rural', 'estruturas'],
    image: projectImage('instalacao-solar-rural-grande.jpg'),
    alt: 'Grande instalação de painéis solares em estrutura metálica no solo em propriedade rural',
    title: 'Grande instalação rural em estrutura metálica',
    summary:
      'Array extenso montado em estrutura metálica sobre terreno rural, com planejamento de inclinação e fixação para uso contínuo.',
    highlights: ['Propriedade rural', 'Estrutura metálica', 'Alto volume'],
    badges: ['Energia solar rural', 'Estruturas e equipamentos'],
    fit: 'cover',
    position: 'center 40%',
  },
  {
    id: 'rural-solo',
    categories: ['rural', 'estruturas'],
    image: projectImage('estrutura-paineis-rural-solo.jpg'),
    alt: 'Fileira de painéis solares apoiados em estrutura de madeira no solo em ambiente rural',
    title: 'Estrutura de solo em propriedade rural',
    summary:
      'Painéis apoiados em estrutura de madeira tratada quando o telhado não é a melhor opção para o projeto.',
    highlights: ['Montagem no solo', 'Rural', 'Estrutura sob medida'],
    badges: ['Energia solar rural', 'Estruturas e equipamentos'],
    fit: 'cover',
    position: 'center 45%',
  },
  {
    id: 'rural-madeira',
    categories: ['rural'],
    image: projectImage('instalacao-solar-rural-madeira.jpg'),
    alt: 'Conjunto de painéis solares em estrutura de madeira diante de edificação rural',
    title: 'Sistema rural com estrutura de madeira',
    summary:
      'Instalação em ambiente rural com estrutura de apoio adaptada ao terreno e à rotina de consumo da propriedade.',
    highlights: ['Ambiente rural', 'Estrutura de apoio', 'Projeto no local'],
    badges: ['Energia solar rural'],
    fit: 'cover',
    position: 'center 30%',
  },
  {
    id: 'off-grid-easun',
    categories: ['off-grid', 'quadros'],
    image: projectImage('sistema-inversor-baterias-off-grid.jpg'),
    alt: 'Inversor híbrido EASUN com quadros de proteção e banco de baterias conectado',
    title: 'Sistema híbrido com banco de baterias',
    summary:
      'Inversor híbrido, proteções elétricas e baterias integrados com eletrodutos organizados e identificação da Good Sollar.',
    highlights: ['Off-grid', 'Baterias', 'Inversor híbrido'],
    badges: ['Sistemas off-grid', 'Quadros e inversores'],
    fit: 'cover',
    position: 'center 42%',
  },
  {
    id: 'off-grid-deye',
    categories: ['off-grid', 'quadros'],
    image: projectImage('quadro-inversor-hibrido-baterias.jpg'),
    alt: 'Inversor híbrido com bateria e quadros de proteção instalados em parede com eletrodutos',
    title: 'Inversor híbrido e armazenamento',
    summary:
      'Conjunto de inversor, proteções e bateria montado com conduítes alinhados e rotas elétricas definidas desde o projeto.',
    highlights: ['Armazenamento', 'Proteções', 'Instalação interna'],
    badges: ['Sistemas off-grid', 'Quadros e inversores'],
    fit: 'cover',
    position: 'center 38%',
  },
  {
    id: 'off-grid-moura',
    categories: ['off-grid', 'quadros'],
    image: projectImage('sistema-hibrido-easun-baterias.jpg'),
    alt: 'Sistema solar híbrido com inversor, quadros identificados e baterias Moura conectadas',
    title: 'Integração completa de inversor e baterias',
    summary:
      'Painel técnico com inversor, disjuntores, aterramento e baterias conectadas com cabeamento organizado e identificado.',
    highlights: ['Baterias Moura', 'Quadros identificados', 'Sistema híbrido'],
    badges: ['Sistemas off-grid', 'Quadros e inversores'],
    fit: 'cover',
    position: 'center 35%',
  },
  {
    id: 'quadro-controle',
    categories: ['eletrica'],
    image: projectImage('quadro-controle-organizado.jpg'),
    alt: 'Quadro elétrico externo com controlador digital, disjuntores e cabeamento organizado',
    title: 'Quadro de comando com controlador digital',
    summary:
      'Caixa de comando com controlador, proteções e cabeamento curvado de forma técnica para operação e manutenção.',
    highlights: ['Controlador digital', 'Proteções', 'Instalação externa'],
    badges: ['Instalações elétricas'],
    fit: 'cover',
    position: 'center 45%',
  },
  {
    id: 'transporte-paineis',
    categories: ['estruturas'],
    image: projectImage('transporte-paineis-solares.jpg'),
    alt: 'Painéis solares presos e protegidos no compartimento de uma caminhonete para transporte',
    title: 'Transporte seguro de equipamentos',
    summary:
      'Painéis presos e protegidos para deslocamento até o local da instalação, com cuidado no manuseio do material.',
    highlights: ['Logística', 'Proteção do material', 'Campo'],
    badges: ['Estruturas e equipamentos'],
    fit: 'cover',
    position: 'center 50%',
  },
]

export function filterRealProjects(categoryId) {
  if (categoryId === 'all') return realProjects

  if (categoryId === 'solar') {
    return realProjects.filter((project) => project.categories.includes('residencial'))
  }

  if (categoryId === 'rural') {
    return realProjects.filter((project) => project.categories.includes('rural'))
  }

  if (categoryId === 'off-grid') {
    return realProjects.filter((project) => project.categories.includes('off-grid'))
  }

  if (categoryId === 'eletrica') {
    return realProjects.filter(
      (project) =>
        project.categories.includes('eletrica') || project.categories.includes('quadros'),
    )
  }

  return realProjects
}
