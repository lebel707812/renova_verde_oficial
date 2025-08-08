import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { SITE_CONFIG } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const baseUrl = SITE_CONFIG.url;
    
    // Buscar todos os artigos publicados
    const { data: articles, error } = await supabase
      .from('articles')
      .select('slug, updatedAt')
      .eq('is_published', true)
      .order('updatedAt', { ascending: false });

    if (error) {
      console.error('Error fetching articles for sitemap:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar artigos para o sitemap' },
        { status: 500 }
      );
    }

    // Páginas estáticas
    const staticPages = [
      {
        url: baseUrl,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '1.0'
      },
      {
        url: `${baseUrl}/sobre`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.8'
      },
      {
        url: `${baseUrl}/contato`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7'
      },
      {
        url: `${baseUrl}/politica-privacidade`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'yearly',
        priority: '0.3'
      },
      {
        url: `${baseUrl}/termos-uso`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'yearly',
        priority: '0.3'
      },
      {
        url: `${baseUrl}/artigos`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '0.9'
      },
      {
        url: `${baseUrl}/search`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.6'
      }
    ];

    // Páginas de artigos
    const articlePages = articles.map((article: any) => ({
      url: `${baseUrl}/artigos/${article.slug}`,
      lastmod: new Date(article.updatedAt).toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8'
    }));

    // Páginas de categorias
    const categories = [
      'jardinagem',
      'energia-renovavel', 
      'reformas-ecologicas',
      'reciclagem',
      'economia-domestica',
      'compostagem',
      'sustentabilidade'
    ];

    const categoryPages = categories.map((category) => ({
      url: `${baseUrl}/categoria/${category}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.6'
    }));

    // Gerar XML do sitemap
    const allPages = [...staticPages, ...articlePages, ...categoryPages];
    
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return NextResponse.json({
      success: true,
      sitemap: sitemapXml,
      totalUrls: allPages.length,
      articles: articles.length
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao gerar sitemap',
        details: error instanceof Error ? error.message : null
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const baseUrl = SITE_CONFIG.url;
    
    // Buscar todos os artigos publicados
    const { data: articles, error } = await supabase
      .from('articles')
      .select('slug, updatedAt')
      .eq('is_published', true)
      .order('updatedAt', { ascending: false });

    if (error) {
      console.error('Error fetching articles for sitemap:', error);
      return new Response('Error generating sitemap', { status: 500 });
    }

    // Páginas estáticas
    const staticPages = [
      {
        url: baseUrl,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '1.0'
      },
      {
        url: `${baseUrl}/sobre`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.8'
      },
      {
        url: `${baseUrl}/contato`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.7'
      },
      {
        url: `${baseUrl}/politica-privacidade`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'yearly',
        priority: '0.3'
      },
      {
        url: `${baseUrl}/termos-uso`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'yearly',
        priority: '0.3'
      },
      {
        url: `${baseUrl}/artigos`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: '0.9'
      },
      {
        url: `${baseUrl}/search`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: '0.6'
      }
    ];

    // Páginas de artigos
    const articlePages = articles.map((article: any) => ({
      url: `${baseUrl}/artigos/${article.slug}`,
      lastmod: new Date(article.updatedAt).toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8'
    }));

    // Páginas de categorias
    const categories = [
      'jardinagem',
      'energia-renovavel', 
      'reformas-ecologicas',
      'reciclagem',
      'economia-domestica',
      'compostagem',
      'sustentabilidade'
    ];

    const categoryPages = categories.map((category) => ({
      url: `${baseUrl}/categoria/${category}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.6'
    }));

    // Gerar XML do sitemap
    const allPages = [...staticPages, ...articlePages, ...categoryPages];
    
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}

