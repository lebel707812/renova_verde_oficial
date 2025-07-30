import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    console.log('Upload request received');

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      console.log('No file provided');
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    console.log('File received:', file.name, file.type, file.size);

    // Verificar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      console.log('Invalid file type:', file.type);
      return NextResponse.json(
        { error: 'Apenas imagens são permitidas' },
        { status: 400 }
      );
    }

    // Verificar tamanho do arquivo (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.log('File too large:', file.size);
      return NextResponse.json(
        { error: 'Arquivo muito grande. Máximo 10MB' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Gerar nome único para o arquivo
    const timestamp = Date.now();
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `${timestamp}.${extension}`;

    // Garantir que o diretório existe
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = join(uploadDir, filename);
    
    console.log('Saving file to:', filepath);
    await writeFile(filepath, buffer);

    // Retornar URL do arquivo
    const fileUrl = `/uploads/${filename}`;
    console.log('File saved successfully:', fileUrl);

    return NextResponse.json({
      success: true,
      url: fileUrl
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer upload do arquivo: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

