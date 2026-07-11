# Estratégia de Referências — Good Sollar

**Data:** 10/07/2026  
**Base:** `docs/design-audit.md` · `design-intelligence-library/` (references, patterns, rules)  
**Escopo:** estratégia de redesign — nenhum código alterado nesta etapa

---

## 1. Diagnóstico atual

O site é uma landing única em React + Tailwind com boa base de identidade (paleta navy `#0d1b33` + âmbar `#f5a623`, logo SVG real, fotografias próprias), mas com execução estrutural de template SaaS.

### Problemas visuais e de experiência

| Categoria | Problema |
|-----------|----------|
| **Seções genéricas** | 6 de 7 seções seguem a fórmula badge → H2 com sublinhado → grid/split → CTA. Benefits (grid 2×2 de ícones), HowItWorks (steps 01–04 em cards) e Testimonials (splits alternados ×3) são intercambiáveis com qualquer landing B2B |
| **Cards repetitivos** | Dois sistemas paralelos (`.feature-card` CSS + `Card.jsx`) com a mesma anatomia: ícone Lucide em caixa arredondada → título → parágrafo |
| **Animações repetidas** | O mesmo lift/scale (`.btn-motion`) em botões, cards e FAB; nenhum scroll reveal; único motion decorativo é o float infinito do popup de About |
| **Layouts previsíveis** | Split 50/50 em 4 seções; alternância imagem esquerda/direita em Services (×4) e Testimonials (×3); superfícies gradientes que mudam cor mas nunca estrutura |
| **Falta de identidade** | Plus Jakarta Sans única, avatar stack com iniciais falsas, stats em chips glassmorphism, glow orbs em toda seção, FAB verde WhatsApp, star ratings âmbar — todos elementos de template |
| **Hierarquia** | H3 varia de `text-sm` a `text-2xl` entre seções; badges rivalizam com títulos; hero acumula badge + H1 + corpo + 2 CTAs + avatars + 3 stats |
| **Ritmo visual** | Padding vertical `py-12`–`py-16` (~48–64px) abaixo do recomendado (≥80px); todas as seções têm a mesma densidade — nada respira mais, nada condensa |
| **Mobile** | Nav real só aparece em `xl` (1280px+); hero denso em telas curtas; Services empilha 4 pares longos; imagens de 2–2.7 MB; menu mobile sem focus trap |

---

## 2. Direção da marca

Good Sollar vende **energia solar residencial e empresarial em Brasília** — um investimento técnico de alto valor decidido por famílias e pequenos empresários. A linguagem visual adequada é:

- **Técnica com calor** — precisão de engenharia (grids, números, dados de economia) combinada com a materialidade do sol e da luz. O setor é o mesmo da referência Acron (energia/eficiência), o que valida diretamente seus padrões estruturais.
- **Editorial, não SaaS** — o cliente compra confiança e retorno financeiro, não um trial de software. Seções devem narrar (proposta → catálogo → prova → conversão), não empilhar features.
- **Âmbar como assinatura** — o acento `#f5a623` deve ser promovido de detalhe (sublinhados, badges) a **bloco de cor de conversão**, como o amarelo-limão da Acron: visível, funcional, reservado para momentos de ação.
- **Comportamento sóbrio** — motion contido de entrada única (scroll reveal), sem loops decorativos. A energia visual deve vir da fotografia real e dos números, não de blur orbs.
- **Conversão via WhatsApp preservada** — é o funil real do negócio; o redesign deve torná-lo mais presente na hierarquia, não escondê-lo atrás de estética.

---

## 3. Avaliação das três referências

### 3.1 Acron Solutions — Energy Upgrades

- **Nome:** Acron Energy Upgrades (`references/sacron.noenergyupgrades`)
- **Elementos relevantes:**
  - Módulos numerados com número oversized (01–06) como identidade de seção
  - Accordion técnico numerado para densidade sob demanda
  - Headline sticky + visual sobreposto (profundidade sem split 50/50 rígido)
  - Bloco editorial de proposta (parágrafo display após o hero)
  - Duas cores de bloco alternadas: acento (conversão) + neutro quente (conteúdo) + escuro (footer)
  - Nav com cor adaptativa ao contexto
  - Hover com expansão de gap; entrada lateral por intersect
- **Elementos inadequados:**
  - Loader de 15s com bloqueio de scroll — mata conversão em landing comercial
  - Hero de 200vh com parallax de nuvens — exige ilustração proprietária que o Good Sollar não tem (tem fotografia)
  - Sequências webp 3D — sem pipeline de render
  - Índice lateral de capítulos — a página tem 7 seções curtas, não 6 capítulos densos; e some no mobile
  - `noindex` — Good Sollar depende de SEO local
- **Decisão:** **UTILIZAR** (referência principal)
- **Motivo:** mesmo setor (energia/eficiência), mesmo desafio (traduzir serviço técnico em narrativa de valor), e resolve exatamente os dois maiores problemas do site — Services genérico e falta de assinatura de cor. Os padrões estruturais transferem sem copiar identidade (o âmbar Good Sollar substitui o amarelo-limão, com contraste validado).
- **Seções em que pode contribuir:** Services (principal), Benefits → bloco de proposta, HowItWorks, Contact, Header/nav, motion global.

### 3.2 BridgeBio

- **Nome:** BridgeBio (`references/bridgebio.com`)
- **Elementos relevantes:**
  - Hero full-bleed com grid exposto sobre fotografia + CTA ancorado em célula de grid
  - Bloco de métricas em alto contraste (fundo escuro, números display)
  - Scroll reveal institucional (0.8s, uma vez, IntersectionObserver, fallback sem JS)
  - Alternância temática de seções (theme-light / theme-dark) com tokens herdados
  - Microanimação de ícone em CTA (seta desloca no hover — já existe no site, validar e manter)
  - Espaçamento fluido com `clamp()`
- **Elementos inadequados:**
  - Serif light em display — o tom editorial-farmacêutico não conversa com energia solar pragmática; Good Sollar precisa de peso e claridade, não leveza acadêmica
  - Gradiente sunrise e paleta sandstone — identidade proprietária da BridgeBio
  - Wordmark gigante no footer — o logo Good Sollar (símbolo + texto) não funciona nessa escala
  - Nav em três zonas com subnavs — complexidade desnecessária para 6 âncoras
  - Hero de 166vw no mobile
- **Decisão:** **UTILIZAR** (referência secundária)
- **Motivo:** o site já tem o ativo que a BridgeBio exige — fotografia real de qualidade. Os padrões de hero fotográfico estruturado, métricas em contraste e motion sóbrio elevam a percepção institucional sem exigir novos assets.
- **Seções em que pode contribuir:** Hero, About/prova social (métricas), Testimonials, motion global, ritmo temático entre seções.

### 3.3 Persepolis Reimagined (Getty)

- **Nome:** Persepolis Reimagined (`references/persepolis.getty.edu`)
- **Elementos relevantes (em tese):** disciplina de "um conceito por viewport"; reduced-motion como classe global.
- **Elementos inadequados:**
  - Scroll hijacking total (`overflow: hidden` no body) — destrói acessibilidade e a expectativa de scan rápido de quem pesquisa "energia solar Brasília"
  - CTA ritualístico de entrada ("Enter") — barreira de conversão inaceitável num funil WhatsApp
  - Paleta escura 90% + dourado — oposta à marca solar (luz, dia, economia)
  - Preloader shader, WebGL, fontes licenciadas, SPA sem fallback — custo e complexidade sem retorno para uma landing local
  - SEO comprometido — fatal para negócio que depende de busca regional
- **Decisão:** **DESCARTAR**
- **Motivo:** conflito direto com conversão, acessibilidade, performance e SEO — os quatro pilares do negócio. É uma experiência de museu com orçamento Media.Monks; nada nela sobrevive à adaptação sem virar imitação vazia. Os poucos princípios aproveitáveis (reduced-motion, foco por viewport) já estão cobertos pelas outras duas referências e pelas regras gerais da biblioteca.
- **Seções em que pode contribuir:** nenhuma.

---

## 4. Mapa de referências por seção

### Header / Navegação

- **Estado atual:** barra fixa branca; nav real só em `xl`; 7 links; CTA some em telas pequenas
- **Decisão:** **Ajustar**
- **Referência:** Acron
- **Padrão reutilizável:** `navigation.md` → Nav com cor adaptativa ao contexto
- **Princípio adaptado:** nav transparente/clara sobre o hero fotográfico, ganhando fundo sólido navy ou branco ao scrollar; baixar breakpoint do menu para `lg`; reduzir para ≤6 âncoras
- **Motivo:** resolve o vazio de navegação entre 1024–1280px e conecta a nav ao hero em vez de flutuar sobre ele

### Hero

- **Estado atual:** foto full-bleed + badge + H1 + corpo + 2 CTAs + avatar stack + 3 stats — sobrecarregado
- **Decisão:** **Redesenhar**
- **Referência:** BridgeBio
- **Padrões reutilizáveis:** `heroes.md` → Hero full-bleed com grid exposto · CTA ancorado em célula de grid
- **Princípio adaptado:** fotografia solar em tela cheia com linhas de grid sutis (só desktop) sugerindo precisão de engenharia; headline em coluna lateral; um CTA em bloco âmbar ancorado no grid; remover avatars e stats do hero
- **Motivo:** o site já tem a fotografia; o padrão dá estrutura editorial ao que hoje é um amontoado de elementos de template. Stats migram para bloco próprio (ver About)

### Benefits (`#beneficios`)

- **Estado atual:** heading + split imagem | grid 2×2 de ícones — feature grid genérico
- **Decisão:** **Substituir**
- **Referência:** Acron
- **Padrão reutilizável:** `sections.md` → Bloco editorial de proposta
- **Princípio adaptado:** substituir o grid de ícones por um bloco full-bleed âmbar com a proposta de valor em parágrafo display (32–48px) logo após o hero — a "ponte" entre impacto e catálogo
- **Motivo:** os 4 benefícios atuais são reformulações do mesmo argumento (economia + sustentabilidade); um parágrafo editorial forte comunica mais com identidade do que quatro caixinhas de ícone

### Services (`#servicos`)

- **Estado atual:** 4 blocos alternados imagem/texto com ícone — longo, repetitivo, o mais genérico do site
- **Decisão:** **Redesenhar** (maior intervenção)
- **Referência:** Acron
- **Padrões reutilizáveis:** `sections.md` → Módulo com número oversized · Headline sticky com visual sobreposto · Accordion técnico numerado
- **Princípio adaptado:** cada serviço vira um módulo numerado (01–04) com número display em âmbar, headline sticky, fotografia real sobreposta e accordion de 3–4 itens para detalhes técnicos (potência, prazos, homologação) — sem os 36 accordions da Acron, sem renders 3D
- **Motivo:** transforma a seção mais fraca na assinatura visual do site; a numeração cria orientação e o accordion resolve densidade técnica sem alongar o scroll

### How It Works (`#como-funciona`)

- **Estado atual:** 4 cards "Etapa 01–04" — colide com a numeração proposta para Services
- **Decisão:** **Ajustar**
- **Referência:** Acron (princípio) + regras da biblioteca
- **Padrão reutilizável:** `sections.md` → Como funciona / passos (padrão base)
- **Princípio adaptado:** manter os passos, mas como timeline compacta horizontal (desktop) / vertical (mobile) com conectores, **sem** números oversized — a monumentalidade fica exclusiva de Services para não diluir o recurso
- **Motivo:** dois sistemas de numeração monumental na mesma página anulariam o efeito; a etapa é informação de apoio, não capítulo

### About (`#sobre`)

- **Estado atual:** split copy + checklist | imagem + popup flutuante com float infinito
- **Decisão:** **Ajustar**
- **Referência:** BridgeBio
- **Padrão reutilizável:** `sections.md` → Bloco de métricas em alto contraste
- **Princípio adaptado:** manter o split com fotografia, remover o popup flutuante e anexar uma faixa de métricas sobre fundo navy escuro (+500 projetos, 6 anos, 24h) — números display, labels pequenos, sem animação de contagem
- **Motivo:** dá destino digno aos stats retirados do hero e cria o momento `theme-dark` que quebra o ritmo de superfícies claras

### Testimonials (`#depoimentos`)

- **Estado atual:** 3 splits alternados com quote card + estrelas — repetitivo e com cara de review de marketplace
- **Decisão:** **Redesenhar**
- **Referência:** BridgeBio
- **Padrão reutilizável:** `sections.md` → Feature alternada lateral (versão editorial)
- **Princípio adaptado:** um depoimento em destaque com fotografia grande e citação em escala display (tratamento editorial de "história de cliente"), com os demais em lista compacta; remover estrelas e avatares
- **Motivo:** um caso contado com peso editorial converte mais que três blocos idênticos; alinha com o princípio BridgeBio de humanizar setor técnico com pessoas reais

### Contact (`#contato`)

- **Estado atual:** form centralizado + painel de infos + imagem — funcional mas anônimo
- **Decisão:** **Ajustar**
- **Referência:** Acron
- **Padrão reutilizável:** `sections.md` → Alternância de cor: acento como bloco de conversão
- **Princípio adaptado:** o bloco de contato vira a segunda aparição do âmbar como cor de fundo (eco do bloco de proposta), com formulário em card escuro contrastante — abertura âmbar → fechamento âmbar cria moldura de conversão
- **Motivo:** na Acron, o amarelo marca exatamente os dois momentos de decisão; a mesma lógica dá função à cor de marca que hoje só sublinha títulos

### Footer

- **Estado atual:** navy escuro com logo em versão escura (contraste ruim) e grid de links
- **Decisão:** **Ajustar**
- **Referência:** nenhuma específica (correção técnica + regras da biblioteca)
- **Padrão reutilizável:** `navigation.md` → Padrões de logo (monocromática sobre fundo escuro)
- **Princípio adaptado:** usar a variante clara do logo (já existe e não é usada); manter estrutura
- **Motivo:** correção de contraste WCAG; o wordmark gigante da BridgeBio foi avaliado e descartado (logo composto não funciona nessa escala)

### WhatsApp FAB

- **Estado atual:** círculo verde `bg-emerald-500` com ícone genérico
- **Decisão:** **Ajustar**
- **Referência:** BridgeBio
- **Padrão reutilizável:** `motion.md` → Microanimação de ícone em CTA
- **Princípio adaptado:** recolorir com navy/âmbar da marca mantendo o ícone WhatsApp reconhecível; hover com deslocamento sutil do ícone em vez de scale genérico
- **Motivo:** o verde-plataforma é o elemento mais dissonante da página; a função permanece intocada

### DifferentiatorsSection (código morto)

- **Estado atual:** seção completa não importada, com placeholders tracejados
- **Decisão:** **Remover**
- **Referência:** — 
- **Motivo:** o conteúdo (diferenciais) já é coberto pelo bloco de proposta + métricas; manter código morto só gera manutenção

### Motion global (transversal)

- **Estado atual:** hovers repetidos, zero scroll reveal, um float infinito
- **Decisão:** **Redesenhar**
- **Referência:** BridgeBio (base) + Acron (detalhes)
- **Padrões reutilizáveis:** `motion.md` → Scroll reveal institucional · Entrada lateral por intersect · Hover com expansão de gap
- **Princípio adaptado:** reveal único de 0.5–0.8s por seção via IntersectionObserver com fallback; fotografias dos módulos entram com leve translate lateral; accordions de Services usam hover de gap; remover float infinito; respeitar `prefers-reduced-motion` globalmente
- **Motivo:** motion passa a orientar a narrativa em vez de decorar; durações e contenção seguem `design-rules.md` (Motion §1–6)

---

## 5. Elementos que devem ser preservados

| Elemento | Onde | Por quê |
|----------|------|---------|
| Paleta navy + âmbar (tokens `@theme`) | `src/styles/index.css` | Identidade real; o redesign amplia o papel do âmbar, não o troca |
| Logo SVG oficial (sunburst + wordmark) | `public/images/brand/goodsollar-logo.svg` | Único ativo de marca definitivo |
| Fotografias próprias | `public/images/brand/` | Pré-requisito dos padrões BridgeBio; precisam apenas de otimização de peso |
| Copy em português + dados reais (CNPJ, endereço, Instagram) | `src/data/contact.js`, seções | Credibilidade local |
| Funil WhatsApp (FAB + CTAs) | `WhatsAppButton.jsx`, CTAs | Canal de conversão do negócio — restilizar, nunca remover |
| SEO on-page (meta, OG, JSON-LD) | `index.html` | Já correto; corrigir apenas a referência ao logo placeholder |
| Skip link e âncoras semânticas | `App.jsx` | Base de acessibilidade existente |
| Microanimação de seta no botão | `Button.jsx` | Já coincide com o padrão BridgeBio validado |
| Métricas de prova (+500, 6 anos, 24h) | Hero/About | O conteúdo fica; muda o contêiner (bloco de métricas) |

---

## 6. Prioridades de redesign

### Maior impacto visual
1. **Services como módulos numerados** (Acron) — cria a assinatura do site
2. **Hero full-bleed estruturado** (BridgeBio) — primeira impressão editorial em vez de template
3. **Blocos âmbar de proposta e contato** (Acron) — cor de marca com função
4. **Remoção de glow orbs, glass panels e avatar stack** — limpa a camada de template

### Maior impacto na conversão
1. **CTA único ancorado no hero** — menos competição, decisão mais clara
2. **Moldura âmbar (proposta → contato)** — dois momentos de decisão demarcados por cor
3. **FAB e CTAs WhatsApp em cores de marca** — coerência aumenta confiança
4. **Depoimento editorial com pessoa real** — prova social crível substitui estrelas

### Maior impacto na experiência
1. **Nav adaptativa com breakpoint corrigido** — navegação utilizável em 1024–1280px
2. **Accordions em Services** — densidade técnica sem scroll infinito no mobile
3. **Scroll reveal sóbrio + remoção do float infinito** — motion com função
4. **Otimização das imagens (2–2.7 MB)** — performance mobile

### Refinamentos secundários
1. Unificar `.feature-card` + `Card.jsx` num único primitivo
2. Escala tipográfica de 4 níveis com tokens (eliminar valores arbitrários)
3. Focus trap e Escape no menu mobile
4. Variante clara do logo no footer
5. Remover `DifferentiatorsSection`, `BrandImage`, `ImagePlaceholder` e logos placeholder
6. Padding vertical de seção para ≥80px desktop (`design-rules.md` Layout §3)

---

## 7. Direção recomendada

**Conceito: "catálogo editorial de energia" — a precisão da Acron com a humanidade fotográfica da BridgeBio, em navy e âmbar.**

A página se reorganiza como narrativa em quatro atos:

1. **Impacto** — hero fotográfico full-bleed com grid sutil e um CTA âmbar ancorado (BridgeBio). A nav clara sobre a foto escurece ao scrollar (Acron).
2. **Proposta** — bloco âmbar full-bleed com parágrafo display: por que solar, por que agora, por que Good Sollar (Acron).
3. **Catálogo** — quatro módulos de serviço numerados (01–04) com número display âmbar, headline sticky, fotografia real e accordion técnico enxuto (Acron); seguidos da timeline compacta de etapas e do bloco About com faixa de métricas navy (BridgeBio).
4. **Prova e conversão** — um depoimento editorial em destaque (BridgeBio) e o bloco de contato âmbar com formulário escuro (Acron), fechando a moldura de cor aberta no ato 2.

Motion transversal: scroll reveal único e sóbrio, entradas laterais nas fotografias, hover de gap nos accordions — nada em loop, tudo com `prefers-reduced-motion`.

**O que explicitamente não será copiado:** o amarelo-limão `#F0FF8E`, as nuvens ilustradas, o loader narrativo e a tipografia Polymath da Acron; o gradiente sunrise, a paleta sandstone, a serif Suisse e o wordmark monumental da BridgeBio; qualquer texto, imagem, composição integral ou código de ambas. Persepolis foi descartada integralmente. A tipografia permanece própria (Plus Jakarta Sans como corpo, com estudo futuro de família display distinta), a paleta permanece navy + âmbar Good Sollar, e todas as composições são recombinações de princípios — não réplicas.
