'use client';

import { FEATURED_ARTICLES } from '@/lib/constants';
import ArticleCard from './ArticleCard';

interface FeaturedArticlesProps {
  className?: string;
}

export default function FeaturedArticles({ className = '' }: FeaturedArticlesProps) {
  return (
    <section className={`py-16 lg:py-24 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Artigos em Destaque
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Conteúdo que
            <span className="text-primary-900 block sm:inline sm:ml-3">Transforma</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra as melhores práticas de sustentabilidade residencial através dos nossos 
            artigos mais populares, escritos por especialistas e testados na prática.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {FEATURED_ARTICLES.map((article, index) => (
            <ArticleCard 
              key={article.id} 
              article={article}
              className={`animate-fade-in-up`}
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'both'
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-gray-100 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Quer mais conteúdo como este?
                </h3>
                <p className="text-gray-600">
                  Explore nossa biblioteca completa com centenas de artigos sobre sustentabilidade.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 bg-primary-900 hover:bg-primary-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <span>Ver Todos os Artigos</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                
                <a
                  href="/categorias"
                  className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-all duration-300"
                >
                  <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>Por Categoria</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-100 rounded-full opacity-20 blur-3xl" />
      </div>
    </section>
  );
}

