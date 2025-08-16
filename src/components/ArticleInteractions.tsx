'use client';

import { useState, useEffect } from 'react';

interface Comment {
  id: number;
  name: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

interface ArticleInteractionsProps {
  articleSlug: string;
  initialLikes: number;
}

export default function ArticleInteractions({
  articleSlug,
  initialLikes,
}: ArticleInteractionsProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const handleLike = async () => {
    if (liked) return; // Evita múltiplos likes

    try {
      const response = await fetch(`/api/articles/${articleSlug}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.likes);
        setLiked(true);
        
        // Salvar estado do like no localStorage para persistir
        if (typeof window !== 'undefined') {
          localStorage.setItem(`liked_${articleSlug}`, 'true');
        }
      } else {
        console.error('Failed to like article:', response.statusText);
      }
    } catch (error) {
      console.error('Error liking article:', error);
    }
  };

  // Verificar se o artigo já foi curtido ao carregar o componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const likedStatus = localStorage.getItem(`liked_${articleSlug}`);
      if (likedStatus === 'true') {
        setLiked(true);
      }
    }
  }, [articleSlug]);

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
        liked
          ? 'bg-red-100 text-red-600'
          : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
      }`}
      aria-label={liked ? "Você curtiu este artigo" : "Curtir este artigo"}
    >
      <span>❤️</span>
      <span>{likeCount}</span>
    </button>
  );
}

// Componente separado para a seção de comentários
export function CommentsSection({
  articleSlug,
  initialComments,
}: {
  articleSlug: string;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState({ name: '', content: '' });
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleCommentSubmit = async (e: React.FormEvent, parentId?: number) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.content.trim()) return;

    setCommentLoading(true);
    try {
      const response = await fetch(`/api/articles/${articleSlug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newComment.name,
          content: newComment.content,
          parentId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
        setNewComment({ name: '', content: '' });
        setReplyingTo(null);
      } else {
        console.error('Failed to add comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setCommentLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Comentários ({comments.length})
      </h3>

      {/* Formulário de novo comentário */}
      <form onSubmit={(e) => handleCommentSubmit(e)} className="mb-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={newComment.name}
              onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Comentário
            </label>
            <textarea
              id="content"
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={commentLoading}
            className="px-4 py-2 bg-primary-900 text-white rounded-md hover:bg-primary-800 disabled:opacity-50"
          >
            {commentLoading ? 'Enviando...' : 'Comentar'}
          </button>
        </div>
      </form>

      {/* Lista de comentários */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-start">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <h4 className="font-medium text-gray-900">{comment.name}</h4>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="text-gray-700 mb-3">{comment.content}</p>
                <button
                  onClick={() => setReplyingTo(comment.id)}
                  className="text-sm text-primary-900 hover:text-primary-800"
                >
                  Responder
                </button>

                {/* Formulário de resposta */}
                {replyingTo === comment.id && (
                  <form
                    onSubmit={(e) => handleCommentSubmit(e, comment.id)}
                    className="mt-4 ml-6 bg-gray-50 p-4 rounded-md"
                  >
                    <div className="space-y-4">
                      <div>
                        <label htmlFor={`reply-name-${comment.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Nome
                        </label>
                        <input
                          type="text"
                          id={`reply-name-${comment.id}`}
                          value={newComment.name}
                          onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor={`reply-content-${comment.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Resposta
                        </label>
                        <textarea
                          id={`reply-content-${comment.id}`}
                          value={newComment.content}
                          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="submit"
                          disabled={commentLoading}
                          className="px-4 py-2 bg-primary-900 text-white rounded-md hover:bg-primary-800 disabled:opacity-50"
                        >
                          {commentLoading ? 'Enviando...' : 'Responder'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setReplyingTo(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Respostas */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4 ml-6">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 p-4 rounded-md">
                        <div className="flex items-start">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-2" />
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <h4 className="font-medium text-gray-900 text-sm">{reply.name}</h4>
                              <span className="mx-2 text-gray-400">•</span>
                              <span className="text-xs text-gray-500">{formatDate(reply.createdAt)}</span>
                            </div>
                            <p className="text-gray-700 text-sm">{reply.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}