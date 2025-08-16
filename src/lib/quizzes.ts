import { Quiz, QuizQuestion } from '@/types';

export const quizzes: Quiz[] = [
  {
    id: 'jardim-ideal',
    title: 'Qual tipo de jardim é ideal para você?',
    description: 'Descubra que tipo de jardim combina com seu estilo de vida e espaço disponível',
    category: 'Jardinagem',
    estimatedTime: 3,
    questions: [
      {
        id: 1,
        question: 'Qual é o tamanho do seu espaço para jardinagem?',
        type: 'single',
        options: [
          { id: 'a', text: 'Apartamento pequeno ou varanda', points: { tipos: ['vertical', 'vasos'] } },
          { id: 'b', text: 'Quintal médio (até 50m²)', points: { tipos: ['tradicional', 'permacultura'] } },
          { id: 'c', text: 'Quintal grande (50m²+)', points: { tipos: ['permacultura', 'tradicional', 'floresta'] } },
          { id: 'd', text: 'Não tenho espaço externo', points: { tipos: ['interno', 'vertical'] } }
        ]
      },
      {
        id: 2,
        question: 'Quanto tempo por semana você pode dedicar à jardinagem?',
        type: 'single',
        options: [
          { id: 'a', text: 'Menos de 2 horas', points: { manutencao: 'baixa' } },
          { id: 'b', text: '2-5 horas', points: { manutencao: 'media' } },
          { id: 'c', text: 'Mais de 5 horas', points: { manutencao: 'alta' } }
        ]
      },
      {
        id: 3,
        question: 'Qual é o seu principal objetivo com o jardim?',
        type: 'single',
        options: [
          { id: 'a', text: 'Alimentos frescos (horta)', points: { objetivo: 'alimentacao' } },
          { id: 'b', text: 'Beleza e decoração', points: { objetivo: 'estetica' } },
          { id: 'c', text: 'Atrair vida selvagem (pássaros, borboletas)', points: { objetivo: 'biodiversidade' } },
          { id: 'd', text: 'Relaxamento e bem-estar', points: { objetivo: 'bem-estar' } }
        ]
      },
      {
        id: 4,
        question: 'Você tem experiência prévia com jardinagem?',
        type: 'single',
        options: [
          { id: 'a', text: 'Nenhuma experiência', points: { experiencia: 'iniciante' } },
          { id: 'b', text: 'Alguma experiência (plantas básicas)', points: { experiencia: 'intermediario' } },
          { id: 'c', text: 'Muita experiência (diversos tipos de plantas)', points: { experiencia: 'avancado' } }
        ]
      },
      {
        id: 5,
        question: 'Qual tipo de clima predomina na sua região?',
        type: 'single',
        options: [
          { id: 'a', text: 'Tropical úmido (muita chuva, quente)', points: { clima: 'tropical' } },
          { id: 'b', text: 'Tropical seco (estiagem longa)', points: { clima: 'tropical' } },
          { id: 'c', text: 'Subtropical (quatro estações bem definidas)', points: { clima: 'subtropical' } },
          { id: 'd', text: 'Semiárido (pouca chuva, seco)', points: { clima: 'semiárido' } }
        ]
      }
    ]
  },
  {
    id: 'nivel-sustentabilidade',
    title: 'Descubra seu nível de sustentabilidade',
    description: 'Veja quão sustentável é o seu estilo de vida e receba dicas personalizadas',
    category: 'Sustentabilidade',
    estimatedTime: 5,
    questions: [
      {
        id: 1,
        question: 'Com que frequência você consome produtos descartáveis (copos, talheres, embalagens)?',
        type: 'single',
        options: [
          { id: 'a', text: 'Diariamente', points: { pontuacao: 1 } },
          { id: 'b', text: 'Algumas vezes por semana', points: { pontuacao: 3 } },
          { id: 'c', text: 'Raramente', points: { pontuacao: 5 } },
          { id: 'd', text: 'Nunca ou quase nunca', points: { pontuacao: 7 } }
        ]
      },
      {
        id: 2,
        question: 'Qual é a principal fonte de energia da sua casa?',
        type: 'single',
        options: [
          { id: 'a', text: 'Energia convencional 100%', points: { pontuacao: 1 } },
          { id: 'b', text: 'Mistura de energia convencional e solar', points: { pontuacao: 4 } },
          { id: 'c', text: 'Energia solar 100%', points: { pontuacao: 7 } }
        ]
      },
      {
        id: 3,
        question: 'Como você lida com o lixo orgânico da sua casa?',
        type: 'single',
        options: [
          { id: 'a', text: 'Junto com o lixo comum', points: { pontuacao: 1 } },
          { id: 'b', text: 'Faço compostagem doméstica', points: { pontuacao: 5 } },
          { id: 'c', text: 'Separo e envio para compostagem comunitária', points: { pontuacao: 7 } }
        ]
      },
      {
        id: 4,
        question: 'Com que frequência você compra produtos de segunda mão?',
        type: 'single',
        options: [
          { id: 'a', text: 'Nunca', points: { pontuacao: 1 } },
          { id: 'b', text: 'Algumas vezes por ano', points: { pontuacao: 3 } },
          { id: 'c', text: 'Mensalmente', points: { pontuacao: 5 } },
          { id: 'd', text: 'Semanalmente', points: { pontuacao: 7 } }
        ]
      },
      {
        id: 5,
        question: 'Qual meio de transporte você usa com mais frequência?',
        type: 'single',
        options: [
          { id: 'a', text: 'Carro próprio', points: { pontuacao: 1 } },
          { id: 'b', text: 'Transporte público', points: { pontuacao: 3 } },
          { id: 'c', text: 'Bicicleta ou a pé', points: { pontuacao: 5 } }
        ]
      },
      {
        id: 6,
        question: 'Você costuma reparar itens quebrados em vez de substituí-los?',
        type: 'single',
        options: [
          { id: 'a', text: 'Quase nunca', points: { pontuacao: 1 } },
          { id: 'b', text: 'Às vezes', points: { pontuacao: 3 } },
          { id: 'c', text: 'Sempre que possível', points: { pontuacao: 5 } }
        ]
      }
    ]
  },
  {
    id: 'compostagem-conhecimento',
    title: 'Teste seus conhecimentos sobre compostagem',
    description: 'Veja o quanto você sabe sobre transformar lixo em ouro para suas plantas',
    category: 'Compostagem',
    estimatedTime: 4,
    questions: [
      {
        id: 1,
        question: 'Qual é a proporção ideal de materiais "verdes" e "marroms" na compostagem?',
        type: 'single',
        options: [
          { id: 'a', text: '1:1', points: { correta: false } },
          { id: 'b', text: '2:1 (verdes para marroms)', points: { correta: false } },
          { id: 'c', text: '2:1 (marroms para verdes)', points: { correta: true } },
          { id: 'd', text: '3:1 (marroms para verdes)', points: { correta: true } }
        ]
      },
      {
        id: 2,
        question: 'Qual destes itens NÃO deve ser colocado na composteira?',
        type: 'single',
        options: [
          { id: 'a', text: 'Cascas de frutas', points: { correta: false } },
          { id: 'b', text: 'Folhas secas', points: { correta: false } },
          { id: 'c', text: 'Carnes e ossos', points: { correta: true } },
          { id: 'd', text: 'Borra de café', points: { correta: false } }
        ]
      },
      {
        id: 3,
        question: 'Quanto tempo geralmente leva para o composto ficar pronto?',
        type: 'single',
        options: [
          { id: 'a', text: '1-2 semanas', points: { correta: false } },
          { id: 'b', text: '1-2 meses', points: { correta: false } },
          { id: 'c', text: '3-6 meses', points: { correta: true } },
          { id: 'd', text: '1 ano', points: { correta: false } }
        ]
      },
      {
        id: 4,
        question: 'Qual é o principal benefício da compostagem?',
        type: 'single',
        options: [
          { id: 'a', text: 'Reduzir o lixo orgânico enviado aos aterros', points: { correta: true } },
          { id: 'b', text: 'Produzir energia', points: { correta: false } },
          { id: 'c', text: 'Criar habitat para minhocas', points: { correta: false } },
          { id: 'd', text: 'Eliminar totalmente o uso de fertilizantes', points: { correta: false } }
        ]
      }
    ]
  }
];

// Função para calcular resultados do quiz
export const calculateQuizResult = (quizId: string, answers: Record<number, string[]>) => {
  const quiz = quizzes.find(q => q.id === quizId);
  if (!quiz) return null;

  let totalPoints = 0;
  const categoryPoints: Record<string, Record<string, number>> = {};

  quiz.questions.forEach(question => {
    const userAnswerIds = answers[question.id] || [];
    question.options.forEach(option => {
      if (userAnswerIds.includes(option.id)) {
        // Para quizzes de pontuação
        if (option.points.pontuacao) {
          totalPoints += option.points.pontuacao;
        }
        
        // Para quizzes de categorização
        Object.entries(option.points).forEach(([key, value]) => {
          if (key !== 'pontuacao') {
            if (!categoryPoints[key]) categoryPoints[key] = {};
            if (typeof value === 'string') {
              if (!categoryPoints[key][value]) categoryPoints[key][value] = 0;
              categoryPoints[key][value] += 1;
            }
          }
        });
      }
    });
  });

  return {
    totalPoints,
    categoryPoints,
    maxPoints: quiz.questions.length * 7 // Assumindo 7 pontos máximos por pergunta
  };
};

// Função para obter todas as categorias de quizzes
export const getAllQuizCategories = () => {
  const categories = quizzes.map(quiz => quiz.category);
  return Array.from(new Set(categories));
};

// Função para obter quizzes por categoria
export const getQuizzesByCategory = (category: string) => {
  return quizzes.filter(quiz => quiz.category === category);
};