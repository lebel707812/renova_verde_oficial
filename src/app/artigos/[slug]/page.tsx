
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { Article } from '@/types';

interface Comment {
  id: number;
  name: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [newArticles, setNewArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ name: '', content: '' });
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const [commentLoading, setCommentLoading] = useState(false);
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
        setLikeCount(data.likes || 0);
        
        // Buscar artigos relacionados e novos artigos
        const relatedResponse = await fetch(`/api/articles/related?slug=${params.slug}`);
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          setRelatedArticles(relatedData.relatedArticles || []);
          setNewArticles(relatedData.newArticles || []);
        }
        
        // Buscar comentários do banco de dados
        const commentsResponse = await fetch(`/api/articles/${params.slug}/comments`);
        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json();
          setComments(commentsData);
        }
        
      } catch (err) {
        console.error("Erro ao carregar artigo:", err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [params.slug, router]);

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
        setLiked(true);
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

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.content.trim()) return;

    setCommentLoading(true);
    try {
      const response = await fetch(`/api/articles/${params.slug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newComment.name,
          content: newComment.content
        })
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments([newCommentData, ...comments]);
        setNewComment({ name: '', content: '' });
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Erro ao enviar comentário');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Erro ao enviar comentário');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleReplySubmit = async (commentId: number) => {
    if (!replyContent.trim()) return;

    setCommentLoading(true);
    try {
      const response = await fetch(`/api/articles/${params.slug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Você',
          content: replyContent,
          parentId: commentId
        })
      });

      if (response.ok) {
        const replyData = await response.json();
        
        // Atualizar a lista de comentários adicionando a resposta
        setComments(prev => prev.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), replyData]
            };
          }
          return comment;
        }));
        
        setReplyContent('');
        setReplyingTo(null);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Erro ao enviar resposta');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
      alert('Erro ao enviar resposta');
    } finally {
      setCommentLoading(false);
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
                        {(article.authorName || 'Renova Verde').charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{article.authorName || 'Renova Verde'}</p>
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
                      disabled={commentLoading}
                    />
                    <textarea
                      placeholder="Escreva seu comentário..."
                      value={newComment.content}
                      onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={4}
                      required
                      disabled={commentLoading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={commentLoading}
                    className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {commentLoading ? 'Enviando...' : 'Enviar Comentário'}
                  </button>
                </form>

                {/* Lista de Comentários */}
                <div className="space-y-6">
                  {comments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 font-semibold">
                              {comment.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{comment.name}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(comment.createdAt).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{comment.content}</p>
                      
                      <button
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        Responder
                      </button>

                      {/* Formulário de Resposta */}
                      {replyingTo === comment.id && (
                        <div className="mt-4 p-4 bg-white rounded-lg border">
                          <textarea
                            placeholder="Escreva sua resposta..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            rows={3}
                            disabled={commentLoading}
                          />
                          <div className="flex space-x-2 mt-3">
                            <button
                              onClick={() => handleReplySubmit(comment.id)}
                              disabled={commentLoading || !replyContent.trim()}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {commentLoading ? 'Enviando...' : 'Responder'}
                            </button>
                            <button
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyContent('');
                              }}
                              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-400 transition-colors"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Respostas */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 pl-6 border-l-2 border-green-200 space-y-4">
                          {comment.replies.map(reply => (
                            <div key={reply.id} className="bg-white p-4 rounded-lg">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-blue-600 font-semibold text-sm">
                                    {reply.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900 text-sm">{reply.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(reply.createdAt).toLocaleDateString('pt-BR')}
                                  </p>
                                </div>
                              </div>
                              <p className="text-gray-700 text-sm">{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {comments.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Índice do Artigo */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    Neste Artigo
                  </h3>
                  <nav className="space-y-2">
                    <a href="#introducao" className="block text-sm text-gray-600 hover:text-green-600 transition-colors py-1 border-l-2 border-transparent hover:border-green-600 pl-3">
                      Introdução
                    </a>
                    <a href="#beneficios" className="block text-sm text-gray-600 hover:text-green-600 transition-colors py-1 border-l-2 border-transparent hover:border-green-600 pl-3">
                      Principais Benefícios
                    </a>
                    <a href="#como-fazer" className="block text-sm text-gray-600 hover:text-green-600 transition-colors py-1 border-l-2 border-transparent hover:border-green-600 pl-3">
                      Como Implementar
                    </a>
                    <a href="#dicas" className="block text-sm text-gray-600 hover:text-green-600 transition-colors py-1 border-l-2 border-transparent hover:border-green-600 pl-3">
                      Dicas Práticas
                    </a>
                    <a href="#conclusao" className="block text-sm text-gray-600 hover:text-green-600 transition-colors py-1 border-l-2 border-transparent hover:border-green-600 pl-3">
                      Conclusão
                    </a>
                  </nav>
                </div>

                {/* Estatísticas do Artigo */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Estatísticas
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Curtidas</span>
                      <span className="text-sm font-semibold text-green-600">{likeCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Comentários</span>
                      <span className="text-sm font-semibold text-blue-600">{comments.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tempo de leitura</span>
                      <span className="text-sm font-semibold text-purple-600">{article.readTime} min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Categoria</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Artigos Relacionados */}
                {relatedArticles.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Artigos Relacionados
                    </h3>
                    <div className="space-y-4">
                      {relatedArticles.map((relatedArticle, index) => (
                        <Link
                          key={relatedArticle.id}
                          href={`/artigos/${relatedArticle.slug}`}
                          className="block group transform hover:scale-105 transition-all duration-200"
                        >
                          <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50">
                            <div className="flex-shrink-0 relative">
                              {relatedArticle.imageUrl ? (
                                <Image
                                  src={relatedArticle.imageUrl}
                                  alt={relatedArticle.title}
                                  width={60}
                                  height={60}
                                  className="rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-15 h-15 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                                  <span className="text-white font-bold text-lg">{index + 1}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2 mb-1">
                                {relatedArticle.title}
                              </h4>
                              <div className="flex items-center text-xs text-gray-500 space-x-2">
                                <span>{relatedArticle.readTime} min</span>
                                <span>•</span>
                                <span className={`px-2 py-0.5 rounded-full ${getCategoryColor(relatedArticle.category)}`}>
                                  {relatedArticle.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Novos Artigos */}
                {newArticles.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Artigos Recentes
                    </h3>
                    <div className="space-y-4">
                      {newArticles.map((newArticle) => (
                        <Link
                          key={newArticle.id}
                          href={`/artigos/${newArticle.slug}`}
                          className="block group transform hover:scale-105 transition-all duration-200"
                        >
                          <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50">
                            <div className="flex-shrink-0 relative">
                              {newArticle.imageUrl ? (
                                <Image
                                  src={newArticle.imageUrl}
                                  alt={newArticle.title}
                                  width={60}
                                  height={60}
                                  className="rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-15 h-15 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">NEW</span>
                                </div>
                              )}
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">!</span>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                                {newArticle.title}
                              </h4>
                              <div className="flex items-center text-xs text-gray-500 space-x-2">
                                <span>{new Date(newArticle.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
                                <span>•</span>
                                <span>{newArticle.readTime} min</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ações Rápidas */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Ações Rápidas
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={handleLike}
                      className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-all duration-300 ${
                        liked 
                          ? 'bg-red-100 text-red-600 border border-red-200' 
                          : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-600'
                      }`}
                    >
                      <svg className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-sm font-medium">Curtir ({likeCount})</span>
                    </button>
                    
                    <button
                      onClick={handleShare}
                      className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-gray-100 text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      <span className="text-sm font-medium">Compartilhar</span>
                    </button>
                    
                    <button
                      onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
                      className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-gray-100 text-gray-600 border border-gray-200 hover:bg-green-50 hover:text-green-600 transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-sm font-medium">Comentar ({comments.length})</span>
                    </button>
                  </div>
                </div>

                {/* Newsletter CTA */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                  <div className="relative">
                    <div className="flex items-center mb-3">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <h3 className="text-lg font-bold">Receba mais dicas!</h3>
                    </div>
                    <p className="text-green-100 text-sm mb-4">
                      Cadastre-se na nossa newsletter e receba semanalmente as melhores dicas de sustentabilidade.
                    </p>
                    <Link
                      href="/#newsletter"
                      className="inline-block w-full text-center bg-white text-green-600 font-semibold py-3 px-4 rounded-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
                    >
                      Quero me cadastrar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}


