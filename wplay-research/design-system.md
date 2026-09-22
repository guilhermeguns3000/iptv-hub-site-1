# WPlay: Design System

Autor: agente `wplay-design` · Data: 08/09/2026
Lido antes de desenhar: `.claude/agents/wplay-design.md`, `wplay-research/intel-appwplay.md`, `wplay-research/arquitetura.md`, `assets/css/style.css` e `style.css` (paleta atual do site).

---

## 0. Método

Rodada a skill `ui-ux-pro-max` (`.agent/skills/ui-ux-pro-max` em `MODELADOR DE PAGINA`, mesma versão usada em outros projetos do dono; não existe cópia dentro de `SITE IPTU`, por isso foi acessada pelo caminho absoluto) via CLI Python (`py search.py ... --design-system`) e por buscas de domínio (`style`, `color`, `typography`, `ux`, `landing`, `icons`).

**Achado relevante do próprio banco de dados:** a base do `ui-ux-pro-max` não tem uma categoria "verde militar/tático" nem um produto "IPTV/streaming P2P". A busca por produto caiu em "App" genérico e o `--design-system` devolveu um estilo "Vibrant & Block-based" com paleta índigo/verde neon de app de música, que contraria a regra de marca do dono (nunca neon, sempre verde militar). Por isso este documento usa a busca do `ui-ux-pro-max` como matéria-prima de raciocínio (padrões de layout tipo "App Store Style Landing", "Pricing + CTA", guidelines de formulário/acordeão, biblioteca de ícones Lucide) e não como fonte da paleta. A paleta abaixo é derivada da cor de marca já fixada no CSS atual (`--primary: #6b8e23`) mais o estilo "Dark Mode (OLED)" do banco (fundo preto profundo, WCAG AAA, boa performance), que é o único estilo do banco compatível com as regras do dono.

Toda cor abaixo foi calculada, não estimada visualmente: fórmula de luminância relativa WCAG 2.1 (`sRGB → linear → 0.2126R + 0.7152G + 0.0722B`) rodada em script Python contra cada par texto/fundo. Onde um par falhou o AA, o token foi ajustado e recalculado até passar; isso está documentado na seção 1.3 porque um dos achados é uma correção real de bug de contraste que a paleta atual do site teria cometido.

---

## 1. Tokens de cor

### 1.1 Paleta base

| Token | Hex | Papel |
|---|---|---|
| `--color-bg-base` | `#0a0b08` | Fundo da página (preto com sub-tom oliva, já usado em `style.css`) |
| `--color-bg-surface` | `#14160f` | Cards, inputs, seções elevadas |
| `--color-bg-surface-raised` | `#1c1f15` | Modais, dropdowns, elementos acima dos cards |
| `--color-primary` | `#6b8e23` | Verde militar de marca (olive drab): ícones, links, badges, bordas de destaque |
| `--color-primary-bright` | `#8bb52e` | Hover/foco/estado ativo do verde de marca, mais claro, mesma família |
| `--color-cta-bg` | `#6b8e23` | Fundo do botão primário (mesma cor de marca, ver 1.3 para o texto) |
| `--color-cta-text` | `#0d0f07` | Texto do botão primário (quase-preto, não branco; ver 1.3) |
| `--color-secondary` | `#3f4b23` | Verde oliva escuro: superfícies secundárias, badges neutros, divisores de seção |
| `--color-text-primary` | `#ffffff` | Título, corpo principal |
| `--color-text-secondary` | `#c7c7bd` | Subtítulo, corpo secundário |
| `--color-text-tertiary` | `#8f9484` | Legendas, metadados, texto de menor hierarquia (ainda assim AA) |
| `--color-border-subtle` | `rgba(255,255,255,0.08)` | Divisores decorativos (a estrutura já é lida pela mudança de fundo/espaçamento, não pela borda) |
| `--color-border-strong` | `#5c6350` | Borda de componente interativo que precisa ser perceptível por si só (input, card de plano, item de acordeão) |
| `--color-focus-ring` | `#a3d13a` | Anel de foco de teclado (3px, offset 2px), usado só para foco, nunca decorativo |
| `--color-danger` | `#ef4444` | Erro de formulário, incompatibilidade de aparelho, alerta |
| `--color-success` | `#8bb52e` | Confirmação, aparelho testado/compatível (reaproveita o primary-bright, não cria uma terceira família de verde) |

### 1.2 Tailwind: pronto para colar

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0a0b08',
          surface: '#14160f',
          raised: '#1c1f15',
        },
        primary: {
          DEFAULT: '#6b8e23',
          bright: '#8bb52e',
        },
        secondary: '#3f4b23',
        cta: {
          bg: '#6b8e23',
          text: '#0d0f07',
        },
        text: {
          primary: '#ffffff',
          secondary: '#c7c7bd',
          tertiary: '#8f9484',
        },
        border: {
          subtle: 'rgba(255,255,255,0.08)',
          strong: '#5c6350',
        },
        focusring: '#a3d13a',
        danger: '#ef4444',
        success: '#8bb52e',
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque"', 'Outfit', 'sans-serif'],
        body: ['Geist', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '20px',
      },
      boxShadow: {
        card: '0 4px 16px rgba(0,0,0,0.35)',
        'card-hover': '0 8px 28px rgba(0,0,0,0.45)',
        cta: '0 6px 20px rgba(107,142,35,0.25)',
      },
      spacing: {
        18: '4.5rem',
      },
      transitionTimingFunction: {
        std: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
```

### 1.3 Contraste calculado: tabela de verificação (WCAG 2.1)

| Par | Ratio | AA texto normal (4.5:1) | AA texto grande / UI (3:1) |
|---|---|---|---|
| `#ffffff` texto sobre `bg-base` | 19.73:1 | PASSA | PASSA |
| `#c7c7bd` (text-secondary) sobre `bg-base` | 11.59:1 | PASSA | PASSA |
| `#8f9484` (text-tertiary) sobre `bg-base` | 6.33:1 | PASSA | PASSA |
| `#6b8e23` (primary) como texto/ícone sobre `bg-base` | 5.19:1 | PASSA | PASSA |
| `#8bb52e` (primary-bright) sobre `bg-base` | 8.22:1 | PASSA | PASSA |
| `#ef4444` (danger) sobre `bg-base` | 5.24:1 | PASSA | PASSA |
| `#a3d13a` (focus ring) sobre `bg-base` | 11.03:1 | PASSA | PASSA |
| `#5c6350` (border-strong) sobre `bg-base` | 3.15:1 | não se aplica | PASSA (é para bordas, não texto) |
| `#c7c7bd` sobre `bg-surface` | 10.71:1 | PASSA | PASSA |
| `#8bb52e` sobre `bg-surface` | 7.60:1 | PASSA | PASSA |

**Achado que corrige um erro real (não hipotético):** texto branco sobre o botão na cor de marca (`#6b8e23`) dá 3.81:1. Passa no limiar de texto grande (3:1) mas falha no texto normal de botão (4.5:1), que é o caso mais comum (rótulo de CTA em 14-16px). Se o site já tem ou vier a ter algum botão "branco sobre verde", ele está abaixo do mínimo AA e precisa ser trocado. A correção usada neste design system é texto quase-preto (`#0d0f07`) sobre o mesmo verde de marca, o que sobe para 5.07:1, passa AA normal e mantém a cor de marca inalterada no botão (não precisou escurecer o verde, só trocar a cor do texto). Essa é a regra a seguir em qualquer botão sólido na cor primária: texto escuro, nunca branco.

Bordas decorativas (`border-subtle`, branco a 8% de opacidade) não têm obrigação de atingir 3:1 porque não são o único sinal de estrutura do componente (fundo e espaçamento já comunicam a divisão). Mas qualquer borda que seja o único indicador de um componente interativo (contorno de input, contorno do card de plano selecionado, contorno de item de acordeão) usa `border-strong` (`#5c6350`, 3.15:1), calculado para ser o cinza-oliva mais escuro que ainda cruza o mínimo de 3:1 do WCAG 1.4.11 (non-text contrast). Não é "um cinza que parece dar", é o valor mínimo que passa.

---

## 2. Tipografia

Testado par Bricolage Grotesque (heading) + Geist (body): mesmo par já validado visualmente no appkplay (registrado na memória do projeto como identidade que funcionou, evita repetir fonte antiga tipo Poppins/Outfit genérico de landing page). A base `ui-ux-pro-max` não tem esse par exato cadastrado (o mais próximo que a busca por "tech/modern/grotesk" devolveu foi Space Grotesk + DM Sans, que é a mesma família de raciocínio: um display geométrico de peso alto para título, um texto humanista neutro para corpo). Manter Bricolage+Geist por já ser testado no ecossistema, com esse par do banco como fallback caso alguma variação de peso falte no Google Fonts.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Geist:wght@400;500;600;700&display=swap" rel="stylesheet">
```

| Uso | Fonte | Peso | Tamanho (desktop / mobile) |
|---|---|---|---|
| H1 (hero) | Bricolage Grotesque | 800 | 48-56px / 32-36px |
| H2 (seção) | Bricolage Grotesque | 700 | 32-36px / 24-28px |
| H3 (card/componente) | Bricolage Grotesque | 600 | 20-22px / 18-20px |
| Corpo | Geist | 400 | 16px / 15px |
| Corpo destacado (preço, benefício) | Geist | 600 | 16-18px |
| Legenda/metadado | Geist | 500 | 13-14px |

Line-height: 1.15 em títulos, 1.55-1.6 em corpo (compensa a densidade visual sem parecer apertado na leitura).

---

## 3. Espaçamento e densidade

Regra do dono: densidade de informação, sem "ar vazio decorativo". A recomendação genérica que o `ui-ux-pro-max` devolveu para o padrão "App Store Style" (seções de 48px+, tipografia 32px+, grandes vãos) é o oposto do que a marca pede. Tratar como anti-padrão aqui, não como recomendação a seguir.

| Token | Valor | Uso |
|---|---|---|
| `--space-2xs` | 4px | Gap entre ícone e label |
| `--space-xs` | 8px | Gap interno de badge/chip |
| `--space-sm` | 12px | Gap entre itens de lista/grid apertado |
| `--space-md` | 16px | Padding padrão de card |
| `--space-lg` | 24px | Padding de card grande / gap de grid principal |
| `--space-xl` | 40px | Respiro entre blocos dentro de uma seção |
| `--space-2xl` | 64px | Padding vertical de seção (desktop); não subir para 96px+ |
| `--space-3xl` | 80px | Padding vertical do hero (desktop) |

Em mobile, todos os `xl`/`2xl`/`3xl` caem para 60-70% do valor desktop.

---

## 4. Motion e interação

- Transições: `150-250ms`, `cubic-bezier(0.4,0,0.2,1)` (`transition-std` no Tailwind acima). Nunca instantâneo, nunca acima de 300ms.
- Hover: mudança de cor/opacidade/sombra. Nunca `scale()` que desloca layout (regra explícita do próprio `ui-ux-pro-max` e reforçada pela marca).
- `cursor: pointer` obrigatório em todo elemento clicável (card de plano, item de FAQ, botão de instalação).
- Foco de teclado: anel de 3px na cor `--color-focus-ring` (`#a3d13a`), `outline-offset: 2px`. Nunca `outline: none` sem substituto visível.
- Respeitar `prefers-reduced-motion: reduce` (desliga transições de entrada/scroll, mantém apenas troca de cor instantânea).
- Ícones: SVG só, biblioteca Lucide (confirmado como padrão do banco `ui-ux-pro-max` para ícones de dispositivo/ação/navegação usados aqui: `Download`, `Check`, `ChevronDown`/`ChevronUp`, `Shield`, `MessageCircle`, `Smartphone`, `Monitor`, `Tv`. Se `Tv` não existir na versão instalada do Lucide, usar `Monitor` como substituto). Tamanho fixo por contexto: 16px em texto inline, 20px em botão, 24px em destaque de card. **Nunca emoji em nenhuma peça.**

---

## 5. Componentes-chave

### 5.1 Hero

Referência de layout: "App Store Style Landing" do `ui-ux-pro-max` (mockup do app + CTA de download em destaque) cruzado com o padrão já validado no `intel-appwplay.md` (headline direta, sem contador/urgência artificial).

Estrutura:
1. Faixa superior fina opcional (não obrigatória): status curto e verificável, ex. horário real de atendimento. Nunca contador de "clientes online agora" fabricado.
2. H1 direto sobre o produto (WPlay: app + teste grátis), sem jargão de operadora concorrente.
3. Subheadline de 1-2 linhas, `text-secondary`, explicando em linguagem simples o que é IPTV+P2P (o próprio `intel-appwplay.md` aponta isso como lacuna do mercado, resolver aqui, não só no FAQ).
4. Dois CTAs lado a lado, mesmo peso visual: **"Testar grátis"** (botão sólido, `cta-bg`/`cta-text`) e **"Ver planos"** (botão outline, borda `border-strong`, texto `primary-bright`). O teste tem que competir visualmente com a compra, nunca ficar menor ou secundário: é a lição central do `intel-appwplay.md`.
5. Mockup real do app WPlay (screenshot genuíno da interface, grid de canais/EPG como estética, nunca ilustração stock) ancorado à direita (desktop) ou abaixo do CTA (mobile), com moldura de dispositivo sutil (sem glow neon).
6. Elemento inline curto e verdadeiro (não uma "trust bar" separada ainda) do tipo "Sem cartão, sem cadastro, sai na hora": reaproveita o achado mais forte do `intel-appwplay.md`.

Fundo: `bg-base` sólido; nada de gradiente saturado ciano/magenta (isso é o estilo antigo do site, já abandonado, não reintroduzir). Um único glow radial muito sutil em `--color-primary` a 6-8% de opacidade é aceitável para dar profundidade, desde que não compita com o texto.

### 5.2 Card de plano único ("Essencial")

Não é uma grade de 3 planos concorrentes, é um plano com 3 durações (mensal/trimestral/semestral), seguindo a arquitetura já decidida (`arquitetura.md` seção 6) e o padrão de ancoragem de preço do `intel-appwplay.md`.

Estrutura do card:
1. Nome do plano ("Essencial") + lista curta de benefícios com ícone `Check` em `success` (2 telas IPTV + 1 P2P, 4K, sem fidelidade, suporte WhatsApp).
2. Seletor de duração como abas/pills dentro do próprio card (não 3 cards separados): Mensal / Trimestral / Semestral. A opção "Mais escolhido" (provavelmente trimestral, replicando o padrão validado) ganha um badge em `primary` com texto `cta-text` (contraste calculado).
3. Preço grande (`Geist 600`, ~36-40px) + preço equivalente por mês menor ao lado (`text-tertiary`) + selo de economia calculado ("X% mais barato") quando a duração for maior que mensal. Nunca inventar percentual, calcular a partir do preço real cadastrado.
4. Dois CTAs empilhados dentro do card: **"Assinar agora"** (sólido) e, com peso visual igual ou maior, **"Testar antes de assinar"** (outline). De novo, o teste não pode virar link pequeno de rodapé.
5. Borda do card usa `border-strong` (não `border-subtle`) porque é um componente interativo selecionável, precisa ser perceptível sozinho, sem depender só da cor de fundo.
6. Rodapé do card com nota factual curta ("Pagamento só via PIX", "Sem fidelidade"). Não empilhar mais de 2 linhas aqui, cabe no FAQ.

### 5.3 FAQ accordion

Baseado nas guidelines de formulário/interação do `ui-ux-pro-max` (rótulo sempre visível, nunca só placeholder) e na lista real de objeções levantada no `intel-appwplay.md` (como funciona o teste, quantos dispositivos, quais aparelhos, estabilidade, forma de pagamento, revenda).

Marcação: `<button aria-expanded>` por item, painel associado por `aria-controls`/`id`, ícone `ChevronDown`/`ChevronUp` que gira 180deg em `200ms` ao abrir (rotação de ícone é aceitável, é diferente do "scale que desloca layout" proibido). Fundo do item fechado é `bg-surface`; ao abrir, o painel expande sem re-layout brusco dos itens abaixo (usar altura animada via `grid-template-rows` ou `max-height` com curva `transition-std`).

Conteúdo do primeiro item (o mais importante, replicando o achado do `intel-appwplay.md`): **"Por que pedimos teste antes de vender"**, admitindo que aparelho e internet do cliente estão fora de controle. É o argumento de credibilidade mais forte do nicho, entra aqui e não só na landing do teste.

### 5.4 Device install card

Card por aparelho (Fire TV Stick, Smart TV, TV Box, Android, PC/Web Player), em grid responsivo (2 colunas mobile, 4 desktop).

Estrutura de cada card:
1. Ícone Lucide do dispositivo (`Smartphone`, `Monitor`, `Tv`/`Monitor` de fallback) em `primary-bright`, 24px.
2. Nome do aparelho.
3. Badge de status honesto, nunca omitido: `Testado` (verde `success`) ou `Não compatível` (vermelho `danger`). Nunca um terceiro estado vago tipo "pode funcionar". Isso é obrigatório por causa do caso já documentado no projeto (Fire Stick com Vega OS que não instala em alguns modelos e gera estorno): o componente precisa suportar o estado negativo desde o desenho, não só o positivo.
4. Se testado: nome do modelo específico usado no teste (ex. "Fire TV Stick HD, 2023"), replicando o padrão "equipamento nomeado" do `intel-appwplay.md`. Nunca "funciona em qualquer TV Box".
5. Código de instalação (Downloader) em fonte monoespaçada dentro de um chip com fundo `bg-surface-raised` e borda `border-strong`, com botão de copiar (ícone só, `aria-label="Copiar código"`).
6. CTA secundário "Ver tutorial" linkando para o guia daquele aparelho.

Estado "Não compatível": o card não fica cinza-desabilitado escondendo a informação, fica com o badge vermelho bem visível e um texto curto de uma linha explicando o motivo real (nunca deixar o usuário descobrir só depois de comprar).

### 5.5 Trust bar (honesta, sem estatística fabricada)

Faixa horizontal (scroll em mobile) com 4-5 itens, cada um verificável, replicando exatamente a lição do `intel-appwplay.md` seção 6-7 (o mercado não usa depoimento porque depoimento nesse nicho é fácil de desconfiar; a confiança vem de transparência operacional).

Itens permitidos (exemplos, cada um só entra se for verdade checável):
- "Teste grátis antes de pagar" (ícone `Shield`)
- "Sem cartão, sem cadastro" (ícone `Check`)
- "Suporte humano [horário real, ex. 09h-22h todos os dias]": nunca prometer 24h de atendimento humano se o atendimento humano tem janela definida. Se quiser citar infraestrutura 24/7, rotular explicitamente como "servidor" e não como "suporte", para não repetir a ambiguidade que o próprio `intel-appwplay.md` aponta como ponto a evitar.
- "Aparelhos testados: [nomes reais dos modelos]" (ícone `Monitor`)
- "Pagamento só via PIX" (ícone opcional de cadeado/segurança)

Itens proibidos neste componente: contador de clientes, nota média de avaliação, "+X mil assinantes", qualquer número que não venha de uma fonte real e citável no momento da implementação. Se não houver dado real ainda, o slot fica com um item operacional (teste grátis, PIX, aparelhos testados) em vez de forçar uma estatística.

Estilo visual: fundo `bg-surface`, texto `text-secondary`, ícone `primary`, sem cards individuais com sombra (é uma faixa contínua, discreta, não uma seção que compete com o hero).

---

## 6. Loop de verificação visual (para a fase de implementação)

Este documento é a especificação; a implementação real acontece no agente `wplay-engineer`. Registrando aqui porque é regra do método do projeto (`build-site-loop-visual`, memória do dono): nenhuma peça deste design system deve ser considerada pronta só por revisão de código. Durante a implementação:

1. Rodar o Next.js localmente e abrir cada componente (hero, card de plano, FAQ, device card, trust bar) em Chrome headless via Playwright/Bash, tirando screenshot real, não confiar em "parece que bateu com o token".
2. Medir contraste renderizado de verdade em pelo menos os pares críticos da seção 1.3 (especialmente o texto do CTA sobre `--color-cta-bg`), porque fonte/anti-aliasing/opacidade podem mudar o resultado percebido mesmo com o hex correto.
3. Testar em 375px, 768px, 1024px, 1440px (checklist já herdado do `ui-ux-pro-max`) e confirmar que nenhum card de dispositivo ou plano estoura horizontalmente.
4. Testar o accordion com teclado (Tab + Enter/Space) e confirmar que o anel de foco (`--color-focus-ring`) aparece, não só visualmente correto no CSS, mas de fato visível no screenshot.
5. Conferir logo e imagens: nenhuma imagem placeholder/stock genérica no commit final. O mockup do app tem que ser captura real da interface WPlay.

---

## 7. Pendências para o `wplay-engineer`

- Confirmar se a instalação do Google Fonts vai via `<link>` (mais simples, usado neste doc) ou self-host (`next/font`). Self-host é melhor para performance/CLS, mas é decisão de stack, não de design.
- Gerar/obter o SVG real do logo WPlay em verde de marca (`#6b8e23`) sobre fundo transparente, para o header e o favicon. Não existe ainda um logo vetorial dedicado identificado nesta pesquisa.
- Confirmar a lista definitiva de aparelhos testados e seus modelos exatos antes de implementar o Device Install Card. O formato do componente está pronto, o conteúdo (quais aparelhos, testado ou não) depende do que o dono efetivamente testou, incluindo o caso já sinalizado do Fire Stick com Vega OS.
