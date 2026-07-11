# Auditoria — Header e Hero · Good Sollar

**Data:** 10/07/2026  
**Escopo:** implementação atual (working tree, não commitada) de Header + Hero  
**Referências cruzadas:** versão anterior (`git HEAD`), `docs/spec-header-hero.md`, `docs/reference-strategy.md`, `docs/redesign-plan.md` (Fase 1), `docs/design-audit.md`, `design-intelligence-library/rules/design-rules.md`  
**Build verificado:** `npm run build` — sucesso (606 ms)

---

## Resumo executivo

A implementação cumpre **a maior parte** da especificação e representa um avanço claro sobre a versão anterior: o hero deixou de ser um amontoado de elementos de template SaaS e o header passou a integrar-se à fotografia. As referências Acron (nav adaptativa) e BridgeBio (hero estruturado com grid e CTA ancorado) foram **adaptadas** — paleta navy/âmbar, Plus Jakarta Sans, fotografia própria, sem copiar composições das referências.

Porém, há **uma regressão funcional crítica** (`#proposta` inexistente no DOM), **riscos de acessibilidade** (conteúdo do hero invisível sem JavaScript) e **desvios de responsividade mobile** em relação à spec. O restante da página permanece no padrão antigo, o que cria descontinuidade visual entre o topo redesenhado e as seções abaixo.

**Veredicto por critério:**

| # | Critério | Avaliação |
|---|----------|-----------|
| 1 | Ainda parece template genérico? | **Parcial** — hero/header melhoraram; página como um todo ainda genérica abaixo da dobra |
| 2 | Linguagem própria? | **Parcial** — grid solar + CTA-célula + nav adaptativa começam assinatura; tipografia e CTAs ainda convencionais |
| 3 | Referências adaptadas? | **Sim** — princípios aplicados sem copiar identidade |
| 4 | Hierarquia clara? | **Sim, com ressalvas** — H1 → sub → CTA primário → link secundário; competição header/hero CTA em mobile |
| 5 | Animações com propósito? | **Majoritariamente sim** — entrada staggered e header scroll são funcionais; `btn-motion` residual no hamburger é decorativo |
| 6 | Mobile projetado? | **Parcial** — layout empilhado correto, mas padding, alturas e aspect-ratio divergem da spec |
| 7 | CTA com destaque? | **Sim** — bloco âmbar desktop e botão full-width mobile cumprem o objetivo |
| 8 | Acessibilidade | **Parcial** — drawer melhorou; nav sem focus ring, conteúdo hero depende de JS |
| 9 | Performance | **Parcial** — WebP entregue; falta preload LCP; fallback PNG 2 MB permanece |
| 10 | Excesso de efeitos | **Não** — blur orbs e glass panel removidos; motion contido |
| 11 | Regressões | **Sim** — link `#proposta` quebrado; possível gap visual acima da foto mobile |

---

## Comparação com a versão anterior

### Header (antes → depois)

| Aspecto | Versão anterior (`HEAD`) | Implementação atual |
|---------|--------------------------|---------------------|
| Fundo no topo | Opaco `bg-primary-100/95` + blur desde t=0 | Transparente (`header--top`) → sólido após 80 px (`header--scrolled`) |
| Nav desktop | `xl:flex` (1280 px+) — 7 links | `lg:flex` (1024 px+) — 6 links |
| CTA mobile | Oculto em `< sm` | Sempre visível (pill compacta + versão `sm+`) |
| Seção ativa | Inexistente | `IntersectionObserver` + `nav-link--active` |
| Menu mobile | Sem trap, Escape ou `aria-modal` | Focus trap, Escape, `role="dialog"`, retorno de foco ao hamburger |
| CTA header | `Button` component | `<a>` customizado com classes `header-cta` |

### Hero (antes → depois)

| Aspecto | Versão anterior | Implementação atual |
|---------|-----------------|---------------------|
| Composição | Badge + H1 gradiente + 2 CTAs + avatars + 3 stats + orbs | H1 sólido + sub + 1 CTA + link textual |
| Imagem | PNG único ~2 MB, `alt=""`, `scale-105` | WebP desktop/mobile + PNG fallback, `alt` descritivo |
| Layout desktop | Texto sobre foto com gradientes pesados | Overlay lateral + grid lines + CTA-célula col 9–12 |
| Layout mobile | Texto sobre foto com gradientes | Foto isolada no topo + copy em fundo sólido |
| Prova social | Avatar stack falso + stats glass | Removidos (destino: About — fora do escopo) |
| Motion | Estático | Entrada staggered via `.hero-animate` |

---

## Conformidade com documentos de referência

### `spec-header-hero.md`

| Item | Status | Observação |
|------|--------|------------|
| Copy fechado (H1, sub, CTAs) | ✅ | Textos literais implementados |
| 6 links de nav | ✅ | Em `src/data/nav.js` |
| Header `--top` / `--scrolled` | ✅ | `useHeaderScroll` + CSS |
| Nav `lg+`, hamburger `< lg` | ✅ | Breakpoints corretos |
| Drawer a11y | ✅ | Trap, Escape, ARIA |
| Hero grid 12 col, CTA célula | ✅ | Desktop |
| WebP + `fetchpriority="high"` | ✅ | Assets criados |
| `prefers-reduced-motion` | ✅ | Bloco CSS dedicado |
| H1 `primary-900` | ⚠️ | Implementado como `text-primary-600` |
| Header CTA via `Button` | ⚠️ | Substituído por `<a>` customizado |
| Preload LCP opcional | ❌ | Ausente em `index.html` |
| Mobile `aspect-ratio 16/10` | ❌ | Usa `max-h-[45vh]` sem ratio |
| Mobile `max-height: 90vh` total | ❌ | Não aplicado |
| Tablet `min-height: 80vh` | ❌ | Não aplicado |
| Placeholder `#eef1f6` até `onLoad` | ❌ | Não implementado |
| Overlay hero reativo ao scroll | — | Opcional na spec; não implementado |

### `reference-strategy.md` e `redesign-plan.md`

| Princípio | Status |
|-----------|--------|
| Acron — nav adaptativa ao contexto | ✅ Adaptada (navy sobre gradiente claro, não branco sobre céu) |
| BridgeBio — hero full-bleed + grid + CTA célula | ✅ Adaptada (linhas evocam painéis FV, não grid arquitetônico) |
| Remover elementos de template no hero | ✅ |
| Âmbar como cor de conversão | ✅ CTAs header e hero |
| `#proposta` substitui `#beneficios` na nav | ⚠️ Nav atualizada; seção ainda `id="beneficios"` |
| Persepolis descartada | ✅ Nenhum resíduo |

### `design-rules.md` (Header/Hero)

| Regra | Antes | Agora |
|-------|-------|-------|
| Nav ≤ 6 itens | ❌ 7 | ✅ 6 |
| Hero — uma proposta, um CTA primário | ❌ | ✅ |
| Motion — função antes de forma | ⚠️ | ✅ (hero/header); hamburger ainda decorativo |
| A11y — alvos toque ≥ 44 px | ⚠️ | ✅ CTAs e itens drawer |
| Performance — imagens otimizadas | ❌ | ⚠️ WebP ok; fallback pesado |

---

## Avaliação detalhada (11 critérios)

### 1. Ainda parece template genérico?

**Parcial.** O hero anterior era claramente template SaaS (badge, gradiente no H1, glass panel, avatars, stats). A nova versão elimina esses marcadores e introduz grid de engenharia e CTA-célula — elementos mais editoriais. Porém, CTAs `rounded-xl` com sombra, nav pill com wipe e Plus Jakarta Sans única ainda compartilham vocabulário com landings comuns. **As seções abaixo do hero permanecem inalteradas** (badge → H2 → cards), o que faz a página inteira ainda parecer template ao rolar.

### 2. Linguagem própria?

**Parcial.** Começa a emergir: overlay de “luz solar” lateral, linhas de grid evocando painéis FV, CTA âmbar como célula de layout (não botão pill central), nav que respira sobre a foto. Falta continuidade — o bloco Benefits imediatamente abaixo retoma a fórmula genérica, quebrando a narrativa “catálogo editorial de energia” definida na estratégia.

### 3. Referências adaptadas (não copiadas)?

**Sim.** Não há vídeo cinematográfico BridgeBio, grid arquitetônico branco, serif Suisse, loader Acron, amarelo-limão `#F0FF8E`, nem nav branca sobre céu azul. Os princípios estruturais foram recombinados com paleta, tipografia e fotografia Good Sollar.

### 4. Hierarquia clara?

**Sim, com ressalvas.** Desktop: H1 domina coluna esquerda; CTA primário isolado na célula direita; link secundário subordinado por peso e estilo. Mobile: ordem foto → H1 → sub → CTA → link secundário é correta. **Ressalva:** no mobile existem dois CTAs de conversão visíveis simultaneamente (header compacto + CTA hero), o que dilui levemente a hierarquia da ação primária.

### 5. Animações com propósito?

**Majoritariamente sim.**

| Animação | Propósito | Avaliação |
|----------|-----------|-----------|
| Entrada staggered hero | Orientar leitura H1 → sub → CTA | ✅ Funcional |
| Transição header scroll | Sinalizar contexto (topo vs navegação) | ✅ Funcional |
| Drawer slide-in | Feedback de abertura do menu | ✅ Aceitável |
| Wipe nav-link | Feedback hover/foco | ✅ Existente, mantido |
| `btn-motion` no hamburger | Lift decorativo | ⚠️ Sem função clara |

Durações (400–500 ms) e propriedades (`opacity`, `transform`) respeitam a spec e as regras de motion.

### 6. Mobile realmente projetado?

**Parcial.** Decisão correta de separar foto e copy (sem texto sobre imagem). Problemas:

- `.hero-offset` adiciona `padding-top: calc(header + 1.5–2rem)` **antes** da foto mobile, criando faixa vazia entre header e imagem — a spec previa foto iniciando logo abaixo da barra.
- Falta `aspect-ratio: 16/10` e `max-height: 90vh` total declarados na spec.
- Tablet (640–1023 px) não recebe `min-height: 80vh`.
- Dois blocos `<picture>` coexistem no DOM (desktop `hidden lg:block` + mobile `lg:hidden`) — risco de download duplo em alguns viewports de transição.

### 7. CTA com destaque adequado?

**Sim.** Desktop: bloco âmbar `min-w-[280px]` ancorado ao grid, visualmente separado do copy — padrão BridgeBio adaptado. Mobile: botão full-width `min-h-12`, cor e sombra adequadas. Header: CTA sempre acessível. Contraste `#0d1b33` sobre `#f5a623` atende WCAG AA para texto grande/semibold.

### 8. Problemas de acessibilidade?

**Parcial — melhorias e lacunas.**

**Melhorias:** skip link preservado; `alt` descritivo na imagem; drawer com trap + Escape + retorno de foco; alvos ≥ 44 px; `aria-expanded` no hamburger; `prefers-reduced-motion` global para hero/header.

**Lacunas:** ver problemas P02, P03, P04, P05 abaixo.

### 9. Problemas de performance?

**Parcial — melhorias e lacunas.**

**Melhorias:** WebP desktop 127,5 KB e mobile 75,4 KB (metas ≤ 400 / ≤ 250 KB atingidas); remoção de blur orbs e `scale-105`.

**Lacunas:** fallback PNG 2 030 KB; sem `<link rel="preload">` para LCP; possível download duplo de imagens hero; drawer overlay com `backdrop-blur-sm` (custo GPU em mobile).

### 10. Excesso de efeitos?

**Não.** Removidos blur orbs, glass panel, stats glassmorphism, H1 gradiente e avatar stack. Grid lines são sutis (1 px, 12–20% opacidade). Motion de entrada é única, sem loops.

### 11. Regressões?

**Sim.** Principal: link de navegação `#proposta` aponta para seção inexistente (`BenefitsSection` mantém `id="beneficios"`). Secundárias: gap mobile acima da foto, inconsistência nav/footer, conteúdo hero dependente de JS.

---

## Problemas encontrados

### P01 — Link `#proposta` quebrado na navegação

| Campo | Valor |
|-------|-------|
| **Severidade** | Alta |
| **Local** | Nav "Por que solar"; indicador de seção ativa; scroll ao clicar |
| **Causa** | `src/data/nav.js` define `href: '#proposta'`, mas `BenefitsSection.jsx` mantém `id="beneficios"`. Fase 1 da spec alterou a nav antecipando rename da seção (escopo posterior). |
| **Correção recomendada** | Renomear `id="beneficios"` → `id="proposta"` em `BenefitsSection.jsx` **ou** ajustar temporariamente o href da nav para `#beneficios` até a Fase 2. Atualizar `Footer.jsx` (`#beneficios` → `#proposta`) e bookmarks. |
| **Arquivo provável** | `src/data/nav.js`, `src/components/sections/BenefitsSection.jsx`, `src/components/layout/Footer.jsx` |

---

### P02 — Conteúdo do hero invisível sem JavaScript

| Campo | Valor |
|-------|-------|
| **Severidade** | Alta |
| **Local** | Hero — H1, subtítulo, CTAs e imagem |
| **Causa** | CSS define `opacity: 0` em `.hero-title`, `.hero-subtitle`, etc.; visibilidade depende da classe `.hero-animate` aplicada via `useState` + `useEffect` em React. Sem JS (ou antes da hidratação), o hero fica em branco. |
| **Correção recomendada** | Usar `@starting-style` / fallback `:not(.hero-animate)` com `opacity: 1` como default, animando só quando JS adiciona a classe; ou aplicar `.hero-animate` no SSR/markup inicial. Alternativa: `@media (scripting: none) { opacity: 1 }`. |
| **Arquivo provável** | `src/styles/index.css`, `src/components/sections/HeroSection.jsx` |

---

### P03 — Nav links sem indicador de foco visível por teclado

| Campo | Valor |
|-------|-------|
| **Severidade** | Média |
| **Local** | Links de navegação desktop e drawer |
| **Causa** | `.nav-link:focus-visible { outline: none }` suprime outline nativo sem substituir por `focus-visible:ring-*` equivalente. A spec exige ring `accent-500` em todos os interativos. |
| **Correção recomendada** | Adicionar `box-shadow` ou `ring` no `:focus-visible` de `.nav-link` (sem conflitar com o wipe `::before`). |
| **Arquivo provável** | `src/styles/index.css`, eventualmente `src/components/ui/NavLink.jsx` |

---

### P04 — Gap indesejado acima da foto no mobile/tablet

| Campo | Valor |
|-------|-------|
| **Severidade** | Média |
| **Local** | Hero mobile/tablet — entre header e imagem |
| **Causa** | `.hero-offset` aplica `padding-top: calc(var(--header-height) + 1.5rem)` na `<section>`, empurrando o bloco `.hero-media.lg:hidden` para baixo. A spec previa foto iniciando logo abaixo da barra fixa (header transparente no topo). |
| **Correção recomendada** | Em `< lg`, remover ou reduzir padding-top da section; compensar apenas a coluna de copy. Alternativa: posicionar foto mobile como `absolute top-[var(--header-height)]` full-width. |
| **Arquivo provável** | `src/styles/index.css`, `src/components/sections/HeroSection.jsx` |

---

### P05 — Responsividade mobile diverge da spec (alturas e proporção)

| Campo | Valor |
|-------|-------|
| **Severidade** | Média |
| **Local** | Hero — breakpoints `< lg` |
| **Causa** | Spec define `aspect-ratio: 16/10`, `max-height: 90vh` total, tablet `min-height: 80vh`; implementação usa apenas `max-h-[45vh]` na imagem sem ratio fixo nem limite total da seção. |
| **Correção recomendada** | Aplicar `aspect-ratio: 16/10` + `max-h-[45vh]` na foto; envolver seção mobile em `max-h-[90vh]`; adicionar `min-h-[80vh]` em `sm–lg`. |
| **Arquivo provável** | `src/components/sections/HeroSection.jsx`, `src/styles/index.css` |

---

### P06 — Fallback PNG de 2 MB permanece no caminho crítico LCP

| Campo | Valor |
|-------|-------|
| **Severidade** | Média |
| **Local** | `<img src={images.hero.fallback}>` em ambos os `<picture>` |
| **Causa** | WebP criado, mas PNG original (~2 030 KB) ainda é o fallback e o `src` default do `<img>`. Browsers sem WebP ou falha de carregamento penalizam LCP. |
| **Correção recomendada** | Comprimir PNG fallback (< 400 KB); considerar AVIF como source adicional; garantir que browsers modernos nunca baixem o PNG. |
| **Arquivo provável** | `public/images/brand/01-hero.png`, `src/components/sections/HeroSection.jsx` |

---

### P07 — Preload LCP ausente

| Campo | Valor |
|-------|-------|
| **Severidade** | Baixa |
| **Local** | `<head>` — `index.html` |
| **Causa** | Spec lista preload opcional de WebP desktop; não implementado. |
| **Correção recomendada** | Adicionar `<link rel="preload" as="image" href="..." type="image/webp">` para hero desktop; condicional ou omitir em mobile-first se preferir. |
| **Arquivo provável** | `index.html` |

---

### P08 — H1 usa `primary-600` em vez de `primary-900` da spec

| Campo | Valor |
|-------|-------|
| **Severidade** | Baixa |
| **Local** | `#hero-heading` |
| **Causa** | Classe `text-primary-600` aplicada; spec define `#1a2b4c` (`primary-600`) na tabela de cores do hero — porém a seção Tipografia da spec cita `primary-900` para display. Implementação segue tabela Cores, não Tipografia. |
| **Correção recomendada** | Alinhar spec e código: escolher um token (`primary-600` ou `primary-900`) e documentar. Se display deve ser mais escuro, usar `text-primary-800`. |
| **Arquivo provável** | `src/components/sections/HeroSection.jsx` |

---

### P09 — Header CTA não usa componente `Button` da spec

| Campo | Valor |
|-------|-------|
| **Severidade** | Baixa |
| **Local** | Header — CTAs "Orçamento grátis" / "Orçamento" |
| **Causa** | Implementação substituiu `Button variant="primary" size="sm"` por `<a>` com classes Tailwind duplicadas, para suprimir `btn-motion` lift. |
| **Correção recomendada** | Estender `Button` com prop `noMotion` ou classe utilitária; reutilizar componente para consistência e manutenção. |
| **Arquivo provável** | `src/components/layout/Header.jsx`, `src/components/ui/Button.jsx` |

---

### P10 — Ícone do CTA compacto diverge da spec

| Campo | Valor |
|-------|-------|
| **Severidade** | Baixa |
| **Local** | Header mobile `< sm` — pill "Orçamento" |
| **Causa** | Spec pede ícone WhatsApp 16 px; implementação usa `MessageCircle` (Lucide genérico). |
| **Correção recomendada** | Usar ícone WhatsApp (SVG inline ou Lucide custom) para reconhecimento imediato da ação. |
| **Arquivo provável** | `src/components/layout/Header.jsx` |

---

### P11 — Dois `<picture>` hero no DOM (risco de download duplo)

| Campo | Valor |
|-------|-------|
| **Severidade** | Baixa |
| **Local** | `HeroSection.jsx` — blocos desktop e mobile |
| **Causa** | Dois conjuntos `<picture>` renderizados; visibilidade controlada por CSS (`hidden lg:block` / `lg:hidden`). Alguns user-agents podem solicitar ambos. |
| **Correção recomendada** | Renderizar um único `<picture>` com `<source media="...">` para desktop e mobile, ou montar condicionalmente via hook `matchMedia`. |
| **Arquivo provável** | `src/components/sections/HeroSection.jsx` |

---

### P12 — `btn-motion` residual no botão hamburger

| Campo | Valor |
|-------|-------|
| **Severidade** | Baixa |
| **Local** | Header — botão menu |
| **Causa** | Classe `btn-motion btn-motion-icon` mantida da versão anterior; spec remove lift do CTA header mas não menciona hamburger explicitamente. |
| **Correção recomendada** | Remover `btn-motion` do hamburger; manter apenas hover de fundo. |
| **Arquivo provável** | `src/components/layout/Header.jsx` |

---

### P13 — Descontinuidade visual hero ↔ seções abaixo

| Campo | Valor |
|-------|-------|
| **Severidade** | Baixa (esperado nesta fase) |
| **Local** | Transição Hero → Benefits |
| **Causa** | Fase 1 alterou só Header/Hero; Benefits mantém badge, SectionHeading, feature grid e `section-glow`. |
| **Correção recomendada** | Implementar Fase 2 (bloco editorial de proposta âmbar) conforme `redesign-plan.md` para continuidade da linguagem. |
| **Arquivo provável** | `src/components/sections/BenefitsSection.jsx` (Fase 2) |

---

### P14 — Logo reduzido no header (possível perda de presença)

| Campo | Valor |
|-------|-------|
| **Severidade** | Baixa |
| **Local** | Header — `BrandLogo className="!w-32 sm:!w-44 lg:!w-56"` |
| **Causa** | Redução aplicada para corrigir overflow horizontal em viewport estreito (fix de teste Playwright). |
| **Correção recomendada** | Validar visualmente em 320–375 px; se couber, restaurar tamanho original no `sm+`; manter redução só no menor breakpoint. |
| **Arquivo provável** | `src/components/layout/Header.jsx`, `src/components/ui/BrandLogo.jsx` |

---

### P15 — `aria-current="true"` em links de seção

| Campo | Valor |
|-------|-------|
| **Severidade** | Baixa |
| **Local** | `NavLink.jsx` |
| **Causa** | Valor `"true"` genérico; para links de navegação in-page, `"page"` ou `"location"` é semanticamente mais preciso. |
| **Correção recomendada** | Alterar para `aria-current="page"` quando ativo. |
| **Arquivo provável** | `src/components/ui/NavLink.jsx` |

---

## O que foi resolvido (vs. versão anterior e audit inicial)

| Problema histórico | Status |
|--------------------|--------|
| Header opaco desde o topo | ✅ Resolvido |
| Nav só em `xl` | ✅ Resolvido (`lg`) |
| 7 links de nav | ✅ Resolvido (6) |
| CTA header oculto no mobile | ✅ Resolvido |
| Menu sem focus trap / Escape | ✅ Resolvido |
| Hero sobrecarregado (badge, stats, avatars) | ✅ Resolvido |
| Prova social falsa no hero | ✅ Removida |
| Texto sobre foto no mobile | ✅ Resolvido |
| Sem grid de engenharia | ✅ Adicionado (desktop) |
| CTA pill genérico | ✅ Substituído por célula de grid |
| Imagem hero sem otimização | ✅ WebP entregue |
| `alt` vazio na imagem hero | ✅ Corrigido |
| Blur orbs decorativos | ✅ Removidos |

---

## Prioridade de correções

| Prioridade | IDs | Esforço estimado |
|------------|-----|------------------|
| **Imediata** | P01, P02 | Baixo — rename de id ou href; fallback CSS no hero |
| **Antes de merge** | P03, P04, P05 | Médio — CSS foco + ajuste layout mobile |
| **Melhoria** | P06, P07, P09, P10, P11 | Baixo–médio |
| **Fase 2** | P13 | Alto — redesign Benefits |
| **Opcional** | P08, P12, P14, P15 | Trivial |

---

## Conclusão

A implementação de Header e Hero **atinge o objetivo central da Fase 1**: comunicar proposta única, integrar nav ao hero fotográfico, adaptar referências com identidade própria e remover os elementos mais genéricos do template anterior. Os testes de build passam; motion e contraste estão majoritariamente corretos.

**Não está pronta para produção** enquanto P01 (`#proposta` quebrado) e P02 (hero dependente de JS) não forem corrigidos. Após esses fixes, a entrega estará alinhada à spec com ressalvas menores de polish mobile e performance de fallback.

A percepção de “template genérico” só será eliminada na página completa quando as Fases 2–5 do `redesign-plan.md` forem implementadas — especialmente o bloco editorial de proposta e os módulos numerados de Services.

---

*Auditoria gerada por comparação de código, spec e documentação de estratégia. Nenhum código alterado nesta etapa.*
