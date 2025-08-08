'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import SEOEnhanced from '@/components/SEOEnhanced';
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
        
        // Buscar artigos relacionados
        const relatedResponse = await fetch(`/api/articles/related?category=${encodeURIComponent(data.category)}&exclude=${data.id}`);
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          setRelatedArticles(relatedData.relatedArticles.slice(0, 3));
        }

        // Buscar artigos mais recentes
        const newResponse = await fetch('/api/articles?limit=3&published=true');
        if (newResponse.ok) {
          const newData = await newResponse.json();
          setNewArticles(newData.articles.filter((a: Article) => a.id !== data.id).slice(0, 3));
        }

        // Buscar comentários
        const commentsResponse = await fetch(`/api/articles/${params.slug}/comments`);
        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json();
          setComments(commentsData);
        }
        
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchArticle();
    }
  }, [params.slug, router]);

  const handleLike = async () => {
    if (!article) return;
    
    try {
      const response = await fetch(`/api/articles/${article.slug}/like`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.likes);
        setLiked(true);
      }
    } catch (error) {
      console.error('Error liking article:', error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent, parentId?: number) => {
    e.preventDefault();
    if (!article || !newComment.name.trim() || !newComment.content.trim()) return;

    setCommentLoading(true);
    try {
      const response = await fetch(`/api/articles/${article.slug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newComment.name.trim(),
          content: newComment.content.trim(),
          parentId: parentId || null,
        }),
      });

      if (response.ok) {
        const comment = await response.json();
        
        if (parentId) {
          // Adicionar resposta ao comentário pai
          setComments(prev => prev.map(c => 
            c.id === parentId 
              ? { ...c, replies: [...(c.replies || []), comment] }
              : c
          ));
        } else {
          // Adicionar novo comentário
          setComments(prev => [comment, ...prev]);
        }
        
        setNewComment({ name: '', content: '' });
        setReplyingTo(null);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setCommentLoading(false);
    }
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
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Erro ao carregar artigo</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link href="/" className="text-green-600 hover:text-green-800">
              Voltar ao início
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
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Artigo não encontrado</h1>
            <Link href="/" className="text-green-600 hover:text-green-800">
              Voltar ao início
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <>
      <SEOEnhanced
        title={article.title}
        description={article.meta_description || article.excerpt}
        keywords={article.keywords}
        image={article.imageUrl}
        url={`/artigos/${article.slug}`}
        type="article"
        publishedTime={article.createdAt}
        modifiedTime={article.updatedAt}
        author={article.authorName || 'Renova Verde'}
        category={article.category}
      />
      
      <MainLayout>
        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-green-600">Início</Link></li>
              <li>/</li>
              <li><Link href="/artigos" className="hover:text-green-600">Artigos</Link></li>
              <li>/</li>
              <li className="text-gray-900">{article.title}</li>
            </ol>
          </nav>

          {/* Header do artigo */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <div className="flex items-center space-x-4">
                <span>Por {article.authorName || 'Renova Verde'}</span>
                <span>•</span>
                <time dateTime={article.createdAt}>
                  {new Date(article.createdAt).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </time>
                <span>•</span>
                <span>{article.readTime} min de leitura</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLike}
                  disabled={liked}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                    liked 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                  }`}
                >
                  <span>❤️</span>
                  <span>{likeCount}</span>
                </button>
              </div>
            </div>

            {article.imageUrl && (
              <div className="mb-8">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                  priority
                />
              </div>
            )}
          </header>

          {/* Conteúdo do artigo */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags/Keywords */}
          {article.keywords && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Palavras-chave:</h3>
              <p className="text-sm text-gray-600">{article.keywords}</p>
            </div>
          )}

          {/* Seção de compartilhamento */}
          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Compartilhar:</span>
                <div className="flex space-x-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-700 text-white text-sm rounded hover:bg-blue-800"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Comentários */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Comentários ({comments.length})
            </h3>

            {/* Formulário de novo comentário */}
            <form onSubmit={(e) => handleCommentSubmit(e)} className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Deixe seu comentário</h4>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newComment.name}
                    onChange={(e) => setNewComment(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Comentário
                  </label>
                  <textarea
                    id="content"
                    rows={4}
                    value={newComment.content}
                    onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={commentLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {commentLoading ? 'Enviando...' : 'Enviar Comentário'}
                </button>
              </div>
            </form>

            {/* Lista de comentários */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-l-4 border-green-200 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{comment.name}</h5>
                    <time className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString('pt-BR')}
                    </time>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    Responder
                  </button>

                  {/* Formulário de resposta */}
                  {replyingTo === comment.id && (
                    <form onSubmit={(e) => handleCommentSubmit(e, comment.id)} className="mt-4 p-4 bg-gray-50 rounded">
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Seu nome"
                          value={newComment.name}
                          onChange={(e) => setNewComment(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                        <textarea
                          rows={3}
                          placeholder="Sua resposta"
                          value={newComment.content}
                          onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                        <div className="flex space-x-2">
                          <button
                            type="submit"
                            disabled={commentLoading}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                          >
                            {commentLoading ? 'Enviando...' : 'Responder'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setReplyingTo(null)}
                            className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* Respostas */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 ml-6 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="border-l-2 border-gray-200 pl-4">
                          <div className="flex items-center justify-between mb-1">
                            <h6 className="font-medium text-gray-800">{reply.name}</h6>
                            <time className="text-xs text-gray-500">
                              {new Date(reply.createdAt).toLocaleDateString('pt-BR')}
                            </time>
                          </div>
                          <p className="text-gray-600 text-sm">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Sidebar com artigos relacionados */}
        <aside className="max-w-4xl mx-auto px-4 pb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Artigos relacionados */}
            {relatedArticles.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Artigos Relacionados</h3>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      href={`/artigos/${relatedArticle.slug}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>{relatedArticle.category}</span>
                        <span>{relatedArticle.readTime} min</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Artigos mais recentes */}
            {newArticles.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Artigos Recentes</h3>
                <div className="space-y-4">
                  {newArticles.map((newArticle) => (
                    <Link
                      key={newArticle.id}
                      href={`/artigos/${newArticle.slug}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {newArticle.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {newArticle.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>{newArticle.category}</span>
                        <span>{newArticle.readTime} min</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </MainLayout>
    </>
  );
}

