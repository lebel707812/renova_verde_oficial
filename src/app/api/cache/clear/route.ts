import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paths, tags, secret } = body;

    // Verificar secret para segurança (opcional)
    if (process.env.CACHE_CLEAR_SECRET && secret !== process.env.CACHE_CLEAR_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const clearedPaths: string[] = [];
    const clearedTags: string[] = [];

    // Limpar caminhos específicos
    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        try {
          revalidatePath(path);
          clearedPaths.push(path);
          console.log(`Cache cleared for path: ${path}`);
        } catch (error) {
          console.error(`Error clearing cache for path ${path}:`, error);
        }
      }
    }

    // Limpar tags específicas
    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        try {
          revalidateTag(tag);
          clearedTags.push(tag);
          console.log(`Cache cleared for tag: ${tag}`);
        } catch (error) {
          console.error(`Error clearing cache for tag ${tag}:`, error);
        }
      }
    }

    // Se nenhum path ou tag específico foi fornecido, limpar caches comuns
    if (!paths && !tags) {
      const commonPaths = [
        '/',
        '/artigos',
        '/sitemap.xml',
        '/api/articles'
      ];

      for (const path of commonPaths) {
        try {
          revalidatePath(path);
          clearedPaths.push(path);
        } catch (error) {
          console.error(`Error clearing cache for path ${path}:`, error);
        }
      }

      const commonTags = ['articles', 'sitemap'];
      for (const tag of commonTags) {
        try {
          revalidateTag(tag);
          clearedTags.push(tag);
        } catch (error) {
          console.error(`Error clearing cache for tag ${tag}:`, error);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully',
      clearedPaths,
      clearedTags,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao limpar cache',
        details: error instanceof Error ? error.message : null
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Cache clear endpoint is active',
    timestamp: new Date().toISOString(),
    availableActions: [
      'POST with paths array to clear specific paths',
      'POST with tags array to clear specific tags',
      'POST without body to clear common caches'
    ]
  });
}

