# Revisão pedagógica — Corpo Bem Cuidado

Foco: substituir perguntas mecânicas ("escolha o objeto X") por situações cotidianas da Nina, mantendo todo o restante (tabuleiro, dado 1–3, 30 casas, layout 1200×675, sem scroll, feedbacks grandes).

## 1. `src/data/cells.ts` — reescrever conteúdo das casas

Aplicar exatamente os textos fornecidos pelo usuário:

- **Casa 2** (pergunta): "Nina acordou e vai começar o dia. O que ela pode fazer para cuidar do rosto?" + 3 alternativas (Lavar o rosto ✓, Pintar a parede, Calçar as meias) + feedbacks novos.
- **Casa 3** (era objeto "toalha"): vira situação "Nina lavou o rosto. O que ela deve fazer depois?" — 3 alternativas (Secar com toalha limpa ✓, Secar na camiseta, Sair correndo molhada).
- **Casa 7**: "Nina terminou o café da manhã. Qual cuidado ajuda a limpar os dentes?" — 3 alternativas (Escovar ✓, Lavar sapatos, Pentear mochila).
- **Casa 11**: "Nina brincou no parque e ficou com as mãos sujas. O que ela deve fazer antes do lanche?" — 4 alternativas (Lavar com água e sabão ✓, Limpar na roupa, Comer mesmo assim, Esconder as mãos).
- **Casa 14**: "O nariz da Nina está escorrendo. Como ela pode se cuidar e cuidar das pessoas ao redor?" — 4 alternativas (Lenço limpo ✓, Manga da camiseta, Mão, Papel do chão).
- **Casa 18**: "Nina acabou de usar o banheiro. Qual cuidado ela precisa fazer agora?" — 4 alternativas (Lavar mãos ✓, Brincar com bola, Guardar travesseiro, Colocar casaco).
- **Casa 21** (kit banho): "Depois de correr e suar bastante, Nina vai tomar banho. Quais itens ajudam nesse cuidado?" — apresentar múltiplos itens, corretos: Sabonete, Shampoo, Toalha; incorretos: Bola, Lápis, Colher. Feedbacks novos.
- **Casa 24**: "Antes de dormir, Nina precisa cuidar da boca. O que ela deve fazer?" — 4 alternativas (Escovar dentes ✓, Comer doce e dormir, Esquecer os dentes, Só lavar mãos).

Todas mantêm o tipo existente (`question` ou `object`) — apenas o conteúdo muda. Casa 21 continua usando `object` (seleção múltipla de itens).

## 2. Renomear rótulo do tipo "Objeto certo"

Em `src/components/game/cards/ObjectCard.tsx`, trocar o chip "Objeto certo" por **"Cuidado do momento"**. Também ajustar legenda em `BoardGame.tsx` se houver referência (atualmente diz só "Objeto" — trocar para "Cuidado do momento").

## 3. Casa 21 — comportamento de múltipla seleção

A casa 21 atualmente usa `ObjectCard` (clique único = correto/errado). Como o novo enunciado pede para escolher itens (plural), há duas opções:

- **A (mínima):** manter clique único, marcando como corretos quaisquer dos 3 itens de banho; criança acerta ao tocar em um item de banho. Simples e mantém o componente.
- **B (mais fiel):** criar variante multi-select no `ObjectCard` com botão "Confirmar" — mais código.

Recomendo **A** para esta iteração (preserva mecânica atual; enunciado já educa sobre "quais itens"); posso evoluir para B numa próxima rodada se desejado.

## Fora do escopo

- Não mexer em mecânica de dado, movimentação, modais ou estilo geral.
- Casas comuns, conversas, avanços/retornos e síntese permanecem como estão.

## Arquivos alterados

- `src/data/cells.ts` (conteúdo das casas 2, 3, 7, 11, 14, 18, 21, 24)
- `src/components/game/cards/ObjectCard.tsx` (rótulo do chip)
- `src/components/game/BoardGame.tsx` (texto da legenda)
