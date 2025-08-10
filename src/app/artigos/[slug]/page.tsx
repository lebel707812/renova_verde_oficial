import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import SEOEnhanced from '@/components/SEOEnhanced';
import ArticleInteractions, { CommentsSection } from '@/components/ArticleInteractions'; // Importar CommentsSection
import { Article } from '@/types';
import { supabaseAdmin } from '@/lib/supabase'; // Importar o cliente Supabase para o servidor

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

// Função para buscar artigos relacionados diretamente do Supabase
async function getRelatedArticles(category: string, excludeId: number): Promise<Article[]> {
  const supabase = supabaseAdmin;
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('category', category)
      .neq('id', excludeId)
      .limit(3);

    if (error) {
      console.error('Erro ao buscar artigos relacionados no Supabase:', error.message);
      return [];
    }
    return data as Article[];
  } catch (error) {
    console.error('Erro ao buscar artigos relacionados no Supabase:', error);
    return [];
  }
}

// Função para buscar comentários diretamente do Supabase
async function getComments(articleSlug: string): Promise<any[]> {
  const supabase = supabaseAdmin;
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('article_slug', articleSlug) // Assumindo que a tabela de comentários tem uma coluna article_slug
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar comentários no Supabase:', error.message);
      return [];
    }
    return data;
  } catch (error) {
    console.error('Erro ao buscar comentários no Supabase:', error);
    return [];
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.category, article.id);
  const comments = await getComments(params.slug);

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
              
              {/* Botão de Like */}
              <ArticleInteractions 
                articleSlug={article.slug} 
                initialLikes={article.likes || 0} 
              />
            </div>
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
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Compartilhar:</span>
              <div className="flex space-x-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/artigos/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/artigos/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-blue-700 text-white text-sm rounded hover:bg-blue-800"
                >
                  Facebook
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + `${process.env.NEXT_PUBLIC_SITE_URL}/artigos/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Seção de Comentários */}
          <CommentsSection
            articleSlug={article.slug}
            initialComments={comments}
          />

          {/* Artigos Relacionados */}
          {relatedArticles.length > 0 && (
            <section className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Artigos Relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <Link href={`/artigos/${relatedArticle.slug}`} key={relatedArticle.id} className="block group">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      {relatedArticle.imageUrl && (
                        <Image
                          src={relatedArticle.imageUrl}
                          alt={relatedArticle.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">{relatedArticle.title}</h3>
                        <p className="text-gray-600 text-sm mt-2">{relatedArticle.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </article>
      </MainLayout>
    </>
  );
}


