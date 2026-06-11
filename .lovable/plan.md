
# Inserção do banco fechado — Corpo Bem Cuidado

Objetivo: substituir o conteúdo das casas atuais pelos textos do banco enviado, sem editar enunciados, alternativas, gabaritos nem feedbacks. Mecânica, layout, visual e componentes permanecem.

## Decisões (já que as perguntas foram puladas)

- **Casas extras sem questão correspondente**: as 12 casas `question` recebem exatamente as 12 questões do banco, em ordem narrativa do banco. Os títulos das casas são reescritos para refletir o tema da questão atribuída.
- **Casa 21 (`object` — sabonete)**: o banco não traz item equivalente. Vira casa `common` ("Hora do banho") apenas com narração, sem card.
- **10 "Você sabia?" → 7 casas**: mantenho 7 textos e descarto 3 cujo tema já é coberto por questão (VS5 banho, VS8 água contaminada, VS9 pés).
- **Microdesafio do `DidYouKnowCard`**: o banco não fornece microdesafios. Para preservar os textos como você pediu, torno as alternativas opcionais no componente: quando ausentes, o card mostra selo + título + texto + ícone grande + "Continuar".

## Mapeamento das 12 questões → casas `question`

| Casa | Questão do banco | Tema |
|------|------------------|------|
| 2 | Q1 | Lavar as mãos antes de comer |
| 3 | Q2 | Depois de usar o banheiro |
| 5 | Q3 | Escovação e cáries |
| 7 | Q4 | Escovar os dentes antes de dormir |
| 10 | Q5 | Nariz escorrendo |
| 11 | Q6 | Depois de assoar o nariz |
| 13 | Q7 | Tossir ou espirrar |
| 14 | Q8 | Banho e bem-estar |
| 17 | Q9 | Frutas e verduras |
| 19 | Q10 | Água potável |
| 20 | Q11 | Água contaminada |
| 24 | Q12 | Andar descalço em locais inadequados |

Cada casa recebe: `title` (do banco), `prompt` (contexto + pergunta concatenados, exatamente como no banco), `alternatives` (4, na ordem A–D, com `correct: true` no gabarito), `feedbackCorrect` (dica/feedback do banco) e `feedbackWrong` (mesmo texto da dica, já que o banco fornece um único feedback).

## Mapeamento dos 7 "Você sabia?" → casas `didYouKnow`

| Casa | Você sabia? | Tema |
|------|-------------|------|
| 4 | VS1 | Microrganismos nas mãos |
| 8 | VS2 | Cáries |
| 12 | VS3 | Gripe e resfriado |
| 15 | VS4 | Lenço usado |
| 18 | VS6 | Frutas e verduras |
| 23 | VS7 | Água potável |
| 25 | VS10 | Saúde coletiva |

Descartados: VS5 (banho — coberto pela Q8), VS8 (água contaminada — Q11), VS9 (cuidado com os pés — Q12).

Cada casa recebe `infoTitle`, `infoText` e `infoIcon` (emoji apropriado), e fica **sem** `prompt`/`alternatives`.

## Demais casas (sem alteração de tipo)

- 1 start, 6/16/22/28 advance, 9 common, 21 common (novo), 26 match, 27 habits, 29 synthesis, 30 finish — mantêm tipo e conteúdo atual.

## Detalhes técnicos

Arquivos a editar:

- **`src/data/cells.ts`** — reescrever as 12 casas `question`, as 7 casas `didYouKnow`, e converter a casa 21 de `object` para `common`. Sem mudanças no `CellType`/`Cell` interface.
- **`src/components/game/cards/DidYouKnowCard.tsx`** — tornar o bloco de microdesafio opcional. Quando `cell.alternatives` estiver vazio/ausente, renderizar apenas selo "Você sabia?", `infoTitle`, `infoText`, `infoIcon` (grande) e botão "Continuar" que chama o handler de avanço.
- **`src/components/game/BoardGame.tsx`** — `handleDidYouKnow` passa a aceitar o caso sem resposta (continuar = avançar). Remover o `case "object"` se a casa 21 não usar mais esse tipo (ou manter o case inerte; preferir manter para segurança, sem cell que o acione).

Fora de escopo: textos do banco (inalterados), `Board.tsx` (cores/ícones), demais componentes de card, layout 1200×675, paleta, fontes.
