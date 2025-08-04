import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Função auxiliar para determinar se é um ID numérico ou slug
function isNumericId(param: string): boolean {
  return /^\d+$/.test(param);
}

// GET /api/articles/[slug]/comments - Buscar comentários de um artigo
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

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
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    // Buscar comentários com suas respostas
    const comments = await prisma.comment.findMany({
      where: {
        articleId: article.id,
        parentId: null // Apenas comentários principais
      },
      include: {
        replies: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao buscar comentários',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

// POST /api/articles/[slug]/comments - Criar novo comentário
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();
    const { name, content, parentId } = body;

    // Validações
    if (!name || !content) {
      return NextResponse.json(
        { error: 'Nome e conteúdo são obrigatórios' },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Nome deve ter pelo menos 2 caracteres' },
        { status: 400 }
      );
    }

    if (content.trim().length < 5) {
      return NextResponse.json(
        { error: 'Comentário deve ter pelo menos 5 caracteres' },
        { status: 400 }
      );
    }

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
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    // Se for uma resposta, verificar se o comentário pai existe
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parseInt(parentId) }
      });

      if (!parentComment) {
        return NextResponse.json(
          { error: 'Comentário pai não encontrado' },
          { status: 404 }
        );
      }

      if (parentComment.articleId !== article.id) {
        return NextResponse.json(
          { error: 'Comentário pai não pertence a este artigo' },
          { status: 400 }
        );
      }
    }

    // Criar o comentário
    const comment = await prisma.comment.create({
      data: {
        name: name.trim(),
        content: content.trim(),
        articleId: article.id,
        parentId: parentId ? parseInt(parentId) : null
      },
      include: {
        replies: true
      }
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao criar comentário',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

