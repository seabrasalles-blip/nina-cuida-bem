## Objetivo

Substituir o SVG da Nina por uma única imagem (a `ninalovabele.png` enviada pelo usuário), usada como asset final em todos os lugares do jogo. Nenhum redesenho, nenhum SVG novo, nenhuma variação gerada por código.

## Mudanças

1. **Subir a imagem como asset CDN** via `lovable-assets`, gerando `src/assets/nina.png.asset.json`. A imagem original não fica no repositório.

2. **Reescrever `src/components/game/Nina.tsx`** mantendo exatamente a mesma API pública:
   - mesmo nome `Nina`
   - mesmo tipo `NinaMood` exportado (`"happy" | "wave" | "cheer" | "think"`)
   - mesmas props (`size`, `mood`)
   - internamente passa a renderizar apenas um `<img>` com a URL do asset, com `width={size}`, `height` automático (preservando proporção), `alt="Nina"`, `draggable={false}` e `select-none`
   - **a prop `mood` é aceita mas ignorada** (a imagem é única); isso garante que nenhum dos componentes que já passam `mood` quebre

3. **Não alterar mais nada**: `FeedbackCard`, `SpecialCard`, `StartScreen`, `NinaSpeech`, cards de perguntas, tabuleiro, dado, dados das perguntas, rotas, lógica do jogo — tudo permanece como está. Só a implementação interna de `Nina.tsx` muda.

## Validação

Após a troca, verificar que:
- A Nina aparece corretamente na tela inicial e nos cards (feedback correto/errado, especiais, etc.)
- Não há erros no console
- O layout não quebra em nenhum dos tamanhos já usados no projeto (ex.: 96, 180, 340)
- A imagem mantém proporção e fica nítida
