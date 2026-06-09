## Objetivo

Trocar o avanço automático da Nina por uma mecânica em que o aluno **arrasta** a personagem até a casa de destino após o sorteio do dado. Mantém tabuleiro, 30 casas, dado 1–3, cards, feedbacks, layout 1200×675 e ausência de scroll.

## Nova máquina de estados

`src/components/game/BoardGame.tsx` passa a usar:

```text
idle
  → rolling                       (sortei dado)
  → awaitingDrag { steps, origin }(dado parado, aluno arrasta Nina)
       ├─ drop correto  → moveSuccess (toast breve) → card / próxima fase
       └─ drop errado   → toast de orientação + Nina volta à origem (continua awaitingDrag)
  → card
  → feedback
  → awaitingSpecialDrag { delta, origin } (após SpecialCard de avanço/retorno)
       └─ mesma regra de drop
  → idle
```

Regras derivadas:
- `Jogar dado` só fica habilitado em `idle`.
- Em `awaitingDrag` / `awaitingSpecialDrag`, o dado fica desabilitado.
- Posição da Nina só muda quando o drop é validado.
- Avanço/retorno especial não move sozinho: o `SpecialCard` fecha e entra em `awaitingSpecialDrag`.

## Mudanças por arquivo

### `src/components/game/Board.tsx`
Novos props: `position`, `highlightedCells: number[]`, `targetCell?: number`, `draggable: boolean`, `onDrop?: (cellId | null) => void`.

- Cada casa em `highlightedCells` ganha um anel pulsante (animação opacity/scale via `motion.circle`); a `targetCell` ganha um anel extra dourado mais forte.
- Nina vira `motion.g` com handlers de `onPointerDown` / `onPointerMove` / `onPointerUp` quando `draggable=true`. Converte coordenadas do ponteiro para o espaço SVG via `getScreenCTM().inverse()`.
- Enquanto arrasta, Nina segue o ponteiro (sem animação spring). No `pointerup`, calcula a casa mais próxima dentro de raio ~40px; se nenhuma dentro do raio → `onDrop(null)`. Se há casa próxima → `onDrop(id)`.
- Após `onDrop`, o componente pai decide: se aceitou, atualiza `position`; se rejeitou, Nina anima de volta para `position` atual.
- Exporta `getCellPosition` (já existe) para o pai gerar a lista de destacadas.

Fallback de acessibilidade: clique em Nina seleciona; clique em uma das `highlightedCells` dispara `onDrop(id)` igual ao drag.

### `src/components/game/BoardGame.tsx`
- Remove o `useEffect` que abria o card 700ms após `moving`.
- `rollDice` agora termina em `awaitingDrag { steps: finalVal, origin: position }` (não muda `position`).
- Calcula `highlightedCells = [origin+1 .. origin+steps]` clamp em 30; `targetCell = min(30, origin+steps)`.
- `handleDrop(id)`:
  - se `id === targetCell` → atualiza `position`, mostra toast verde "Muito bem! Você contou as casas e levou Nina ao lugar certo." por ~1.2 s e em seguida `openCardForCell(target)`.
  - se incorreto → toast laranja "Vamos contar de novo? O dado mostrou {n}. Arraste Nina {n} casa(s) para frente." por ~2 s, Nina volta à origem, permanece em `awaitingDrag`.
- `handleSpecial` (avanço/retorno) deixa de aplicar delta automaticamente. Ao continuar o `SpecialCard`, se `delta !== 0`, entra em `awaitingSpecialDrag { delta, origin: position }` com `targetCell = position + delta`; se delta = 0 vai para `idle`. Remove o uso de `afterDelta` em feedback.
- Painel lateral ganha uma área de orientação que troca o texto da `NinaSpeech` conforme o estado:
  - `idle`: "Toque no dado e vamos juntas!"
  - `awaitingDrag`: "O dado mostrou {n}. Arraste Nina {n} casa(s) para frente."
  - `awaitingSpecialDrag` com delta>0: "Arraste Nina {delta} casa(s) para frente."
  - `awaitingSpecialDrag` com delta<0: "Arraste Nina {|delta|} casa(s) para trás."

### Toasts breves
Componente leve novo `src/components/game/MoveToast.tsx` (overlay absoluto no canto superior central do tabuleiro), com variant `success` (verde) e `hint` (laranja). Auto-fecha por timeout controlado no `BoardGame`. Card grande de feedback pedagógico (após responder pergunta) continua usando `FeedbackCard` como hoje — esses toasts são só para a etapa de movimentação.

## Detalhes técnicos

- Conversão de coordenadas: `pt = svg.createSVGPoint(); pt.x=e.clientX; pt.y=e.clientY; const local = pt.matrixTransform(svg.getScreenCTM()!.inverse())`.
- `setPointerCapture` no `pointerdown` para garantir captura mesmo se o ponteiro sair do raio da Nina.
- Snap-back animado via state local `dragPos` em Board; quando `onDrop` é rejeitado, pai sinaliza via prop `rejectCount` (incrementa) e Board faz `animate` de volta para `position`.
- Tamanho da Nina aumenta levemente (raio 22 → 26) e área de cada casa permanece 32 — suficiente para drop tátil.

## Fora do escopo

- Conteúdo das casas, perguntas, feedbacks pedagógicos, dado 1–3, número de casas, layout, telas de início/instruções/final, estilo geral.
- Não mudar `cells.ts` nem nenhum card de conteúdo.

## Arquivos afetados

- `src/components/game/BoardGame.tsx` — nova máquina de estados, handlers de drop, orientação dinâmica.
- `src/components/game/Board.tsx` — props de destaque, Nina arrastável, drop-zones, fallback por clique.
- `src/components/game/MoveToast.tsx` — novo componente de toast curto.
