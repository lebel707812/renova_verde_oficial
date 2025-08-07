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
          throw repliesError;
        }

        return {
          ...comment,
          replies: replies || []
        };
      })
    );

    return NextResponse.json(commentsWithReplies);
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

    // Se for uma resposta, verificar se o comentário pai existe
    if (parentId) {
      const { data: parentComment, error: parentError } = await supabase
        .from('comments')
        .select('*')
        .eq('id', parseInt(parentId))
        .single();

      if (parentError && parentError.code !== 'PGRST116') {
        throw parentError;
      }

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
    const { data: comment, error: commentError } = await supabaseAdmin
      .from('comments')
      .insert([
        {
          name: name.trim(),
          content: content.trim(),
          articleId: article.id,
          parentId: parentId ? parseInt(parentId) : null
        }
      ])
      .select()
      .single();

    if (commentError) {
      throw commentError;
    }

    // Buscar respostas se existirem
    const { data: replies, error: repliesError } = await supabase
      .from('comments')
      .select('*')
      .eq('parentId', comment.id);

    if (repliesError) {
      throw repliesError;
    }

    const commentWithReplies = {
      ...comment,
      replies: replies || []
    };

    return NextResponse.json(commentWithReplies, { status: 201 });
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

