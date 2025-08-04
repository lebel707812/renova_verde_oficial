import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';


export const dynamic = 'force-dynamic';

// Função para extrair palavras-chave do conteúdo
function extractKeywords(content: string, title: string): string[] {
  // Combinar título e conteúdo para análise
  const fullText = `${title} ${content}`.toLowerCase();
  
  // Remover HTML tags
  const cleanText = fullText.replace(/<[^>]*>/g, ' ');
  
  // Palavras-chave relacionadas a sustentabilidade e meio ambiente
  const sustainabilityKeywords = [
    'sustentabilidade', 'sustentável', 'ecológico', 'ecologia', 'verde', 'meio ambiente',
    'plantas', 'jardinagem', 'horta', 'jardim', 'cultivo', 'plantio',
    'energia', 'solar', 'renovável', 'energia renovável', 'painéis solares',
    'água', 'economia de água', 'consumo', 'reduzir', 'economizar',
    'compostagem', 'adubo', 'orgânico', 'restos', 'lixo orgânico',
    'reforma', 'materiais', 'construção', 'casa', 'residencial',
    'ar', 'purificação', 'qualidade do ar', 'poluição', 'filtro',
    'reciclagem', 'reutilização', 'desperdício', 'redução',
    'natural', 'orgânico', 'bio', 'eco'
  ];
  
  // Encontrar palavras-chave presentes no texto
  const foundKeywords = sustainabilityKeywords.filter(keyword => 
    cleanText.includes(keyword)
  );
  
  // Se não encontrar palavras-chave específicas, usar palavras comuns do texto
  if (foundKeywords.length === 0) {
    const words = cleanText
      .split(/\s+/)
      .filter(word => word.length > 3)
      .filter(word => !/^\d+$/.test(word)) // Remover números
      .slice(0, 10); // Pegar as primeiras 10 palavras
    
    return words;
  }
  
  return foundKeywords;
}

// Função para calcular relevância entre artigos
function calculateRelevance(currentKeywords: string[], targetContent: string, targetTitle: string): number {
  const targetText = `${targetTitle} ${targetContent}`.toLowerCase();
  const cleanTargetText = targetText.replace(/<[^>]*>/g, ' ');
  
  let score = 0;
  
  currentKeywords.forEach(keyword => {
    if (cleanTargetText.includes(keyword)) {
      // Dar mais peso se a palavra-chave estiver no título
      if (targetTitle.toLowerCase().includes(keyword)) {
        score += 3;
      } else {
        score += 1;
      }
    }
  });
  
  return score;
}

// GET /api/articles/related?slug=article-slug
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug do artigo é obrigatório' },
        { status: 400 }
      );
    }

    // Buscar o artigo atual
    const currentArticle = await prisma.article.findUnique({
      where: { slug, isPublished: true }
    });

    if (!currentArticle) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    // Extrair palavras-chave do artigo atual
    const keywords = extractKeywords(currentArticle.content, currentArticle.title);

    // Buscar todos os outros artigos publicados
    const allArticles = await prisma.article.findMany({
      where: {
        isPublished: true,
        id: { not: currentArticle.id } // Excluir o artigo atual
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calcular relevância e ordenar
    const articlesWithRelevance = allArticles.map(article => ({
      ...article,
      relevance: calculateRelevance(keywords, article.content, article.title)
    }));

    // Ordenar por relevância (maior primeiro)
    articlesWithRelevance.sort((a, b) => b.relevance - a.relevance);

    // Pegar os 3 mais relevantes
    let relatedArticles = articlesWithRelevance
      .filter(article => article.relevance > 0)
      .slice(0, 3);

    // Se não tiver 3 artigos relacionados, completar com artigos aleatórios
    if (relatedArticles.length < 3) {
      const remainingCount = 3 - relatedArticles.length;
      const randomArticles = articlesWithRelevance
        .filter(article => article.relevance === 0)
        .sort(() => Math.random() - 0.5)
        .slice(0, remainingCount);
      
      relatedArticles = [...relatedArticles, ...randomArticles];
    }

    // Buscar os 3 artigos mais recentes (novos artigos)
    const newArticles = await prisma.article.findMany({
      where: {
        isPublished: true,
        id: { not: currentArticle.id } // Excluir o artigo atual
      },
      orderBy: { createdAt: 'desc' },
      take: 3
    });

    // Remover a propriedade relevance antes de retornar
    const cleanRelatedArticles = relatedArticles.map((article: any) => {
      delete article.relevance;
      return article;
    });

    return NextResponse.json({
      relatedArticles: cleanRelatedArticles,
      newArticles
    });

  } catch (error) {
    console.error('Error fetching related articles:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar artigos relacionados' },
      { status: 500 }
    );
  }
}

