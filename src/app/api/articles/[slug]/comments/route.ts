import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

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
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      article = data;
    } else {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      article = data;
    }

    if (!article) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    // Buscar comentários principais
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .eq('articleId', article.id)
      .is('parentId', null)
      .order('createdAt', { ascending: false });

    if (commentsError) {
      throw commentsError;
    }

    // Buscar respostas para cada comentário
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const { data: replies, error: repliesError } = await supabase
          .from('comments')
          .select('*')
          .eq('parentId', comment.id)
          .order('createdAt', { ascending: true });

        if (repliesError) {
          console.error('Error fetching replies:', repliesError);
          return { ...comment, replies: [] };
        }

        return { ...comment, replies };
      })
    );

    return NextResponse.json({ comments: commentsWithReplies });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao buscar comentários',
        details: error instanceof Error ? error.message : null
      },
      { status: 500 }
    );
  }
}

// POST /api/articles/[slug]/comments - Adicionar um comentário
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();
    const { name, content, parentId } = body;

    // Validação
    if (!name || !content) {
      return NextResponse.json(
        { error: 'Nome e conteúdo são obrigatórios' },
        { status: 400 }
      );
    }

    // Primeiro, encontrar o artigo
    let article;

    if (isNumericId(slug)) {
      const id = parseInt(slug);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      article = data;
    } else {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      article = data;
    }

    if (!article) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    // Criar o comentário
    const { data: newComment, error: createError } = await supabaseAdmin
      .from('comments')
      .insert({
        articleId: article.id,
        name,
        content,
        parentId: parentId || null,
        createdAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (createError) {
      throw createError;
    }

    // Buscar todos os comentários atualizados
    const { data: updatedComments, error: fetchError } = await supabase
      .from('comments')
      .select('*')
      .eq('articleId', article.id)
      .is('parentId', null)
      .order('createdAt', { ascending: false });

    if (fetchError) {
      throw fetchError;
    }

    // Buscar respostas para cada comentário
    const commentsWithReplies = await Promise.all(
      updatedComments.map(async (comment) => {
        const { data: replies, error: repliesError } = await supabase
          .from('comments')
          .select('*')
          .eq('parentId', comment.id)
          .order('createdAt', { ascending: true });

        if (repliesError) {
          console.error('Error fetching replies:', repliesError);
          return { ...comment, replies: [] };
        }

        return { ...comment, replies };
      })
    );

    return NextResponse.json({ comments: commentsWithReplies });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao adicionar comentário',
        details: error instanceof Error ? error.message : null
      },
      { status: 500 }
    );
  }
}