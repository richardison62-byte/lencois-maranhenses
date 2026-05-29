// tourData.js — Dados estáticos dos passeios e serviços

export const passeios = [
  {
    id: "dia-livre",
    nome: "Dia Livre",
    regiao: "Barreirinhas",
    duracao: "—",
    icone: "🌤️",
    descricao: "Descanso, cidade ou programação independente.",
    descricaoLonga: `Um dia sem compromissos nos Lençóis Maranhenses tem seu próprio charme. Barreirinhas é uma cidade viva, com feiras, restaurantes à beira do Rio Preguiças e artesanato local para explorar.

Aproveite para descansar na pousada, fazer uma caminhada pelas margens do rio, conhecer o mercadinho local ou simplesmente sentar e observar o ritmo tranquilo da cidade.

É também uma ótima oportunidade para conversar com moradores, experimentar a culinária maranhense — arroz de cuxá, torta de camarão, caldo de sururu — e recarregar as energias para os próximos passeios.`,
    destaque: "Descanso + Gastronomia local + Rio Preguiças",
    nivelDificuldade: "Fácil",
    melhorEpoca: "Ano todo",
    incluso: ["Tempo livre", "Sugestões de restaurantes", "Mapa da cidade"],
    naoIncluso: ["Refeições", "Passeios extras", "Transporte"],
    dicas: "Aproveite para visitar o Mercado Municipal de Barreirinhas pela manhã, quando está mais movimentado e fresco. O restaurante à beira-rio serve o melhor peixe grelhado da cidade.",
    imagens: [
      "/imagens/beirario1.webp",
      "/imagens/beirario.webp",
      "/imagens/beirario2.webp",
    ],
    coletivo: 0,
    privativo: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    privatePricePerPerson: 0,
    isDiaLivre: true,
  },

  {
    id: "lagoa-bonita-coletivo",
    nome: "Lagoa Bonita",
    regiao: "Barreirinhas",
    duracao: "5h",
    icone: "🚙",
    descricao: "Passeio principal em grupo compartilhado até a lagoa mais bonita dos Lençóis.",
    descricaoLonga: `A Lagoa Bonita é o espetáculo mais aguardado de quem visita os Lençóis Maranhenses. No passeio coletivo, você compartilha o traslado com outros viajantes, tornando a experiência mais econômica e social.

O veículo 4x4 parte de Barreirinhas e avança pelas dunas até chegar à lagoa, cercada por dunas de até 40 metros de altura. A caminhada até a beira da lagoa é curta e recompensadora.

O banho nas águas cristalinas e frias é o ponto alto do passeio. O guia credenciado acompanha todo o grupo, explicando a formação das lagoas e indicando os melhores ângulos para fotos.`,
    destaque: "Lagoa Bonita + Dunas de 40m + Guia credenciado",
    nivelDificuldade: "Fácil",
    melhorEpoca: "Jun — Out",
    incluso: ["Guia credenciado", "Traslado 4x4 compartilhado", "Água mineral"],
    naoIncluso: ["Alimentação", "Protetor solar", "Fotos profissionais"],
    dicas: "No coletivo, a saída é em horário fixo. Chegue 15 minutos antes do ponto de encontro. Leve roupa de banho, chinelo e protetor solar FPS 50+.",
    imagens: [
      "/imagens/horizontal.png",
      "/imagens/lagoabonita2.webp",
      "/imagens/lagoabonita3.webp",
    ],
    coletivo: 160,
    privativo: { 1: 1500, 2: 1500, 3: 1700, 4: 1900, 5: 2100, 6: 2300 },
    privatePricePerPerson: 160,
  },

  {
    id: "santo-amaro",
    nome: "Santo Amaro",
    regiao: "Santo Amaro",
    duracao: "7h",
    icone: "🏝️",
    descricao: "Transfer e passeios nas lagoas de Santo Amaro do Maranhão.",
    descricaoLonga: `Santo Amaro do Maranhão guarda uma beleza diferente de Barreirinhas — mais crua, mais intimista, mais autêntica. A cidade fica às margens do Rio Preguiças e tem arquitetura colonial bem preservada.

De lá, os passeios entram no parque por trilhas de 4x4 que levam a lagoas ainda menos frequentadas: a Lagoa Tropical e as impressionantes Dunas Brancas, com vistas panorâmicas de 360°.

O passeio inclui uma parada em comunidade local, onde artesãs vendem peças de barro e palha. Para quem quer fugir das multidões de Barreirinhas, Santo Amaro é o destino perfeito.`,
    destaque: "Dunas Brancas + Lagoa Tropical + Cultura local",
    nivelDificuldade: "Fácil",
    melhorEpoca: "Jul — Out",
    incluso: ["Transfer Barreirinhas → Santo Amaro", "Guia local", "Traslado 4x4", "Visita à comunidade"],
    naoIncluso: ["Almoço", "Artesanato (compra opcional)"],
    dicas: "Leve dinheiro em espécie para comprar artesanato e pagar o almoço. O mercadinho local serve o melhor suco de caju fresco da região.",
    imagens: [
      "/imagens/santoamaro.webp",
      "/imagens/santoamaro1.webp",
      "/imagens/santoamaro2.webp",
    ],
    coletivo: 320,
    privativo: { 1: 1500, 2: 1500, 3: 1700, 4: 1900, 5: 2100, 6: 2300 },
    privatePricePerPerson: 320,
  },

  {
    id: "lagoa-azul-prata-coletivo",
    nome: "Lagoa Azul/Prata",
    regiao: "Barreirinhas",
    duracao: "4h",
    icone: "🚙",
    descricao: "Circuito compartilhado pelas lagoas tradicionais dos Lençóis.",
    descricaoLonga: `O circuito Lagoa Azul e Lagoa da Prata é o passeio mais tradicional dos Lençóis Maranhenses — e o favorito de quem visita pela primeira vez.

A Lagoa Azul impressiona com suas águas em tons de turquesa intenso, contrastando com as dunas brancas ao redor. A Lagoa da Prata, menor e mais tranquila, tem fundo de areia finíssima e temperatura da água ligeiramente mais fria.

No coletivo, o traslado 4x4 é compartilhado, tornando o passeio acessível sem abrir mão da experiência completa.`,
    destaque: "Lagoa Azul + Lagoa da Prata + Guia credenciado",
    nivelDificuldade: "Fácil",
    melhorEpoca: "Jul — Set",
    incluso: ["Guia credenciado", "Traslado 4x4 compartilhado", "Água mineral"],
    naoIncluso: ["Alimentação", "Protetor solar"],
    dicas: "Chegue cedo — a Lagoa Azul fica mais movimentada após as 10h. Leve roupa de banho e sandália para caminhar na areia.",
    imagens: [
      "/imagens/lagoadaprata.webp",
      "/imagens/prata.webp",
      "/imagens/prata3.webp",
    ],
    coletivo: 160,
    privativo: { 1: 1500, 2: 1500, 3: 1700, 4: 1900, 5: 2100, 6: 2300 },
    privatePricePerPerson: 160,
  },

  {
    id: "lagoa-azul-bonita-coletivo",
    nome: "Lagoa Azul + Bonita",
    regiao: "Barreirinhas",
    duracao: "8h",
    icone: "🚙",
    descricao: "Combo compartilhado dos dois circuitos no mesmo dia.",
    descricaoLonga: `O melhor dos dois mundos em um único dia: pela manhã você visita a Lagoa Azul e a Lagoa da Prata, e à tarde sobe as dunas da Lagoa Bonita para o pôr do sol mais famoso dos Lençóis.

É o passeio mais completo disponível em Barreirinhas — quem faz esse combo sai com a sensação de ter visto tudo que os Lençóis têm de melhor em um único dia.

No coletivo, o traslado é compartilhado com outros viajantes, tornando o dia longo e animado com novas companhias.`,
    destaque: "Lagoa Azul + Lagoa da Prata + Lagoa Bonita (pôr do sol)",
    nivelDificuldade: "Moderado",
    melhorEpoca: "Jun — Set",
    incluso: ["Guia credenciado", "Traslado 4x4 compartilhado", "Água mineral (manhã e tarde)"],
    naoIncluso: ["Almoço entre os passeios", "Protetor solar"],
    dicas: "É um dia longo — saia bem alimentado e descansado. Leve lanche e bastante água. O almoço entre os dois passeios pode ser feito em um restaurante de Barreirinhas.",
    imagens: [
      "/imagens/lagoaazul.webp",
      "/imagens/lagoabonita1.png",
      "/imagens/lagoabonita.png",
    ],
    coletivo: 300,
    privativo: { 1: 2000, 2: 2000, 3: 2200, 4: 2400, 5: 2600, 6: 2800 },
    privatePricePerPerson: 300,
  },

  {
    id: "circuito-atins-coletivo",
    nome: "Circuito Atins",
    regiao: "Atins",
    duracao: "8h",
    icone: "🏝️",
    descricao: "Roteiro completo pelas dunas e praias até a vila remota de Atins.",
    descricaoLonga: `Atins é uma das últimas vilas verdadeiramente remotas do Brasil. Sem asfalto, com ruas de areia e pescadores que vivem do Rio Preguiças — chegar lá já é uma aventura.

O Circuito Atins combina travessia de barco pelo Rio Preguiças, passando por manguezais e comunidades ribeirinhas, seguida de excursão 4x4 por dunas selvagens até a vila.

Na vila, você tem tempo livre para almoçar frutos do mar fresquíssimos e caminhar pelas ruas de areia. No coletivo, o traslado é compartilhado, tornando o passeio mais acessível.`,
    destaque: "Rio Preguiças + Dunas de Atins + Vila remota",
    nivelDificuldade: "Moderado",
    melhorEpoca: "Ano todo",
    incluso: ["Guia credenciado", "Travessia de barco", "Traslado 4x4 compartilhado", "Água mineral"],
    naoIncluso: ["Almoço (aprox. R$ 40–60)", "Bebidas"],
    dicas: "Leve dinheiro em espécie — a vila não tem máquinas de cartão. Proteja o celular da areia nas dunas.",
    imagens: [
      "/imagens/atins.webp",
      "/imagens/atins1.webp",
      "/imagens/atins2.webp",
    ],
    coletivo: 250,
    privativo: { 1: 1800, 2: 1800, 3: 2000, 4: 2200, 5: 2400, 6: 2600 },
    privatePricePerPerson: 250,
  },

  {
    id: "circuito-caburé",
    nome: "Circuito Caburé",
    regiao: "Caburé",
    duracao: "8h",
    icone: "⛵",
    descricao: "Circuito Caburé leva você ao encontro do Rio Preguiças com o mar em uma das pontas de areia mais bonitas do Brasil.",
    descricaoLonga: `Caburé é um lugar geograficamente único: uma estreita faixa de areia onde o Rio Preguiças encontra o Oceano Atlântico. Do lado esquerdo, água doce do rio. Do lado direito, ondas do oceano.

O passeio navega pelo Rio Preguiças, passa pela Vila de Mandacaru — com seu farol histórico do século XIX — e chega a Caburé para banho e almoço à beira-rio.

O almoço com frutos do mar fresquíssimos direto para a cozinha é parada quase sagrada de todo viajante que passa por aqui.`,
    destaque: "Rio Preguiças + Farol de Mandacaru + Caburé (rio e mar)",
    nivelDificuldade: "Fácil",
    melhorEpoca: "Ano todo",
    incluso: ["Guia credenciado", "Travessia de barco", "Traslado", "Água mineral"],
    naoIncluso: ["Almoço em Caburé (aprox. R$ 50–80)", "Bebidas"],
    dicas: "Reserve uma mesa no restaurante de Caburé com antecedência na alta temporada. A caldeirada de frutos do mar é o prato mais pedido.",
    imagens: [
      "/imagens/cabure1.webp",
      "/imagens/cabure.webp",
      "/imagens/farol.webp",
    ],
    coletivo: 150,
    privativo: { 1: 1200, 2: 1200, 3: 1400, 4: 1600, 5: 1800, 6: 2000 },
    privatePricePerPerson: 150,
  },

  {
    id: "quadriciclo",
    nome: "Quadriciclo",
    regiao: "Barreirinhas",
    duracao: "3h",
    icone: "🏁",
    descricao: "Adrenalina nos pequenos lençóis com quadriciclo nas dunas.",
    descricaoLonga: `Nada se compara à sensação de controlar um quadriciclo no topo de uma duna de areia branca. O vento no rosto, a vista imensurável de dunas e lagoas, e a adrenalina de descer ladeiras íngremes — tudo isso está aqui.

O percurso avança pelos campos de dunas dos Pequenos Lençóis, com paradas para fotos e banho rápido em lagoa. O valor de R$ 650 é por dupla (1 unidade de quadriciclo).

Não é necessária experiência prévia — o briefing e o equipamento de proteção são fornecidos. Liberado para maiores de 16 anos.`,
    destaque: "Quadriciclo nas dunas + Lagoa para banho + Equipamento incluso",
    nivelDificuldade: "Moderado",
    melhorEpoca: "Ano todo",
    incluso: ["Quadriciclo (1 unid. por dupla)", "Capacete e óculos", "Guia de segurança", "Banho em lagoa"],
    naoIncluso: ["Água e lanches", "Seguro adicional (opcional)"],
    dicas: "Use roupas que podem ficar com areia. Tênis fechado é obrigatório. O valor de R$ 650 é por dupla — um quadriciclo para duas pessoas.",
    imagens: [
      "/imagens/quadri2.webp",
      "/imagens/quadri1.webp",
      "/imagens/quadri.webp",
    ],
    coletivo: null,
    privativo: { 1: 650, 2: 650, 3: 1300, 4: 1300, 5: 1950, 6: 1950 },
    privatePricePerPerson: 650,
    soPrivativo: true,
    precoPorDupla: true,
  },

  {
    id: "mirar-estrelas",
    nome: "Mirar das Estrelas",
    regiao: "Barreirinhas",
    duracao: "Noturno",
    icone: "⭐",
    descricao: "Noite mágica sob o céu aberto nas dunas dos Lençóis.",
    descricaoLonga: `Longe da poluição luminosa das cidades, o céu noturno dos Lençóis Maranhenses é um espetáculo à parte. O Mirar das Estrelas leva você para o topo das dunas depois do anoitecer para contemplar a Via Láctea com olho nu.

Com telescópio e guia especializado em astronomia, você identifica constelações, planetas e nebulosas enquanto está deitado na areia ainda morna do dia.

O valor de R$ 1.500 é para o grupo inteiro — quanto mais pessoas, mais econômico fica. Uma experiência inesquecível para qualquer idade.`,
    destaque: "Via Láctea + Telescópio + Guia de astronomia",
    nivelDificuldade: "Fácil",
    melhorEpoca: "Mai — Nov (lua nova)",
    incluso: ["Guia de astronomia", "Telescópio", "Traslado 4x4 noturno", "Lanche nas dunas"],
    naoIncluso: ["Jantar antes do passeio", "Agasalho (recomendado)"],
    dicas: "Agende para noites de lua nova ou minguante para o céu mais escuro e estrelado. Leve um casaco leve — as dunas esfiam bastante à noite.",
    imagens: [
      "/imagens/noite.webp",
      "/imagens/noite1.webp",
      "/imagens/noite3.webp",
    ],
    coletivo: null,
    privativo: { 1: 1500, 2: 1500, 3: 1500, 4: 1500, 5: 1500, 6: 1500 },
    privatePricePerPerson: 1500,
    soPrivativo: true,
    precoFixoGrupo: true,
  },

  {
    id: "sobrevoo",
    nome: "Sobrevoo nos Lençóis",
    regiao: "Barreirinhas",
    duracao: "30min",
    icone: "✈️",
    descricao: "Vista aérea inesquecível das lagoas e dunas dos Lençóis.",
    descricaoLonga: `Existem paisagens que só fazem sentido vistas do alto — os Lençóis Maranhenses são uma delas. Do chão, você vê dunas e lagoas próximas. Do ar, você vê o infinito: um mosaico branco e azul que se estende pelo horizonte como um sonho.

O valor de R$ 2.400 é para 2 pessoas (R$ 1.200 por pessoa). O ultraleve decola de pista próxima a Barreirinhas e sobrevoa a região mais densa de lagoas e dunas do parque.

São 30 minutos que ficam para sempre na memória — passando sobre lagoas coloridas, rasante pelas cristas das dunas e com volta ampla sobre o Rio Preguiças.`,
    destaque: "Voo exclusivo + Vista 360° + Foto e vídeo aéreo incluso",
    nivelDificuldade: "Fácil",
    melhorEpoca: "Mai — Nov (dias sem vento)",
    incluso: ["Voo de 30 minutos", "Piloto certificado", "Fotos e vídeo aéreo", "Seguro de voo"],
    naoIncluso: ["Transfer até a pista"],
    dicas: "Peso máximo por passageiro: 100kg. Não indicado para gestantes. Reserve para o período da manhã — melhor luz e menos vento.",
    imagens: [
      "/imagens/sobrevoo2.webp",
      "/imagens/sobrevoo.webp",
      "/imagens/sobrevoo1.webp",
    ],
    coletivo: null,
    privativo: { 1: 1200, 2: 2400, 3: 3600, 4: 4800, 5: 6000, 6: 7200 },
    privatePricePerPerson: 1200,
    soPrivativo: true,
    precoPorPessoa: true,
  },

  {
    id: "cafe-dunas",
    nome: "Café da Manhã nas Dunas",
    regiao: "Barreirinhas",
    duracao: "3h",
    icone: "☕",
    descricao: "Experiência exclusiva ao amanhecer com café servido nas dunas.",
    descricaoLonga: `Acordar antes do sol para subir as dunas e assistir ao amanhecer com café na mão é uma das experiências mais exclusivas que os Lençóis Maranhenses oferecem.

O passeio sai de madrugada, sobe as dunas a pé com lanternas e chega ao topo no momento exato em que o céu começa a clarear. Uma mesa é montada com café, frutas, pães artesanais e tapiocas — servidos enquanto o sol nasce sobre o deserto de areia.

O valor de R$ 2.000 é para o grupo inteiro. Uma experiência romântica e única, ideal para casais e pequenos grupos.`,
    destaque: "Amanhecer nas dunas + Café gourmet + Experiência exclusiva",
    nivelDificuldade: "Fácil",
    melhorEpoca: "Ano todo",
    incluso: ["Café da manhã completo", "Guia exclusivo", "Traslado 4x4", "Mesa montada nas dunas"],
    naoIncluso: ["Transfer do hotel até o ponto de encontro"],
    dicas: "Saída geralmente às 4h30. Vista roupas confortáveis e leve um agasalho leve — as dunas são frescas antes do sol. Uma das experiências mais fotografadas do destino.",
    imagens: [
      "/imagens/cafe1.webp",
      "/imagens/cafe.webp",
      "/imagens/cafe2.webp",
    ],
    coletivo: null,
    privativo: { 1: 2000, 2: 2000, 3: 2000, 4: 2000, 5: 2000, 6: 2000 },
    privatePricePerPerson: 2000,
    soPrivativo: true,
    precoFixoGrupo: true,
  },
];

export const transfers = {
  ida: {
    label: "Transfer Ida (São Luís → Barreirinhas)",
    preco: 120,
  },
  volta: {
    label: "Transfer Volta (Barreirinhas → São Luís)",
    preco: 120,
  },
};

export const hospedagem = {
  simples: {
    label: "Pousada Simples (quarto duplo)",
    precoPorNoite: 180,
    descricao: "Conforto básico, café da manhã incluso",
  },
  confortavel: {
    label: "Pousada Confortável (quarto duplo)",
    precoPorNoite: 280,
    descricao: "Boa estrutura, piscina e café reforçado",
  },
  premium: {
    label: "Pousada Premium (quarto duplo)",
    precoPorNoite: 420,
    descricao: "Melhor estrutura, café gourmet e localização privilegiada",
  },
};

export const WHATSAPP_NUMBER = "559882000000";
export const INSTAGRAM_HANDLE = "lencoismaranhenses.roteiros";
export const INSTAGRAM_URL = `https://instagram.com/lencoismaranhenses.roteiros`;