import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called');
    
    // Verificar se o Supabase está configurado
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase environment variables not configured');
      return NextResponse.json(
        { error: 'Configuração do servidor incompleta' },
        { status: 500 }
      );
    }

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

    // Verificar tamanho do arquivo (máximo 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      console.log('File too large:', file.size);
      return NextResponse.json({ error: 'Arquivo muito grande. Máximo 10MB.' }, { status: 400 });
    }

    console.log('File details:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Converter e redimensionar a imagem para WebP
    let imageBuffer: Buffer;
    let convertedFilename = '';
    let convertedMimeType = '';

    try {
      const originalBuffer = Buffer.from(await file.arrayBuffer());
      
      // Tentar converter para WebP
      imageBuffer = await sharp(originalBuffer)
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 65 })
        .toBuffer();
      
      convertedFilename = `${Date.now()}.webp`;
      convertedMimeType = 'image/webp';
      console.log('Image converted to WebP successfully');
      
    } catch (webpError) {
      console.error('WebP conversion failed:', webpError);
      
      // Se a conversão falhar, usar o arquivo original redimensionado
      try {
        const originalBuffer = Buffer.from(await file.arrayBuffer());
        imageBuffer = await sharp(originalBuffer)
          .resize({ width: 800, withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toBuffer();
        
        convertedFilename = `${Date.now()}.jpg`;
        convertedMimeType = 'image/jpeg';
        console.log('Using JPEG format due to WebP conversion error');
        
      } catch (fallbackError) {
        console.error('Image processing failed completely:', fallbackError);
        return NextResponse.json(
          { error: 'Erro ao processar a imagem' },
          { status: 500 }
        );
      }
    }

    // Gerar nome único para o arquivo
    const filename = `articles/${convertedFilename}`;
    console.log('Generated filename:', filename);

    try {
      // Testar conexão com Supabase primeiro
      const { data: buckets, error: bucketsError } = await supabaseAdmin.storage.listBuckets();
      
      if (bucketsError) {
        console.error('Supabase connection error:', bucketsError);
        return NextResponse.json(
          { error: 'Erro de conexão com o servidor de armazenamento' },
          { status: 500 }
        );
      }

      console.log('Supabase connection successful, buckets:', buckets?.map(b => b.name));

      // Verificar se o bucket 'images' existe
      const imagesBucket = buckets?.find(bucket => bucket.name === 'images');
      if (!imagesBucket) {
        console.error('Images bucket not found');
        return NextResponse.json(
          { error: 'Bucket de imagens não encontrado' },
          { status: 500 }
        );
      }

      // Fazer upload para o Supabase Storage
      const { data, error } = await supabaseAdmin.storage
        .from('images')
        .upload(filename, imageBuffer, { 
          cacheControl: '31536000', // 1 ano
          upsert: false, 
          contentType: convertedMimeType 
        });

      if (error) {
        console.error('Supabase Storage upload error:', error);
        return NextResponse.json(
          { error: `Erro ao fazer upload: ${error.message}` },
          { status: 500 }
        );
      }

      console.log('Upload successful:', data);

      // Obter URL pública do arquivo
      const { data: publicUrlData } = supabaseAdmin.storage
        .from('images')
        .getPublicUrl(filename);

      console.log('Public URL data:', publicUrlData);

      if (!publicUrlData?.publicUrl) {
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
        filename: filename
      });

    } catch (uploadError) {
      console.error('Upload process error:', uploadError);
      return NextResponse.json(
        { error: `Erro no processo de upload: ${(uploadError as Error).message}` },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('General upload error:', error);
    return NextResponse.json(
      { error: `Erro geral no upload: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

