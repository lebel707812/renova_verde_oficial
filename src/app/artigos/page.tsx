
'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ArticleCard from '@/components/landing/ArticleCard';
import { Article } from '@/types';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Removendo o limite para buscar todos os artigos publicados
        const response = await fetch('/api/articles?published=true&limit=1000'); // Um limite alto para garantir que todos sejam buscados
        if (!response.ok) {
          throw new Error('Erro ao carregar artigos');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Um erro desconhecido ocorreu');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center text-red-600">
          <p>Erro: {error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Todos os Artigos
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          {articles.length === 0 && (
            <p className="text-center text-gray-600 mt-8">
              Nenhum artigo encontrado no momento.
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}


