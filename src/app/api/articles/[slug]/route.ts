import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSlug, calculateReadTime, extractExcerpt, isValidCategory } from '@/lib/utils';

// Função auxiliar para determinar se é um ID numérico ou slug
function isNumericId(param: string): boolean {
  return /^\d+$/.test(param);
}

// GET /api/articles/[slug] - Buscar artigo por slug ou ID
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug ou ID é obrigatório' },
        { status: 400 }
      );
    }

    let article;

    // Se for um número, buscar por ID, senão por slug
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

// PUT /api/articles/[slug] - Atualizar artigo por slug ou ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    console.log('Updating article with param:', params.slug);

    const { slug: param } = params;

    // Buscar artigo atual para obter o ID
    let existingArticle;

    if (isNumericId(param)) {
      const id = parseInt(param);
      existingArticle = await prisma.article.findUnique({
        where: { id }
      });
    } else {
      existingArticle = await prisma.article.findUnique({
        where: { slug: param }
      });
    }

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    const body = await request.json();
    console.log('Request body:', body);

    const { title, content, category, imageUrl, isPublished } = body;

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

    let newSlug = generateSlug(title);
    const readTime = calculateReadTime(content);
    const excerpt = extractExcerpt(content);

    console.log('Generated data:', { newSlug, readTime, excerpt, isPublished });

    // Verificar se o novo slug já existe (exceto para o artigo atual)
    if (newSlug !== existingArticle.slug) {
      const slugExists = await prisma.article.findUnique({
        where: { slug: newSlug }
      });

      if (slugExists) {
        // Gerar slug único
        let finalSlug = newSlug;
        let counter = 1;
        
        while (true) {
          const existingSlug = await prisma.article.findUnique({
            where: { slug: finalSlug }
          });
          
          if (!existingSlug) {
            break;
          }
          
          finalSlug = `${newSlug}-${counter}`;
          counter++;
        }
        
        newSlug = finalSlug;
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
        isPublished: Boolean(isPublished),
        updatedAt: new Date()
      }
    });

    console.log('Article updated:', updatedArticle);
    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao atualizar artigo: ' + (error as Error).message,
        details: error instanceof Error ? error.message : null
      },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/[slug] - Deletar artigo por slug ou ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug: param } = params;

    // Primeiro encontre o artigo para obter o ID
    let existingArticle;

    if (isNumericId(param)) {
      const id = parseInt(param);
      existingArticle = await prisma.article.findUnique({
        where: { id }
      });
    } else {
      existingArticle = await prisma.article.findUnique({
        where: { slug: param }
      });
    }

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

