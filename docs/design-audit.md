# Auditoria de Design — Good Sollar

**Data:** 10/07/2026  
**Referência:** `design-intelligence-library/rules/design-rules.md`  
**Stack:** React 19 + Vite 8 + Tailwind CSS v4 · landing page única  
**Escopo:** 7 seções ativas + layout global (Header, Footer, WhatsApp FAB)

---

## Resumo executivo

O Good Sollar possui identidade visual parcialmente consolidada — paleta navy/âmbar, logo SVG real e fotografias de marca — mas a estrutura da página segue um template de landing SaaS muito previsível. A repetição de padrões (badge → título → cards com ícone, split imagem/texto, orbs decorativos) dilui a personalidade da marca solar. Há também inconsistências tipográficas, dois sistemas de cards paralelos e seção morta no código.

---

## 1. Seções genéricas

| Seção | Arquivo | Problema |
|-------|---------|----------|
| **Benefits** | `BenefitsSection.jsx` | Grid 2×2 de ícone + título + texto — padrão "feature grid" de qualquer produto B2B |
| **Services** | `ServicesSection.jsx` | Quatro blocos alternados imagem/texto com ícone Lucide — estrutura idêntica a templates de agência |
| **How It Works** | `HowItWorksSection.jsx` | Passos numerados (01–04) em cards — fórmula universal de onboarding |
| **Testimonials** | `TestimonialsSection.jsx` | Três depoimentos em split alternado com estrelas — padrão de review genérico |
| **Contact** | `ContactSection.jsx` | Formulário centralizado + painel lateral — layout de contato padrão |
| **Differentiators** *(morta)* | `DifferentiatorsSection.jsx` | Não importada em `App.jsx`; se existisse, seria mais um grid de ícones + placeholders |

**Fórmula repetida em 6 de 7 seções ativas:**

```
Badge (eyebrow) → SectionHeading (H2 + sublinhado âmbar + subtítulo) → conteúdo → CTA WhatsApp opcional
```

**Violações das regras de design:**

- **Seções §1–2:** cada seção tem uma ideia, mas o título autoexplicativo não se traduz em layout distinto — todas "parecem iguais"
- **Seções §2:** 7 seções na mesma página (no limite); scroll longo sem sub-páginas
- **Hero §1–3:** hero carrega badge + H1 + corpo + 2 CTAs + avatar stack + 3 stats — mais de uma proposta visual competindo

---

## 2. Cards repetitivos

### Dois sistemas paralelos (inconsistência)

| Sistema | Onde | Estilo |
|---------|------|--------|
| `.feature-card` / `.feature-card-icon` | `index.css` | Benefits, HowItWorks, Testimonials, painel lateral Contact |
| `Card.jsx` | Componente React | Formulário Contact, Differentiators (morta) |

Ambos compartilham: fundo branco, `rounded-2xl`, borda leve, sombra suave, hover sutil.

### Anatomia repetida

```
[ícone em caixa arredondada] → título → parágrafo curto
```

| Seção | Variante |
|-------|----------|
| Benefits | Ícone âmbar em `.feature-card-icon` |
| HowItWorks | Ícone navy + label "Etapa 0N" |
| Services | Ícone navy em blocos split (não usa `.feature-card`) |
| Testimonials | `.feature-card` + Quote + StarRating + nome/cargo |
| Contact | `Card` com inputs de formulário |

**Violação:** Seções §4 exige cards consistentes — o site é consistente demais, no sentido de monotonia, não de sistema unificado (dois APIs de card coexistem).

---

## 3. Animações repetidas

**Sem biblioteca de animação** (Framer Motion, GSAP, AOS). Tudo em CSS + transições Tailwind.

| Efeito | Classes / origem | Onde aparece |
|--------|------------------|--------------|
| Lift + scale no hover | `.btn-motion`, `.btn-motion-fab`, `.btn-motion-icon` | Botões, menu, FAB WhatsApp, ícones footer |
| Wipe horizontal | `.nav-link::before` | Nav desktop e mobile |
| Seta deslocada | `group-hover:translate-x-0.5` | `Button.jsx` |
| Hover border/shadow | `.feature-card:hover` | Todos os feature cards |
| Lift no card | `hover:-translate-y-0.5` | `Card.jsx` |
| Float infinito | `stat-popup-enter` + `stat-popup-float` | Popup de estatística em About |
| `transition-colors` | Links footer, contact | Vários |

**Problemas:**

- **Motion §1:** animações decorativas (float infinito, glow) sem função orientadora
- **Motion §2–4:** durações dentro do aceitável, mas o *mesmo* lift/scale aparece em botões, cards e FAB — sensação mecânica
- **Motion §5:** `prefers-reduced-motion` respeitado apenas no popup de About; demais hovers não têm alternativa estática explícita
- **Ausência:** nenhum scroll-reveal ou stagger — página estática até interação, o que é ok, mas quando anima, sempre do mesmo jeito

---

## 4. Layouts previsíveis

### Padrões estruturais

| Padrão | Seções |
|--------|--------|
| **Split 50/50** (`.split-layout`) | Benefits, About, Contact, Testimonials (×3) |
| **Grid de features** | Benefits (2×2), HowItWorks (1→4 cols) |
| **Alternância imagem esquerda/direita** | Services (×4), Testimonials (×3) |
| **CTA centralizado em caixa** | Services, Contact |
| **Superfícies alternadas** | white → slate → brand → warm — ritmo previsível a cada seção |

### Container e espaçamento

- `Container`: `max-w-7xl` (~1280px) — dentro da regra Layout §1
- `.section-spacing`: `py-12` → `lg:py-16` — **abaixo** do recomendado Layout §3 (≥80px desktop ≈ `py-20`)
- `.section-glow`: orbs borrados absolutos em quase toda seção — device decorativo genérico

**Violação Layout §4:** alternância existe (gradientes de fundo), mas a *estrutura interna* não varia — sempre heading centralizado + grid/split.

---

## 5. Elementos sem identidade de marca

### O que é da marca (preservar)

- Logo SVG real: `public/images/brand/goodsollar-logo.svg` (sol + wordmark navy/âmbar)
- Paleta customizada: primary navy `#0d1b33` + accent `#f5a623` em `@theme`
- Fotografias reais em `public/images/brand/`
- Copy em português, CNPJ, endereço Brasília/DF

### O que é genérico (substituir ou adaptar)

| Elemento | Arquivo | Por quê |
|----------|---------|---------|
| **Plus Jakarta Sans** (única família) | `index.html`, `@theme` | Fonte padrão de SaaS 2023–2025; viola Tipografia §5 |
| **Avatar stack com iniciais** | `HeroSection.jsx` | Social proof falso — padrão de template |
| **Stats strip no hero** (500+, 6 anos, 24h) | `HeroSection.jsx` | Chips estilo dashboard, não solar |
| **Glass panels** (`.glass-panel`, `.hero-stat`) | `index.css` | UI frosted genérica |
| **Section glow orbs** | `.section-glow` | Atmosfera "AI landing page" |
| **Pill badges + sublinhado âmbar** | `Badge.jsx`, `SectionHeading.jsx` | Mesmo eyebrow em todas as seções |
| **Ícones Lucide genéricos** | Todas as seções | Zap, PiggyBank, House — sem customização |
| **StarRating âmbar** | `TestimonialsSection.jsx` | UI de review marketplace |
| **WhatsApp FAB verde** (`bg-emerald-500`) | `WhatsAppButton.jsx` | Cor da plataforma, não da marca |
| **Logo placeholder Arial Black** | `public/goodsollar-logo.svg` | Resquício de template; schema OG ainda aponta para ele |
| **Logo escuro no footer escuro** | `Footer.jsx` + `BrandLogo` | Contraste insuficiente; variante light existe mas não é usada |

**Violação Cores §2:** accent âmbar competindo com verde WhatsApp como CTA dominante.

---

## 6. Problemas de hierarquia

### Escala tipográfica fragmentada

| Nível | Onde | Classes típicas | Problema |
|-------|------|-----------------|---------|
| H1 | Hero | `text-[2rem]` → `lg:text-[2.875rem]` extrabold | OK, mas span gradiente compete com logo |
| H2 | `SectionHeading` | `text-[1.625rem]` → `lg:text-[2.125rem]` | Consistente |
| H3 | Cards | `text-sm` a `text-2xl` conforme seção | **Mesmo nível semântico, pesos visuais diferentes** |
| Body | Vários | `text-sm`, `text-[0.9375rem]`, `text-base`, `sm:text-[1.0625rem]` | Sem token de corpo |
| Badge | Todas seções | `text-sm font-semibold` | Pode rivalizar H3 de Benefits |
| Stats hero | Hero | `text-2xl bold` | Rivaliza H2 em mobile |

**Violações:**

- **Tipografia §1:** mais de 4 níveis visíveis por página (display, H2, H3, body, badge, label, stat, micro)
- **Tipografia §4:** hierarquia por tamanho arbitrário (`0.6875rem`, `0.9375rem`, `1.0625rem`, `1.625rem`, `2.875rem`) — sem escala documentada
- **Tipografia §5:** uma família apenas; sem contraste display/corpo

### Hierarquia de conteúdo

- Hero sobrecarregado: prova social + stats + 2 CTAs competem com headline
- CTAs WhatsApp repetidos sem diferenciação de urgência entre seções

---

## 7. Problemas de responsividade

| Problema | Local | Detalhe |
|----------|-------|---------|
| **Nav breakpoint `xl`** | `Header.jsx` | Menu hamburger até 1280px; 7 links nunca aparecem entre `lg`–`xl` |
| **CTA header oculto em xs** | `Header.jsx` | `hidden sm:inline-flex` — phones pequenos só têm FAB |
| **Hero denso** | `HeroSection.jsx` | Badge + H1 + body + 2 CTAs + avatars + 3 stats em ~88vh |
| **Services longo** | `ServicesSection.jsx` | 4 pares imagem/texto empilhados — scroll excessivo mobile |
| **Testimonials repetitivo** | `TestimonialsSection.jsx` | Mesmo split alternado ×3 |
| **Mobile menu sem trap** | `MobileMenu.jsx` | Sem focus trap, Escape, ou animação de saída |
| **Imagens pesadas** | `public/images/brand/*.png` | ~2–2.7 MB cada — risco de performance mobile |
| **Footer logo** | `Footer.jsx` | Contraste logo escuro sobre `bg-primary-900` |
| **Popup About** | `AboutSection.jsx` | Full-width em mobile — ok, mas float contínuo pode distrair |

**Violações:**

- **Layout §5:** empilha corretamente, mas reduz escala em vez de repensar densidade (hero stats permanecem)
- **Acessibilidade §2:** alguns alvos (ícones footer, nav links) podem ficar abaixo de 44×44px

---

## 8. Componentes que podem ser substituídos

### Alta prioridade

| Componente | Substituir por | Motivo |
|------------|----------------|--------|
| Avatar stack (`HeroSection`) | Logos de clientes reais ou métrica única | Social proof genérico |
| `.section-glow` orbs | Textura fotográfica solar ou gradiente da marca | Decorativo sem identidade |
| `StarRating` | Citação longa + foto real do cliente | Review template |
| WhatsApp FAB verde | FAB com cores brand (navy/âmbar) + ícone WhatsApp | Consistência de marca |
| `DifferentiatorsSection` | Remover ou redesenhar com fotos reais | Código morto com placeholders |
| `BrandImage` / `ImagePlaceholder` | Remover (não usados) | Resíduo de scaffold |
| Logo SVG Arial Black | Usar apenas `goodsollar-logo.svg` real | Placeholder contradiz marca |

### Média prioridade

| Componente | Substituir por | Motivo |
|------------|----------------|--------|
| `.feature-card` + `Card.jsx` | Um único `FeatureCard` unificado | Dois sistemas paralelos |
| `SectionHeading` + `Badge` | Variantes contextuais (hero vs seção vs inline) | Eyebrow idêntico em todo lugar |
| Lucide icons | Ícones customizados ou subset estilizado | Visual de template |
| Hero stats strip | Uma métrica integrada ao copy | Menos competição hierárquica |
| `.glass-panel` | Superfície sólida com borda brand | Menos "SaaS glassmorphism" |
| Services split blocks | Grid compacto mobile + accordion | Reduz scroll mobile |

### Baixa prioridade

| Componente | Ação |
|------------|------|
| Plus Jakarta Sans | Adicionar família display (ex.: serif ou condensed) para headlines |
| `MobileMenu` | Adicionar focus trap + animação de saída |
| `nav-link` wipe | Manter (único detalhe distintivo), mas reduzir uso em mobile |

---

## Mapa de arquivos relevantes

```
src/App.jsx
src/styles/index.css          ← theme, superfícies, motion, cards
src/components/layout/        ← Header, Footer, MobileMenu, WhatsAppButton
src/components/sections/      ← 7 ativas + DifferentiatorsSection (morta)
src/components/ui/            ← Container, Button, Badge, SectionHeading, Card, BrandLogo, ImageSlot
src/data/contact.js, images.js
public/images/brand/          ← logo + fotografias
```

---

## Prioridades recomendadas

1. **Unificar sistema de cards** e escala tipográfica (4 níveis máximo)
2. **Aliviar hero** — uma proposta, um CTA primário, prova social real
3. **Substituir padrões genéricos** (avatars, stars, glow, FAB verde) por elementos da marca solar
4. **Corrigir nav breakpoint** e contraste logo footer
5. **Remover código morto** (`DifferentiatorsSection`, placeholders, logos template)
6. **Otimizar imagens** para mobile

---

## Conformidade com design-rules.md

| Regra | Status |
|-------|--------|
| Tipografia: escala limitada | ❌ Fragmentada |
| Tipografia: máximo 2 famílias | ⚠️ 1 família (ok, mas sem contraste) |
| Cores: acento com função | ⚠️ Âmbar ok; verde WhatsApp compete |
| Layout: ritmo de seção ≥80px | ❌ ~64px max |
| Seções: máximo 7 | ✅ 7 seções |
| Hero: uma proposta | ❌ Sobrecarregado |
| Motion: função antes de forma | ⚠️ Parcial |
| Nav: máximo 6 itens | ❌ 7 links |
| Cards consistentes | ⚠️ Consistentes mas monótonos |
