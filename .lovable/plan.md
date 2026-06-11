# Revisão pedagógica do Corpo Bem Cuidado

Reescrever o conteúdo das 30 casas para alinhar à BNCC EF01CI03, com situações reais da rotina da Nina, distratores plausíveis, feedbacks explicativos e "Você sabia?" com microdesafios fechados. A mecânica do jogo (dado 1–3, drag-and-drop da Nina, layout 1200×675, cards) e o visual permanecem intactos.

## 1. Reestruturação das 30 casas (`src/data/cells.ts`)

Nova ordem narrativa (acordar → café → escola/parque → lanche → nariz → banheiro → banho → dormir → síntese):

| # | Tipo | Tema |
|---|------|------|
| 1 | start | O dia da Nina começou |
| 2 | question | Acordar — cuidar do rosto |
| 3 | question | Como secar o rosto |
| 4 | didYouKnow | Cuidar do corpo todos os dias |
| 5 | question | Antes do café — lavar mãos |
| 6 | advance | Nina lembrou de lavar as mãos (+1) |
| 7 | question | Depois do café — proteger os dentes |
| 8 | didYouKnow | O que são cáries? |
| 9 | common | Nina vai para a escola/brincar |
| 10 | question | Parque + lanche — mãos sujas |
| 11 | question | Antes da fruta — lavar a maçã |
| 12 | didYouKnow | Água limpa e alimentos |
| 13 | question | Nariz escorrendo — usar lenço |
| 14 | question | Depois do lenço — jogar fora + lavar mãos |
| 15 | didYouKnow | Cuidar de mim e dos outros |
| 16 | advance | Jogou lenço no lixo (+1) |
| 17 | question | Depois do banheiro — lavar mãos |
| 18 | didYouKnow | Mãos limpas ajudam a proteger |
| 19 | question | Mãos "parecem limpas" → água e sabão |
| 20 | question | Depois de suar — tomar banho |
| 21 | question | Item do banho (sabonete) — escolha única, sem múltipla seleção |
| 22 | advance | Nina tomou banho (+1) |
| 23 | didYouKnow | Cuidado com os pés |
| 24 | question | Antes de dormir — escovar os dentes |
| 25 | didYouKnow | Água parada merece atenção |
| 26 | match | Associar situação ↔ cuidado |
| 27 | habits | Escolher hábitos saudáveis |
| 28 | advance | Rotina bem cuidada (+1) |
| 29 | synthesis | Síntese fechada (escolha única) |
| 30 | finish | Corpo bem cuidado! |

Mudanças estruturais relevantes:
- Remover a casa de retorno (`retreat`) atual que contradiz a narrativa ("Nina esqueceu de lavar as mãos antes do lanche"). Substituir por avanço positivo.
- Casa 21 vira **escolha única** (sabonete vs bola/lápis), eliminando a necessidade de múltipla seleção e mantendo o `ObjectCard` atual.
- Casa 23 passa a ser `didYouKnow` (Cuidado com os pés) — antes era `question` "antes de dormir".
- Casa 25 passa a ser `didYouKnow` (Água parada) — antes era `didYouKnow` de água/fruta, agora deslocado para a casa 12.
- Casa 29 vira síntese **fechada** com alternativas; tipo `synthesis` ganha campos `prompt`/`alternatives`/`feedbackCorrect`/`feedbackWrong` opcionais.

Todos os textos de `prompt`, `alternatives`, `feedbackCorrect`, `feedbackWrong`, `infoTitle`, `infoText`, `infoIcon` serão substituídos exatamente pelos enunciados fornecidos no briefing (casas 2, 3, 5, 7, 10, 11, 13, 14, 17, 19, 20, 21, 24 e 7 "Você sabia?").

## 2. Síntese fechada (`src/components/game/cards/SpecialCard.tsx`)

Hoje `SpecialCard` cobre `advance`/`retreat`/`synthesis` apenas com botão "Continuar". Para a casa 29:
- Quando `cell.type === "synthesis"` e existir `cell.alternatives`, renderizar via `QuestionCard` (ou um modo "single-choice" dentro do `SpecialCard`) com feedback inline curto + "Continuar".
- Comportamento: ao acertar/errar mostra feedback e avança para a casa 30. Não conta pontos diferentes — apenas fecha o jogo.

Decisão: reaproveitar `QuestionCard` no roteamento de `BoardGame.tsx` quando `synthesis` tiver alternativas; caso contrário cai no `SpecialCard` original.

## 3. Roteamento (`src/components/game/BoardGame.tsx`)

- No switch por `cell.type`, no caso `synthesis`: se `cell.alternatives?.length`, renderizar `QuestionCard` com `onAnswer` que apenas avança (sem alterar pontuação) e mostra feedback; senão manter `SpecialCard`.
- Remover qualquer tratamento do `retreat` se nenhuma casa o usar mais (manter o `case` por segurança, mas pode ficar inerte).
- Atualizar a legenda se houver chip "Voltar".

## 4. Tela de instruções (`src/components/game/InstructionsScreen.tsx`)

Atualizar descrições para refletir: só casas de **avanço** (sem retorno) e que a síntese final é uma escolha fechada.

## Fora de escopo

- Mecânica do dado, drag-and-drop, layout 1200×675, visual da Nina, paleta, fontes, estilos dos cards, `Board.tsx` (cores/ícones por tipo já existem).
- Componentes `DidYouKnowCard`, `ObjectCard`, `MatchChallengeCard`, `HabitsChallengeCard`, `FeedbackCard` — não precisam de mudança estrutural; só recebem novo conteúdo via `cells.ts`.

## Arquivos

- editar: `src/data/cells.ts`, `src/components/game/BoardGame.tsx`, `src/components/game/cards/SpecialCard.tsx`, `src/components/game/InstructionsScreen.tsx`
