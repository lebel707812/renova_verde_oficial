'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { Article } from '@/types';

interface Comment {
  id: string;
  name: string;
  content: string;
  publishedAt: string;
  replies?: Comment[];
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [newArticles, setNewArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ name: '', content: '' });
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/articles/${params.slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            router.push('/404');
            return;
          }
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setArticle(data);
        
        // Buscar artigos relacionados e novos artigos
        const relatedResponse = await fetch(`/api/articles/related?slug=${params.slug}`);
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          setRelatedArticles(relatedData.relatedArticles || []);
          setNewArticles(relatedData.newArticles || []);
        }
        
        // Comentários mockados (substitua por chamada à API se necessário)
        setComments([
          {
            id: '1',
            name: 'Carlos Mendes',
            content: 'Excelente artigo! Já comecei a montar minha horta vertical seguindo essas dicas.',
            publishedAt: '2024-01-16',
            replies: [
              {
                id: '2',
                name: 'Maria Silva',
                content: 'Que bom que gostou, Carlos! Se tiver dúvidas, pode perguntar.',
                publishedAt: '2024-01-16'
              }
            ]
          },
          {
            id: '3',
            name: 'Ana Beatriz',
            content: 'Muito útil! Vou tentar fazer na minha varanda.',
            publishedAt: '2024-01-17'
          }
        ]);
        
      } catch (err) {
        console.error("Erro ao carregar artigo:", err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };
    
  const [likeCount, setLikeCount] = useState(article?.likes || 0);

  useEffect(() => {
    if (article) {
      setLikeCount(article.likes || 0);
    }
  }, [article]);

  const handleLike = async () => {
    if (!article) return;

    try {
      const response = await fetch(`/api/articles/${article.slug}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.likes);
        setLiked(true); // Assume que o usuário só pode dar like uma vez por sessão ou que o backend lida com isso
      } else {
        console.error('Failed to update likes');
      }
    } catch (error) {
      console.error('Error sending like request:', error);
    }
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      }).catch(err => console.error('Erro ao compartilhar:', err));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copiado para a área de transferência!'))
        .catch(err => console.error('Erro ao copiar link:', err));
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.name.trim() && newComment.content.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        name: newComment.name,
        content: newComment.content,
        publishedAt: new Date().toISOString().split('T')[0]
      };
      setComments([...comments, comment]);
      setNewComment({ name: '', content: '' });
    }
  };

  const handleReplySubmit = (commentId: string) => {
    if (replyContent.trim()) {
      const reply: Comment = {
        id: Date.now().toString(),
        name: 'Você',
        content: replyContent,
        publishedAt: new Date().toISOString().split('T')[0]
      };
      
      setComments(prev => prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply]
          };
        }
        return comment;
      }));
      
      setReplyContent('');
      setReplyingTo(null);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Jardinagem': 'bg-green-100 text-green-800 border-green-200',
      'Energia Renovável': 'bg-blue-100 text-blue-800 border-blue-200',
      'Reforma Ecológica': 'bg-amber-100 text-amber-800 border-amber-200',
      'Compostagem': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Economia de Água': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Sustentabilidade': 'bg-primary-100 text-primary-800 border-primary-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar artigo</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link 
              href="/" 
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!article) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Artigo não encontrado</h1>
            <Link 
              href="/" 
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Imagem do Artigo */}
                {article.imageUrl && (
                  <div className="relative h-64 sm:h-80 lg:h-96">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                )}

                {/* Conteúdo do Artigo */}
                <div className="p-6 sm:p-8">
                  {/* Meta informações */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(article.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {article.readTime} min de leitura
                      </div>
                    </div>
                    
                    {/* Botões de Interação */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleLike}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                          liked 
                            ? 'bg-red-100 text-red-600 border border-red-200' 
                            : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-600'
                        }`}
                      >
                        <svg className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-sm font-medium">{likeCount}</span>
                      </button>
                      
                      <button
                        onClick={handleShare}
                        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        <span className="text-sm font-medium">Compartilhar</span>
                      </button>
                      
                      <button
                        onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 border border-gray-200 hover:bg-green-50 hover:text-green-600 transition-all duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-sm font-medium">Comentar</span>
                      </button>
                    </div>
                  </div>

                  {/* Título */}
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {article.title}
                  </h1>

                  {/* Autor */}
                  <div className="flex items-center mb-8 pb-6 border-b border-gray-200">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <span className="text-green-600 font-semibold text-lg">
                        {article.author?.name?.charAt(0) || 'A'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{article.author?.name || 'Autor Desconhecido'}</p>
                      <p className="text-sm text-gray-500">Especialista em Sustentabilidade</p>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>
              </article>

              {/* Seção de Comentários */}
              <div id="comments" className="mt-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Comentários ({comments.length})
                </h3>

                {/* Formulário de Novo Comentário */}
                <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-gray-50 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Deixe seu comentário</h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={newComment.name}
                      onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                    <textarea
                      placeholder="Escreva seu comentário..."
                      value={newComment.content}
                      onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={4}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Enviar Comentário
                  </button>
                </form>

                {/* Lista de Comentários */}
                <div className="space-y-6">
                  {comments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900">{comment.name}</p>
                        <p className="text-sm text-gray-500">{new Date(comment.publishedAt).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <p className="text-gray-700 mb-4">{comment.content}</p>
                      <div className="flex space-x-4 text-sm">
                        <button
                          onClick={() => setReplyingTo(comment.id)}
                          className="text-green-600 hover:underline"
                        >
                          Responder
                        </button>
                      </div>

                      {/* Formulário de Resposta */}
                      {replyingTo === comment.id && (
                        <form onSubmit={(e) => { e.preventDefault(); handleReplySubmit(comment.id); }} className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                          <textarea
                            placeholder="Escreva sua resposta..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            rows={2}
                            required
                          />
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              type="button"
                              onClick={() => setReplyingTo(null)}
                              className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Responder
                            </button>
                          </div>
                        </form>
                      )}

                      {/* Respostas */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 space-y-4 border-l-2 border-gray-200 pl-4">
                          {comment.replies.map(reply => (
                            <div key={reply.id} className="bg-white p-4 rounded-xl shadow-sm">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold text-gray-900">{reply.name}</p>
                                <p className="text-sm text-gray-500">{new Date(reply.publishedAt).toLocaleDateString('pt-BR')}</p>
                              </div>
                              <p className="text-gray-700">{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                {/* Artigos Relacionados */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">Artigos Relacionados</h3>
                <div className="space-y-4 mb-8">
                  {relatedArticles.length > 0 ? (
                    relatedArticles.map((relatedArticle) => (
                      <Link 
                        key={relatedArticle.id} 
                        href={`/artigos/${relatedArticle.slug}`} 
                        className="flex items-center space-x-4 group"
                      >
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          {relatedArticle.imageUrl ? (
                            <Image
                              src={relatedArticle.imageUrl}
                              alt={relatedArticle.title}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400 text-xs">Sem imagem</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-green-600 transition-colors">
                            {relatedArticle.category}
                          </p>
                          <h4 className="text-base font-semibold text-gray-800 group-hover:text-green-700 transition-colors leading-tight">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">
                            {relatedArticle.readTime} min de leitura
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">Nenhum artigo relacionado encontrado.</p>
                  )}
                </div>

                {/* Novos Artigos */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">Novos Artigos</h3>
                <div className="space-y-4">
                  {newArticles.length > 0 ? (
                    newArticles.map((newArticle) => (
                      <Link 
                        key={newArticle.id} 
                        href={`/artigos/${newArticle.slug}`} 
                        className="flex items-center space-x-4 group"
                      >
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          {newArticle.imageUrl ? (
                            <Image
                              src={newArticle.imageUrl}
                              alt={newArticle.title}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400 text-xs">Sem imagem</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-green-600 transition-colors">
                            {newArticle.category}
                          </p>
                          <h4 className="text-base font-semibold text-gray-800 group-hover:text-green-700 transition-colors leading-tight">
                            {newArticle.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(newArticle.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">Nenhum artigo novo encontrado.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}