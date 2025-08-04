import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateSlug, calculateReadTime, extractExcerpt, isValidCategory } from '@/lib/utils';

// GET /api/articles - Listar artigos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const published = searchParams.get('published');
    const featured = searchParams.get('featured');

    const where: Record<string, unknown> = {};

    if (category) {
      where.category = category;
    }

    if (published === 'true') {
      where.isPublished = true;
    }

    const articles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: featured === 'true' ? 3 : undefined
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar artigos' },
      { status: 500 }
    );
  }
}

// POST /api/articles - Criar artigo
export async function POST(request: NextRequest) {
  try {
    console.log('Creating article...');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { title, content, category, imageUrl, isPublished, authorName } = body;

    if (!title || !content || !category) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Título, conteúdo e categoria são obrigatórios' },
        { status: 400 }
      );
    }

    if (!isValidCategory(category)) {
      console.log('Invalid category:', category);
      return NextResponse.json(
        { error: 'Categoria inválida' },
        { status: 400 }
      );
    }

    const slug = generateSlug(title);
    const readTime = calculateReadTime(content);
    const excerpt = extractExcerpt(content);

    console.log('Generated data:', { slug, readTime, excerpt, isPublished });

    // Verificar se o slug já existe e gerar um único se necessário
    let finalSlug = slug;
    let counter = 1;
    
    while (true) {
      const existingArticle = await prisma.article.findUnique({
        where: { slug: finalSlug }
      });
      
      if (!existingArticle) {
        break;
      }
      
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        excerpt,
        slug: finalSlug,
        category,
        imageUrl: imageUrl || null,
        readTime,
        isPublished: Boolean(isPublished),
        authorName: authorName || null
      }
    });

    console.log('Article created:', article);
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Erro ao criar artigo: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

