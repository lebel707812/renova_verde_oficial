'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Article } from '@/types';

// Mock data - substituir por API real
const POPULAR_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Como Criar uma Horta Vertical em Casa',
    slug: 'horta-vertical-casa',
    excerpt: 'Aprenda a criar uma horta vertical sustentável em espaços pequenos.',
    content: '',
    imageUrl: '/images/horta-vertical.jpg',
    category: 'Jardinagem',
    publishedAt: '2024-01-15',
    readTime: 8,
    author: {
      name: 'Maria Silva',
      avatar: '/images/author-maria.jpg'
    }
  },
  {
    id: '2',
    title: 'Energia Solar: Guia Completo para Iniciantes',
    slug: 'energia-solar-guia-completo',
    excerpt: 'Tudo que você precisa saber sobre energia solar residencial.',
    content: '',
    imageUrl: '/images/energia-solar.jpg',
    category: 'Energia Renovável',
    publishedAt: '2024-01-10',
    readTime: 12,
    author: {
      name: 'João Santos',
      avatar: '/images/author-joao.jpg'
    }
  },
  {
    id: '3',
    title: 'Compostagem Doméstica: Passo a Passo',
    slug: 'compostagem-domestica',
    excerpt: 'Transforme seus restos orgânicos em adubo natural.',
    content: '',
    imageUrl: '/images/compostagem.jpg',
    category: 'Compostagem',
    publishedAt: '2024-01-05',
    readTime: 6,
    author: {
      name: 'Ana Costa',
      avatar: '/images/author-ana.jpg'
    }
  },
  {
    id: '4',
    title: 'Captação de Água da Chuva',
    slug: 'captacao-agua-chuva',
    excerpt: 'Sistema simples para aproveitar a água da chuva.',
    content: '',
    imageUrl: '/images/captacao-agua.jpg',
    category: 'Economia de Água',
    publishedAt: '2024-01-01',
    readTime: 10,
    author: {
      name: 'Pedro Lima',
      avatar: '/images/author-pedro.jpg'
    }
  }
];

const SAMPLE_ARTICLE: Article = {
  id: '1',
  title: 'Como Criar uma Horta Vertical em Casa: Guia Completo para Iniciantes',
  slug: 'horta-vertical-casa',
  excerpt: 'Aprenda a criar uma horta vertical sustentável em espaços pequenos com este guia completo.',
  content: `
    <p>A horta vertical é uma excelente solução para quem deseja cultivar seus próprios alimentos, mas possui pouco espaço disponível. Esta técnica permite maximizar a produção em áreas reduzidas, sendo ideal para apartamentos, varandas e pequenos quintais.</p>

    <h2>Benefícios da Horta Vertical</h2>
    <p>Além de economizar espaço, a horta vertical oferece diversos benefícios:</p>
    <ul>
      <li>Melhor aproveitamento do espaço disponível</li>
      <li>Facilita a manutenção e colheita</li>
      <li>Reduz problemas com pragas do solo</li>
      <li>Melhora a drenagem das plantas</li>
      <li>Cria um ambiente mais organizado e bonito</li>
    </ul>

    <h2>Materiais Necessários</h2>
    <p>Para criar sua horta vertical, você precisará de:</p>
    <ul>
      <li>Estrutura de suporte (madeira, metal ou PVC)</li>
      <li>Vasos ou recipientes para plantio</li>
      <li>Substrato de qualidade</li>
      <li>Sistema de irrigação (opcional)</li>
      <li>Sementes ou mudas</li>
    </ul>

    <h2>Passo a Passo</h2>
    <h3>1. Escolha do Local</h3>
    <p>Selecione um local que receba pelo menos 4-6 horas de sol direto por dia. Certifique-se de que há acesso fácil para manutenção e irrigação.</p>

    <h3>2. Montagem da Estrutura</h3>
    <p>Monte a estrutura de suporte de acordo com o espaço disponível. Garanta que seja resistente o suficiente para suportar o peso dos vasos com terra úmida.</p>

    <h3>3. Preparação dos Recipientes</h3>
    <p>Faça furos de drenagem nos recipientes e adicione uma camada de drenagem no fundo antes de colocar o substrato.</p>

    <h3>4. Plantio</h3>
    <p>Plante as sementes ou mudas seguindo as instruções específicas de cada espécie. Considere o espaçamento adequado entre as plantas.</p>

    <h2>Plantas Ideais para Horta Vertical</h2>
    <p>Algumas plantas se adaptam melhor ao cultivo vertical:</p>
    <ul>
      <li>Ervas aromáticas (manjericão, salsa, cebolinha)</li>
      <li>Folhas verdes (alface, rúcula, espinafre)</li>
      <li>Tomates cereja</li>
      <li>Morangos</li>
      <li>Pimentas</li>
    </ul>

    <h2>Cuidados e Manutenção</h2>
    <p>Para manter sua horta vertical saudável:</p>
    <ul>
      <li>Regue regularmente, mas evite encharcamento</li>
      <li>Faça adubação orgânica mensalmente</li>
      <li>Monitore pragas e doenças</li>
      <li>Faça podas quando necessário</li>
      <li>Substitua plantas que não estão produzindo bem</li>
    </ul>

    <h2>Conclusão</h2>
    <p>A horta vertical é uma excelente forma de produzir alimentos frescos em casa, mesmo com pouco espaço. Com planejamento adequado e cuidados regulares, você pode ter uma fonte constante de vegetais e ervas frescas para sua família.</p>
  `,
  imageUrl: '/images/horta-vertical.jpg',
  category: 'Jardinagem',
  publishedAt: '2024-01-15',
  readTime: 8,
  author: {
    name: 'Maria Silva',
    avatar: '/images/author-maria.jpg'
  }
};

interface Comment {
  id: string;
  name: string;
  content: string;
  publishedAt: string;
  replies?: Comment[];
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [comments, setComments] = useState<Comment[]>([
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
  const [newComment, setNewComment] = useState({ name: '', content: '' });
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    // Simular carregamento do artigo
    setArticle(SAMPLE_ARTICLE);
  }, [params.slug]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
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

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Imagem do Artigo */}
              <div className="relative h-64 sm:h-80 lg:h-96">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Conteúdo do Artigo */}
              <div className="p-6 sm:p-8">
                {/* Meta informações */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
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
                      {article.author.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{article.author.name}</p>
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
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
                  >
                    Publicar Comentário
                  </button>
                </div>
              </form>

              {/* Lista de Comentários */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-semibold">
                          {comment.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h5 className="font-semibold text-gray-900">{comment.name}</h5>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.publishedAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{comment.content}</p>
                        <button
                          onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                          className="text-sm text-green-600 hover:text-green-700 font-medium"
                        >
                          Responder
                        </button>

                        {/* Formulário de Resposta */}
                        {replyingTo === comment.id && (
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <textarea
                              placeholder="Escreva sua resposta..."
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm"
                            />
                            <div className="flex space-x-2 mt-3">
                              <button
                                onClick={() => handleReplySubmit(comment.id)}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 text-sm font-medium"
                              >
                                Responder
                              </button>
                              <button
                                onClick={() => setReplyingTo(null)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-300 text-sm font-medium"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Respostas */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-4 ml-6 space-y-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-blue-600 font-semibold text-sm">
                                    {reply.name.charAt(0)}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h6 className="font-semibold text-gray-900 text-sm">{reply.name}</h6>
                                    <span className="text-xs text-gray-500">
                                      {new Date(reply.publishedAt).toLocaleDateString('pt-BR')}
                                    </span>
                                  </div>
                                  <p className="text-gray-700 text-sm">{reply.content}</p>
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
          </div>

          {/* Painel Lateral */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Artigos Populares */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Artigos Populares
                </h3>
                <div className="space-y-4">
                  {POPULAR_ARTICLES.map((popularArticle, index) => (
                    <Link
                      key={popularArticle.id}
                      href={`/blog/${popularArticle.slug}`}
                      className="block group"
                    >
                      <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <Image
                              src={popularArticle.imageUrl}
                              alt={popularArticle.title}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                            {popularArticle.title}
                          </h4>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getCategoryColor(popularArticle.category).includes('green') ? 'bg-green-400' : 
                              getCategoryColor(popularArticle.category).includes('blue') ? 'bg-blue-400' :
                              getCategoryColor(popularArticle.category).includes('amber') ? 'bg-amber-400' :
                              getCategoryColor(popularArticle.category).includes('emerald') ? 'bg-emerald-400' :
                              getCategoryColor(popularArticle.category).includes('cyan') ? 'bg-cyan-400' : 'bg-gray-400'}`}>
                            </span>
                            {popularArticle.readTime} min
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-gray-400 group-hover:text-green-600 transition-colors duration-300">
                          <span className="text-lg font-bold">#{index + 1}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Espaço para Anúncios */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-dashed border-green-200">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Espaço Publicitário</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Anuncie aqui e alcance milhares de pessoas interessadas em sustentabilidade!
                  </p>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 text-sm font-medium">
                    Saiba Mais
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

