import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'E-mail é obrigatório' },
        { status: 400 }
      );
    }

    // Validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'E-mail inválido' },
        { status: 400 }
      );
    }

    // Caminho do arquivo de newsletter
    const newsletterPath = path.join(process.cwd(), 'newsletter-emails.txt');
    
    // Verificar se o arquivo existe e ler conteúdo existente
    let existingEmails = '';
    try {
      existingEmails = await fs.readFile(newsletterPath, 'utf-8');
    } catch (error) {
      // Arquivo não existe ainda, será criado
      existingEmails = '';
    }

    // Verificar se o e-mail já existe
    const emailLines = existingEmails.split('\n').filter(line => line.trim());
    const emailExists = emailLines.some(line => {
      const parts = line.split(' - ');
      return parts[0] === email;
    });

    if (emailExists) {
      return NextResponse.json(
        { error: 'E-mail já cadastrado na newsletter' },
        { status: 409 }
      );
    }

    // Adicionar novo e-mail com timestamp
    const timestamp = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const newEntry = `${email} - ${timestamp}\n`;
    
    // Escrever no arquivo
    await fs.appendFile(newsletterPath, newEntry, 'utf-8');

    console.log(`Novo e-mail cadastrado na newsletter: ${email}`);

    return NextResponse.json({ 
      message: 'E-mail cadastrado com sucesso na newsletter!' 
    });

  } catch (error) {
    console.error('Erro ao cadastrar e-mail na newsletter:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

