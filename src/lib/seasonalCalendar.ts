interface SeasonalTip {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'Fácil' | 'Média' | 'Difícil';
  timeRequired: string; // e.g., "30 min", "2 horas"
}

interface Season {
  name: string;
  startDate: string; // MM-DD format
  endDate: string; // MM-DD format
  description: string;
  tips: SeasonalTip[];
}

export const seasons: Season[] = [
  {
    name: "Verão",
    startDate: "12-21",
    endDate: "03-20",
    description: "Estação das flores, colheitas e atividades intensas no jardim. Aproveite o calor para projetos que exigem luz solar abundante.",
    tips: [
      {
        id: 1,
        title: "Proteja suas plantas do calor intenso",
        description: "Use coberturas temporárias ou mulching para proteger as raízes do calor. Regue de manhã cedo ou ao entardecer.",
        category: "Jardinagem",
        difficulty: "Fácil",
        timeRequired: "30 min"
      },
      {
        id: 2,
        title: "Comece uma horta de verão",
        description: "Plante vegetais de verão como tomates, pimentas, abóboras e melancias que prosperam no calor.",
        category: "Horta",
        difficulty: "Média",
        timeRequired: "2 horas"
      },
      {
        id: 3,
        title: "Colete sementes de plantas maduras",
        description: "Recolha sementes de flores e vegetais que estão terminando seu ciclo para plantar na próxima estação.",
        category: "Jardinagem",
        difficulty: "Fácil",
        timeRequired: "1 hora"
      },
      {
        id: 4,
        title: "Instale um sistema de irrigação por gotejamento",
        description: "Automatize a rega para garantir que suas plantas recebam água regularmente mesmo quando você estiver fora.",
        category: "Irrigação",
        difficulty: "Difícil",
        timeRequired: "4 horas"
      }
    ]
  },
  {
    name: "Outono",
    startDate: "03-21",
    endDate: "06-20",
    description: "Estação da preparação para o inverno. Ideal para plantar árvores, arbustos e preparar o solo para a próxima estação.",
    tips: [
      {
        id: 5,
        title: "Plante árvores e arbustos",
        description: "A estação ideal para plantar árvores e arbustos permanentes, pois as temperaturas mais amenas permitem o estabelecimento das raízes.",
        category: "Jardinagem",
        difficulty: "Média",
        timeRequired: "3 horas"
      },
      {
        id: 6,
        title: "Prepare seu jardim para o inverno",
        description: "Limpe folhas caídas, corte plantas perenes e proteja plantas sensíveis ao frio.",
        category: "Jardinagem",
        difficulty: "Média",
        timeRequired: "2 horas"
      },
      {
        id: 7,
        title: "Comece a compostagem com folhas secas",
        description: "As folhas caídas são um excelente material marrom para sua composteira.",
        category: "Compostagem",
        difficulty: "Fácil",
        timeRequired: "1 hora"
      },
      {
        id: 8,
        title: "Planeje seu jardim para a próxima estação",
        description: "Avalie o que funcionou bem este ano e planeje melhorias para a próxima estação de plantio.",
        category: "Planejamento",
        difficulty: "Fácil",
        timeRequired: "1 hora"
      }
    ]
  },
  {
    name: "Inverno",
    startDate: "06-21",
    endDate: "09-20",
    description: "Estação de descanso para muitas plantas. Perfeito para projetos internos, planejamento e manutenção de ferramentas.",
    tips: [
      {
        id: 9,
        title: "Comece um jardim interno",
        description: "Plante ervas aromáticas e vegetais pequenos em vasos que podem ficar dentro de casa durante o inverno.",
        category: "Jardinagem",
        difficulty: "Fácil",
        timeRequired: "2 horas"
      },
      {
        id: 10,
        title: "Planeje e projete seu jardim para a primavera",
        description: "Use este tempo para pesquisar novas plantas, desenhar layouts e organizar sementes.",
        category: "Planejamento",
        difficulty: "Fácil",
        timeRequired: "2 horas"
      },
      {
        id: 11,
        title: "Conserte e organize suas ferramentas",
        description: "Afie lâminas, lubrifique mecanismos e organize seu equipamento de jardinagem para a próxima estação.",
        category: "Manutenção",
        difficulty: "Média",
        timeRequired: "3 horas"
      },
      {
        id: 12,
        title: "Aprenda novas técnicas de jardinagem",
        description: "Leia livros, assista a vídeos e participe de cursos online sobre técnicas de jardinagem.",
        category: "Educação",
        difficulty: "Fácil",
        timeRequired: "Variável"
      }
    ]
  },
  {
    name: "Primavera",
    startDate: "09-21",
    endDate: "12-20",
    description: "Estação do renascimento e crescimento. O momento ideal para plantar a maioria das sementes e iniciar novos projetos.",
    tips: [
      {
        id: 13,
        title: "Prepare o solo para plantio",
        description: "Arame o solo, adicione composto e verifique o pH antes de começar a plantar.",
        category: "Jardinagem",
        difficulty: "Média",
        timeRequired: "3 horas"
      },
      {
        id: 14,
        title: "Plante sua horta de primavera",
        description: "Comece com vegetais de clima frio como alface, espinafre, rabanete e ervas.",
        category: "Horta",
        difficulty: "Fácil",
        timeRequired: "2 horas"
      },
      {
        id: 15,
        title: "Divida e replante perenes",
        description: "Muitas plantas perenes podem ser divididas e replantadas nesta época para rejuvenescê-las.",
        category: "Jardinagem",
        difficulty: "Média",
        timeRequired: "2 horas"
      },
      {
        id: 16,
        title: "Controle pragas desde o início",
        description: "Implemente estratégias de controle de pragas preventivo antes que elas se estabeleçam.",
        category: "Pragas",
        difficulty: "Fácil",
        timeRequired: "1 hora"
      }
    ]
  }
];

// Function to get current season based on date
export const getCurrentSeason = (): Season => {
  const today = new Date();
  const month = today.getMonth() + 1; // JS months are 0-11
  const day = today.getDate();
  const currentDateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
  // Handle year transition (December to March is summer)
  if ((month === 12 && day >= 21) || (month <= 3 && day <= 20)) {
    return seasons[0]; // Verão
  }
  
  // Spring: September 21 to December 20
  if (month >= 9 && month <= 12) {
    return seasons[3]; // Primavera
  }
  
  // Summer: December 21 to March 20
  if ((month === 12 && day >= 21) || (month <= 3 && day <= 20)) {
    return seasons[0]; // Verão
  }
  
  // Autumn: March 21 to June 20
  if (month >= 3 && month <= 6) {
    return seasons[1]; // Outono
  }
  
  // Winter: June 21 to September 20
  return seasons[2]; // Inverno
};

// Function to get all tips for current season
export const getCurrentSeasonTips = (): SeasonalTip[] => {
  const currentSeason = getCurrentSeason();
  return currentSeason.tips;
};