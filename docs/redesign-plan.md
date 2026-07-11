# Plano de Redesign — Good Sollar

**Data:** 10/07/2026  
**Base:** `docs/reference-strategy.md` · `docs/design-audit.md` · `design-intelligence-library/`  
**Conceito:** *Catálogo editorial de energia* — precisão técnica (Acron) + humanidade fotográfica (BridgeBio), em navy e âmbar Good Sollar  
**Escopo:** plano implementável — nenhum código alterado nesta etapa

---

## Direção criativa transversal

O redesign traduz a marca solar em linguagem visual concreta:

| Tema | Tradução visual |
|------|-----------------|
| **Energia solar / luz** | Fotografia real com luz natural; overlay que simula incidência solar (gradiente quente → frio); âmbar `#f5a623` reservado a momentos de decisão |
| **Movimento solar** | Entradas laterais das fotografias (como painéis entrando no telhado); sem loops infinitos — movimento único, orientador |
| **Geometria de painéis** | Linhas de grid expostas no hero (desktop) evocam módulos fotovoltaicos; números 01–04 em Services como capítulos de instalação |
| **Transformação de imóveis e negócios** | Bloco editorial de proposta fala de antes/depois na fatura; depoimentos por segmento (casa, comércio, campo) |
| **Economia** | Métricas display (+500, 6 anos, payback nos accordions); números em navy sobre fundo escuro |
| **Sustentabilidade** | Presente no copy, não como ícone genérico de folha — integrado à proposta editorial |
| **Credibilidade / projetos reais** | Fotos de instalações reais; CNPJ, endereço, WhatsApp 24h; depoimento editorial com nome e contexto |

**Temas de superfície (3, não 6):**

| Token | Uso | Fundo |
|-------|-----|-------|
| `theme-light` | Hero pós-scroll, Services, HowItWorks, Testimonials | Neutro claro `#eef1f6` / branco |
| `theme-accent` | Proposta (#beneficios) + Contato (#contato) | Âmbar `#f5a623` |
| `theme-dark` | Faixa de métricas em About | Navy `#0d1b33` |

**Nota sobre referências visuais:** os `analysis.md` descrevem screenshots (`full-page`, `about.png`) e vídeos (`hero.mp4`, `secao1.mp4`, `hero-animation*.mp4`) que não estão versionados no repositório da biblioteca. Este plano deriva dos textos de análise e dos padrões extraídos — não de cópia visual direta.

---

## Infraestrutura compartilhada (pré-requisito)

Antes ou em paralelo à Fase 1, criar:

| Item | Descrição | Arquivos prováveis |
|------|-----------|-------------------|
| Hook `useScrollReveal` | IntersectionObserver; `opacity` + `translateY(16px)` → `0`; `once: true` | `src/hooks/useScrollReveal.js` |
| Hook `useHeaderScroll` | Detecta scroll > 80px; alterna classes `header--top` / `header--scrolled` | `src/hooks/useHeaderScroll.js` |
| Componente `ScrollReveal` | Wrapper que aplica classes de reveal | `src/components/ui/ScrollReveal.jsx` |
| Tokens de tema | `.theme-light`, `.theme-accent`, `.theme-dark` substituem `.section-surface-*` + removem `.section-glow` | `src/styles/index.css` |
| Escala tipográfica | 4 níveis: `--text-display`, `--text-title`, `--text-body`, `--text-label` | `src/styles/index.css` `@theme` |
| Dados de serviços | Array com `number`, `title`, `description`, `image`, `accordionItems[]` | `src/data/services.js` (novo) |
| Otimização de imagens | WebP/AVIF + `srcset`; meta ≤ 400 KB por foto | `public/images/brand/` + `images.js` |

---

## Header / Navegação

### Diagnóstico atual

Barra fixa opaca (`bg-primary-100/95`) desde o topo — não integrada ao hero fotográfico. Menu desktop só aparece em `xl` (1280px); entre `lg` e `xl` o usuário fica sem links. São **7 itens** de navegação (acima do limite de 6 das regras). CTA "Orçamento grátis" oculto em telas `< sm`. Mobile menu sem focus trap, sem Escape, sem `aria-modal`.

### Decisão

**Ajustar**

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | Acron Energy Upgrades |
| **Parte utilizada** | Nav com cor adaptativa ao contexto — branco/claro sobre hero, escuro/sólido ao scrollar |
| **Padrão relacionado** | `navigation.md` → Nav com cor adaptativa ao contexto |
| **Motivo** | Hero é fotográfico com overlay; nav transparente no topo melhora imersão e legibilidade sobre a luz solar da foto |

### Princípio adaptado

- **Navegação:** estado dual (`--top` / `--scrolled`) com transição de 250ms
- **Composição:** logo + links + CTA; reduzir para 6 âncoras
- **Interação:** links com underline/wipe existente (`.nav-link`); indicador de seção ativa via `IntersectionObserver` (cor âmbar + peso 600)
- **Tratamento visual:** sem borda pesada no topo; backdrop-blur leve só após scroll

### Adaptação para a Good Sollar

Nav **clara/transparente** sobre o hero solar (texto navy escuro sobre gradiente claro da foto), não branca sobre céu azul como na Acron. Ao scrollar, fundo branco sólido com sombra mínima — evoca painel técnico limpo, não startup glass. Logo Good Sollar permanece; links renomeiam "Benefícios" → "Por que solar" apontando para `#proposta`.

### Estrutura desktop

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo Good Sollar]    Início · Serviços · … · Contato    [Orçamento grátis] │
└─────────────────────────────────────────────────────────────┘
  altura: 64px (lg: 80px) · max-width: 1280px · links gap 4px
  estado --top: bg transparent, border transparent, text primary-900
  estado --scrolled: bg white/95, border primary-200/50, backdrop-blur
```

**Links finais (6):** Início · Por que solar · Serviços · Como funciona · Sobre · Contato  
*(Depoimentos acessível via scroll ou link secundário no footer — não no menu principal)*

### Estrutura mobile

- Hamburger visível até `lg` (1024px), não `xl`
- CTA compacto **sempre visível** à esquerda do hamburger: pill âmbar "Orçamento" (ícone WhatsApp + label curto)
- Drawer lateral direito mantido; adicionar focus trap + `Escape` para fechar
- Links em lista vertical com alvos ≥ 48px de altura
- Overlay escuro `primary-900/50` (não slate genérico)

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | `scrollY > 80` |
| **Estado inicial** | `--top`: transparente |
| **Estado final** | `--scrolled`: fundo sólido + blur |
| **Propriedades** | `background-color`, `border-color`, `box-shadow` |
| **Duração** | 250ms |
| **Easing** | `ease-out` |
| **prefers-reduced-motion** | Troca instantânea de estado, sem transição |

Transição do drawer mobile: `translateX(100%)` → `0`, 280ms `ease-out`.

### Conteúdo necessário

- **Alterar copy:** renomear item "Benefícios" → "Por que solar"
- **Manter:** URLs WhatsApp, logo, demais labels
- **Remover da nav:** item "Depoimentos" (permanece na página)

### Arquivos afetados

- `src/components/layout/Header.jsx`
- `src/components/layout/MobileMenu.jsx`
- `src/components/ui/NavLink.jsx`
- `src/hooks/useHeaderScroll.js` (novo)
- `src/styles/index.css` (classes `.header--top`, `.header--scrolled`)

---

## Hero (`#inicio`)

### Diagnóstico atual

Foto full-bleed existe, mas composição é template: badge + H1 gradiente + 2 CTAs + glass panel com avatars falsos + 3 stats glassmorphism + blur orbs decorativos. Compete com a regra Hero §1 (uma proposta, um CTA primário). Stats e social proof fake diluem foco. Grid de engenharia inexistente.

### Decisão

**Redesenhar**

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | BridgeBio |
| **Parte utilizada** | Hero full-bleed com grid exposto + CTA ancorado em célula de grid |
| **Padrão relacionado** | `heroes.md` → Hero full-bleed com grid exposto · CTA ancorado em célula de grid |
| **Motivo** | Good Sollar já possui fotografia real de instalação (`01-hero.png`); o padrão estrutura a mídia com precisão de engenharia solar sem exigir vídeo |

### Princípio adaptado

- **Composição:** foto 100% viewport width; overlay gradiente lateral (luz → sombra) para legibilidade; linhas de grid horizontais/verticais via pseudo-elementos (só desktop)
- **Tipografia:** H1 display curto (5–8 palavras); subheadline em corpo; sem gradiente no headline — contraste por peso, não por efeito SaaS
- **Ritmo:** hero ~72–80vh desktop, ~85vh mobile — above the fold com CTA visível
- **Movimento:** entrada staggered mínima (headline → sub → CTA, total < 800ms); foto estática (sem vídeo)
- **Interação:** um CTA primário âmbar; link secundário texto "Ver projetos ↓" ancora `#servicos`

### Adaptação para a Good Sollar

Grid exposto evoca **geometria de painéis fotovoltaicos** — linhas finas brancas/navy a 15% opacidade, não o grid arquitetônico corporativo da BridgeBio. CTA ancorado no canto inferior direito em bloco âmbar sólido ("Quero meu orçamento grátis →"), como célula de um array solar. Overlay quente à esquerda simula **luz solar incidente** sobre telhado. Sem vídeo (orçamento de produção); foto `01-hero.png` otimizada com crop mobile dedicado.

### Estrutura desktop

```
┌──────────────────────────────────────────────────────────────┐
│  [Nav transparente]                                          │
│  ┊ (grid lines)                                              │
│  ┊  H1 display                                               │
│  ┊  Subheadline (max 34rem)                                  │
│  ┊  link secundário                                          │
│  ┊                                    ┌──────────────────┐   │
│  ┊                                    │ CTA âmbar block  │   │
│  ─────────────────────────────────────└──────────────────┘   │
│           [foto full-bleed: instalação residencial]          │
└──────────────────────────────────────────────────────────────┘
  min-height: 72vh · grid lines: 1px white/20% · H1 ~2.75rem–3rem
  CTA block: ~280×64px, canto inf. direito, alinhado ao grid
```

Proporções: texto ocupa colunas 1–5 de grid 12; foto preenche fundo; CTA na coluna 9–12, row inferior.

### Estrutura mobile

- **Ordem:** foto ocupa 45% superior do viewport; conteúdo empilhado abaixo sobre fundo `theme-light` sólido (não texto sobre foto — legibilidade)
- **Crop da foto:** `object-position: center 30%` — foco nos painéis, não no céu
- **CTA:** largura total, fixo visualmente na base do bloco de conteúdo (não flutuante)
- **Removido:** stats, avatars, badge "Atendemos todo o Brasil" (informação migra para proposta/about)
- **Altura total:** ~90vh máximo; headline `text-[1.75rem]`, sub `text-base`
- **Grid lines:** ocultas (`display: none`)

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | mount (hero above fold) |
| **Estado inicial** | headline `opacity: 0, translateY(24px)`; sub `translateY(16px)`; CTA `translateY(12px)` |
| **Estado final** | `opacity: 1, translateY(0)` |
| **Propriedades** | `transform`, `opacity` |
| **Duração** | 400ms headline, +80ms sub, +80ms CTA (total 560ms) |
| **Easing** | `cubic-bezier(0.4, 0, 0.2, 1)` |
| **prefers-reduced-motion** | Todos visíveis imediatamente, `animation: none` |

Foto: sem parallax (performance mobile). Opcional: overlay gradiente com `opacity` 0.92 → 0.85 no scroll (sutil, ≤200ms).

### Conteúdo necessário

- **Alterar copy:** enxugar H1 para ≤ 10 palavras; subheadline carrega detalhe (Brasília, WhatsApp, orçamento grátis)
- **Substituir imagem:** otimizar `01-hero.png` → WebP; criar crop mobile `01-hero-mobile.webp`
- **Remover:** avatars, stats strip, badge, segundo botão sólido
- **Manter:** mensagem central de economia (95%), CTA WhatsApp

**Copy sugerido:**

- H1: "Energia solar que reduz sua conta de luz"
- Sub: "Instalação residencial, comercial e rural em todo o Brasil. Orçamento gratuito pelo WhatsApp — resposta em minutos."
- CTA: "Quero meu orçamento grátis"

### Arquivos afetados

- `src/components/sections/HeroSection.jsx` (rewrite)
- `src/styles/index.css` (`.hero-grid-lines`, `.hero-cta-cell`, remover `.hero-stat`, `.glass-panel`)
- `src/data/images.js`
- `public/images/brand/` (novos crops)

---

## Proposta / Por que solar (`#proposta`)

*(Substitui `BenefitsSection` — id alterado de `#beneficios` para `#proposta`)*

### Diagnóstico atual

Grid 2×2 de ícones Lucide (PiggyBank, Leaf, House, Globe) — feature grid SaaS intercambiável. Os quatro benefícios reformulam a mesma ideia (economia + sustentabilidade). Split com imagem genérica. Badge + SectionHeading repetem fórmula de template.

### Decisão

**Substituir**

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | Acron Energy Upgrades |
| **Parte utilizada** | Bloco editorial de proposta — parágrafo display full-bleed após hero |
| **Padrão relacionado** | `sections.md` → Bloco editorial de proposta |
| **Motivo** | Ponte narrativa entre impacto (hero) e catálogo (services); concentra economia + sustentabilidade + valorização em um manifesto, não quatro caixas |

### Princípio adaptado

- **Composição:** bloco full-bleed âmbar; parágrafo único em escala display; label superior opcional
- **Tipografia:** display 32–48px, `line-height: 1.1`, peso 700, cor `primary-900`
- **Ritmo:** padding vertical 80–128px; contraste máximo com hero claro e services neutro
- **Movimento:** reveal por scroll — fade + slide up 20px
- **Organização:** 1 ideia; sem cards

### Adaptação para a Good Sollar

Bloco âmbar = **luz solar capturada** — primeira aparição da cor de ação. Texto fala de transformação concreta: "Seu telhado vira usina. Sua fatura cai. Seu imóvel vale mais." — não bullets de ícone. Label superior: "Por que solar agora". Sem Splitting.js (dependência pesada da Acron); reveal simples via IntersectionObserver.

### Estrutura desktop

```
┌──────────────────────────────────────────────────────────────┐
│ ■■■■■■■■■■■■■■ FUNDO ÂMBAR #f5a623 ■■■■■■■■■■■■■■■■■■■■■■■ │
│                                                              │
│     [label: Por que solar agora]                             │
│                                                              │
│     "Cada m² de telhado que recebe sol                       │
│      é economia que você deixa de pagar                      │
│      à concessionária — mês após mês."                       │
│                    (display, max-width: 48rem)               │
│                                                              │
│     link secundário: Ver tipos de projeto →                  │
└──────────────────────────────────────────────────────────────┘
  padding: 96px 0 · texto alinhado à esquerda dentro de Container 1280px
```

### Estrutura mobile

- Padding 64px vertical; display `text-[1.625rem]` (26px)
- Label acima; link "Ver projetos" como botão texto full-width abaixo do parágrafo
- Sem imagem lateral — bloco tipográfico puro (densidade invertida vs. desktop hero+ foto)

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | IntersectionObserver threshold 0.2 |
| **Estado inicial** | `opacity: 0, translateY(20px)` |
| **Estado final** | `opacity: 1, translateY(0)` |
| **Propriedades** | `transform`, `opacity` |
| **Duração** | 600ms |
| **Easing** | `ease-out` |
| **prefers-reduced-motion** | Visível sem animação |

### Conteúdo necessário

- **Alterar copy:** novo parágrafo manifesto (substituir 4 cards); sintetizar benefícios atuais
- **Remover:** grid de ícones, imagem lateral, SectionHeading padrão
- **Manter:** link para `#servicos`
- **Redirect:** `#beneficios` → `#proposta` (redirect ou manter id antigo por compatibilidade SEO — decidir na implementação)

### Arquivos afetados

- `src/components/sections/BenefitsSection.jsx` → renomear/reescrever como `ProposalSection.jsx`
- `src/App.jsx` (import + ordem)
- `src/components/layout/Header.jsx` (âncora)
- `src/components/layout/Footer.jsx` (âncora)
- `src/styles/index.css` (`.theme-accent`, remover `.section-surface-brand` desta seção)

---

## Serviços (`#servicos`)

### Diagnóstico atual

Quatro blocos alternados imagem/texto com ícone Lucide — **a seção mais genérica do site**. Scroll longo no mobile (4 pares completos). Repete anatomia idêntica. "Mais pedido" badge é único diferencial, insuficiente. Sem densidade técnica (potência, prazo, homologação).

### Decisão

**Redesenhar** *(maior intervenção visual)*

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | Acron Energy Upgrades |
| **Parte utilizada** | Módulo com número oversized + headline sticky + visual sobreposto + accordion técnico |
| **Padrão relacionado** | `sections.md` → Módulo com número oversized · Headline sticky com visual sobreposto · Accordion técnico numerado |
| **Motivo** | Mesmo setor energia; transforma catálogo genérico em assinatura visual do site; accordion resolve densidade técnica sem alongar scroll |

### Princípio adaptado

- **Composição:** 4 módulos empilhados; cada um com número display `01–04` em âmbar, título sticky, foto real com overlap
- **Tipografia:** número em escala display (~6–8rem desktop); título módulo em `--text-title`
- **Ritmo:** módulo ocupa ~80–100vh desktop; padding generoso entre módulos (64px)
- **Interação:** accordion 3–4 itens por serviço (potência típica, prazo, homologação, economia estimada)
- **Movimento:** foto entra com translateX lateral; accordion hover com expansão de gap

### Adaptação para a Good Sollar

Números `01–04` rotulam **tipos de instalação**, não equipamentos 3D. Fotos reais (`03-residencial.png`, etc.) substituem renders Acron. Accordion items falam de **projeto real**: "Dimensionamento por consumo", "Homologação ANEEL/concessionária", "Prazo médio de instalação" — linguagem solar brasileira. Fundo neutro quente (`theme-light`), sem mud `#DDDDD4` da Acron. Residencial mantém tag "Mais pedido" integrada ao título, não flutuando sobre foto.

### Estrutura desktop

```
┌─ Módulo 01 ──────────────────────────────────────────────────┐
│  01          [sticky]                    ┌──────────────┐     │
│  (display)   Residencial                 │              │     │
│              Painéis dimensionados       │   foto real  │     │
│              pelo seu consumo.           │   overlap    │     │
│                                          └──────────────┘     │
│  ── accordion ──────────────────────────────────────────────  │
│  ○ Dimensionamento    +                                     │
│  ○ Homologação        +                                     │
│  ○ Prazo de instalação +                                    │
└──────────────────────────────────────────────────────────────┘
  grid: 5 col — número (1) + conteúdo sticky (2) + foto overlap (2-3)
  número: text-[6rem] lg:text-[8rem] font-bold text-accent-500/90
```

Alternância: módulos 02 e 04 invertem ordem foto/texto.

### Estrutura mobile

- **Não replicar sticky/overlap agressivo** — empilhamento: número + título → foto full-width (aspect 16/10) → accordion
- Accordion colapsado por padrão; **1 item aberto por vez**
- Módulos separados por borda horizontal `border-primary-200` (capítulo visual)
- Número display reduzido para `text-[4rem]`, posicionado à esquerda do título (inline), não acima
- CTA compacto ao final de cada módulo: "Orçamento para residencial →" (WhatsApp com mensagem pré-preenchida por tipo)

### Movimento

**Foto por módulo:**

| Campo | Valor |
|-------|-------|
| **Gatilho** | IntersectionObserver threshold 0.15 |
| **Estado inicial** | `opacity: 0, translateX(±40px)` (direção alternada por módulo) |
| **Estado final** | `opacity: 1, translateX(0)` |
| **Duração** | 700ms |
| **Easing** | `ease-out` |

**Accordion hover (desktop):**

| Campo | Valor |
|-------|-------|
| **Gatilho** | `:hover`, `:focus-visible` |
| **Propriedades** | `gap` 1rem → 2rem; círculo indicador preenche âmbar |
| **Duração** | 200ms |
| **prefers-reduced-motion** | Sem expansão de gap; toggle instantâneo |

**Accordion expand:**

| Campo | Valor |
|-------|-------|
| **Gatilho** | click |
| **Propriedades** | `grid-template-rows: 0fr → 1fr` (CSS grid trick, performático) |
| **Duração** | 250ms |
| **Easing** | `ease-in-out` |

### Conteúdo necessário

- **Alterar copy:** títulos enxutos; accordion items com dados técnicos reais por serviço
- **Substituir imagem:** otimizar 4 fotos de serviço
- **Incluir dados:** potência típica (kWp), prazo (dias), economia (%), por tipo — validar com cliente
- **Manter:** 4 categorias (Residencial, Empresarial, Rural, Off Grid), descrições base
- **Adicionar:** mensagens WhatsApp diferenciadas por serviço

**Accordion sugerido (Residencial 01):**

1. Dimensionamento — "Calculamos kWp pelo seu histórico de consumo"
2. Instalação — "Equipe própria, 1–3 dias no telhado"
3. Homologação — "Documentação completa com a concessionária local"
4. Economia — "Redução de até 95% na tarifa de energia"

### Arquivos afetados

- `src/components/sections/ServicesSection.jsx` (rewrite)
- `src/components/ui/ServiceModule.jsx` (novo)
- `src/components/ui/TechnicalAccordion.jsx` (novo)
- `src/data/services.js` (novo)
- `src/data/contact.js` (mensagens WhatsApp por serviço)
- `src/data/images.js`
- `src/styles/index.css` (`.service-module`, `.module-number`, accordion)

---

## Como funciona (`#como-funciona`)

### Diagnóstico atual

Quatro cards "Etapa 01–04" com ícones — colide visualmente com numeração oversized proposta para Services. Grid 4 colunas espremido. Mesma fórmula feature-card.

### Decisão

**Ajustar**

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | Regras da biblioteca + princípio Acron (secundário) |
| **Parte utilizada** | Sequência de passos com conectores — **sem** números monumentais |
| **Padrão relacionado** | `sections.md` → Como funciona / passos |
| **Motivo** | Informação de apoio ao funil; monumentalidade reservada a Services |

### Princípio adaptado

- **Composição:** timeline horizontal com conectores (desktop); vertical com linha lateral (mobile)
- **Tipografia:** título seção + 4 passos com label pequeno ("Passo 1") — não "Etapa 01" display
- **Ritmo:** seção compacta (~60% densidade de Services); fundo `theme-light` alternado
- **Movimento:** scroll reveal no container; stagger 80ms entre passos

### Adaptação para a Good Sollar

Timeline evoca **fluxo de energia**: ícones simples (linha, não caixa) conectados por linha âmbar contínua — do orçamento à homologação. Passos renomeados para linguagem do cliente: "Você pede orçamento" → "Projeto sob medida" → "Instalação" → "Conta menor". Sem cards com borda — passos flutuam sobre fundo claro.

### Estrutura desktop

```
        Passo 1          Passo 2          Passo 3          Passo 4
          ●────────────────●────────────────●────────────────●
       Orçamento       Projeto         Instalação      Homologação
       gratuito        personalizado    no telhado      + economia
```

Grid 4 colunas iguais; linha conectora `border-t-2 border-accent-400` com círculos âmbar nos nós.

### Estrutura mobile

- Timeline **vertical** à esquerda: linha vertical âmbar + círculos
- Passos empilhados à direita da linha; cada passo = título + 1 linha descrição
- Altura total ~auto; padding 48px vertical
- CTA inline ao final: "Começar pelo WhatsApp →"

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | scroll reveal container |
| **Estado inicial** | passos `opacity: 0, translateY(12px)` |
| **Estado final** | `opacity: 1, translateY(0)` |
| **Stagger** | 80ms entre passos |
| **Duração** | 400ms cada |
| **Easing** | `ease-out` |
| **prefers-reduced-motion** | Todos visíveis; linha conectora estática |

### Conteúdo necessário

- **Alterar copy:** simplificar descrições (1 linha cada); labels "Passo N" em vez de "Etapa 0N"
- **Manter:** sequência lógica existente, 4 etapas
- **Remover:** feature-cards, ícones em caixa

### Arquivos afetados

- `src/components/sections/HowItWorksSection.jsx` (rewrite)
- `src/components/ui/ProcessTimeline.jsx` (novo)
- `src/data/process.js` (novo, opcional)
- `src/styles/index.css` (`.process-timeline`)

---

## Sobre (`#sobre`)

### Diagnóstico atual

Split copy + checklist competente, mas popup flutuante com **float infinito** (`stat-popup-float`) é decorativo e distrai. Stats duplicam hero. SectionHeading + checklist = fórmula repetida.

### Decisão

**Ajustar**

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | BridgeBio |
| **Parte utilizada** | Bloco de métricas em alto contraste |
| **Padrão relacionado** | `sections.md` → Bloco de métricas em alto contraste |
| **Motivo** | Destino adequado para +500 / 6 anos / 24h retirados do hero; cria momento `theme-dark` no ritmo da página |

### Princípio adaptado

- **Composição:** split editorial (copy + foto) seguido de faixa full-bleed navy com 3 métricas
- **Tipografia:** métricas em display (~2.5rem); labels em `--text-label`
- **Ritmo:** bloco arejado (copy) → bloco denso (métricas) — alternância de densidade
- **Movimento:** reveal padrão; métricas estáticas (sem count-up)

### Adaptação para a Good Sollar

Faixa navy = **céu noturno / credibilidade técnica** — contraste com blocos claros e âmbar. Métricas traduzem **projetos reais**: "+500 instalações", "6 anos no mercado", "24h no WhatsApp". Foto da equipe (`02-sobre.png`) mantida sem popup — credibilidade vem da foto, não de badge flutuante. Checklist migrado para copy corrido ou 2 bullets máximo.

### Estrutura desktop

```
┌─ Sobre ──────────────────────────────────────────────────────┐
│  [copy + checklist]              [foto equipe instalando]    │
└──────────────────────────────────────────────────────────────┘
┌─ Métricas (theme-dark) ──────────────────────────────────────┐
│     +500              6 anos              24h                │
│  instalações      de experiência    atendimento WhatsApp     │
└──────────────────────────────────────────────────────────────┘
  split 50/50 · métricas: grid 3 col, padding 64px, fundo primary-900
```

### Estrutura mobile

- Foto **acima** do copy (equipe humaniza antes do texto)
- Checklist compacto (2 itens max visíveis, restante no parágrafo)
- Faixa métricas: grid 1 col empilhado → **3 col apenas em `sm+`**
- Métricas com separador horizontal entre elas em mobile

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | scroll reveal |
| **Estado inicial** | faixa métricas `opacity: 0, translateY(16px)` |
| **Estado final** | `opacity: 1, translateY(0)` |
| **Duração** | 500ms |
| **prefers-reduced-motion** | Estático; **remover** `@keyframes stat-popup-float` e `.stat-popup` |

### Conteúdo necessário

- **Manter:** copy institucional, endereço Brasília, cobertura nacional, CNPJ
- **Substituir imagem:** otimizar `02-sobre.png`
- **Remover:** popup flutuante, highlights redundantes com métricas
- **Manter conteúdo existente:** highlights consolidados no copy

### Arquivos afetados

- `src/components/sections/AboutSection.jsx`
- `src/components/ui/MetricsStrip.jsx` (novo)
- `src/styles/index.css` (remover `.stat-popup*`, adicionar `.theme-dark`, `.metrics-strip`)

---

## Depoimentos (`#depoimentos`)

### Diagnóstico atual

Três splits alternados com quote card + StarRating — repetitivo, cara de marketplace. Mesma estrutura ×3 gera scroll longo. Estrelas e Quote icon genéricos.

### Decisão

**Redesenhar**

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | BridgeBio |
| **Parte utilizada** | Feature alternada lateral — versão editorial (1 destaque + supporting) |
| **Padrão relacionado** | `sections.md` → Feature alternada lateral |
| **Motivo** | Humanizar setor técnico com história real; um case forte converte mais que três blocos iguais |

### Princípio adaptado

- **Composição:** 1 depoimento hero (foto grande + citação display) + 2 depoimentos compactos em lista
- **Tipografia:** citação principal em `--text-display` (~1.5rem); atribuição em label
- **Ritmo:** seção arejada; fundo `theme-light` levemente diferenciado
- **Tratamento visual:** sem estrelas; foto ocupa 55% largura desktop

### Adaptação para a Good Sollar

Depoimento destaque: **Carlos M. (Residencial — Taguatinga)** — quote sobre economia R$ 680 → R$ 80 (prova concreta). Foto `05-depoimento-1.png` grande. Dois secundários (Juliana comércio, Marcos rural) em cards horizontais compactos com foto thumbnail — cobertura dos três segmentos (casa, empresa, campo) sem repetir layout. Sem StarRating — credibilidade vem de números na citação e localização.

### Estrutura desktop

```
┌─ Depoimentos ────────────────────────────────────────────────┐
│  "A conta era R$ 680. Hoje pago menos de R$ 80..."           │
│  (display)                                    ┌────────────┐ │
│  Carlos M. · Taguatinga                     │ foto grande│ │
│                                               └────────────┘ │
│  ─────────────────────────────────────────────────────────── │
│  ┌─ Juliana R. ─────────┐  ┌─ Marcos e Ana ────────────────┐ │
│  │ thumb + quote curta  │  │ thumb + quote curta           │ │
│  └──────────────────────┘  └───────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
  destaque: split 45/55 · secundários: grid 2 col
```

### Estrutura mobile

- Citação display **acima** da foto (leitura primeiro)
- Foto full-width aspect 4/3
- Secundários: cards empilhados com thumb à esquerda (48×48), quote 2 linhas max
- Sem alternância lateral — ordem fixa: destaque → lista

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | scroll reveal |
| **Estado inicial** | citação `opacity: 0, translateY(20px)`; foto `translateX(30px)` |
| **Estado final** | `opacity: 1, translateX/Y(0)` |
| **Duração** | 600ms |
| **Easing** | `ease-out` |
| **prefers-reduced-motion** | Estático |

### Conteúdo necessário

- **Manter conteúdo existente:** 3 depoimentos, nomes, localidades, quotes
- **Remover:** ratings (5 estrelas)
- **Substituir imagem:** otimizar 3 fotos de depoimento
- **Adicionar prova social:** opcional — logo de bairros/regiões atendidas (futuro)

### Arquivos afetados

- `src/components/sections/TestimonialsSection.jsx` (rewrite)
- `src/components/ui/TestimonialFeatured.jsx` (novo)
- `src/components/ui/TestimonialCompact.jsx` (novo)
- `src/data/testimonials.js` (novo, extrair arrays)
- `src/styles/index.css` (remover star styles)

---

## Contato (`#contato`)

### Diagnóstico atual

Form centralizado funcional, mas seção anônima — `section-surface-warm` gradiente genérico. Formulário abre WhatsApp (bom funil). Split info/imagem abaixo repete padrão. Não fecha a "moldura âmbar" aberta na proposta.

### Decisão

**Ajustar** *(maior impacto na conversão)*

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | Acron Energy Upgrades |
| **Parte utilizada** | Bloco de contato com fundo acento (amarelo) + formulário escuro contrastante |
| **Padrão relacionado** | `sections.md` → Alternância temática · CTA final |
| **Motivo** | Segunda aparição do âmbar marca decisão; espelha abertura da proposta |

### Princípio adaptado

- **Composição:** full-bleed âmbar; form em card navy escuro; infos de contato integradas ao card
- **Ritmo:** padding 96px; headline curta + form — sem split imagem/info separado
- **Interação:** form mantém fluxo WhatsApp; validação inline
- **Organização:** CTA final = conversão; imagem de contato removida ou reduzida a detalhe

### Adaptação para a Good Sollar

Bloco âmbar = **sol do meio-dia — hora de decidir**. Card navy escuro evoca **painel solar premium**. Headline: "Receba seu orçamento em minutos". Formulário existente preservado (nome, WhatsApp, tipo de projeto). Infos (endereço, CNPJ, Instagram) dentro do card, abaixo do botão. Sem foto lateral — foco total na conversão.

### Estrutura desktop

```
┌─ Contato (theme-accent) ──────────────────────────────────────┐
│                                                              │
│     H2: Receba seu orçamento em minutos                      │
│     sub: Preencha e abrimos o WhatsApp com seus dados         │
│                                                              │
│              ┌─ card navy ─────────────────────┐             │
│              │  [nome] [whatsapp] [serviço]    │             │
│              │  [Enviar e abrir WhatsApp →]    │             │
│              │  endereço · CNPJ · Instagram    │             │
│              └─────────────────────────────────┘             │
│                    max-width: 28rem, centrado              │
└──────────────────────────────────────────────────────────────┘
```

### Estrutura mobile

- Headline `text-2xl`; card full-width com padding 20px
- Inputs com `min-height: 48px` (alvo toque)
- Botão submit full-width, sticky visual no final do card (não fixed — evita conflito com FAB)
- FAB WhatsApp reposicionado: `bottom: 24px` com safe-area; cor navy/âmbar (ver seção FAB)

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | scroll reveal card |
| **Estado inicial** | card `opacity: 0, translateY(24px)` |
| **Estado final** | `opacity: 1, translateY(0)` |
| **Duração** | 500ms |
| **Easing** | `ease-out` |
| **prefers-reduced-motion** | Estático |

Botão submit: manter microanimação seta (BridgeBio pattern) — `translateX(2px)` hover, 150ms.

### Conteúdo necessário

- **Manter conteúdo existente:** form fields, project types, contact details, CNPJ
- **Alterar copy:** headline/sub mais diretos (já adequados — revisão leve)
- **Remover:** split imagem/info abaixo do form; `ImageSlot` desta seção
- **Manter:** lógica `handleSubmit` → WhatsApp

### Arquivos afetados

- `src/components/sections/ContactSection.jsx` (rewrite layout)
- `src/components/ui/Card.jsx` (variante `dark`)
- `src/styles/index.css` (`.theme-accent`, form dark styles)

---

## Footer

### Diagnóstico atual

Estrutura funcional em grid 4 colunas. **Logo escuro sobre fundo navy** (`primary-900`) — contraste insuficiente (violação WCAG). 7 links repetem nav. Sem wordmark monumental (correto — descartado da BridgeBio).

### Decisão

**Ajustar**

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | Regras da biblioteca |
| **Parte utilizada** | Logo monocromática clara sobre fundo escuro |
| **Padrão relacionado** | `navigation.md` → Padrões de logo |
| **Motivo** | Correção técnica de contraste; footer é ancora de credibilidade |

### Princípio adaptado

- **Tratamento visual:** logo versão clara/branca; links com hover âmbar
- **Organização:** 6 links alinhados à nav; colunas simplificadas
- **Tipografia:** labels uppercase pequenos; corpo `text-sm`

### Adaptação para a Good Sollar

`BrandLogo` ganha prop `variant="light"` usando `goodsollar-logo-light.svg` ou filtro CSS `brightness(0) invert(1)` como fallback. Footer = **solo técnico** — navy sólido, sem gradiente. CNPJ e copyright visíveis.

### Estrutura desktop

Grid 4 col: Logo+desc (2 col) · Nav · Contato · Horário/Instagram. Padding 48–64px.

### Estrutura mobile

Stack: logo → nav links (2 col grid) → contato → copyright. Padding bottom 80px (clearance FAB).

### Movimento

Sem animação. Links: `color` transition 150ms hover.

### Conteúdo necessário

- **Manter:** endereço, WhatsApp, CNPJ, Instagram, copyright
- **Alterar copy:** alinhar links à nav (6 itens)
- **Substituir:** logo por variante clara

### Arquivos afetados

- `src/components/layout/Footer.jsx`
- `src/components/ui/BrandLogo.jsx` (prop `variant`)
- `public/images/brand/` (confirmar logo light)

---

## WhatsApp FAB

### Diagnóstico atual

Círculo verde `bg-emerald-500` — cor da plataforma, não da marca. Único elemento mais dissonante visualmente. Hover scale genérico (`.btn-motion-fab`).

### Decisão

**Ajustar**

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | BridgeBio |
| **Parte utilizada** | Microanimação de ícone em CTA |
| **Padrão relacionado** | `motion.md` → Microanimação de ícone em CTA |
| **Motivo** | Manter função; alinhar visual à marca |

### Princípio adaptado

- **Tratamento visual:** fundo navy `primary-800`; ícone WhatsApp branco; anel âmbar sutil no hover
- **Interação:** ícone desloca 2px no hover (não scale do botão inteiro)

### Adaptação para a Good Sollar

FAB navy com ícone verde WhatsApp **dentro** (reconhecível), ou ícone branco com badge verde pequeno — testar contraste. Posição mantida; `z-index` abaixo do menu mobile.

### Estrutura desktop / mobile

- 56×56px; `bottom: 24px; right: 24px`
- Mobile: mesma posição; não ocultar (diferente de Voe Alto)

### Movimento

| Campo | Valor |
|-------|-------|
| **Gatilho** | hover/focus |
| **Propriedades** | ícone `translateX(2px)`; shadow aumenta |
| **Duração** | 150ms |
| **prefers-reduced-motion** | Sem deslocamento |

### Conteúdo necessário

- **Manter:** link WhatsApp existente

### Arquivos afetados

- `src/components/layout/WhatsAppButton.jsx`
- `src/styles/index.css` (ajustar `.btn-motion-fab` ou remover scale)

---

## DifferentiatorsSection (código morto)

### Diagnóstico atual

Seção completa não importada em `App.jsx`; placeholders tracejados; duplica conteúdo de proposta + métricas.

### Decisão

**Remover**

### Referência selecionada

Nenhuma.

### Arquivos afetados

- `src/components/sections/DifferentiatorsSection.jsx` (deletar)
- `src/components/ui/BrandImage.jsx` (deletar)
- `src/components/ui/ImagePlaceholder.jsx` (deletar)

---

## Motion global (transversal)

### Diagnóstico atual

`.btn-motion` scale/lift em tudo; zero scroll reveal; float infinito; glow orbs estáticos em 5 seções. Viola Motion §1 (decorar vs. orientar).

### Decisão

**Redesenhar**

### Referência selecionada

| Campo | Valor |
|-------|-------|
| **Nome** | BridgeBio (base) + Acron (detalhes) |
| **Parte utilizada** | Scroll reveal institucional; entrada lateral; hover gap accordion |
| **Padrão relacionado** | `motion.md` → Scroll reveal institucional · Entrada lateral por intersect · Hover com expansão de gap |
| **Motivo** | Motion único, funcional, com fallback |

### Princípio adaptado

- Remover: `.section-glow`, `stat-popup-float`, scale hover em cards
- Manter: seta CTA deslocando (150ms)
- Adicionar: `ScrollReveal` wrapper global; `@media (prefers-reduced-motion: reduce)` zerando animações
- Performance: animar só `transform` + `opacity`

### Arquivos afetados

- `src/styles/index.css` (limpeza)
- `src/hooks/useScrollReveal.js` (novo)
- `src/components/ui/ScrollReveal.jsx` (novo)
- Todos os componentes de seção

---

## Ordem de implementação

### Fase 1 — Header e Hero *(prioridade 1)*

1. Infraestrutura: tokens de tema, escala tipográfica, `useHeaderScroll`, `ScrollReveal`
2. Header: nav adaptativa, 6 links, breakpoint `lg`, CTA sempre visível mobile
3. Hero: grid exposto, CTA célula, remoção avatars/stats, otimização imagem
4. Mobile menu: focus trap + Escape

**Entregável:** primeira impressão editorial; nav funcional em todas as larguras.

---

### Fase 2 — Serviços *(seção mais genérica — prioridade 2)*

1. `src/data/services.js` com accordion content
2. `ServiceModule.jsx` + `TechnicalAccordion.jsx`
3. Rewrite `ServicesSection.jsx` — 4 módulos numerados
4. Motion: entrada lateral fotos + accordion

**Entregável:** assinatura visual do site; fim do split alternado genérico.

---

### Fase 3 — Contato *(maior impacto conversão — prioridade 3)*

1. Rewrite `ContactSection.jsx` — bloco âmbar + card navy
2. FAB WhatsApp recolorido
3. Remover split imagem/info

**Entregável:** moldura de conversão fechada (proposta âmbar → contato âmbar).

---

### Fase 4 — Demais seções *(prioridade 4)*

1. **Proposta** — substituir `BenefitsSection` (depende de Fase 1 para ritmo âmbar)
2. **Como funciona** — timeline vertical/horizontal
3. **Sobre** — métricas strip + remoção popup
4. **Depoimentos** — featured + compact
5. Limpeza: remover `DifferentiatorsSection`, glow orbs, código morto
6. Otimização imagens restantes (WebP, srcset)

**Entregável:** narrativa completa em 4 atos; 7 seções coerentes.

---

### Fase 5 — Footer e refinamentos *(prioridade 5)*

1. Footer: logo claro, 6 links, contraste WCAG
2. Unificar `Card.jsx` + `.feature-card` onde restarem
3. `index.html`: corrigir OG logo (remover placeholder Arial Black)
4. Audit final: contraste AA, `prefers-reduced-motion`, alvos toque 44px
5. Atualizar `docs/design-audit.md` pós-implementação

**Entregável:** site merge-ready; documentação atualizada.

---

## Checklist de conformidade (`design-rules.md`)

| Regra | Como o plano atende |
|-------|---------------------|
| Tipografia §1 — 4 níveis | Tokens display/title/body/label |
| Cores §2 — acento com função | Âmbar só em proposta + contato + CTAs |
| Layout §3 — ≥80px seções | `py-20 lg:py-24` em todas |
| Nav §1 — ≤6 itens | 6 links |
| Hero §1 — uma proposta | 1 CTA primário |
| Seções §2 — ≤7 seções | 7 mantidas (proposta substitui benefícios) |
| Motion §5 — reduced motion | Fallback global |
| A11y §2 — toque 44px | Mobile inputs e nav |

---

## Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| Imagens pesadas (2–2.7 MB) | Otimizar na Fase 1 (hero) e Fase 4 (restante) |
| Accordion com conteúdo técnico impreciso | Validar kWp/prazos com cliente antes de publicar |
| `#beneficios` bookmark quebrado | Manter id legado ou redirect JS/CSS |
| Sticky headline em mobile Services | Desabilitar sticky abaixo de `lg` (planejado) |
| Contraste âmbar + texto escuro | Validar WCAG 4.5:1; ajustar para `#0d1b33` sobre `#f5a623` |

---

*Documento gerado a partir de `reference-strategy.md`, código em `src/` e análises em `design-intelligence-library/references/*/analysis.md`. Nenhum código alterado nesta etapa.*
