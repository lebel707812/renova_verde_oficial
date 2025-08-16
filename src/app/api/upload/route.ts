import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

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

    // Validar tamanho do arquivo (máximo 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    console.log('Validando tamanho do arquivo...');
    if (file.size > maxSize) {
      console.error('❌ Arquivo muito grande:', file.size, 'bytes (máximo:', maxSize, 'bytes)');
      return NextResponse.json(
        { 
          success: false,
          error: 'Arquivo muito grande. Máximo 10MB.' 
        },
        { status: 400 }
      );
    }
    console.log('✅ Tamanho do arquivo válido:', file.size, 'bytes');

    // Converter arquivo para buffer
    console.log('Convertendo arquivo para buffer...');
    let fileBuffer: ArrayBuffer;
    try {
      fileBuffer = await file.arrayBuffer();
      console.log('✅ Arquivo convertido para buffer, tamanho:', fileBuffer.byteLength, 'bytes');
    } catch (bufferError) {
      console.error('❌ Erro ao converter arquivo para buffer:', bufferError);
      return NextResponse.json(
        { 
          success: false,
          error: 'Erro ao processar arquivo' 
        },
        { status: 500 }
      );
    }

    // Gerar nome único para o arquivo
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const filename = `articles/${timestamp}_${randomSuffix}.${fileExtension}`;
    console.log('✅ Nome do arquivo gerado:', filename);

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
        .upload(filename, fileBuffer, {
          cacheControl: '31536000', // 1 ano
          upsert: false,
          contentType: file.type
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
        size: file.size,
        type: file.type
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

