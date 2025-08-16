import { getQuizzesByCategory } from '@/lib/quizzes';
import QuizCard from '@/components/QuizCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function QuizCategoryPage({ params }: { params: { category: string } }) {
  // Convert URL parameter to proper category name
  const categoryMapping: Record<string, string> = {
    'jardinagem': 'Jardinagem',
    'sustentabilidade': 'Sustentabilidade',
    'compostagem': 'Compostagem'
  };
  
  const categoryName = categoryMapping[params.category] || params.category;
  const quizzes = getQuizzesByCategory(categoryName);
  
  if (quizzes.length === 0) {
    notFound();
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link 
          href="/quizzes" 
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar para todos os quizzes
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-800">{categoryName}</h1>
        <p className="text-gray-600 mt-2">
          {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : 'z'} disponível{quizzes.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}