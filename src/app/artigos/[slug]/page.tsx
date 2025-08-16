import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import SEOEnhanced from '@/components/SEOEnhanced';
import ArticleInteractions, { CommentsSection } from '@/components/ArticleInteractions';
import { Breadcrumbs, ShareButtons } from '@/components/ui/SocialShare';
import { Article, Comment } from '@/types';
import { supabaseAdmin } from '@/lib/supabase';
import { SITE_CONFIG } from '@/lib/constants';

// Função para buscar o artigo diretamente do Supabase
async function getArticle(slug: string): Promise<Article | null> {
  const supabase = supabaseAdmin;
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows found
        return null;
      }
      throw new Error(`Erro ao buscar artigo: ${error.message}`);
    }
    return data as Article;
  } catch (error) {
    console.error('Erro ao buscar artigo no Supabase:', error);
    return null;
  }
}

// Função para buscar artigos relacionados
async function getRelatedArticles(currentArticleId: number, category: string): Promise<Article[]> {
  const supabase = supabaseAdmin;
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, excerpt, slug, category, imageUrl, readTime, createdAt')
      .eq('isPublished', true)
      .eq('category', category)
      .neq('id', currentArticleId)
      .limit(3)
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching related articles:', error);
      return [];
    }

    return data as Article[];
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
}

// Função para buscar comentários do artigo
async function getComments(slug: string): Promise<Comment[]> {
  try {
    const response = await fetch(`${SITE_CONFIG.url}/api/articles/${slug}/comments`, {
      method: 'GET',
      cache: 'no-store'
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.comments || [];
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

// Função para gerar metadata dinâmica (SEO)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: 'Artigo não encontrado',
    };
  }

  const baseUrl = SITE_CONFIG.url;
  const fullUrl = `${baseUrl}/artigos/${article.slug}`;
  const imageUrl = article.imageUrl || `${baseUrl}/images/og-image.jpg`;

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.keywords ? article.keywords.split(',') : [],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt || article.createdAt,
      url: fullUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  // Converter ID para número se for string
  const articleId = typeof article.id === 'string' ? parseInt(article.id) : article.id;
  
  // Buscar artigos relacionados
  const relatedArticles = await getRelatedArticles(articleId, article.category);
  
  // Buscar comentários
  const comments = await getComments(params.slug);

  // Formatar datas
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <>
      <SEOEnhanced
        title={article.title}
        description={article.excerpt}
        keywords={article.keywords ? article.keywords.split(',') : []}
        image={article.imageUrl}
        url={`/artigos/${article.slug}`}
        type="article"
        publishedTime={article.createdAt}
        modifiedTime={article.updatedAt || article.createdAt}
        author={article.author?.name || SITE_CONFIG.author}
        category={article.category}
      />
      <MainLayout>
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={[
            { name: 'Artigos', href: '/artigos' },
            { name: article.category, href: `/categoria/${encodeURIComponent(article.category.toLowerCase().replace(/\s+/g, '-'))}` },
            { name: article.title, href: `/artigos/${article.slug}` }
          ]} />

          {/* Cabeçalho do artigo */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full font-medium">
                {article.category}
              </span>
              <time dateTime={article.createdAt}>
                {formatDate(article.createdAt)}
              </time>
              <span>{article.readTime} min de leitura</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">
                    {article.author?.name || 'Renova Verde Hub'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(article.createdAt)}
                  </p>
                </div>
              </div>

              <ArticleInteractions 
                articleSlug={article.slug} 
                initialLikes={article.likes || 0} 
              />
            </div>

            {/* Imagem em destaque */}
            {article.imageUrl && (
              <div className="mb-8 rounded-xl overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover"
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

          {/* Compartilhamento social */}
          <div className="border-t border-b border-gray-200 py-6 my-8">
            <ShareButtons 
              url={`/artigos/${article.slug}`} 
              title={article.title} 
            />
          </div>

          {/* Seção de comentários */}
          <CommentsSection 
            articleSlug={article.slug} 
            initialComments={comments} 
          />

          {/* Artigos relacionados */}
          {relatedArticles.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Artigos Relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <div key={relatedArticle.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    {relatedArticle.imageUrl && (
                      <Image
                        src={relatedArticle.imageUrl}
                        alt={relatedArticle.title}
                        width={300}
                        height={150}
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-primary-800 bg-primary-100 rounded-full mb-2">
                        {relatedArticle.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        <Link href={`/artigos/${relatedArticle.slug}`} className="hover:text-primary-900">
                          {relatedArticle.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <time dateTime={relatedArticle.createdAt}>
                          {formatDate(relatedArticle.createdAt)}
                        </time>
                        <span className="mx-2">•</span>
                        <span>{relatedArticle.readTime} min</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </article>
      </MainLayout>
    </>
  );
}