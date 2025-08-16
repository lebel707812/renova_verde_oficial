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

    const { data: articles, error, count } = await articlesQuery
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      articles: articles || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    });
  } catch (error) {
    console.error('Error searching articles:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao buscar artigos',
        details: error instanceof Error ? error.message : null
      },
      { status: 500 }
    );
  }
}