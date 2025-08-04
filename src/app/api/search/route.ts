import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';


export const dynamic = 'force-dynamic';

// GET /api/search - Buscar artigos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query && !category) {
      return NextResponse.json(
        { error: 'Parâmetro de busca (q) ou categoria é obrigatório' },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    // Construir condições de busca
    const where: { [key: string]: any } = {
      isPublished: true, // Apenas artigos publicados
    };

    if (query) {
      where.OR = [
        {
          title: {
            contains: query
          }
        },
        {
          content: {
            contains: query
          }
        },
        {
          excerpt: {
            contains: query
          }
        }
      ];
    }

    if (category) {
      where.category = category;
    }

    // Buscar artigos com paginação
    const [articles, totalCount] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          excerpt: true,
          slug: true,
          category: true,
          imageUrl: true,
          readTime: true,
          createdAt: true,
        }
      }),
      prisma.article.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      articles,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
      query: query || '',
      category: category || '',
    });

  } catch (error) {
    console.error('Error searching articles:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar artigos' },
      { status: 500 }
    );
  }
}

