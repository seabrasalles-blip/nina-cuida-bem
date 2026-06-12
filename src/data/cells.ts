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
    title: "Lavar as mãos antes de comer",
    prompt:
      "Nina brincou no parque e depois foi lanchar. Mesmo que suas mãos não parecessem muito sujas, ela lavou as mãos com água e sabão antes de comer. Por que esse cuidado é importante?",
    alternatives: [
      { text: "Porque ajuda a tirar sujeiras e microrganismos que podem fazer mal à saúde.", correct: true },
      { text: "Porque deixa o lanche mais doce.", correct: false },
      { text: "Porque faz a comida durar mais tempo.", correct: false },
      { text: "Porque muda a cor das mãos.", correct: false },
    ],
    feedbackCorrect: "Lavar as mãos antes de comer ajuda a evitar que sujeiras e microrganismos cheguem à boca.",
    feedbackWrong: "Lavar as mãos antes de comer ajuda a evitar que sujeiras e microrganismos cheguem à boca.",
  },

  {
    id: 3,
    type: "question",
    title: "Depois de usar o banheiro",
    prompt: "Depois de usar o banheiro, Nina foi até a pia e lavou as mãos com água e sabão. Esse hábito ajuda a:",
    alternatives: [
      { text: "Espalhar sujeiras pela casa.", correct: false },
      {
        text: "Proteger a saúde e evitar que microrganismos passem para objetos, alimentos ou pessoas.",
        correct: true,
      },
      { text: "Deixar o banheiro mais limpo.", correct: false },
      { text: "Fazer a água ficar colorida.", correct: false },
    ],
    feedbackCorrect: "Depois de usar o banheiro, lavar as mãos ajuda a evitar a transmissão de microrganismos.",
    feedbackWrong: "Depois de usar o banheiro, lavar as mãos ajuda a evitar a transmissão de microrganismos.",
  },

  {
    id: 4,
    type: "didYouKnow",
    title: "Microrganismos nas mãos",
    infoIcon: "🦠",
    infoTitle: "Microrganismos nas mãos",
    infoText:
      "Nas mãos podem existir microrganismos tão pequenos que não conseguimos ver. Lavar as mãos com água e sabão ajuda a retirar muitos deles.",
  },

  {
    id: 5,
    type: "question",
    title: "Escovação e cáries",
    prompt:
      "Depois do almoço, Nina escovou os dentes. Esse cuidado ajuda a retirar restos de comida que ficam na boca. Escovar os dentes depois das refeições ajuda a evitar:",
    alternatives: [
      { text: "cáries.", correct: true },
      { text: "tosse.", correct: false },
      { text: "machucados na língua.", correct: false },
      { text: "sujeira nos lábios.", correct: false },
    ],
    feedbackCorrect: "A cárie pode aparecer quando restos de comida ficam nos dentes e favorecem a ação de bactérias.",
    feedbackWrong: "A cárie pode aparecer quando restos de comida ficam nos dentes e favorecem a ação de bactérias.",
  },

  {
    id: 6,
    type: "advance",
    title: "Avanço",
    body: "Nina cuidou de suas unhas e evitou que sujeiras fiquem escondidas nelas. Avance 1 casa.",
    delta: 1,
  },

  {
    id: 7,
    type: "question",
    title: "Escovar os dentes antes de dormir",
    prompt: "Antes de dormir, Nina escovou os dentes. Por que é importante escovar os dentes antes de dormir?",
    alternatives: [
      { text: "Porque a escova serve para brincar.", correct: false },
      { text: "Porque ajuda a proteger os dentes por muitas horas.", correct: true },
      { text: "Porque faz o travesseiro ficar limpo.", correct: false },
      { text: "Porque ajuda a pessoa de sonhar.", correct: false },
    ],
    feedbackCorrect:
      "Durante a noite, ficamos muitas horas sem escovar os dentes novamente; por isso, dormir com a boca limpa ajuda a proteger os dentes.",
    feedbackWrong:
      "Durante a noite, ficamos muitas horas sem escovar os dentes novamente; por isso, dormir com a boca limpa ajuda a proteger os dentes.",
  },

  {
    id: 8,
    type: "didYouKnow",
    title: "Cáries",
    infoIcon: "🦷",
    infoTitle: "Cáries",
    infoText:
      "Na boca vivem bactérias invisíveis que gostam de restos de açúcar dos alimentos. Quando elas se alimentam desses pedacinhos, produzem um ácido que pode machucar o dente e formar a cárie.",
  },

  { id: 9, type: "common", title: "A caminho do parque", body: "Nina vai brincar." },

  {
    id: 10,
    type: "question",
    title: "Nariz escorrendo",
    prompt:
      "Nina está resfriada e com o nariz escorrendo. Ela usa um lenço limpo para assoar o nariz. Por que essa atitude é importante?",
    alternatives: [
      { text: "Porque ajuda a limpar o nariz e evita espalhar secreções.", correct: true },
      { text: "Porque deixa a camiseta mais limpa.", correct: false },
      { text: "Porque faz o resfriado sumir na hora.", correct: false },
      { text: "Porque, se ela não usar o lenço, o nariz pode parar de funcionar.", correct: false },
    ],
    feedbackCorrect: "Usar lenço limpo ajuda a cuidar de si e também das pessoas ao redor.",
    feedbackWrong: "Usar lenço limpo ajuda a cuidar de si e também das pessoas ao redor.",
  },

  {
    id: 11,
    type: "question",
    title: "Depois de assoar o nariz",
    prompt: "Depois de assoar o nariz, Nina joga o lenço usado no lixo e lava as mãos. Essa atitude ajuda a:",
    alternatives: [
      { text: "proteger apenas os brinquedos.", correct: false },
      { text: "evitar que secreções e microrganismos se espalhem.", correct: true },
      { text: "deixar o lenço pronto para outra pessoa usar.", correct: false },
      { text: "fazer o lixo desaparecer.", correct: false },
    ],
    feedbackCorrect:
      "Lenços usados podem carregar secreções. Jogar no lixo e lavar as mãos ajuda a cuidar da saúde coletiva.",
    feedbackWrong:
      "Lenços usados podem carregar secreções. Jogar no lixo e lavar as mãos ajuda a cuidar da saúde coletiva.",
  },

  {
    id: 12,
    type: "didYouKnow",
    title: "Gripe e resfriado",
    infoIcon: "🤧",
    infoTitle: "Gripe e resfriado",
    infoText:
      "Quando uma pessoa gripada tosse, espirra ou assoa o nariz, pequenas gotinhas podem espalhar microrganismos. Por isso, usar lenço, cobrir boca e nariz e lavar as mãos ajuda a cuidar de todos.",
  },

  {
    id: 13,
    type: "question",
    title: "Tossir ou espirrar",
    prompt:
      "Quando Nina espirra, ela cobre a boca e o nariz com o braço ou com um lenço. Depois, lava as mãos. Essa atitude ajuda a:",
    alternatives: [
      { text: "espalhar gotinhas pelo ar.", correct: false },
      { text: "diminuir a chance de transmitir gripe ou resfriado para outras pessoas.", correct: true },
      { text: "desperdiçar água e papel.", correct: false },
      { text: "fazer as mãos ficarem sujas por mais tempo.", correct: false },
    ],
    feedbackCorrect:
      "Ao tossir ou espirrar, pequenas gotinhas podem sair da boca e do nariz. Cobrir e lavar as mãos ajuda a proteger todos.",
    feedbackWrong:
      "Ao tossir ou espirrar, pequenas gotinhas podem sair da boca e do nariz. Cobrir e lavar as mãos ajuda a proteger todos.",
  },

  {
    id: 14,
    type: "question",
    title: "Banho e bem-estar",
    prompt: "Depois de correr, brincar e suar, Nina tomou banho e colocou uma roupa limpa. Esse cuidado ajuda porque:",
    alternatives: [
      { text: "limpa o corpo e traz conforto.", correct: true },
      { text: "faz a roupa ficar com cheiro de perfume mesmo sem lavar.", correct: false },
      { text: "assim ela não derrete de tanto calor", correct: false },
      { text: "muda o tamanho da roupa.", correct: false },
    ],
    feedbackCorrect: "O banho ajuda a retirar suor e sujeiras da pele, contribuindo para o bem-estar.",
    feedbackWrong: "O banho ajuda a retirar suor e sujeiras da pele, contribuindo para o bem-estar.",
  },

  {
    id: 15,
    type: "didYouKnow",
    title: "Lenço usado",
    infoIcon: "🧻",
    infoTitle: "Lenço usado",
    infoText:
      "O lenço usado pode ficar com secreções do nariz. Jogá-lo no lixo e lavar as mãos depois ajuda a evitar que microrganismos se espalhem.",
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
    title: "Frutas e verduras",
    prompt:
      "Nina vai comer uma maçã. Antes disso, um adulto ajuda a lavar a fruta com água limpa. Por que lavar frutas e verduras antes de comer é importante?",
    alternatives: [
      { text: "Porque ajuda a retirar sujeiras que podem estar na casca ou nas folhas.", correct: true },
      { text: "Porque faz todas as frutas ficarem quentes.", correct: false },
      { text: "Porque transforma fruta em doce.", correct: false },
      { text: "Porque muda o sabor.", correct: false },
    ],
    feedbackCorrect:
      "Frutas e verduras podem ter poeira, terra ou microrganismos. Lavar com água limpa ajuda a cuidar da saúde.",
    feedbackWrong:
      "Frutas e verduras podem ter poeira, terra ou microrganismos. Lavar com água limpa ajuda a cuidar da saúde.",
  },

  {
    id: 18,
    type: "didYouKnow",
    title: "Frutas e verduras",
    infoIcon: "🍎",
    infoTitle: "Frutas e verduras",
    infoText:
      "Frutas e verduras podem trazer poeira, terra ou microrganismos na casca e nas folhas. Lavar os alimentos com água limpa antes de comer ajuda a proteger a saúde.",
  },

  {
    id: 19,
    type: "question",
    title: "Água potável",
    prompt:
      "Nina aprendeu que nem toda água é própria para beber. Para matar a sede, ela deve beber água limpa e segura. Por que não devemos beber água de qualquer lugar?",
    alternatives: [
      { text: "Porque algumas águas podem estar contaminadas e causar doenças.", correct: true },
      { text: "Porque água limpa faz mal ao corpo.", correct: false },
      { text: "Porque beber água é importante.", correct: false },
      { text: "Porque toda água tem o mesmo cuidado.", correct: false },
    ],
    feedbackCorrect: "Água potável é a água própria para beber. Ela precisa estar limpa e segura.",
    feedbackWrong: "Água potável é a água própria para beber. Ela precisa estar limpa e segura.",
  },

  {
    id: 20,
    type: "question",
    title: "Água contaminada",
    prompt:
      "Depois da chuva, apareceu uma poça de água suja perto da rua. Nina não brincou nessa água. Por que é melhor evitar contato com água suja ou contaminada?",
    alternatives: [
      { text: "Porque essa água pode ter sujeiras e microrganismos que causam doenças.", correct: true },
      { text: "Porque toda poça de água é limpa.", correct: false },
      { text: "Porque a água suja sempre tem cheiro bom.", correct: false },
      { text: "Porque microrganismos sempre ficam maiores.", correct: false },
    ],
    feedbackCorrect: "Nem sempre conseguimos ver o que há na água. Por isso, água suja pode oferecer riscos à saúde.",
    feedbackWrong: "Nem sempre conseguimos ver o que há na água. Por isso, água suja pode oferecer riscos à saúde.",
  },

  {
    id: 21,
    type: "common",
    title: "Hora do banho",
    body: "Nina se prepara para o banho.",
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
    title: "Água potável",
    infoIcon: "💧",
    infoTitle: "Água potável",
    infoText:
      "Água potável é a água própria para beber. Ela precisa estar limpa e segura, porque água contaminada pode causar doenças.",
  },

  {
    id: 24,
    type: "question",
    title: "Andar descalço em locais inadequados",
    prompt:
      "Nina gosta de ficar descalça em casa, mas usa calçados quando está em lugares com sujeira, pedras ou água duvidosa. Por que usar calçados nesses lugares é uma atitude de cuidado?",
    alternatives: [
      { text: "Porque ajuda a proteger os pés e evita contato com sujeiras que podem fazer mal.", correct: true },
      { text: "Porque os pés nunca precisam de cuidado.", correct: false },
      { text: "Porque andar descalço limpa o chão.", correct: false },
      { text: "Porque os calçados fazem a sujeira desaparecer.", correct: false },
    ],
    feedbackCorrect: "Em alguns lugares, o calçado protege os pés de machucados, sujeiras e possíveis contaminações.",
    feedbackWrong: "Em alguns lugares, o calçado protege os pés de machucados, sujeiras e possíveis contaminações.",
  },

  {
    id: 25,
    type: "didYouKnow",
    title: "Saúde coletiva",
    infoIcon: "🤝",
    infoTitle: "Saúde coletiva",
    infoText:
      "Alguns hábitos de higiene cuidam de uma pessoa e também das outras. Lavar as mãos, usar lenço e não compartilhar objetos sujos ajudam a proteger a saúde coletiva.",
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
    prompt: "O que Nina aprendeu hoje? Escolha a frase que melhor combina com o jogo.",
    alternatives: [
      { text: "Cuidar do corpo ajuda a proteger a saúde", correct: true, icon: "💚" },
      { text: "Higiene só é importante quando a roupa está suja", correct: false, icon: "🙅" },
      { text: "Lavar as mãos não faz diferença", correct: false, icon: "❌" },
    ],
    feedbackCorrect: "Isso mesmo! Os hábitos de higiene ajudam a proteger a saúde e o bem-estar.",
    feedbackWrong: "O jogo mostrou que cuidar do corpo ajuda a proteger a saúde em muitos momentos do dia.",
  },
  { id: 30, type: "finish", title: "Chegada", body: "Corpo bem cuidado!" },
];
