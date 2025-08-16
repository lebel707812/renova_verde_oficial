export interface QuizOption {
  id: string;
  text: string;
  points: {
    [key: string]: any;
    pontuacao?: number;
    correta?: boolean;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'single' | 'multiple';
  options: QuizOption[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedTime: number; // em minutos
  questions: QuizQuestion[];
}

export interface QuizResult {
  totalPoints: number;
  categoryPoints: Record<string, Record<string, number>>;
  maxPoints: number;
}