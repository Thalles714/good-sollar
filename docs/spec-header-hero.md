# Especificação — Header e Hero · Good Sollar

**Versão:** 1.0  
**Data:** 10/07/2026  
**Base:** `docs/reference-strategy.md` · `docs/redesign-plan.md` · Fase 1  
**Escopo:** Header + Hero apenas — sem implementação nesta etapa

---

# Objetivo

Comunicar em até 3 segundos que a Good Sollar instala energia solar real (residencial, comercial e rural) com retorno financeiro concreto na conta de luz, credibilidade técnica e atendimento nacional via WhatsApp.

**Ação primária:** abrir conversa no WhatsApp para orçamento gratuito (`WHATSAPP_URL` em `src/data/contact.js`).

**Ação secundária:** rolar até a seção de serviços (`#servicos`) via link textual — sem competir visualmente com o CTA primário.

**Header:** orientar navegação intra-página sem competir com o hero; manter CTA de orçamento acessível em qualquer largura; ganhar presença sólida apenas após scroll.

---

# Problemas resolvidos

| # | Problema atual | Correção desta entrega |
|---|----------------|------------------------|
| 1 | Header opaco desde o topo (`bg-primary-100/95`) — desconectado da fotografia | Estado `--top` transparente sobre o hero; `--scrolled` após 80px |
| 2 | Nav desktop só em `xl` (1280px) — vazio entre 1024–1280px | Nav inline a partir de `lg` (1024px) |
| 3 | 7 links de navegação (acima do limite de 6) | 6 links; "Depoimentos" removido do menu |
| 4 | CTA header oculto em `< sm` | CTA compacto sempre visível no mobile |
| 5 | Mobile menu sem focus trap, Escape ou `aria-modal` | Drawer acessível com trap + Escape |
| 6 | Hero sobrecarregado: badge + H1 gradiente + 2 CTAs sólidos + avatars + 3 stats + orbs | Uma proposta, um CTA sólido, link secundário textual |
| 7 | Prova social falsa (avatar stack com iniciais) | Removida — migra para About (fora deste escopo) |
| 8 | Stats no hero competem com H1 | Removidos do hero |
| 9 | Texto sobre foto no mobile com gradientes pesados | Mobile: foto isolada no topo; copy em fundo sólido |
| 10 | Sem grid de engenharia / identidade solar | Linhas de grid decorativas no desktop |
| 11 | CTA flutuante genérico (botão pill central) | CTA âmbar ancorado em célula de grid (desktop) |
| 12 | Imagem hero sem otimização (`01-hero.png` ~2MB) | WebP + `srcset` + `fetchpriority="high"` |

---

# Referências utilizadas

## BridgeBio (`references/bridgebio.com`)

| Campo | Definição |
|-------|-----------|
| **Princípio aproveitado** | Hero full-bleed com mídia real + linhas de grid expostas + CTA ancorado em célula de layout (não flutuante) |
| **Padrão** | `patterns/heroes.md` → Hero full-bleed com grid exposto · CTA ancorado em célula de grid |
| **Motivo** | Good Sollar já possui fotografia de instalação; o padrão estrutura mídia + precisão técnica sem exigir vídeo |
| **Não copiar** | Vídeo cinematográfico de fundo; grid arquitetônico branco sobre vídeo; paleta sandstone/sunrise; serif Suisse; CTA full-bleed 100vw no mobile; hero 166vw |
| **Adaptação** | Foto estática PNG/WebP; grid fino navy/branco 15% opacidade evocando painéis FV; overlay lateral quente (luz solar); CTA âmbar `#f5a623` no canto inferior direito; tipografia sans existente (Plus Jakarta Sans) |

## Acron Energy Upgrades (`references/sacron.noenergyupgrades`)

| Campo | Definição |
|-------|-----------|
| **Princípio aproveitado** | Nav com cor adaptativa ao contexto — legível sobre hero, sólida ao scrollar |
| **Padrão** | `patterns/navigation.md` → Nav com cor adaptativa ao contexto |
| **Motivo** | Hero fotográfico com overlay claro à esquerda; nav transparente no topo preserva imersão |
| **Não copiar** | Texto branco sobre céu azul; loader 15s; menu com busca expansível; índice lateral 01–06; amarelo-limão `#F0FF8E` |
| **Adaptação** | Texto navy `#1a2b4c` sobre gradiente claro; scroll > 80px → fundo branco 95% + blur 8px + borda `primary-200/50` |

---

# Estrutura visual

## Ordem dos elementos (DOM)

```
<body>
  <a skip-link>          ← existente em App.jsx, inalterado
  <header>               ← fixed, z-50
    <Container>
      logo | nav (lg+) | [CTA compacto?] | hamburger (< lg)
  <main>
    <section#inicio>     ← hero
      [camada mídia]       ← absolute inset-0 (desktop) / bloco topo (mobile)
      [overlay gradiente]
      [grid lines]         ← desktop lg+ only
      <Container grid>
        [coluna texto]     ← H1, sub, link secundário
        [coluna CTA cell]  ← desktop lg+ only
      </Container>
      [bloco mobile]       ← < lg: foto + conteúdo empilhados
```

## Grid do hero (desktop ≥ 1024px)

| Propriedade | Valor |
|-------------|-------|
| Container | `max-w-7xl` (1280px), padding `px-8` |
| Grid interno | 12 colunas implícitas via CSS Grid |
| Coluna texto | cols 1–5 (~42%) |
| Coluna CTA | cols 9–12, alinhada ao fundo da seção |
| Gap | `gap-x-8` (32px) entre áreas |
| Foto | `absolute inset-0`, `object-cover`, `object-position: right center` |
| Linhas grid | pseudo-elementos: 1 horizontal em 87.5% altura; 1 vertical em 72% largura (referência BridgeBio, adaptada) |

## Proporções e alturas

| Viewport | Altura mínima hero | Comportamento |
|----------|-------------------|---------------|
| Desktop (≥1024px) | `min-height: 72vh` | Conteúdo verticalmente centrado na coluna esquerda; CTA ancorado na base direita |
| Tablet (640–1023px) | `min-height: 80vh` | Layout mobile (foto + bloco sólido) |
| Mobile (<640px) | `max-height: 90vh` total | Foto ~45vh; bloco conteúdo ~45vh |

## Relação texto · imagem · CTA

**Desktop:** foto ocupa 100% do fundo; texto sobrepõe lado esquerdo com overlay legível; CTA em bloco âmbar separado do parágrafo, canto inferior direito, alinhado ao grid — não centralizado.

**Mobile/tablet:** foto no topo (sem texto sobre ela); abaixo, fundo sólido `#eef1f6` com H1 + sub + CTA full-width empilhados.

## Largura máxima

| Elemento | Max-width |
|----------|-----------|
| Container | 1280px (`max-w-7xl`) |
| Subheadline | 34rem (`544px`) — classe `.prose-width` existente |
| H1 | 100% da coluna texto (≈ 540px em desktop) |
| CTA cell desktop | `min-width: 280px`, altura mínima 64px |

---

# Tipografia

## Família

| Papel | Família | Origem |
|-------|---------|--------|
| Display (H1) | Plus Jakarta Sans | `index.html` + `@theme --font-sans` |
| Corpo (sub, nav, CTA) | Plus Jakarta Sans | mesma |

Sem segunda família nesta entrega (escopo Fase 1).

## Escala responsiva

| Elemento | Mobile (<640px) | Tablet (640–1023px) | Desktop (≥1024px) |
|----------|-----------------|---------------------|-------------------|
| **H1** | `2rem` (32px) | `2.25rem` (36px) | `2.75rem` (44px) |
| **Subheadline** | `1rem` (16px) | `1.0625rem` (17px) | `1.0625rem` (17px) |
| **Link secundário** | `0.875rem` (14px) | `0.875rem` | `0.875rem` |
| **CTA primário label** | `1.125rem` (18px) | `1.125rem` | `1rem` (16px) no bloco cell |
| **Nav links** | `1rem` (16px) drawer | — | `0.875rem` (14px) |
| **CTA header compacto** | `0.8125rem` (13px) | `0.875rem` | — (usa botão sm) |

## Peso, line-height, letter-spacing

| Elemento | Weight | Line-height | Letter-spacing |
|----------|--------|-------------|----------------|
| H1 | 800 (`font-extrabold`) | 1.12 | `-0.02em` (`tracking-tight`) |
| Subheadline | 400 | 1.6 (`leading-relaxed`) | normal |
| Nav links | 500 (600 quando ativo) | 1.25 | normal |
| CTA primário | 600 (`font-semibold`) | 1.2 | normal |
| Link secundário | 500 | 1.4 | normal |

## Regras tipográficas

- H1 **sem** gradiente, **sem** `<span>` colorido — cor sólida `primary-900`; destaque numérico (ex.: "95%") pode usar `accent-600` inline se necessário, mas o H1 sugerido não exige.
- Máximo 10 palavras no H1.
- Subheadline carrega contexto (Brasil, WhatsApp, segmentos).

## Copy fechado (implementar literalmente)

| Campo | Texto |
|-------|-------|
| **H1** | Energia solar que reduz sua conta de luz |
| **Subheadline** | Instalação residencial, comercial e rural em todo o Brasil. Orçamento gratuito pelo WhatsApp — resposta em minutos. |
| **CTA primário** | Quero meu orçamento grátis |
| **Link secundário** | Ver tipos de projeto ↓ |
| **CTA header (sm+)** | Orçamento grátis |
| **CTA header compacto (<640px)** | Orçamento |

---

# Cores

Tokens de `@theme` em `src/styles/index.css` — não introduzir novos hex.

## Hero

| Papel | Token / valor | Uso |
|-------|---------------|-----|
| Fundo mobile (bloco conteúdo) | `#eef1f6` (`primary-50` / body bg) | Área abaixo da foto |
| H1 | `#1a2b4c` (`primary-600`) | Texto principal |
| Subheadline | `#475569` (slate-600) | Corpo — contraste ≥4.5:1 sobre `#eef1f6` |
| Link secundário | `#1a2b4c` + underline | Hover: `accent-600` |
| CTA cell fundo | `#f5a623` (`accent-500`) | Bloco âmbar desktop + botão mobile |
| CTA cell texto | `#0d1b33` (`primary-800`) | Label + ícone |
| CTA cell hover | `#e09410` (`accent-600`) | Escurecer 1 step |
| Grid lines | `rgb(255 255 255 / 0.15)` ou `rgb(13 27 51 / 0.12)` | Sobre foto |

## Overlays (desktop, sobre foto)

Camadas empilhadas (`absolute inset-0`):

1. **Gradiente lateral (luz solar):**  
   `linear-gradient(to right, rgb(238 241 246 / 0.95) 0%, rgb(238 241 246 / 0.85) 35%, rgb(238 241 246 / 0.4) 55%, transparent 75%)`

2. **Gradiente inferior (mobile only, se foto+título coexistirem):** não aplicar — mobile não sobrepõe texto.

## Header — estado `--top` (scrollY ≤ 80)

| Papel | Valor |
|-------|-------|
| Background | `transparent` |
| Border-bottom | `transparent` |
| Box-shadow | none |
| Logo | versão padrão (`BrandLogo`) |
| Nav links | `#475569` (slate-600); hover/focus: `#1a2b4c` |
| Nav link ativo | `#e09410` (accent-600) + `font-weight: 600` |
| CTA header | variant `primary` existente (âmbar) |
| Hamburger icon | `#475569` |

## Header — estado `--scrolled` (scrollY > 80)

| Papel | Valor |
|-------|-------|
| Background | `rgb(255 255 255 / 0.95)` |
| Backdrop-filter | `blur(8px)` |
| Border-bottom | `1px solid rgb(213 220 232 / 0.5)` (`primary-200/50`) |
| Box-shadow | `0 1px 3px rgb(13 27 51 / 0.06)` |
| Nav links | `#475569`; demais iguais |

## Mobile drawer

| Papel | Valor |
|-------|-------|
| Overlay | `rgb(8 18 34 / 0.5)` (`primary-900/50`) |
| Panel | `#eef1f6` (`primary-50`) |
| Links | nav-link wipe existente (gradiente âmbar no hover) |

---

# Imagem ou mídia

## Tipo

Fotografia estática — instalação residencial real Good Sollar. **Sem vídeo.**

## Assets

| Asset | Path | Formato | Observação |
|-------|------|---------|------------|
| Desktop | `public/images/brand/01-hero.webp` | WebP | Derivado de `01-hero.png`; meta ≤400 KB |
| Mobile | `public/images/brand/01-hero-mobile.webp` | WebP | Crop vertical; meta ≤250 KB |
| Fallback | `public/images/brand/01-hero.png` | PNG | `<picture>` fallback |

Atualizar `src/data/images.js`:

```js
hero: { src: brand('01-hero.webp'), srcMobile: brand('01-hero-mobile.webp'), fallback: brand('01-hero.png') }
```

## Enquadramento

| Breakpoint | `object-position` | Foco |
|------------|-------------------|------|
| Desktop (≥1024px) | `right center` | Painéis + telhado à direita; área esquerda para overlay |
| Mobile | `center 30%` | Painéis solares, não céu |

## Proporção / área de exibição

| Breakpoint | Container foto | Aspect ratio |
|------------|----------------|--------------|
| Desktop | Full-bleed background | Cobre `72vh` mínimo |
| Mobile | Bloco superior | `aspect-ratio: 16/10`; altura máx ~45vh |

## Tratamento

- Sem filtros CSS além dos overlays gradiente.
- Sem `scale-105` permanente (remover do código atual — evita crop imprevisível).
- Sem blur orbs decorativos.

## Carregamento

```html
<picture>
  <source media="(min-width: 1024px)" srcset="01-hero.webp" type="image/webp" />
  <source media="(max-width: 1023px)" srcset="01-hero-mobile.webp" type="image/webp" />
  <img
    src="01-hero.png"
    alt="Instalação de painéis solares em residência — Good Sollar"
    width="1920"
    height="1080"
    fetchpriority="high"
    decoding="async"
  />
</picture>
```

- `alt` descritivo (não vazio como no código atual).
- LCP: hero image com `fetchpriority="high"`.
- Preload opcional em `index.html`: `<link rel="preload" as="image" href="..." imagesrcset="..." imagesizes="100vw">` apenas para WebP desktop.

---

# Header

## Dimensões

| Propriedade | Mobile | Desktop (≥1024px) |
|-------------|--------|-------------------|
| Altura | `4rem` (64px) — `--header-height` | `5rem` (80px) |
| Position | `fixed inset-x-0 top-0 z-50` | idem |
| Container | `max-w-7xl px-4 sm:px-6 lg:px-8` | idem |

## Navegação desktop (≥1024px)

**6 links — ordem fixa:**

| # | Label | href |
|---|-------|------|
| 1 | Início | `#inicio` |
| 2 | Por que solar | `#proposta` |
| 3 | Serviços | `#servicos` |
| 4 | Como funciona | `#como-funciona` |
| 5 | Sobre | `#sobre` |
| 6 | Contato | `#contato` |

- Layout: logo (flex-shrink-0) · nav (`flex gap-0.5`) · CTA `Button variant="primary" size="sm"`.
- Nav: `hidden lg:flex` (substituir `xl:flex` atual).
- Seção ativa: `IntersectionObserver` com `rootMargin: '-40% 0px -55% 0px'`, threshold `0`; link correspondente recebe classe `nav-link--active`.

## Menu mobile (<1024px)

- Hamburger: visível `< lg` (substituir `xl:hidden`).
- **CTA compacto:** sempre visível à esquerda do hamburger em **todas** larguras `< lg`; em `≥ sm` e `< lg`, usar botão `primary sm` completo "Orçamento grátis".
- Em `< sm` (<640px): pill compacta "Orçamento" (`px-3 py-2`, ícone WhatsApp 16px + label).

### Drawer

| Propriedade | Valor |
|-------------|-------|
| Largura | `max-w-sm` (384px), full-height |
| Posição | `fixed inset-y-0 right-0` |
| Entrada | `translateX(100%)` → `0` |
| Overlay click | fecha menu |
| Focus trap | `@focus-trap/tabs` ou implementação manual: foco cicla dentro do drawer |
| Escape | `keydown Escape` → `onClose()` |
| ARIA | `role="dialog"` `aria-modal="true"` `aria-label="Menu de navegação"` |
| Alvo toque links | `min-height: 48px`, padding vertical `12px` |
| Body scroll | `overflow: hidden` no `<body>` enquanto aberto |

## CTA header

| Breakpoint | Componente | Destino |
|------------|------------|---------|
| ≥640px e <1024px | `Button primary sm` "Orçamento grátis" | `WHATSAPP_URL` |
| ≥1024px | `Button primary sm` "Orçamento grátis" | idem |
| <640px | Pill compacta âmbar | idem |

`target="_blank"` `rel="noopener noreferrer"` em todos.

## Hover

| Elemento | Comportamento |
|----------|---------------|
| Nav links | Wipe âmbar existente (`.nav-link::before` scaleX) — manter |
| CTA header | `background-color` → `accent-400`; **sem** `translateY` scale (remover `.btn-motion` lift no header CTA) |
| Hamburger | `background: primary-200/60` |
| Logo | sem efeito |

## Foco por teclado

- Todos os interativos: `focus-visible:ring-2 ring-accent-500 ring-offset-2`.
- Nav links: outline suprimido no wipe (`outline: none`) mas ring no `:focus-visible` externo ou `box-shadow` equivalente.
- Ordem tab: logo → nav links → CTA → hamburger (mobile).
- Skip link existente em `App.jsx` permanece primeiro na ordem.

---

# Animação

**Regra global:** animar apenas `transform` e `opacity`. Respeitar `prefers-reduced-motion: reduce`.

## 1. Carregamento

| Propriedade | Valor |
|-------------|-------|
| Loader | **Nenhum** — conteúdo visível imediatamente |
| Imagem | decode assíncrono; placeholder: cor sólida `#eef1f6` no slot da foto até `onLoad` |
| Fallback reduced-motion | Imagem visível sem fade |

## 2. Entrada do header

| Propriedade | Valor |
|-------------|-------|
| Animação mount | **Nenhuma** — header estático desde t=0 |
| Motivo | Evitar layout shift; nav deve ser utilizável imediatamente |

## 3. Entrada do título (H1)

| Campo | Valor |
|-------|-------|
| Gatilho | `DOMContentLoaded` + classe `.hero-animate` no container |
| Inicial | `opacity: 0; transform: translateY(24px)` |
| Final | `opacity: 1; transform: translateY(0)` |
| Propriedades | `opacity`, `transform` |
| Duração | `400ms` |
| Delay | `0ms` |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Reduced-motion | `opacity: 1; transform: none; transition: none` |

## 4. Entrada da imagem

| Campo | Desktop | Mobile |
|-------|---------|--------|
| Gatilho | mount | mount |
| Inicial | `opacity: 0` | `opacity: 0` |
| Final | `opacity: 1` | `opacity: 1` |
| Propriedades | `opacity` | `opacity` |
| Duração | `500ms` | `400ms` |
| Delay | `0ms` (paralelo ao H1) | `0ms` |
| Easing | `ease-out` | `ease-out` |
| Reduced-motion | visível imediato | idem |

Sem parallax. Sem `scale` na imagem.

## 5. Entrada da descrição e CTA

| Elemento | Delay | Duração | Inicial | Final |
|----------|-------|---------|---------|-------|
| Subheadline | `80ms` | `400ms` | `opacity:0; translateY(16px)` | `opacity:1; translateY(0)` |
| Link secundário | `160ms` | `350ms` | `opacity:0; translateY(12px)` | `opacity:1; translateY(0)` |
| CTA primário | `160ms` | `400ms` | `opacity:0; translateY(12px)` | `opacity:1; translateY(0)` |

- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` em todos.
- Stagger entre sub e CTA: **0ms** (mesmo delay 160ms — entram juntos).
- Sequência total texto: **560ms** até CTA fully visible.
- Ícone seta no CTA: microanimação hover existente `translateX(2px)` em `200ms` — fora da entrada.

## 6. Reação ao scroll

### Header state

| Campo | Valor |
|-------|-------|
| Gatilho | `window.scrollY > 80` via `useHeaderScroll` |
| Propriedades | `background-color`, `border-color`, `box-shadow`, `backdrop-filter` |
| Duração | `250ms` |
| Easing | `ease-out` |
| Reduced-motion | troca instantânea (duration 0) |

### Hero overlay (opcional, implementar se simples)

| Campo | Valor |
|-------|-------|
| Gatilho | scroll > 80px |
| Propriedade | overlay gradiente `opacity` 1 → 0.92 |
| Duração | `200ms` |
| Reduced-motion | sem alteração |

---

# Responsividade

## Desktop (≥1024px)

- Layout: foto full-bleed + grid 12 colunas.
- Texto cols 1–5, verticalmente centrado (`align-items: center` no grid com `min-height: 72vh`).
- CTA cell: posicionado `align-self: end` na coluna 9–12; margem inferior `2rem` acima da borda da seção.
- Grid lines: visíveis.
- Nav inline + CTA "Orçamento grátis".
- Hamburger: oculto.

## Tablet (640px – 1023px)

- Layout **mobile** (não split desktop).
- Foto: topo, `aspect-ratio 16/10`, max-height 45vh.
- Conteúdo: fundo `#eef1f6`, padding `1.5rem` (`px-6`).
- CTA: `width: 100%`, `Button size="lg"`.
- Link secundário: abaixo do CTA, centrado ou left-aligned (left-aligned — consistente com desktop).
- Nav: hamburger + CTA "Orçamento grátis" (`sm:inline-flex`).
- Grid lines: ocultas.

## Mobile (<640px)

- Igual tablet com ajustes:
  - Foto max-height **45vh** (não 45% declarado como vh fixo: usar `max-height: 45vh`).
  - H1: `2rem`.
  - CTA header compacto "Orçamento" sempre visível.
  - Padding container: `px-4`.
  - Hero total: `max-height: 90vh` — se conteúdo exceder, permitir scroll natural da página (não scroll interno).
  - Alvos toque: CTA min-height **48px**.

## Breakpoints Tailwind usados

| Token | px | Uso nesta spec |
|-------|-----|----------------|
| default | <640 | mobile |
| `sm:` | ≥640 | tipografia sub, CTA header full |
| `lg:` | ≥1024 | desktop layout, nav inline |
| ~~`xl:`~~ | ~~≥1280~~ | **não usar** para nav |

## Hero offset

Manter `.hero-offset` com `padding-top: calc(var(--header-height) + 1.5rem)` mobile e `+ 2rem` desde `md:` — ajustar se bloco mobile foto começar abaixo do header fixed (foto **não** deve ficar sob o header opaco; inicia abaixo da barra).

---

# Performance e acessibilidade

## prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  .hero-animate *,
  .header--transition {
    animation: none !important;
    transition: none !important;
  }
}
```

- Entrada hero: todos os elementos visíveis no first paint.
- Header scroll: estado muda sem transição.
- Drawer: abrir/fechar instantâneo (ou max 50ms opacity overlay).

## Contraste (WCAG AA)

| Par | Ratio mínimo | Verificação |
|-----|--------------|-------------|
| H1 `#1a2b4c` sobre `#eef1f6` | ≥4.5:1 | OK (~11:1) |
| Sub `#475569` sobre `#eef1f6` | ≥4.5:1 | OK (~5.5:1) |
| CTA `#0d1b33` sobre `#f5a623` | ≥4.5:1 | Validar no build — ajustar para `#081222` se falhar |
| Nav links sobre branco scrolled | ≥4.5:1 | OK |

## Navegação por teclado

- Skip link → logo → nav → CTA → hamburger.
- Drawer: trap ativo; Escape fecha; foco retorna ao hamburger.
- CTA cell desktop: `<a>` ou `<button>` focável, não `<div>`.

## Semântica

```html
<header>...</header>
<section id="inicio" aria-labelledby="hero-heading">
  <h1 id="hero-heading">...</h1>
  ...
</section>
<nav aria-label="Navegação principal">...</nav>
```

- Uma única `<h1>` na página (hero).
- Imagem hero: `alt` descritivo; camada decorativa grid: `aria-hidden="true"`.

## Dependências permitidas

| Permitido | Proibido nesta entrega |
|-----------|------------------------|
| React hooks nativos | Framer Motion, GSAP, AOS, Lenis |
| CSS + Tailwind v4 | Splitting.js |
| Lucide (`ArrowRight`, `Menu`, `X`) — já no projeto | Novas libs de animação |
| Implementação manual focus trap | `@headlessui/react` (a menos que já exista) |

**Novos arquivos permitidos:** `src/hooks/useHeaderScroll.js` apenas.

---

# Arquivos afetados

## Alterar

| Arquivo | Escopo |
|---------|--------|
| `src/components/layout/Header.jsx` | Estados top/scrolled; 6 links; breakpoint `lg`; CTA compacto |
| `src/components/layout/MobileMenu.jsx` | Drawer a11y; overlay primary-900; breakpoint `lg`; focus trap + Escape |
| `src/components/sections/HeroSection.jsx` | Rewrite layout desktop/mobile; copy; picture; animações |
| `src/components/ui/NavLink.jsx` | Classe `nav-link--active`; estilos estado scrolled |
| `src/styles/index.css` | `.header--top`, `.header--scrolled`, `.hero-grid-lines`, `.hero-cta-cell`, `.hero-animate`; remover uso de `.glass-panel`, `.hero-stat` no hero |
| `src/data/images.js` | Objeto hero com webp/mobile/fallback |

## Criar

| Arquivo | Escopo |
|---------|--------|
| `src/hooks/useHeaderScroll.js` | `scrollY > 80` → boolean; listener passive; cleanup |
| `src/data/nav.js` | Array `navLinks` (6 itens) — importado por Header e MobileMenu |

## Assets (criar/otimizar)

| Arquivo | Escopo |
|---------|--------|
| `public/images/brand/01-hero.webp` | Derivado PNG |
| `public/images/brand/01-hero-mobile.webp` | Crop mobile |

## Não alterar nesta entrega

- `src/App.jsx` (skip link OK)
- `src/components/ui/Button.jsx` (usar variants existentes)
- `src/components/ui/BrandLogo.jsx`
- `src/components/ui/Badge.jsx` (removido do hero, não deletar componente)
- `src/components/ui/Container.jsx`
- Seções abaixo do hero
- `BenefitsSection` / `#proposta` (escopo Fase 1 posterior ao hero, mas href `#proposta` já definido na nav)

## Remover do HeroSection (não deletar CSS global ainda)

- Arrays `stats`, `clients`
- Imports `Badge`
- Segundo `Button variant="secondary"`
- Blocos `.glass-panel`, `.hero-stat`, blur orbs

---

*Especificação fechada para implementação da Fase 1 (Header + Hero). Qualquer desvio exige atualização deste documento.*
