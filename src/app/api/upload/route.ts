import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    // Verificar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Apenas imagens são permitidas' }, { status: 400 });
    }

    // Gerar nome único para o arquivo
    const timestamp = Date.now();
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `articles/${timestamp}.${extension}`;

    // Fazer upload para o Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('images') // Nome do seu bucket no Supabase Storage
      .upload(filename, file, { cacheControl: '3600', upsert: false });

    if (error) {
      console.error('Supabase Storage upload error:', error);
      return NextResponse.json(
        { error: `Erro ao fazer upload do arquivo: ${error.message}` },
        { status: 500 }
      );
    }

    // Obter URL pública do arquivo
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('images')
      .getPublicUrl(filename);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      return NextResponse.json(
        { error: 'Não foi possível obter a URL pública do arquivo' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: `Erro ao fazer upload do arquivo: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}


