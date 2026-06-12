## Objetivo

Transformar as casas 9 e 21 (atualmente do tipo `common`) em casas de penalidade (`retreat`), com `delta: -1`, mantendo a mecânica de retrocesso já existente no jogo.

## Mudanças

Apenas em `src/data/cells.ts`:

**Casa 9** — substituir:
- `type: "retreat"`
- `title: "Penalidade"`
- `body: "Atenção! Nina brincou na terra e foi comer sem lavar as mãos. Sujeiras e microrganismos podem chegar à boca pelas mãos. Volte 1 casa e lembre-se: antes de comer, é importante lavar as mãos com água e sabão."`
- `delta: -1`

**Casa 21** — substituir:
- `type: "retreat"`
- `title: "Penalidade"`
- `body: "Ops! Nina chegou perto de uma poça de água suja para brincar. Água contaminada pode ter microrganismos ou parasitas que fazem mal à saúde. Volte 1 casa e procure uma atitude mais segura para cuidar do corpo."`
- `delta: -1`

## Observações técnicas

- O tipo `retreat` já existe em `CellType`, já é renderizado por `SpecialCard` (mesmo handler do `advance`) e o `BoardGame` já aplica `delta` negativo. Nenhuma outra mudança é necessária.
- Não altero lógica do jogo, tabuleiro, dado, perguntas, "Você sabia?" nem o componente Nina.