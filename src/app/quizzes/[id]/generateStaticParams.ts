import { quizzes } from '@/lib/quizzes';

export async function generateStaticParams() {
  return quizzes.map((quiz) => ({
    id: quiz.id,
  }));
}