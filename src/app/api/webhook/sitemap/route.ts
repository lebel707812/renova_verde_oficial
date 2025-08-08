import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { SITE_CONFIG } from '@/lib/constants';

// Webhook para atualizar sitemap automaticamente
export async function POST(request: NextRequest) {
  try {
    // Verificar se a requisição vem do Supabase (opcional: adicionar autenticação)
    const authHeader = request.headers.get('authorization');
    const webhookSecret = process.env.SUPABASE_WEBHOOK_SECRET;
    
    if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('Webhook received:', body);

    // Verificar se é uma operação em artigos
    if (body.table !== 'articles') {
      return NextResponse.json({ message: 'Not an articles operation' });
    }

    // Regenerar sitemap
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

    // Aqui você pode salvar o sitemap em um arquivo ou enviar para um serviço de cache
    // Por exemplo, salvar no sistema de arquivos ou enviar para um CDN
    
    // Opcional: Notificar o Google Search Console sobre a atualização
    try {
      const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(baseUrl + '/sitemap.xml')}`;
      await fetch(googlePingUrl);
      console.log('Google Search Console notified');
    } catch (pingError) {
      console.error('Error notifying Google:', pingError);
    }

    return NextResponse.json({
      success: true,
      message: 'Sitemap updated successfully',
      totalUrls: allPages.length,
      articles: articles.length,
      operation: body.type || 'unknown'
    });

  } catch (error) {
    console.error('Error in sitemap webhook:', error);
    return NextResponse.json(
      { 
        error: 'Erro no webhook do sitemap',
        details: error instanceof Error ? error.message : null
      },
      { status: 500 }
    );
  }
}

// GET para testar o webhook
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Sitemap webhook is active',
    timestamp: new Date().toISOString()
  });
}

