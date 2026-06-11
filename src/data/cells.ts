export type CellType =
  | "start"
  | "common"
  | "question"
  | "object"
  | "didYouKnow"
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
  delta?: number;
  body?: string;
  infoTitle?: string;
  infoText?: string;
  infoIcon?: string;
}

export const CELLS: Cell[] = [
  { id: 1, type: "start", title: "Início", body: "O dia da Nina começou." },

  {
    id: 2,
    type: "question",
    title: "Ao acordar",
    prompt:
      "Nina acordou e vai começar o dia. Qual cuidado ajuda a limpar o rosto?",
    alternatives: [
      { text: "Lavar o rosto", correct: true, icon: "💧" },
      { text: "Colocar o sapato", correct: false, icon: "👟" },
      { text: "Guardar o brinquedo", correct: false, icon: "🧸" },
    ],
    feedbackCorrect:
      "Muito bem! Lavar o rosto ajuda a tirar suor e sujeirinhas, deixando o corpo mais confortável para começar o dia.",
    feedbackWrong:
      "Observe a situação. Nina acabou de acordar. Qual cuidado combina com o rosto?",
  },

  {
    id: 3,
    type: "question",
    title: "Depois de lavar o rosto",
    prompt: "Nina lavou o rosto. Como pode secar o rosto com cuidado?",
    alternatives: [
      { text: "Usar uma toalha limpa", correct: true, icon: "🧺" },
      { text: "Secar na camiseta", correct: false, icon: "👕" },
      { text: "Sair correndo com o rosto molhado", correct: false, icon: "💨" },
    ],
    feedbackCorrect:
      "Isso mesmo! Usar uma toalha limpa ajuda a secar o rosto com cuidado e conforto.",
    feedbackWrong:
      "Depois de lavar o rosto, é melhor usar uma toalha limpa.",
  },

  {
    id: 4,
    type: "didYouKnow",
    title: "Cuidar do corpo todos os dias",
    infoIcon: "🧼",
    infoTitle: "Cuidar do corpo todos os dias",
    infoText:
      "Lavar o rosto, tomar banho e lavar as mãos são cuidados que fazem parte da rotina. Eles ajudam o corpo a ficar limpo e confortável.",
    prompt: "Qual atitude ajuda a cuidar do corpo?",
    alternatives: [
      { text: "Lavar as mãos", correct: true, icon: "🧼" },
      { text: "Comer com as mãos sujas", correct: false, icon: "🙅" },
      { text: "Usar a camiseta como toalha", correct: false, icon: "👕" },
    ],
    feedbackCorrect:
      "Muito bem! Lavar as mãos é um cuidado importante da rotina.",
    feedbackWrong:
      "Essa atitude não ajuda tanto o corpo. Para cuidar da higiene, lavar as mãos é uma boa escolha.",
  },

  {
    id: 5,
    type: "question",
    title: "Antes do café",
    prompt: "Nina vai tomar café. O que deve fazer antes de comer?",
    alternatives: [
      { text: "Lavar as mãos com água e sabão", correct: true, icon: "🧼" },
      { text: "Comer com as mãos sujas", correct: false, icon: "🙅" },
      { text: "Limpar as mãos na roupa", correct: false, icon: "👕" },
    ],
    feedbackCorrect:
      "Isso mesmo! Lavar as mãos antes de comer ajuda a tirar sujeiras e microrganismos que podem fazer mal à saúde.",
    feedbackWrong:
      "Antes de comer, precisamos cuidar das mãos. Lavar com água e sabão ajuda a proteger a saúde.",
  },

  {
    id: 6,
    type: "advance",
    title: "Avanço",
    body: "Nina lembrou de lavar as mãos antes de comer. Avance 1 casa.",
    delta: 1,
  },

  {
    id: 7,
    type: "question",
    title: "Depois do café",
    prompt: "Nina terminou o café da manhã. Qual cuidado ajuda a proteger os dentes?",
    alternatives: [
      { text: "Escovar os dentes", correct: true, icon: "🪥" },
      { text: "Lavar os sapatos", correct: false, icon: "👟" },
      { text: "Guardar o prato e esquecer os dentes", correct: false, icon: "🍽️" },
    ],
    feedbackCorrect:
      "Ótima escolha! Escovar os dentes ajuda a retirar restos de comida e cuidar da boca.",
    feedbackWrong:
      "Depois de comer, também precisamos cuidar dos dentes.",
  },

  {
    id: 8,
    type: "didYouKnow",
    title: "O que são cáries?",
    infoIcon: "🦷",
    infoTitle: "O que são cáries?",
    infoText:
      "Cáries podem aparecer quando restos de comida ficam nos dentes. Escovar os dentes ajuda a proteger a boca.",
    prompt: "Qual atitude ajuda a evitar cáries?",
    alternatives: [
      { text: "Escovar os dentes depois das refeições", correct: true, icon: "🪥" },
      { text: "Dormir sem escovar os dentes", correct: false, icon: "💤" },
      { text: "Comer e nunca cuidar da boca", correct: false, icon: "🍭" },
    ],
    feedbackCorrect:
      "Isso mesmo! Escovar os dentes ajuda a retirar restos de comida e cuidar da boca.",
    feedbackWrong:
      "Depois de comer, precisamos cuidar dos dentes. Escovar os dentes ajuda a proteger a boca.",
  },

  { id: 9, type: "common", title: "A caminho do parque", body: "Nina vai brincar." },

  {
    id: 10,
    type: "question",
    title: "Antes do lanche",
    prompt:
      "Nina brincou no parque e ficou com as mãos sujas. O que deve fazer antes do lanche?",
    alternatives: [
      { text: "Lavar as mãos com água e sabão", correct: true, icon: "🧼" },
      { text: "Comer mesmo assim", correct: false, icon: "🍞" },
      { text: "Limpar as mãos na roupa", correct: false, icon: "👕" },
    ],
    feedbackCorrect:
      "Muito bem! Lavar as mãos antes do lanche ajuda a proteger a saúde.",
    feedbackWrong:
      "Antes de comer, lavar as mãos é o cuidado mais seguro.",
  },

  {
    id: 11,
    type: "question",
    title: "Antes da fruta",
    prompt: "Nina quer comer uma maçã. O que precisa fazer antes?",
    alternatives: [
      { text: "Lavar a maçã com água limpa", correct: true, icon: "🍎" },
      { text: "Comer sem lavar", correct: false, icon: "🙈" },
      { text: "Limpar a maçã na camiseta", correct: false, icon: "👕" },
    ],
    feedbackCorrect:
      "Isso mesmo! Lavar frutas com água limpa ajuda a tirar sujeiras antes de comer.",
    feedbackWrong:
      "Antes de comer frutas, é importante lavá-las com água limpa.",
  },

  {
    id: 12,
    type: "didYouKnow",
    title: "Água limpa e alimentos",
    infoIcon: "💧",
    infoTitle: "Água limpa e alimentos",
    infoText:
      "Para beber água e lavar alimentos, é importante usar água limpa. Isso ajuda a evitar doenças e cuida da saúde de todos.",
    prompt: "Qual é a melhor atitude antes de comer uma fruta?",
    alternatives: [
      { text: "Lavar a fruta com água limpa", correct: true, icon: "🍎" },
      { text: "Comer a fruta sem lavar", correct: false, icon: "🙈" },
      { text: "Lavar a fruta em água suja", correct: false, icon: "🪣" },
    ],
    feedbackCorrect:
      "Isso mesmo! Lavar alimentos com água limpa ajuda a cuidar da saúde.",
    feedbackWrong:
      "Antes de comer frutas, é importante lavá-las com água limpa.",
  },

  {
    id: 13,
    type: "question",
    title: "Nariz escorrendo",
    prompt:
      "O nariz da Nina está escorrendo. Qual atitude ajuda a cuidar dela e das pessoas ao redor?",
    alternatives: [
      { text: "Usar um lenço limpo", correct: true, icon: "🧻" },
      { text: "Limpar na manga da camiseta", correct: false, icon: "👕" },
      { text: "Limpar com a mão", correct: false, icon: "✋" },
    ],
    feedbackCorrect:
      "Muito bem! Usar lenço limpo ajuda a cuidar do nariz. Depois, Nina deve jogar o lenço no lixo e lavar as mãos.",
    feedbackWrong:
      "Usar a mão ou a camiseta pode espalhar sujeiras. O melhor é usar um lenço limpo.",
  },

  {
    id: 14,
    type: "question",
    title: "Depois do lenço",
    prompt: "Nina usou um lenço para limpar o nariz. O que deve fazer depois?",
    alternatives: [
      { text: "Jogar o lenço no lixo e lavar as mãos", correct: true, icon: "🗑️" },
      { text: "Guardar o lenço usado", correct: false, icon: "👖" },
      { text: "Deixar o lenço em cima da mesa", correct: false, icon: "📄" },
    ],
    feedbackCorrect:
      "Isso mesmo! Esse cuidado ajuda Nina e também as pessoas ao redor.",
    feedbackWrong:
      "Depois de usar o lenço, o melhor é jogá-lo no lixo e lavar as mãos.",
  },

  {
    id: 15,
    type: "didYouKnow",
    title: "Cuidar de mim e dos outros",
    infoIcon: "🤧",
    infoTitle: "Cuidar de mim e dos outros",
    infoText:
      "Quando usamos lenço para limpar o nariz e lavamos as mãos depois, ajudamos a cuidar da nossa saúde e da saúde das pessoas ao redor.",
    prompt: "Nina usou um lenço. O que ela deve fazer depois?",
    alternatives: [
      { text: "Jogar o lenço no lixo e lavar as mãos", correct: true, icon: "🧻" },
      { text: "Guardar o lenço usado no bolso", correct: false, icon: "👖" },
      { text: "Limpar as mãos na roupa", correct: false, icon: "👕" },
    ],
    feedbackCorrect:
      "Muito bem! Esse cuidado ajuda Nina e também as pessoas ao redor.",
    feedbackWrong:
      "Depois de usar o lenço, o melhor é jogá-lo no lixo e lavar as mãos.",
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
    prompt: "Nina acabou de usar o banheiro. Qual cuidado vem agora?",
    alternatives: [
      { text: "Lavar as mãos com água e sabão", correct: true, icon: "🧼" },
      { text: "Sair correndo para brincar", correct: false, icon: "🏃" },
      { text: "Limpar as mãos na roupa", correct: false, icon: "👕" },
    ],
    feedbackCorrect:
      "Muito bem! Depois de usar o banheiro, lavar as mãos com água e sabão ajuda a proteger a saúde.",
    feedbackWrong:
      "Depois de usar o banheiro, lavar as mãos é um cuidado importante.",
  },

  {
    id: 18,
    type: "didYouKnow",
    title: "Mãos limpas ajudam a proteger",
    infoIcon: "🦠",
    infoTitle: "Mãos limpas ajudam a proteger",
    infoText:
      "Nas mãos podem existir microrganismos, seres tão pequenos que não conseguimos ver. Lavar as mãos com água e sabão ajuda a retirar muitos deles.",
    prompt: "Quando é importante lavar as mãos?",
    alternatives: [
      { text: "Antes de comer e depois de usar o banheiro", correct: true, icon: "🧼" },
      { text: "Só quando a mão parece limpa", correct: false, icon: "✋" },
      { text: "Nunca precisa lavar", correct: false, icon: "🙅" },
    ],
    feedbackCorrect:
      "Ótima escolha! Lavar as mãos nesses momentos ajuda a proteger a saúde.",
    feedbackWrong:
      "Mesmo quando parecem limpas, as mãos podem ter microrganismos. Por isso, lavamos as mãos antes de comer e depois de usar o banheiro.",
  },

  {
    id: 19,
    type: "question",
    title: "Mesmo quando parecem limpas",
    prompt:
      "Mesmo quando as mãos parecem limpas, ainda podem ter microrganismos. O que ajuda a retirá-los?",
    alternatives: [
      { text: "Lavar as mãos com água e sabão", correct: true, icon: "🧼" },
      { text: "Assoprar as mãos", correct: false, icon: "💨" },
      { text: "Esconder as mãos no bolso", correct: false, icon: "👖" },
    ],
    feedbackCorrect:
      "Isso mesmo! Água e sabão ajudam a retirar muitos microrganismos das mãos.",
    feedbackWrong:
      "Para limpar bem as mãos, usamos água e sabão.",
  },

  {
    id: 20,
    type: "question",
    title: "Depois de suar",
    prompt: "Depois de correr e suar bastante, qual cuidado ajuda o corpo?",
    alternatives: [
      { text: "Tomar banho", correct: true, icon: "🚿" },
      { text: "Colocar a mesma roupa suada para dormir", correct: false, icon: "👕" },
      { text: "Não cuidar do corpo", correct: false, icon: "🙅" },
    ],
    feedbackCorrect:
      "Muito bem! O banho ajuda a limpar o corpo e traz bem-estar depois de brincar e suar.",
    feedbackWrong:
      "Depois de correr e suar, o banho ajuda a limpar o corpo.",
  },

  {
    id: 21,
    type: "object",
    title: "Hora do banho",
    prompt: "Nina vai tomar banho. Qual item ajuda a lavar o corpo?",
    alternatives: [
      { text: "Sabonete", correct: true, icon: "🧼" },
      { text: "Bola", correct: false, icon: "⚽" },
      { text: "Lápis", correct: false, icon: "✏️" },
    ],
    feedbackCorrect:
      "Muito bem! O sabonete ajuda a limpar o corpo durante o banho.",
    feedbackWrong:
      "Para lavar o corpo no banho, usamos sabonete.",
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
    type: "didYouKnow",
    title: "Cuidado com os pés",
    infoIcon: "🦶",
    infoTitle: "Cuidado com os pés",
    infoText:
      "Em alguns lugares, andar descalço pode machucar os pés ou colocar o corpo em contato com sujeiras. Usar calçado ajuda a proteger.",
    prompt: "Onde é melhor usar calçado?",
    alternatives: [
      { text: "Em lugar com sujeira, pedras ou água duvidosa", correct: true, icon: "👟" },
      { text: "No tapete limpo de casa, sempre", correct: false, icon: "🏠" },
      { text: "Dentro da cama", correct: false, icon: "🛏️" },
    ],
    feedbackCorrect:
      "Isso mesmo! Em alguns lugares, o calçado ajuda a proteger os pés e a saúde.",
    feedbackWrong:
      "Em lugares com sujeira, pedras ou água duvidosa, é melhor proteger os pés.",
  },

  {
    id: 24,
    type: "question",
    title: "Antes de dormir",
    prompt:
      "Nina está se preparando para dormir. Qual cuidado ajuda a proteger os dentes durante a noite?",
    alternatives: [
      { text: "Escovar os dentes", correct: true, icon: "🪥" },
      { text: "Comer doce e dormir", correct: false, icon: "🍭" },
      { text: "Lavar só as mãos e esquecer os dentes", correct: false, icon: "🙈" },
    ],
    feedbackCorrect:
      "Boa escolha! Escovar os dentes antes de dormir ajuda a cuidar da boca durante a noite.",
    feedbackWrong:
      "Antes de dormir, também precisamos cuidar dos dentes.",
  },

  {
    id: 25,
    type: "didYouKnow",
    title: "Água parada merece atenção",
    infoIcon: "🪣",
    infoTitle: "Água parada merece atenção",
    infoText:
      "Água parada pode juntar sujeira e atrair insetos. Manter os espaços limpos ajuda a cuidar da saúde de todos.",
    prompt: "Qual atitude ajuda a cuidar do ambiente?",
    alternatives: [
      { text: "Evitar água parada em potes e quintais", correct: true, icon: "🪣" },
      { text: "Deixar água parada acumulando", correct: false, icon: "💧" },
      { text: "Jogar lixo perto da água", correct: false, icon: "🗑️" },
    ],
    feedbackCorrect:
      "Muito bem! Cuidar do ambiente também ajuda a proteger a saúde coletiva.",
    feedbackWrong:
      "Água parada pode trazer problemas. O melhor é manter os espaços limpos e sem água acumulada.",
  },

  { id: 26, type: "match", title: "Associe", prompt: "Ligue cada momento ao cuidado certo." },
  {
    id: 27,
    type: "habits",
    title: "Escolha hábitos saudáveis",
    prompt: "Escolha os hábitos que ajudam a cuidar da saúde.",
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
    title: "O que Nina aprendeu hoje?",
    prompt:
      "O que Nina aprendeu hoje? Escolha a frase que melhor combina com o jogo.",
    alternatives: [
      { text: "Cuidar do corpo ajuda a proteger a saúde", correct: true, icon: "💚" },
      { text: "Higiene só é importante quando a roupa está suja", correct: false, icon: "🙅" },
      { text: "Lavar as mãos não faz diferença", correct: false, icon: "❌" },
    ],
    feedbackCorrect:
      "Isso mesmo! Os hábitos de higiene ajudam a proteger a saúde e o bem-estar.",
    feedbackWrong:
      "O jogo mostrou que cuidar do corpo ajuda a proteger a saúde em muitos momentos do dia.",
  },
  { id: 30, type: "finish", title: "Chegada", body: "Corpo bem cuidado!" },
];
