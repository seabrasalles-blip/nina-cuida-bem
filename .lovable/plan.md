
# Corpo Bem Cuidado — Plano de Implementação

Objeto digital de aprendizagem em formato de jogo de tabuleiro, com a personagem Nina, alinhado à habilidade EF01CI03 da BNCC.

## Estrutura de telas

1. **Capa** — título "Corpo Bem Cuidado", Nina + elementos de higiene, botão "Começar".
2. **Instruções** — como jogar + fala da Nina com ícone de áudio (visual), botão "Ir para o jogo".
3. **Tabuleiro principal** — trilha sinuosa de 30 casas, painel lateral com dado/pino/botão.
4. **Cards modais** — pergunta, objeto, conversa, cuidado especial, desafios, feedback.
5. **Tela final** — síntese, Nina sorrindo, botões "Jogar novamente" e "Finalizar".

Todas as telas em container fixo **1200 × 675 px** (proporção 16:9), centralizado e escalado responsivamente via `transform: scale()` para nunca exibir scrollbars.

## Mecânica

- Dado sorteia **1 a 3**.
- Pino da Nina anima de casa em casa.
- Casa especial → abre card/modal grande centralizado.
- Botão "Jogar dado" desativado enquanto card aberto; reativa após "Continuar".
- Casas de avanço/retorno movem ±1 automaticamente após leitura.
- Casa 30 → tela final.

## Tipos de casa (cores)

- Comum: neutra clara
- Pergunta: azul
- Objeto: verde
- Conversa: amarela
- Especial (avanço/retorno/desafio/síntese): laranja

Legenda compacta no painel lateral.

## Conteúdo

Array `cells[30]` tipado, com os dados exatos das 30 casas fornecidas na especificação (início, perguntas das casas 2/5/8/13/17/20/23, objetos, 5 conversas, avanços/retornos, 2 desafios finais — associação e seleção de 3 hábitos, síntese, chegada). Perguntas, alternativas, feedbacks corretos e de erro conforme texto do briefing — sem alterações de redação pedagógica.

## Componentes (React + TypeScript)

```
src/
├── routes/index.tsx               (monta <App />)
├── components/game/
│   ├── App.tsx                    (estado global: tela, posição, dado, card, etc.)
│   ├── GameStage.tsx              (wrapper 1200×675 + auto-scale)
│   ├── StartScreen.tsx
│   ├── InstructionsScreen.tsx
│   ├── BoardGame.tsx              (layout tabuleiro + painel)
│   ├── BoardPath.tsx              (SVG do caminho sinuoso + casas)
│   ├── BoardCell.tsx
│   ├── PlayerToken.tsx            (Nina animada via framer-motion)
│   ├── Dice.tsx                   (animação de rolagem 1–3)
│   ├── SidePanel.tsx              (dado, casa atual, botão, legenda)
│   ├── NinaSpeech.tsx             (balão + ícone de áudio visual)
│   ├── cards/
│   │   ├── QuestionCard.tsx
│   │   ├── ObjectCard.tsx
│   │   ├── ConversationCard.tsx
│   │   ├── SpecialCard.tsx
│   │   ├── MatchChallengeCard.tsx (casa 26 — associar pares)
│   │   ├── HabitsChallengeCard.tsx(casa 27 — escolher 3 hábitos)
│   │   └── FeedbackCard.tsx
│   └── FinalScreen.tsx
└── data/cells.ts                  (tipos + array das 30 casas)
```

Estado em `App.tsx` com `useReducer` controlando: `screen`, `position`, `diceValue`, `isRolling`, `activeCard`, `selectedAnswer`, `feedback`, `pendingMove`.

## Design visual

- Paleta acolhedora infantil sem infantilizar (azul céu, verde menta, amarelo suave, laranja coral, neutros creme).
- Fonte sem serifa (Nunito ou Fredoka via `<link>` no `__root.tsx`, registrada em `@theme` no `src/styles.css`).
- Botões e cards grandes, alto contraste, fundo claro.
- Ícones de higiene em SVG/emoji estilizado (sabonete, escova, toalha, lenço, etc.) gerados inline para evitar dependências.
- Animações leves com **framer-motion**: dado girando, pino deslizando entre casas, card com fade+scale.

## Dependências

- `framer-motion` (instalar via `bun add framer-motion`)
- Sem libs adicionais; ícones inline SVG.

## SEO / Head

Route `index` com title "Corpo Bem Cuidado — Atividade EF01CI03" e description curta.

## Garantias

- Nenhuma scrollbar: `overflow: hidden` no `body` + stage com auto-scale.
- Nenhuma menção à palavra "missão".
- Feedbacks sempre explicativos, conforme textos fornecidos.
- Habilidade EF01CI03 preservada nas razões dos cuidados.

## Entrega

Primeira versão funcional completa do fluxo: capa → instruções → tabuleiro jogável de 30 casas com todos os cards e feedbacks → tela final com reinício.
