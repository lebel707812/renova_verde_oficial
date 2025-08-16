import QuizCard from '@/components/QuizCard';
import { quizzes } from '@/lib/quizzes';
import { SITE_CONFIG } from '@/lib/constants';
import SEOEnhanced from '@/components/SEOEnhanced';

export default function QuizzesPage() {
  // Group quizzes by category
  const quizzesByCategory = quizzes.reduce((acc, quiz) => {
    if (!acc[quiz.category]) {
      acc[quiz.category] = [];
    }
    acc[quiz.category].push(quiz);
    return acc;
  }, {} as Record<string, typeof quizzes>);

  return (
    <>
      <SEOEnhanced
        title="Quizzes Interativos - Teste seus conhecimentos"
        description="Descubra que tipo de jardim é ideal para você, veja seu nível de sustentabilidade e teste seus conhecimentos sobre compostagem com nossos quizzes interativos."
        keywords={['quizzes', 'interativo', 'jardinagem', 'sustentabilidade', 'compostagem', 'teste']}
        url="/quizzes"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quizzes Interativos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Teste seus conhecimentos, descubra novas ideias e encontre soluções personalizadas 
            para sua jornada sustentável com nossos quizzes interativos.
          </p>
        </div>

        {Object.entries(quizzesByCategory).map(([category, categoryQuizzes]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          </div>
        ))}

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Mais Quizzes em Breve!</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Estamos constantemente desenvolvendo novos quizzes para ajudar você a aprender 
            mais sobre sustentabilidade, jardinagem e reformas ecológicas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={`mailto:${SITE_CONFIG.email}?subject=Sugestão de Quiz`} 
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Sugira um Quiz
            </a>
            <a 
              href="/contato" 
              className="px-6 py-3 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
            >
              Entre em Contato
            </a>
          </div>
        </div>
      </div>
    </>
  );
}