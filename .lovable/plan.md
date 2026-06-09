## Redesign visual — Corpo Bem Cuidado

Mantém toda a lógica pedagógica (perguntas, feedbacks, drag-and-drop, 30 casas, dado 1–3, 1200×675). Foco total em estética, hierarquia e usabilidade infantil.

### Direção visual escolhida
- **Paleta Céu & Sol:** azul `#3FA9F5`, verde `#7ED957`, amarelo `#FFD93D`, laranja `#FF8C42`, branco `#FFFFFF`, mais tons de apoio (céu claro, areia, rosa-bochecha).
- **Tipografia:** Fredoka (títulos) + Nunito (corpo), carregadas via Google Fonts no `<head>`.
- **Estilo Nina:** ilustração com volume e textura (sombreado suave, bochechas, olhos brilhantes).
- **Cenário:** quarto/casa da Nina — fundo decorativo suave com elementos da rotina (cama, janela, prateleira de higiene) em opacidade baixa, sem competir com o jogo.

### 1. Design tokens (`src/styles.css`)
Adicionar variáveis do tema do jogo dentro de `:root` e registrá-las em `@theme inline` para virarem utilitários:
- `--game-sky`, `--game-green`, `--game-sun`, `--game-orange`, `--game-cream`, `--game-blush`, `--game-ink` (texto), `--game-ink-soft`.
- Sombras: `--shadow-toy` (sombra colorida levemente offset para sensação de relevo), `--shadow-card`.
- Gradientes: `--gradient-sky` (céu claro), `--gradient-room` (parede + chão).
- Carregar Fredoka e Nunito via `<link>` em `src/routes/__root.tsx`; mapear `--font-display` e `--font-body`; aplicar `font-body` no `body` e classes `font-display` nos títulos.

### 2. Capa (`StartScreen.tsx`) — refeita
Composição intencional, sem ícones espalhados aleatoriamente:
- Fundo em duas camadas: gradiente céu + faixa de "chão" com pequenas nuvens e um sol cantos superiores.
- Atrás de tudo, **trilha do tabuleiro** desenhada em SVG decorativo (curva pontilhada amarela com 5–6 casas circulares) atravessando suavemente a tela.
- Coluna esquerda: badge "Atividade · 1º ano · EF01CI03", título grande `Corpo Bem Cuidado` (Fredoka 72px), subtítulo "Ajude Nina a cuidar do corpo durante o dia.", botão **Começar** grande (laranja, arredondado total, sombra, ícone de play), e uma linha "Para crianças de 6–7 anos".
- Coluna direita: **Nina** maior (~340px) em pose acenando, sobre um pódio circular com sombra; ao redor, 3–4 objetos de higiene (sabonete, escova, toalha) posicionados em arco como satélites flutuantes (animação `y` sutil).
- Sem emojis soltos pelo fundo. Composição balanceada, respiro generoso.

### 3. Nina (`Nina.tsx`) — reilustrada
Reescrever o SVG com mais carisma e volume:
- Cabeça maior em proporção, franja com mechas, dois rabichos com laços.
- Olhos grandes com brilho duplo, sobrancelhas, bochechas rosadas, sorriso aberto.
- Camiseta com listras ou estampa de estrelinha + macacão azul; gradientes leves para volume na roupa e na pele.
- `mood`: `happy`, `wave`, `cheer`, `think` (nova para usar em cards).
- Pequena sombra elíptica embaixo.

### 4. Tabuleiro (`Board.tsx` + `BoardGame.tsx`) — visual reforçado
Sem mudar a lógica (posições, drag, drops):
- Fundo do `<svg>`: gradiente quarto + grade decorativa muito sutil; molduras arredondadas brancas atrás do tabuleiro.
- Trilha mais grossa, em **caminho amarelo contínuo** com sombra inferior (segunda polyline mais escura deslocada 4px) + pontilhado por cima — sensação de estrada.
- Cada casa: círculo maior (r=34), sombra de "moeda" (círculo cinza embaixo), borda 4px, ícone maior, número em badge branco circular no canto superior. Cores mantêm a semântica atual mas alinhadas à nova paleta.
- Casa inicial e final com ilustração (bandeira/troféu) maior.
- Pino da Nina: substituir emoji por mini-avatar SVG (cabeça da Nina dentro de um pin circular com sombra colorida), sempre visível acima das casas.
- Painel lateral: cards brancos com cantos 24px, borda colorida superior em "guia" (faixa colorida tipo aba), tipografia Fredoka para títulos do painel. Dado maior e com sombra forte; botão "Jogar dado" laranja com efeito de pressionar (translate-y on active).
- Legenda reformatada como chips coloridos arredondados.

### 5. Cards de pergunta (`QuestionCard`, `ObjectCard`, `ConversationCard`, `SpecialCard`, `MatchChallengeCard`, `HabitsChallengeCard`)
Padrão unificado:
- Largura max ~880px, padding 40px, fundo branco, borda 4px colorida por tipo, sombra grande colorida (`--shadow-toy`), cantos 28px.
- Cabeçalho: chip do tipo ("Pergunta", "Cuidado do momento", "Conversa", "Cuidado especial") + badge "Casa N" à direita.
- Enunciado em Fredoka 30px, contraste forte; subtítulo/instrução em Nunito 18px.
- Avatar circular da Nina (mood `think`/`happy`) no canto, fala curta opcional.
- **Opções como botão-card grande**:
  - QuestionCard com 3 alternativas → grid 3 colunas, cada card ~220×220.
  - ObjectCard / opções com 4 → **grid 2×2**, cada card ~260×180.
  - 6+ alternativas → grid 3×2.
  - Cada card: fundo `--game-cream`, borda 3px, ícone/emoji ~64px centralizado, legenda Nunito 18px bold abaixo, hover `scale 1.04 + translate-y-1`, sombra colorida.
  - Selecionado (multi): borda verde + check em badge circular no topo.
- Botão "Confirmar" laranja grande, sempre alinhado à direita com bom respiro.

### 6. Feedback (`FeedbackCard.tsx`)
- Card maior (~720px), centralizado, animação `scale + spring`.
- Acerto: fundo verde-claro, borda verde, ícone de estrela animada (rotate/scale), título "Boa escolha!".
- Atenção: fundo amarelo-claro, borda laranja, ícone de lâmpada, título "Vamos pensar juntos".
- Texto Nunito 20px, line-height generoso.
- Botão "Continuar" laranja arredondado, sombra forte.
- Pequena Nina (mood cheer/think) ao lado do título.

### 7. Tela de instruções (`InstructionsScreen.tsx`)
- Mesma linguagem da capa: fundo quarto, Nina à direita com balão de fala usando `NinaSpeech` reestilizado.
- Três passos numerados (1 Jogar dado · 2 Arrastar Nina · 3 Responder) em cards coloridos lado a lado com ícones grandes.
- Botão "Ir para o jogo" laranja em destaque.

### 8. `NinaSpeech` e `MoveToast`
- `NinaSpeech`: balão branco com "rabinho" apontando para a Nina, borda azul, tipografia Nunito 16–18px, sombra suave.
- `MoveToast`: pill maior, ícone (check/lightbulb), Fredoka para o título curto, cor de fundo conforme variant.

### 9. Tela final (`FinalScreen.tsx`)
Atualizar visual para combinar: Nina em pose `cheer`, confete suave, card de parabéns, botão "Jogar de novo" laranja.

### Detalhes técnicos
- **Fontes:** adicionar `<link rel="preconnect">` + `<link rel="stylesheet">` Google Fonts (Fredoka 400/600/700, Nunito 400/600/800) no `head()` de `__root.tsx`. Declarar `--font-display: "Fredoka", system-ui;` e `--font-body: "Nunito", system-ui;` em `:root` e mapear em `@theme inline` (`--font-display`, `--font-sans`). Aplicar `font-family: var(--font-body)` no `body` e classe util `.font-display` nos títulos.
- **Tokens de jogo:** declarar em `:root` com `oklch(...)` equivalentes aos hex acima e expor como `--color-game-sky`, etc. — utilitários `bg-game-sky`, `text-game-ink` ficam disponíveis.
- **Sombras coloridas e gradientes** via `box-shadow` inline ou classes utilitárias em styles.css.
- **Sem mudanças de lógica:** `BoardGame.tsx` mantém máquina de estados, `cells.ts` intacto, drag-and-drop intacto. Mudanças puramente visuais (JSX/estilo) nesses arquivos.
- **Sem barras de rolagem:** todos os redesigns respeitam 1200×675 com paddings calculados; cards modais usam `max-h` e `overflow-hidden` controlados (sem scroll interno necessário para o conteúdo atual).
- **Acessibilidade:** contraste WCAG AA mantido (texto `--game-ink` sobre branco/creme), botões com `aria-label` quando icônicos, foco visível.

### Arquivos a editar / criar
- editar `src/styles.css` (tokens + fontes)
- editar `src/routes/__root.tsx` (preconnect + Google Fonts)
- editar `src/components/game/Nina.tsx` (nova ilustração + mood `think`)
- editar `src/components/game/StartScreen.tsx`
- editar `src/components/game/InstructionsScreen.tsx`
- editar `src/components/game/FinalScreen.tsx`
- editar `src/components/game/BoardGame.tsx` (estilos do shell, painel, legenda)
- editar `src/components/game/Board.tsx` (trilha, casas, pino Nina)
- editar `src/components/game/Dice.tsx`
- editar `src/components/game/NinaSpeech.tsx`
- editar `src/components/game/MoveToast.tsx`
- editar todos os cards em `src/components/game/cards/*`

### Fora de escopo
- Conteúdo pedagógico das perguntas, alternativas, feedbacks e textos das casas (mantidos como estão).
- Lógica do dado, drag-and-drop, fluxo de estados, número de casas.
- Roteamento, dados, qualquer backend.
