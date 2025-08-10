
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
  initialComments: Comment[];
}

export default function ArticleInteractions({
  articleSlug,
  initialLikes,
  initialComments,
}: ArticleInteractionsProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState({ name: '', content: '' });
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    setLikeCount(initialLikes);
    setComments(initialComments);
  }, [initialLikes, initialComments]);

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
      } else {
        console.error('Failed to like article:', response.statusText);
      }
    } catch (error) {
      console.error('Error liking article:', error);
    }
  };

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
          name: newComment.name.trim(),
          content: newComment.content.trim(),
          parentId: parentId || null,
        }),
      });

      if (response.ok) {
        const comment = await response.json();

        if (parentId) {
          setComments((prev) =>
            prev.map((c) =>
              c.id === parentId
                ? { ...c, replies: [...(c.replies || []), comment] }
                : c
            )
          );
        } else {
          setComments((prev) => [comment, ...prev]);
        }

        setNewComment({ name: '', content: '' });
        setReplyingTo(null);
      } else {
        console.error('Failed to submit comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setCommentLoading(false);
    }
  };

  return (
    <>
      {/* Botão de Like */}
      <div className="flex items-center space-x-2 mb-8">
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
                onChange={(e) =>
                  setNewComment((prev) => ({ ...prev, name: e.target.value }))
                }
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
                onChange={(e) =>
                  setNewComment((prev) => ({ ...prev, content: e.target.value }))
                }
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
                <form
                  onSubmit={(e) => handleCommentSubmit(e, comment.id)}
                  className="mt-4 p-4 bg-gray-50 rounded"
                >
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={newComment.name}
                      onChange={(e) =>
                        setNewComment((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                    <textarea
                      rows={3}
                      placeholder="Sua resposta"
                      value={newComment.content}
                      onChange={(e) =>
                        setNewComment((prev) => ({ ...prev, content: e.target.value }))
                      }
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

              {/* Respostas aninhadas */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-6 mt-4 space-y-4">
                  {comment.replies.map((reply: any) => (
                    <div key={reply.id} className="border-l-2 border-gray-200 pl-3">
                      <h6 className="font-medium text-gray-800">{reply.name}</h6>
                      <p className="text-gray-600 text-sm">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}



