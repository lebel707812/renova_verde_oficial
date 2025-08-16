import Link from 'next/link';
import { Quiz } from '@/types/quiz';

interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
            {quiz.category}
          </span>
          <span className="text-sm text-gray-500">{quiz.estimatedTime} min</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
        <p className="text-gray-600 mb-4">{quiz.description}</p>
        
        <Link 
          href={`/quizzes/${quiz.id}`}
          className="inline-block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Começar Quiz
        </Link>
      </div>
    </div>
  );
}