## Objetivo

Substituir completamente o SVG da personagem Nina em `src/components/game/Nina.tsx` por uma nova versão mais simples, proporcional e carismática, mantendo a API atual intacta (`size`, `mood`, viewBox `0 0 220 260`).

Nenhum outro arquivo do projeto será alterado — perguntas, tabuleiro, dado e lógica do jogo permanecem como estão.

## Direção visual

- Menina infantil, traço limpo, bem proporcionada
- **Cabelo**: castanho médio arredondado com franja suave + tiara laranja simples (substitui as maria-chiquinhas que pareciam "fones")
- **Roupa**: camiseta azul + jardineira laranja + sapatos escuros
- **Rosto**: olhos grandes amigáveis, bochechas rosadas, sorriso simples
- Sombra suave no chão, gradientes leves de pele/cabelo/roupa

## Estrutura do SVG (ordem de camadas)

1. Sombra no chão
2. Pernas + sapatos
3. Braços (atrás do corpo)
4. Corpo/jardineira/camiseta
5. Pescoço
6. Cabelo de trás (volume arredondado, sem bolas laterais)
7. Rosto (oval centralizado)
8. Franja
9. Tiara
10. Sobrancelhas, olhos, bochechas, boca

## Moods — poses estáveis

Cada mood altera **apenas** os paths de braços + boca + sobrancelhas. O resto da personagem é compartilhado.

- **happy**: dois braços levemente abertos ao lado do corpo, sorriso leve
- **wave**: braço direito levantado em arco a partir do ombro, mão aberta ao lado da cabeça **sem encostar no rosto** (mão posicionada fora do oval facial); braço esquerdo abaixado
- **cheer**: dois braços levantados em "V" simétrico, mãos visíveis acima dos ombros, sorriso aberto
- **think**: ambos braços abaixados, sobrancelhas levemente inclinadas, boca pequena curiosa (sem mão no rosto — opção mais estável que mão no queixo)

Braços desenhados como paths suaves (curvas Bézier), não retângulos. Mãos como círculos pequenos na ponta de cada braço.

## Arquivo alterado

- `src/components/game/Nina.tsx` — reescrita completa do JSX interno. Assinatura, exports e tipo `NinaMood` mantidos exatamente como hoje.

## Validação

Após a reescrita, verificar visualmente na tela inicial (já usa `<Nina size={340} mood="wave" />`) e nos cards (`mood="think"`, `mood="cheer"`) que:

- Braço de `wave` não cobre o rosto
- Cabelo não parece capacete nem tem "orelhas/fones" laterais
- Nenhum braço/pé é cortado pelo viewBox em tamanhos 80/120/180/240
- Layout do jogo permanece intacto
