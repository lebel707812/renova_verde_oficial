import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { generateSlug, generateSlugFromKeywords, calculateReadTime, extractExcerpt, generateMetaDescription, isValidCategory } from '@/lib/utils';

// GET /api/articles - Listar artigos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const published = searchParams.get('published');
    const featured = searchParams.get('featured'); // Adicionado para filtrar artigos em destaque

    const offset = (page - 1) * limit;

    let query = supabase
      .from('articles')
      .select('*', { count: 'exact' });

    // Filtros
    if (category) {
      query = query.eq('category', category);
    }

    if (published !== null) {
      query = query.eq('isPublished', published === 'true');
    }

    if (featured === 'true') {
      query = query.eq('isFeatured', true); // Assumindo que existe uma coluna isFeatured
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,keywords.ilike.%${search}%`);
    }

    // Paginação e ordenação
    const { data: articles, error, count } = await query
      .order('createdAt', { ascending: false }) // Ordenar pelos mais recentes
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
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao buscar artigos',
        details: error instanceof Error ? error.message : null
      },
      { status: 500 }
    );
  }
}

// POST /api/articles - Criar novo artigo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Creating article with data:', body);

    const { title, content, category, imageUrl, isPublished, keywords, metaDescription } = body;

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

    // Gerar slug baseado em keywords se fornecidas, senão usar o título
    let slug;
    if (keywords && keywords.trim()) {
      slug = generateSlugFromKeywords(keywords);
    } else {
      slug = generateSlug(title);
    }

    const readTime = calculateReadTime(content);
    const excerpt = extractExcerpt(content);
    const autoMetaDescription = metaDescription || generateMetaDescription(content, title);

    console.log('Generated data:', { slug, readTime, excerpt, autoMetaDescription });

    // Verificar se o slug já existe
    const { data: existingSlug, error: slugError } = await supabase
      .from('articles')
      .select('slug')
      .eq('slug', slug)
      .single();

    if (slugError && slugError.code !== 'PGRST116') {
      throw slugError;
    }

    if (existingSlug) {
      // Gerar slug único
      let finalSlug = slug;
      let counter = 1;
      
      while (true) {
        const { data: existingSlug, error: existingError } = await supabase
          .from('articles')
          .select('slug')
          .eq('slug', finalSlug)
          .single();
        
        if (existingError && existingError.code !== 'PGRST116') {
          throw existingError;
        }
        
        if (!existingSlug) {
          break;
        }
        
        finalSlug = `${slug}-${counter}`;
        counter++;
      }
      
      slug = finalSlug;
    }

    // Criar artigo
    const { data: newArticle, error: createError } = await supabaseAdmin
      .from('articles')
      .insert({
        title,
        content,
        excerpt,
        slug,
        category,
        imageUrl: imageUrl || null,
        readTime,
        isPublished: Boolean(isPublished),
        keywords: keywords || null,
        meta_description: autoMetaDescription,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .select()
      .single();

    if (createError) {
      throw createError;
    }

    console.log('Article created:', newArticle);
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao criar artigo: ' + (error as Error).message,
        details: error instanceof Error ? error.message : null
      },
      { status: 500 }
    );
  }
}


