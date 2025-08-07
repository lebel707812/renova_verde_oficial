import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

    const offset = (page - 1) * limit;

    let articlesQuery = supabase
      .from('articles')
      .select('id, title, excerpt, slug, category, imageUrl, readTime, createdAt')
      .eq('isPublished', true);

    if (query) {
      articlesQuery = articlesQuery.or(
        `title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`
      );
    }

    if (category) {
      articlesQuery = articlesQuery.eq('category', category);
    }

    const { data: articles, error: articlesError } = await articlesQuery
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (articlesError) {
      console.error('Error searching articles:', articlesError);
      return NextResponse.json(
        { error: 'Erro ao buscar artigos' },
        { status: 500 }
      );
    }

    // Para obter o total de artigos, faremos uma segunda consulta com count
    let countQuery = supabase
      .from('articles')
      .select('count', { count: 'exact' })
      .eq('isPublished', true);

    if (query) {
      countQuery = countQuery.or(
        `title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`
      );
    }

    if (category) {
      countQuery = countQuery.eq('category', category);
    }

    const { count: totalCount, error: countError } = await countQuery;

    if (countError) {
      console.error('Error counting articles:', countError);
      return NextResponse.json(
        { error: 'Erro ao contar artigos' },
        { status: 500 }
      );
    }

    const totalPages = Math.ceil((totalCount || 0) / limit);

    return NextResponse.json({
      articles,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount: totalCount || 0,
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

