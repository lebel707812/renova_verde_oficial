import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  console.log('=== UPLOAD API INICIADO ===');
  
  try {
    // Verificar configuração do Supabase
    console.log('Verificando configuração do Supabase...');
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('❌ Variáveis de ambiente do Supabase não configuradas');
      console.error('NEXT_PUBLIC_SUPABASE_URL:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.error('SUPABASE_SERVICE_ROLE_KEY:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
      
      return NextResponse.json(
        { 
          success: false,
          error: 'Configuração do servidor incompleta' 
        },
        { status: 500 }
      );
    }
    console.log('✅ Configuração do Supabase OK');

    // Extrair arquivo do FormData
    console.log('Extraindo arquivo do FormData...');
    let formData;
    try {
      formData = await request.formData();
      console.log('✅ FormData extraído com sucesso');
    } catch (formDataError) {
      console.error('❌ Erro ao extrair FormData:', formDataError);
      return NextResponse.json(
        { 
          success: false,
          error: 'Erro ao processar dados do formulário' 
        },
        { status: 400 }
      );
    }

    const file = formData.get('file') as File;
    console.log('Arquivo recebido:', {
      exists: !!file,
      name: file?.name || 'N/A',
      type: file?.type || 'N/A',
      size: file?.size || 0
    });

    // Validar se arquivo foi enviado
    if (!file) {
      console.error('❌ Nenhum arquivo foi enviado');
      return NextResponse.json(
        { 
          success: false,
          error: 'Nenhum arquivo foi enviado' 
        },
        { status: 400 }
      );
    }

    // Validar tipo de arquivo
    console.log('Validando tipo de arquivo...');
    if (!file.type.startsWith('image/')) {
      console.error('❌ Tipo de arquivo inválido:', file.type);
      return NextResponse.json(
        { 
          success: false,
          error: 'Apenas imagens são permitidas' 
        },
        { status: 400 }
      );
    }
    console.log('✅ Tipo de arquivo válido:', file.type);

    // Validar tamanho do arquivo (máximo 10MB antes do processamento)
    const maxSizeBeforeProcessing = 10 * 1024 * 1024; // 10MB
    console.log('Validando tamanho do arquivo antes do processamento...');
    if (file.size > maxSizeBeforeProcessing) {
      console.error('❌ Arquivo muito grande antes do processamento:', file.size, 'bytes (máximo:', maxSizeBeforeProcessing, 'bytes)');
      return NextResponse.json(
        { 
          success: false,
          error: 'Arquivo muito grande. Máximo 10MB antes do processamento.' 
        },
        { status: 400 }
      );
    }
    console.log('✅ Tamanho do arquivo válido antes do processamento:', file.size, 'bytes');

    // Converter e redimensionar a imagem para WebP
    let imageBuffer: Buffer;
    let convertedFilename = '';
    let convertedMimeType = '';

    console.log('Iniciando processamento de imagem com Sharp...');
    try {
      const originalBuffer = Buffer.from(await file.arrayBuffer());
      
      // Tentar converter para WebP
      imageBuffer = await sharp(originalBuffer)
        .resize({ width: 1200, withoutEnlargement: true }) // Redimensiona para largura máxima de 1200px
        .webp({ quality: 80 }) // Qualidade WebP de 80%
        .toBuffer();
      
      convertedFilename = `${Date.now()}.webp`;
      convertedMimeType = 'image/webp';
      console.log('✅ Imagem convertida para WebP com sucesso. Tamanho:', imageBuffer.byteLength, 'bytes');
      
    } catch (webpError) {
      console.error('❌ Falha na conversão para WebP:', webpError);
      
      // Se a conversão para WebP falhar, tentar JPEG
      try {
        const originalBuffer = Buffer.from(await file.arrayBuffer());
        imageBuffer = await sharp(originalBuffer)
          .resize({ width: 1200, withoutEnlargement: true })
          .jpeg({ quality: 85 }) // Qualidade JPEG de 85%
          .toBuffer();
        
        convertedFilename = `${Date.now()}.jpg`;
        convertedMimeType = 'image/jpeg';
        console.log('✅ Usando formato JPEG devido a erro na conversão WebP. Tamanho:', imageBuffer.byteLength, 'bytes');
        
      } catch (fallbackError) {
        console.error('❌ Processamento de imagem falhou completamente:', fallbackError);
        return NextResponse.json(
          { 
            success: false,
            error: 'Erro ao processar a imagem' 
          },
          { status: 500 }
        );
      }
    }

    // Gerar nome único para o arquivo
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const filename = `articles/${timestamp}_${randomSuffix}.${convertedFilename.split('.').pop()}`;
    console.log('✅ Nome do arquivo gerado para upload:', filename);

    // Testar conexão com Supabase
    console.log('Testando conexão com Supabase...');
    try {
      const { data: buckets, error: bucketsError } = await supabaseAdmin.storage.listBuckets();
      
      if (bucketsError) {
        console.error('❌ Erro de conexão com Supabase:', bucketsError);
        return NextResponse.json(
          { 
            success: false,
            error: 'Erro de conexão com o servidor de armazenamento' 
          },
          { status: 500 }
        );
      }

      console.log('✅ Conexão com Supabase estabelecida');
      console.log('Buckets disponíveis:', buckets?.map(b => b.name) || []);

      // Verificar se o bucket 'images' existe
      const imagesBucket = buckets?.find(bucket => bucket.name === 'images');
      if (!imagesBucket) {
        console.error('❌ Bucket "images" não encontrado');
        console.log('Buckets disponíveis:', buckets?.map(b => b.name) || []);
        return NextResponse.json(
          { 
            success: false,
            error: 'Bucket de imagens não encontrado' 
          },
          { status: 500 }
        );
      }
      console.log('✅ Bucket "images" encontrado');

    } catch (connectionError) {
      console.error('❌ Erro ao testar conexão com Supabase:', connectionError);
      return NextResponse.json(
        { 
          success: false,
          error: 'Erro de conexão com o servidor de armazenamento' 
        },
        { status: 500 }
      );
    }

    // Fazer upload para o Supabase Storage
    console.log('Iniciando upload para Supabase Storage...');
    try {
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('images')
        .upload(filename, imageBuffer, {
          cacheControl: '31536000', // 1 ano
          upsert: false,
          contentType: convertedMimeType 
        });

      if (uploadError) {
        console.error('❌ Erro no upload para Supabase:', uploadError);
        return NextResponse.json(
          { 
            success: false,
            error: `Erro ao fazer upload: ${uploadError.message}` 
          },
          { status: 500 }
        );
      }

      console.log('✅ Upload realizado com sucesso:', uploadData);

    } catch (uploadError) {
      console.error('❌ Erro durante o processo de upload:', uploadError);
      return NextResponse.json(
        { 
          success: false,
          error: 'Erro durante o processo de upload' 
        },
        { status: 500 }
      );
    }

    // Obter URL pública do arquivo
    console.log('Obtendo URL pública do arquivo...');
    try {
      const { data: publicUrlData } = supabaseAdmin.storage
        .from('images')
        .getPublicUrl(filename);

      if (!publicUrlData?.publicUrl) {
        console.error('❌ Não foi possível obter URL pública');
        return NextResponse.json(
          { 
            success: false,
            error: 'Não foi possível obter a URL pública do arquivo' 
          },
          { status: 500 }
        );
      }

      console.log('✅ URL pública obtida:', publicUrlData.publicUrl);

      // Resposta de sucesso
      const response = {
        success: true,
        url: publicUrlData.publicUrl,
        filename: filename,
        originalName: file.name,
        size: imageBuffer.byteLength, // Usar o tamanho do buffer processado
        type: convertedMimeType
      };

      console.log('✅ Upload concluído com sucesso:', response);
      console.log('=== UPLOAD API FINALIZADO COM SUCESSO ===');

      return NextResponse.json(response, { status: 200 });

    } catch (urlError) {
      console.error('❌ Erro ao obter URL pública:', urlError);
      return NextResponse.json(
        { 
          success: false,
          error: 'Erro ao obter URL pública do arquivo' 
        },
        { status: 500 }
      );
    }

  } catch (generalError) {
    console.error('❌ Erro geral no upload:', generalError);
    console.log('=== UPLOAD API FINALIZADO COM ERRO ===');
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}

