import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import { quizzes } from '@/lib/quizzes';

// Função auxiliar para tentar buscar artigos com retry
async function fetchArticlesWithRetry(maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const { data: articles, error } = await supabase
        .from('articles')
        .select('slug, updatedAt, title, excerpt, imageUrl')
        .eq('isPublished', true)
        .limit(1000); // Limitar para evitar problemas de performance

      if (error) {
        console.warn(`Attempt ${i + 1} failed:`, error);
        if (i === maxRetries - 1) throw error; // Lançar erro na última tentativa
        continue;
      }

      return articles || [];
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed with exception:`, error);
      if (i === maxRetries - 1) throw error; // Lançar erro na última tentativa
    }
  }
  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  
  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/politica-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/termos-uso`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/artigos`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categoria`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/calculadora`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/calculadora/chuva`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/calculadora/solar`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/calculadora/tinta`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/quizzes`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calendario-sazonal`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  let articlePages: any[] = [];

  try {
    const articles = await fetchArticlesWithRetry();
    
    articlePages = articles
      .filter((article: any) => article.slug) // Garantir que o slug existe
      .map((article: any) => ({
        url: `${baseUrl}/artigos/${article.slug}`,
        lastModified: new Date(article.updatedAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        // Adicionar informações adicionais para SEO
        images: article.imageUrl ? [
          {
            loc: article.imageUrl,
            title: article.title,
            caption: article.excerpt,
          }
        ] : undefined,
      }));
  } catch (error) {
    console.error('Failed to fetch articles for sitemap after retries:', error);
    // Continuar com sitemap vazio para artigos em caso de erro
  }

  // Páginas de categorias estáticas (corrigidas para corresponder às rotas reais)
  const categories = [
    'Jardinagem',
    'Energia Renovável', 
    'Reforma Ecológica',
    'Compostagem',
    'Economia de Água'
  ];

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/categoria/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Páginas de quizzes
  const quizPages = [
    {
      url: `${baseUrl}/quizzes`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/calendario-sazonal`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    // Adicionar páginas individuais de quizzes
    ...quizzes.map((quiz) => ({
      url: `${baseUrl}/quizzes/${quiz.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  ];

  return [
    ...staticPages,
    ...categoryPages,
    ...articlePages,
    ...quizPages,
  ];
}