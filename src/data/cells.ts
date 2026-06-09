export type CellType =
  | "start"
  | "common"
  | "question"
  | "object"
  | "conversation"
  | "advance"
  | "retreat"
  | "match"
  | "habits"
  | "synthesis"
  | "finish";

export interface Alternative {
  text: string;
  correct: boolean;
  icon?: string;
}

export interface Cell {
  id: number;
  type: CellType;
  title: string;
  prompt?: string;
  alternatives?: Alternative[];
  feedbackCorrect?: string;
  feedbackWrong?: string;
  delta?: number; // for advance/retreat
  body?: string; // for conversation / special
}

export const CELLS: Cell[] = [
  { id: 1, type: "start", title: "Início", body: "O dia da Nina começou." },
  {
    id: 2,
    type: "question",
    title: "Ao acordar",
    prompt: "Nina acordou e vai começar o dia. O que ela pode fazer para cuidar do rosto?",
    alternatives: [
      { text: "Lavar o rosto", correct: true, icon: "💧" },
      { text: "Pintar a parede", correct: false, icon: "🎨" },
      { text: "Calçar as meias", correct: false, icon: "🧦" },
    ],
    feedbackCorrect:
      "Muito bem! Lavar o rosto ajuda a tirar suor e sujeirinhas, deixando o corpo mais confortável para começar o dia.",
    feedbackWrong:
      "Observe a situação. Nina acabou de acordar. Que cuidado combina com o rosto?",
  },
  {
    id: 3,
    type: "object",
    title: "Depois de lavar o rosto",
    prompt: "Nina lavou o rosto. O que ela deve fazer depois?",
    alternatives: [
      { text: "Secar com uma toalha limpa", correct: true, icon: "🧺" },
      { text: "Secar na camiseta", correct: false, icon: "👕" },
      { text: "Sair correndo molhada", correct: false, icon: "💨" },
    ],
    feedbackCorrect:
      "Isso mesmo! Usar uma toalha limpa ajuda a secar o rosto com cuidado e conforto.",
    feedbackWrong:
      "Depois de lavar o rosto, é melhor usar uma toalha limpa. Assim, Nina cuida melhor do corpo.",
  },
  {
    id: 4,
    type: "conversation",
    title: "Converse",
    body: "Que cuidados você faz quando acorda? Converse com um colega ou professor.",
  },
  {
    id: 5,
    type: "question",
    title: "Antes do café",
    prompt: "Antes do café, o que Nina deve fazer com as mãos?",
    alternatives: [
      { text: "Lavar as mãos", correct: true, icon: "🧼" },
      { text: "Pular no sofá", correct: false, icon: "🛋️" },
      { text: "Guardar o copo", correct: false, icon: "🥛" },
    ],
    feedbackCorrect:
      "Isso mesmo! Lavar as mãos antes de comer ajuda a tirar sujeiras e microrganismos que podem fazer mal à saúde.",
    feedbackWrong:
      "Esse cuidado pode servir para outro momento. Antes de comer, precisamos cuidar das mãos.",
  },
  {
    id: 6,
    type: "advance",
    title: "Avanço",
    body: "Nina lavou as mãos antes de comer. Avance 1 casa.",
    delta: 1,
  },
  {
    id: 7,
    type: "object",
    title: "Depois do café",
    prompt: "Nina terminou o café da manhã. Qual cuidado ajuda a limpar os dentes?",
    alternatives: [
      { text: "Escovar os dentes", correct: true, icon: "🪥" },
      { text: "Lavar os sapatos", correct: false, icon: "👟" },
      { text: "Pentear a mochila", correct: false, icon: "🎒" },
    ],
    feedbackCorrect:
      "Ótima escolha! Escovar os dentes ajuda a retirar restos de comida e cuidar da boca.",
    feedbackWrong: "Pense no que usamos para cuidar da boca depois de comer.",
  },
  {
    id: 8,
    type: "question",
    title: "Hora da aula",
    prompt: "Nina vai começar a aula e quer se sentir bem. Que cuidado ajuda o corpo de manhã?",
    alternatives: [
      { text: "Estar limpa e beber água", correct: true, icon: "💧" },
      { text: "Correr sem parar", correct: false, icon: "🏃" },
      { text: "Pular o café da manhã", correct: false, icon: "🚫" },
    ],
    feedbackCorrect:
      "Muito bem! Começar o dia com o corpo limpo e bem hidratado ajuda Nina a se sentir disposta e saudável.",
    feedbackWrong:
      "Pense no que ajuda o corpo a ficar bem para começar o dia: cuidar da higiene e se alimentar.",
  },
  {
    id: 9,
    type: "conversation",
    title: "Converse",
    body: "Por que precisamos cuidar dos dentes? Converse e conte uma ideia.",
  },
  { id: 10, type: "common", title: "Parque", body: "Nina vai brincar no parque." },
  {
    id: 11,
    type: "object",
    title: "Antes do lanche",
    prompt: "Nina brincou no parque e ficou com as mãos sujas. O que ela deve fazer antes do lanche?",
    alternatives: [
      { text: "Lavar as mãos com água e sabão", correct: true, icon: "🧼" },
      { text: "Limpar as mãos na roupa", correct: false, icon: "👕" },
      { text: "Comer mesmo assim", correct: false, icon: "🍞" },
      { text: "Esconder as mãos", correct: false, icon: "🙈" },
    ],
    feedbackCorrect:
      "Muito bem! Lavar as mãos antes de comer ajuda a tirar sujeiras e microrganismos que podem fazer mal à saúde.",
    feedbackWrong:
      "Antes de comer, precisamos cuidar das mãos. Limpar na roupa ou comer com as mãos sujas não ajuda a proteger a saúde.",
  },
  {
    id: 12,
    type: "retreat",
    title: "Voltar 1 casa",
    body: "Nina esqueceu de lavar as mãos antes do lanche. Volte 1 casa.",
    delta: -1,
  },
  {
    id: 13,
    type: "question",
    title: "Nariz escorrendo",
    prompt: "O nariz da Nina está escorrendo. O que ela deve usar?",
    alternatives: [
      { text: "Lenço limpo", correct: true, icon: "🤧" },
      { text: "Manga da camiseta", correct: false, icon: "👕" },
      { text: "A mão", correct: false, icon: "✋" },
    ],
    feedbackCorrect:
      "Muito bem! Usar lenço ajuda a limpar o nariz com cuidado. Depois, é importante jogar o lenço no lixo e lavar as mãos.",
    feedbackWrong:
      "Usar a mão ou a camiseta pode espalhar sujeiras. O melhor é usar um lenço limpo.",
  },
  {
    id: 14,
    type: "object",
    title: "Nariz escorrendo",
    prompt: "O nariz da Nina está escorrendo. Como ela pode se cuidar e cuidar das pessoas ao redor?",
    alternatives: [
      { text: "Usar um lenço limpo", correct: true, icon: "🧻" },
      { text: "Limpar na manga da camiseta", correct: false, icon: "👕" },
      { text: "Limpar com a mão", correct: false, icon: "✋" },
      { text: "Usar um papel que caiu no chão", correct: false, icon: "📄" },
    ],
    feedbackCorrect:
      "Isso mesmo! Usar lenço limpo ajuda a cuidar do nariz. Depois, Nina deve jogar o lenço no lixo e lavar as mãos.",
    feedbackWrong:
      "Usar a mão ou a camiseta pode espalhar sujeiras. O melhor é usar um lenço limpo e lavar as mãos depois.",
  },
  {
    id: 15,
    type: "conversation",
    title: "Converse",
    body: "Como cuidamos dos colegas quando estamos gripados? Converse com a turma.",
  },
  {
    id: 16,
    type: "advance",
    title: "Avanço",
    body: "Nina jogou o lenço no lixo e lavou as mãos. Avance 1 casa.",
    delta: 1,
  },
  {
    id: 17,
    type: "question",
    title: "Depois do banheiro",
    prompt: "Depois de usar o banheiro, o que Nina deve fazer?",
    alternatives: [
      { text: "Lavar as mãos com sabonete", correct: true, icon: "🧼" },
      { text: "Brincar com a bola", correct: false, icon: "⚽" },
      { text: "Colocar o casaco", correct: false, icon: "🧥" },
    ],
    feedbackCorrect:
      "Isso mesmo! Depois de usar o banheiro, lavar as mãos com sabonete ajuda a proteger a saúde.",
    feedbackWrong:
      "Observe o momento: Nina saiu do banheiro. Qual cuidado ajuda a proteger a saúde?",
  },
  {
    id: 18,
    type: "object",
    title: "Depois do banheiro",
    prompt: "Nina acabou de usar o banheiro. Qual cuidado ela precisa fazer agora?",
    alternatives: [
      { text: "Lavar as mãos com água e sabão", correct: true, icon: "🧼" },
      { text: "Brincar com a bola", correct: false, icon: "⚽" },
      { text: "Guardar o travesseiro", correct: false, icon: "🛏️" },
      { text: "Colocar o casaco", correct: false, icon: "🧥" },
    ],
    feedbackCorrect:
      "Muito bem! Depois de usar o banheiro, lavar as mãos com água e sabão ajuda a proteger a saúde.",
    feedbackWrong:
      "Observe o momento: Nina saiu do banheiro. O cuidado mais importante agora é lavar as mãos.",
  },
  {
    id: 19,
    type: "conversation",
    title: "Converse",
    body: "Em quais momentos lavamos as mãos? Converse e lembre de exemplos.",
  },
  {
    id: 20,
    type: "question",
    title: "Depois de suar",
    prompt: "Depois de brincar e suar, qual cuidado ajuda o corpo?",
    alternatives: [
      { text: "Tomar banho", correct: true, icon: "🚿" },
      { text: "Esconder o sabonete", correct: false, icon: "🙈" },
      { text: "Comer sem lavar as mãos", correct: false, icon: "🍞" },
    ],
    feedbackCorrect:
      "Muito bem! Depois de brincar e suar, o banho ajuda a limpar o corpo e traz bem-estar.",
    feedbackWrong:
      "Depois de brincar, o corpo pode ficar suado ou sujo. Que cuidado ajuda a limpar o corpo?",
  },
  {
    id: 21,
    type: "object",
    title: "Hora do banho",
    prompt: "Depois de correr e suar bastante, Nina vai tomar banho. Qual item ajuda nesse cuidado?",
    alternatives: [
      { text: "Sabonete", correct: true, icon: "🧼" },
      { text: "Shampoo", correct: true, icon: "🧴" },
      { text: "Toalha", correct: true, icon: "🧺" },
      { text: "Bola", correct: false, icon: "⚽" },
      { text: "Lápis", correct: false, icon: "✏️" },
      { text: "Colher", correct: false, icon: "🥄" },
    ],
    feedbackCorrect:
      "Muito bem! O banho ajuda a limpar o corpo depois de brincar, correr e suar. Sabonete, shampoo e toalha são parte desse cuidado.",
    feedbackWrong:
      "Alguns objetos servem para brincar ou estudar. Para o banho, Nina precisa de itens que ajudam a limpar e secar o corpo.",
  },
  {
    id: 22,
    type: "advance",
    title: "Avanço",
    body: "Nina tomou banho depois da brincadeira. Avance 1 casa.",
    delta: 1,
  },
  {
    id: 23,
    type: "question",
    title: "Antes de dormir",
    prompt: "Antes de dormir, o que Nina deve fazer com os dentes?",
    alternatives: [
      { text: "Escovar os dentes", correct: true, icon: "🪥" },
      { text: "Guardar o travesseiro", correct: false, icon: "🛏️" },
      { text: "Brincar com tinta", correct: false, icon: "🎨" },
    ],
    feedbackCorrect:
      "Boa escolha! Escovar os dentes antes de dormir ajuda a cuidar da boca durante a noite.",
    feedbackWrong: "Antes de dormir, também cuidamos da boca. Qual é o melhor cuidado?",
  },
  {
    id: 24,
    type: "object",
    title: "Cuidar da boca à noite",
    prompt: "Antes de dormir, Nina precisa cuidar da boca. O que ela deve fazer?",
    alternatives: [
      { text: "Escovar os dentes", correct: true, icon: "🪥" },
      { text: "Comer doce e dormir", correct: false, icon: "🍭" },
      { text: "Esquecer os dentes e dormir", correct: false, icon: "💤" },
      { text: "Lavar apenas as mãos", correct: false, icon: "🧼" },
    ],
    feedbackCorrect:
      "Boa escolha! Escovar os dentes antes de dormir ajuda a cuidar da boca durante a noite.",
    feedbackWrong:
      "Antes de dormir, também precisamos cuidar dos dentes. Qual cuidado ajuda a boca?",
  },
  {
    id: 25,
    type: "conversation",
    title: "Converse",
    body: "Qual cuidado com o corpo você acha importante? Conte para alguém.",
  },
  { id: 26, type: "match", title: "Associe", prompt: "Ligue cada momento ao cuidado certo." },
  {
    id: 27,
    type: "habits",
    title: "Escolha três hábitos",
    prompt: "Escolha três hábitos que ajudam a cuidar da saúde.",
  },
  {
    id: 28,
    type: "advance",
    title: "Avanço",
    body: "Rotina bem cuidada. Avance 1 casa.",
    delta: 1,
  },
  {
    id: 29,
    type: "synthesis",
    title: "Síntese",
    body: "O que Nina aprendeu hoje? Lavar as mãos, escovar os dentes, usar lenço e tomar banho são hábitos que ajudam a manter a saúde.",
  },
  { id: 30, type: "finish", title: "Chegada", body: "Corpo bem cuidado!" },
];
