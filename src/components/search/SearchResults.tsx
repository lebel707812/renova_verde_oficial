'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  imageUrl?: string;
  readTime: number;
  createdAt: string;
}

interface SearchResultsProps {
  query: string;
  category?: string;
}

interface SearchResponse {
  articles: Article[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  query: string;
  category: string;
}

export default function SearchResults({ query, category }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    searchArticles(1);
  }, [query, category]);

  const searchArticles = async (page: number) => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (category) params.append('category', category);
      params.append('page', page.toString());
      params.append('limit', '6');

      const response = await fetch(`/api/search?${params}`);
      const data = await response.json();

      if (response.ok) {
        setResults(data);
        setCurrentPage(page);
      } else {
        setError(data.error || 'Erro ao buscar artigos');
      }
    } catch {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    searchArticles(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg inline-block">
          {error}
        </div>
      </div>
    );
  }

  if (!results || results.articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5.657-2.343m0-8.486A7.962 7.962 0 0112 4a7.962 7.962 0 015.657 2.343m0 8.486a4 4 0 01-5.656 0" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum resultado encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">
            Tente buscar com palavras-chave diferentes ou explore nossas categorias.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-900 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Results Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Resultados da busca
        </h1>
        <p className="text-gray-600">
          {results.pagination.totalCount} {results.pagination.totalCount === 1 ? 'resultado encontrado' : 'resultados encontrados'}
          {query && (
            <span> para "<span className="font-medium text-primary-900">{query}</span>"</span>
          )}
          {category && (
            <span> na categoria <span className="font-medium text-primary-900">{category}</span></span>
          )}
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {results.articles.map((article) => (
          <article key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            {article.imageUrl && (
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  {article.category}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {article.readTime} min
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                <Link 
                  href={`/artigos/${article.slug}`}
                  className="hover:text-primary-900 transition-colors duration-200"
                >
                  {article.title}
                </Link>
              </h2>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <time className="text-sm text-gray-500">
                  {formatDate(new Date(article.createdAt))}
                </time>
                <Link
                  href={`/artigos/${article.slug}`}
                  className="inline-flex items-center text-sm font-medium text-primary-900 hover:text-primary-800 transition-colors duration-200"
                >
                  Ler artigo
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {results.pagination.totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!results.pagination.hasPreviousPage}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Anterior
          </button>

          <div className="flex space-x-1">
            {Array.from({ length: results.pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  page === currentPage
                    ? 'text-white bg-primary-900 border border-primary-900'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!results.pagination.hasNextPage}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}

