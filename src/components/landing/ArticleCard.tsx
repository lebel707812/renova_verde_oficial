'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArticleCardProps } from '@/types';

export default function ArticleCard({ article, className = '', style }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Jardinagem': 'bg-green-100 text-green-800 border-green-200',
      'Energia Renovável': 'bg-blue-100 text-blue-800 border-blue-200',
      'Reforma Ecológica': 'bg-amber-100 text-amber-800 border-amber-200',
      'Compostagem': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Economia de Água': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Sustentabilidade': 'bg-primary-100 text-primary-800 border-primary-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <article 
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 ${className}`}
      style={style}
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
        </div>

        {/* Read Time Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black/70 text-white backdrop-blur-sm">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {article.readTime} min
          </span>
        </div>

        {/* Likes Badge */}
        <div className="absolute bottom-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black/70 text-white backdrop-blur-sm">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {article.likes || 0}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(article.publishedAt ?? article.createdAt)}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-900 transition-colors duration-300">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Read More Link */}
        <Link
          href={`/artigos/${article.slug}`}
          className="inline-flex items-center text-primary-900 font-semibold text-sm hover:text-primary-700 transition-colors duration-300 group/link"
        >
          <span>Ler artigo completo</span>
          <svg 
            className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Bottom Border Animation */}
      <div className="h-1 bg-gradient-to-r from-primary-500 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </article>
  );
}

