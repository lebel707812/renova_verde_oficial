import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called');
    
    const formData = await request.formData();
    const file = formData.get('file') as File;

    console.log('File received:', file ? file.name : 'No file');

    if (!file) {
      console.log('No file provided');
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    // Verificar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      console.log('Invalid file type:', file.type);
      return NextResponse.json({ error: 'Apenas imagens são permitidas' }, { status: 400 });
    }

    console.log('File details:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Gerar nome único para o arquivo
    const timestamp = Date.now();
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `articles/${timestamp}.${extension}`;

    console.log('Generated filename:', filename);

    // Converter File para ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    console.log('File converted to buffer, size:', buffer.length);

    // Fazer upload para o Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from('images') // Nome do seu bucket no Supabase Storage
      .upload(filename, buffer, { 
        contentType: file.type,
        cacheControl: '3600', 
        upsert: false 
      });

    if (error) {
      console.error('Supabase Storage upload error:', error);
      return NextResponse.json(
        { error: `Erro ao fazer upload do arquivo: ${error.message}` },
        { status: 500 }
      );
    }

    console.log('Upload successful:', data);

    // Obter URL pública do arquivo
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('images')
      .getPublicUrl(filename);

    console.log('Public URL data:', publicUrlData);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      console.error('Failed to get public URL');
      return NextResponse.json(
        { error: 'Não foi possível obter a URL pública do arquivo' },
        { status: 500 }
      );
    }

    console.log('Upload completed successfully, URL:', publicUrlData.publicUrl);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
    });
  } catch (error) {
    console.error('Upload error:', error);
    
    // Verificar se o erro é relacionado ao JSON
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      return NextResponse.json(
        { error: 'Erro de formato de dados. Verifique se o arquivo é válido.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: `Erro ao fazer upload do arquivo: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}


