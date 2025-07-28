import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { generateSlug, calculateReadTime, extractExcerpt, isValidCategory } from '@/lib/utils';

// GET /api/articles/[slug] - Buscar artigo por slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug é obrigatório' },
        { status: 400 }
      );
    }

    const article = await prisma.article.findUnique({
      where: { slug }
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao buscar artigo',
        details: error instanceof Error ? error.message : null
      },
      { status: 500 }
    );
  }
}

// PUT /api/articles/[slug] - Atualizar artigo por slug
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Verificar autenticação
    const token = request.cookies.get('auth-token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { slug: currentSlug } = params;

    // Buscar artigo atual para obter o ID
    const existingArticle = await prisma.article.findUnique({
      where: { slug: currentSlug }
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    const { title, content, category, imageUrl, isPublished } = await request.json();

    // Validações
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Título, conteúdo e categoria são obrigatórios' },
        { status: 400 }
      );
    }

    if (!isValidCategory(category)) {
      return NextResponse.json(
        { error: 'Categoria inválida' },
        { status: 400 }
      );
    }

    const newSlug = generateSlug(title);
    const readTime = calculateReadTime(content);
    const excerpt = extractExcerpt(content);

    // Verificar se o novo slug já existe (exceto para o artigo atual)
    if (newSlug !== currentSlug) {
      const slugExists = await prisma.article.findUnique({
        where: { slug: newSlug }
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Já existe um artigo com este título' },
          { status: 400 }
        );
      }
    }

    // Atualizar artigo
    const updatedArticle = await prisma.article.update({
      where: { id: existingArticle.id },
      data: {
        title,
        content,
        excerpt,
        slug: newSlug,
        category,
        imageUrl: imageUrl || null,
        readTime,
        isPublished: isPublished || false,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao atualizar artigo',
        details: error instanceof Error ? error.message : null
      },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/[slug] - Deletar artigo por slug
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Verificar autenticação
    const token = request.cookies.get('auth-token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { slug } = params;

    // Primeiro encontre o artigo para obter o ID
    const existingArticle = await prisma.article.findUnique({
      where: { slug }
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    // Deletar usando o ID
    await prisma.article.delete({
      where: { id: existingArticle.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao deletar artigo',
        details: error instanceof Error ? error.message : null
      },
      { status: 500 }
    );
  }
}