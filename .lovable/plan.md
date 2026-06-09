## Contexto

As substituições de texto das casas 2, 3, 7, 11, 14, 18, 21 e 24 já foram aplicadas em `src/data/cells.ts` na rodada anterior, junto com o renome do chip para "Cuidado do momento". Esta rodada foca em fechar o que ficou pendente para cumprir a diretriz pedagógica por completo.

## Pendências identificadas

1. **Casa 21 — múltipla seleção real**
   O enunciado pergunta "Quais itens ajudam nesse cuidado?" (plural), mas o `ObjectCard` atual fecha no primeiro clique. A criança não consegue marcar Sabonete + Shampoo + Toalha juntos. Precisa virar seleção múltipla com confirmação.

2. **Casas duplicadas/redundantes (8, 13, 17, 23)**
   Após a reescrita, surgiram pares quase idênticos:
   - Casa 7 (object) e Casa 8 (question) — ambas "depois de comer, escovar os dentes".
   - Casa 13 (question) e Casa 14 (object) — ambas "nariz escorrendo, usar lenço".
   - Casa 17 (question) e Casa 18 (object) — ambas "depois do banheiro, lavar as mãos".
   - Casa 23 (question) e Casa 24 (object) — ambas "antes de dormir, escovar os dentes".

   Cada par cobre o mesmo hábito duas vezes em poucas casas, o que enfraquece a progressão. Vou reescrever 8, 13, 17 e 23 com situações diferentes do mesmo eixo (higiene), mantendo o tipo `question` e preservando 30 casas no total.

3. **Enunciados mais naturais nas casas comuns/conversa** (ajustes leves de linguagem em casas como 4, 9, 15, 19, 25) para alinhar ao tom pedido — sem mudar mecânica.

## Mudanças propostas

### `src/data/cells.ts`

- **Casa 8** → "Nina vai começar a aula e quer se sentir bem. Que cuidado ajuda o corpo de manhã?" (alt.: tomar um copo de água e estar limpo ✓ / correr sem parar / pular o café).
- **Casa 13** → "Nina vai espirrar. O que ela pode fazer para não espalhar microrganismos?" (alt.: cobrir com o braço dobrado ✓ / espirrar para cima / espirrar na mão do colega).
- **Casa 17** → "Antes de comer a fruta, Nina percebe que as mãos estão sujas. O que fazer?" (alt.: lavar com água e sabão ✓ / morder a fruta com casca suja / passar a mão no cabelo).
- **Casa 23** → "Nina vai dormir. O que ajuda o corpo a descansar bem?" (alt.: tomar banho e vestir roupa limpa ✓ / ir suja para a cama / pular na cama com sapato).

Todas com feedbacks explicativos no mesmo padrão (por que esse cuidado ajuda a saúde).

### `src/components/game/cards/ObjectCard.tsx`

Adicionar modo múltipla seleção quando a casa tem mais de uma alternativa correta:
- Estado local `selected: Set<index>`.
- Clique alterna seleção (borda e check visíveis).
- Botão "Confirmar" no rodapé.
- Acerto = conjunto selecionado é exatamente o conjunto das alternativas `correct: true` (Sabonete, Shampoo, Toalha — sem nenhum incorreto marcado).
- Quando há apenas uma alternativa correta, mantém o comportamento atual (clique único).

### Ajustes leves de linguagem

Reescrever os `body` das casas 4, 9, 15, 19, 25 para soarem mais como conversa com a criança (frases curtas e diretas), sem mudar a mecânica nem o tipo.

## Fora do escopo

- Tabuleiro, dado 1–3, Nina, número de casas, layout 1200×675, ausência de scroll, telas de início/instruções/final, modais e estilo geral permanecem intactos.
- Casas de avanço/retorno (6, 12, 16, 22, 28), match (26), habits (27), synthesis (29) e finish (30) não mudam.

## Arquivos afetados

- `src/data/cells.ts` — reescreve casas 8, 13, 17, 23 e ajusta texto de 4, 9, 15, 19, 25.
- `src/components/game/cards/ObjectCard.tsx` — implementa múltipla seleção condicional.
