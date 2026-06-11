# Substituir casas de Conversa por "Você sabia?"

Trocar as 5 casas atuais do tipo `conversation` (4, 9, 15, 19, 25) por um novo tipo `didYouKnow` com informação curta + microdesafio de escolha única + feedback. Criar um card próprio com identidade visual lilás/roxo claro, mantendo todo o resto do jogo intacto.

## 1. Dados (`src/data/cells.ts`)

- Adicionar `"didYouKnow"` ao tipo `CellType`.
- Estender `Cell` com campos opcionais: `infoTitle?: string`, `infoText?: string`, `infoIcon?: string` (para a curiosidade); reaproveitar `prompt`, `alternatives`, `feedbackCorrect`, `feedbackWrong` para o microdesafio.
- Substituir as 5 casas conforme o briefing:
  - **Casa 4** — Cuidar do corpo todos os dias / "Qual dessas ações ajuda a cuidar do corpo?" (Lavar as mãos ✓ / Comer com mãos sujas / Usar camiseta como toalha) — ícone 🧼
  - **Casa 9** — O que são cáries? / "Qual atitude ajuda a evitar cáries?" (Escovar depois das refeições ✓ / Dormir sem escovar / Comer e nunca cuidar) — ícone 🪥
  - **Casa 15** — Cuidar de mim e dos outros / "Nina espirrou e limpou o nariz. O que fazer depois?" (Jogar lenço no lixo e lavar mãos ✓ / Guardar lenço no bolso / Limpar mãos na roupa) — ícone 🤧
  - **Casa 19** — Mãos limpas ajudam a proteger / "Quando é importante lavar as mãos?" (Antes de comer e depois do banheiro ✓ / Só quando parece limpa / Nunca precisa) — ícone 🦠
  - **Casa 25** — Água limpa também é cuidado / "Qual é a melhor atitude antes de comer uma fruta?" (Lavar com água limpa ✓ / Sem lavar / Em água suja) — ícone 💧
- Aplicar feedbacks exatamente como descritos no briefing.

## 2. Novo card (`src/components/game/cards/DidYouKnowCard.tsx`)

Componente novo baseado em `CardShell`, mas com identidade própria:
- Selo "Você sabia?" em roxo/lilás (novo tom `violet` adicionado ao `TONE` de `CardShell.tsx`, com border `border-violet-400`, chip `bg-violet-100 text-violet-700`).
- Bloco de curiosidade em destaque: fundo `bg-violet-50`, borda lilás, ícone grande (~72px), `infoTitle` em Fredoka, `infoText` em Nunito (máx. 2 frases).
- Microdesafio logo abaixo: `prompt` + 3 alternativas em grid (reutilizando o estilo de `OptionCard` de `QuestionCard.tsx`, mas com hover/borda em tom lilás).
- Ao escolher: mostrar feedback inline curto (verde acerto / laranja atenção) + botão "Continuar" que chama `onDone`. Não abre `FeedbackCard` separado — mantém a casa rápida.
- Nina presente com `mood="think"`.

## 3. Roteamento do card (`src/components/game/BoardGame.tsx`)

Onde hoje `case "conversation"` renderiza `ConversationCard`, adicionar `case "didYouKnow"` renderizando `DidYouKnowCard` com `onDone` que avança Nina como qualquer outra casa concluída. Manter `ConversationCard` no código apenas se ainda houver casas desse tipo; como todas as 5 serão convertidas, o `case "conversation"` pode ser removido e o arquivo `ConversationCard.tsx` deletado.

## 4. Tabuleiro (`src/components/game/Board.tsx`)

Adicionar estilo visual para o novo tipo `didYouKnow` nas casas do tabuleiro: cor lilás/roxo claro com ícone "?" ou "💡", para a criança identificar visualmente que ali tem uma curiosidade (não uma roda de conversa).

## 5. Tela de instruções (`src/components/game/InstructionsScreen.tsx`)

Se houver menção a "casas de conversa", trocar por "casas Você sabia?" com descrição curta ("curiosidades sobre higiene com um desafio rápido").

## Fora de escopo

Mantidos sem alteração: título, Nina, 30 casas, dado 1–3, arrastar Nina, layout 1200×675, sem scroll, demais tipos de casa (`question`, `object`, `match`, `habits`, `advance`, `retreat`, `synthesis`, `start`, `finish`, `common`), feedbacks pedagógicos das outras casas.

## Arquivos

- editar: `src/data/cells.ts`, `src/components/game/BoardGame.tsx`, `src/components/game/Board.tsx`, `src/components/game/cards/CardShell.tsx`, `src/components/game/InstructionsScreen.tsx`
- criar: `src/components/game/cards/DidYouKnowCard.tsx`
- remover: `src/components/game/cards/ConversationCard.tsx`
