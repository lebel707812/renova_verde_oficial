import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';

// Função auxiliar para determinar se é um ID numérico ou slug
function isNumericId(param: string): boolean {
  return /^\d+$/.test(param);
}

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    console.log('Trying to like article with slug/id:', slug);

    // Primeiro, encontrar o artigo
    let article;

    if (isNumericId(slug)) {
      const id = parseInt(slug);
      article = await prisma.article.findUnique({
        where: { id }
      });
    } else {
      article = await prisma.article.findUnique({
        where: { slug }
      });
    }

    if (!article) {
      console.log('Article not found for slug/id:', slug);
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    // Atualizar o artigo com o novo número de likes
    const updatedArticle = await prisma.article.update({
      where: { id: article.id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    console.log('Article liked successfully. New likes count:', updatedArticle.likes);
    return NextResponse.json({ likes: updatedArticle.likes });
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao atualizar likes',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}


