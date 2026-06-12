## Plano: Redesign da Tela Final (FinalScreen.tsx)

### Problema
A tela final atual tem elementos cortados no topo e na base, composição desequilibrada e excesso de espaço vazio. Não transmite sensação de conquista.

### Solução
Reescrever `src/components/game/FinalScreen.tsx` com layout flex estruturado em três zonas dentro do canvas fixo de 1200×675 px.

### Mudanças

1. **Estrutura de layout**
   - Usar `h-full flex flex-col items-center justify-between` com `pt-10 pb-10 px-10` para respeitar margens seguras de ~40 px em todos os lados.
   - Dividir em três zonas: header (título), main (Nina + card), footer (botões).

2. **Header**
   - Título `Corpo bem cuidado!` com `text-5xl` (reduzido de 6xl para evitar corte), centralizado, margem superior confortável.
   - Manter destaque laranja na palavra "bem".

3. **Main**
   - Linha flex horizontal: Nina à esquerda (tamanho `size={220}`), card de mensagem à direita.
   - Card único branco, borda suave `border-[3px] border-game-sky-soft`, sombra leve `shadow-card-soft`, padding adequado, largura máxima `max-w-lg`.
   - Texto do card exatamente conforme solicitado:
     > "Hoje descobrimos que cuidar do corpo é importante em muitos momentos do dia. Lavar as mãos, escovar os dentes, usar lenço, tomar banho e beber água limpa são hábitos que ajudam a manter a saúde."
   - Manter NinaSpeech acima do card com rabicho apontando para a Nina, preservando o visual de balão.

4. **Footer**
   - Botões lado a lado com `gap-4`, posicionados acima da margem inferior com respiro.
   - Manter estilos atuais (laranja + branco/borda), tamanho grande e aparência clicável.

5. **Background e decoração**
   - Manter `.bg-room` com gradientes suaves.
   - Manter confetes animados com Framer Motion, reduzindo a quantidade se necessário para não poluir.

6. **Não alterar**
   - Componente Nina (imagem/asset).
   - Lógica de jogo, tabuleiro, dado, perguntas.
   - Props/assinatura do componente `FinalScreen`.

### Critérios de aceite
- Título inteiramente visível sem corte.
- Nina inteira, sem corte.
- Card legível, posicionado harmonicamente ao lado da Nina.
- Botões totalmente visíveis, acima da margem inferior.
- Nenhuma barra de rolagem.
- Tela cabendo em 1200×675 px.
- Sensação de encerramento celebrativa e acolhedora.