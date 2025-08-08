import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { generateSlug, generateSlugFromKeywords, calculateReadTime, extractExcerpt, generateMetaDescription, isValidCategory } from '@/lib/utils';

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
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      existingArticle = data;
    } else {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', param)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      existingArticle = data;
    }

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    const body = await request.json();
    console.log('Request body:', body);

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
    let newSlug;
    if (keywords && keywords.trim()) {
      newSlug = generateSlugFromKeywords(keywords);
    } else {
      newSlug = generateSlug(title);
    }

    const readTime = calculateReadTime(content);
    const excerpt = extractExcerpt(content);
    const autoMetaDescription = metaDescription || generateMetaDescription(content, title);

    console.log('Generated data:', { newSlug, readTime, excerpt, autoMetaDescription, isPublished });

    // Verificar se o novo slug já existe (exceto para o artigo atual)
    if (newSlug !== existingArticle.slug) {
      const { data: slugExists, error: slugError } = await supabase
        .from('articles')
        .select('slug')
        .eq('slug', newSlug)
        .single();

      if (slugError && slugError.code !== 'PGRST116') {
        throw slugError;
      }

      if (slugExists) {
        // Gerar slug único
        let finalSlug = newSlug;
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
          
          finalSlug = `${newSlug}-${counter}`;
          counter++;
        }
        
        newSlug = finalSlug;
      }
    }

    // Atualizar artigo
    const { data: updatedArticle, error: updateError } = await supabaseAdmin
      .from('articles')
      .update({
        title,
        content,
        excerpt,
        slug: newSlug,
        category,
        imageUrl: imageUrl || null,
        readTime,
        isPublished: Boolean(isPublished),
        keywords: keywords || null,
        meta_description: autoMetaDescription,
        updatedAt: new Date().toISOString()
      })
      .eq('id', existingArticle.id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

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
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      existingArticle = data;
    } else {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', param)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      existingArticle = data;
    }

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    // Deletar usando o ID
    const { error: deleteError } = await supabaseAdmin
      .from('articles')
      .delete()
      .eq('id', existingArticle.id);

    if (deleteError) {
      throw deleteError;
    }

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

