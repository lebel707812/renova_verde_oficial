import { quizzes } from '@/lib/quizzes';
import QuizComponent from '@/components/QuizComponent';
import { notFound } from 'next/navigation';
import SEOEnhanced from '@/components/SEOEnhanced';
import { generateStaticParams } from './generateStaticParams';
import MainLayout from '@/components/layout/MainLayout';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const quiz = quizzes.find(q => q.id === params.id);
  
  if (!quiz) {
    return {
      title: 'Quiz não encontrado',
    };
  }

  return {
    title: `${quiz.title} - Quiz Interativo`,
    description: quiz.description,
  };
}

export default function QuizPage({ params }: { params: { id: string } }) {
  const quiz = quizzes.find(q => q.id === params.id);
  
  if (!quiz) {
    notFound();
  }

  return (
    <MainLayout>
      <SEOEnhanced
        title={`${quiz?.title} - Quiz Interativo`}
        description={quiz?.description}
        url={`/quizzes/${params.id}`}
        type="website"
      />
      <QuizComponent quizId={params.id} />
    </MainLayout>
  );
}

export { generateStaticParams };