import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { generateSlug, calculateReadTime, extractExcerpt, isValidCategory } from '@/lib/utils';
import { getUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET /api/articles - Listar artigos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const published = searchParams.get('published');
    const featured = searchParams.get('featured');

    let query = supabase.from('articles').select('*');

    if (category) {
      query = query.eq('category', category);
    }

    if (published === 'true') {
      query = query.eq('isPublished', true);
    }

    query = query.order('createdAt', { ascending: false });

    if (featured === 'true') {
      query = query.limit(6);
    }

    const { data: articles, error } = await query;

    if (error) {
      console.error('Error fetching articles:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar artigos' },
        { status: 500 }
      );
    }

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

    // Tentar obter o usuário autenticado via JWT
    const user = getUserFromRequest(request);
    let userId = null;

    if (user) {
      userId = user.id;
      console.log('Authenticated user:', user.email);
    } else {
      console.log('No authenticated user found, creating article without user association');
    }

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
      const { data: existingArticle, error: existingError } = await supabaseAdmin
        .from('articles')
        .select('slug')
        .eq('slug', finalSlug)
        .single();
      
      if (existingError && existingError.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error('Error checking existing slug:', existingError);
        throw existingError;
      }

      if (!existingArticle) {
        break;
      }
      
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    // Preparar dados do artigo
    const articleData: any = {
      title,
      content,
      excerpt,
      slug: finalSlug,
      category,
      imageUrl: imageUrl || null,
      readTime,
      isPublished: Boolean(isPublished),
      authorName: authorName || null,
    };

    // Adicionar user_id apenas se o usuário estiver autenticado
    if (userId) {
      articleData.user_id = userId;
    }

    const { data: article, error } = await supabaseAdmin
      .from('articles')
      .insert([articleData])
      .select();

    if (error) {
      console.error('Error creating article:', error);
      return NextResponse.json(
        { error: 'Erro ao criar artigo: ' + error.message },
        { status: 500 }
      );
    }

    console.log('Article created:', article);
    return NextResponse.json(article[0], { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Erro ao criar artigo: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

