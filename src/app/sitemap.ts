import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { createClient } from '@supabase/supabase-js';

// Verificar se as variáveis de ambiente estão definidas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: any = null;

// Só criar o cliente Supabase se as variáveis estiverem definidas
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
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
      url: `${baseUrl}/categorias`,
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
  ];

  let articlePages: any[] = [];

  // Só tentar buscar artigos se o Supabase estiver configurado
  if (supabase) {
    try {
      const { data: articles, error } = await supabase
        .from('articles')
        .select('slug, updatedAt')
        .eq('isPublished', true);

      if (!error && articles) {
        articlePages = articles
          .filter((article: any) => article.slug) // Garantir que o slug existe
          .map((article: any) => ({
            url: `${baseUrl}/artigos/${article.slug}`,
            lastModified: new Date(article.updatedAt || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          }));
      } else {
        console.warn('Error fetching articles for sitemap:', error);
      }
    } catch (error) {
      console.warn('Failed to fetch articles for sitemap:', error);
    }
  }

  // Páginas de categorias estáticas
  const categories = [
    'jardinagem',
    'energia-renovavel', 
    'reformas-ecologicas',
    'reciclagem',
    'economia-domestica',
    'compostagem',
    'sustentabilidade',
    'economia-de-agua'
  ];

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/categoria/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...articlePages,
  ];
}


