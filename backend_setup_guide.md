# Guia de Configuração do Backend com Supabase para Renova Verde Hub

Este guia detalha os passos para reestruturar o backend do projeto Renova Verde Hub, migrando de uma configuração baseada em Prisma para uma integração direta com o Supabase. O objetivo é fornecer um passo a passo claro para configurar o banco de dados, remover dependências antigas e implementar as funcionalidades de backend usando o cliente Supabase.

## 1. Resetando o Backend Existente

Para garantir uma transição limpa para o Supabase, é crucial remover todas as dependências e configurações relacionadas ao banco de dados anterior (Prisma).

### 1.1. Excluir Dependências do Projeto

Execute os seguintes comandos no terminal na raiz do seu projeto para desinstalar as bibliotecas do Prisma:

```bash
npm uninstall prisma @prisma/client
```

### 1.2. Remover Arquivos e Diretórios do Prisma

Exclua o diretório `prisma` e o arquivo de configuração do Prisma, se existirem:

```bash
rm -rf prisma
rm -f src/lib/prisma.ts
```

### 1.3. Limpar Variáveis de Ambiente Antigas

Abra o arquivo `.env` na raiz do seu projeto e remova qualquer linha que comece com `DATABASE_URL` que não seja a nova URL de conexão direta do Supabase. Certifique-se de que seu `.env` contenha apenas as variáveis necessárias para o Supabase, que serão detalhadas na próxima seção.

### 1.4. Ajustar `package.json`

Abra o arquivo `package.json` e remova quaisquer scripts ou dependências de desenvolvimento (`devDependencies`) que façam referência direta ao Prisma (ex: `prisma generate`, `prisma migrate`).

### 1.5. Limpar Código Existente

Você precisará revisar e remover todas as importações e usos do `PrismaClient` em seu código. As principais áreas a serem verificadas são:

- `src/app/api/articles/route.ts`
- `src/lib/auth.ts`
- `src/app/api/search/route.ts`

Em geral, procure por `import { PrismaClient } from '@prisma/client';` e instâncias de `new PrismaClient()` e remova-as. O código que interage com o banco de dados será substituído por chamadas ao Supabase.

## 2. Configuração do Supabase

Esta seção detalha como configurar seu projeto Supabase e integrar o cliente Supabase em sua aplicação Next.js.

### 2.1. Criar Projeto no Supabase e Configurar Banco de Dados

1. Acesse o [Supabase Dashboard](https://app.supabase.com/) e crie um novo projeto.
2. No painel do seu projeto, vá em `Project Settings` -> `Database` -> `Connection String`.
3. Copie a `Connection string` para `Node.js` (a opção `Primary database (Direct connection)`). Ela será algo como:
   `postgresql://postgres:[YOUR-PASSWORD]@db.yourprojectref.supabase.co:5432/postgres`
4. **Importante:** Substitua `[YOUR-PASSWORD]` pela sua senha real do banco de dados.

### 2.2. Configurar Variáveis de Ambiente do Supabase

Crie ou atualize seu arquivo `.env` na raiz do projeto com as seguintes variáveis. Substitua os placeholders pelos valores do seu projeto Supabase:

```env
# Database
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.yourprojectref.supabase.co:5432/postgres"

# Supabase API Keys
NEXT_PUBLIC_SUPABASE_URL="https://yourprojectref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-public-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# NextAuth (se estiver usando)
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="your-jwt-secret-here"
```

- `NEXT_PUBLIC_SUPABASE_URL`: Encontrado em `Project Settings` -> `API` -> `Project URL`.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Encontrado em `Project Settings` -> `API` -> `Project API key` (anon public).
- `SUPABASE_SERVICE_ROLE_KEY`: Encontrado em `Project Settings` -> `API` -> `Project API key` (service_role). **Mantenha esta chave segura e nunca a exponha no frontend.**

### 2.3. Instalar o Cliente Supabase

Execute o seguinte comando para instalar a biblioteca cliente do Supabase:

```bash
npm install @supabase/supabase-js
```

### 2.4. Configurar o Cliente Supabase na Aplicação

Crie um arquivo `src/lib/supabase.ts` com o seguinte conteúdo para inicializar os clientes Supabase (um para uso público/anon e outro para operações de admin/service_role):

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase URL, Anon Key, or Service Role Key');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
  },
});
```

## 3. SQL Schema para o Supabase

Este é o schema SQL que você deve executar no SQL Editor do seu projeto Supabase para criar as tabelas necessárias. **Certifique-se de que seu banco de dados esteja vazio ou que você esteja ciente de que isso criará as tabelas com a estrutura definida.**

```sql
-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT,
    "readTime" INTEGER NOT NULL DEFAULT 5,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "authorName" TEXT,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "articleId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
```

## 4. Configuração de Row Level Security (RLS) e Permissões

Após criar as tabelas, você precisará configurar as políticas de RLS para controlar o acesso aos dados. Execute os seguintes comandos SQL no SQL Editor do Supabase:

```sql
-- Ativar RLS para as tabelas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Conceder USAGE no schema public para anon e authenticated
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Políticas de RLS para a tabela articles
CREATE POLICY "Enable read access for anon articles" ON "public"."articles" FOR SELECT TO anon USING (true);
CREATE POLICY "Enable insert for service_role articles" ON "public"."articles" FOR INSERT TO service_role WITH CHECK (true);

-- Políticas de RLS para a tabela users
CREATE POLICY "Enable read access for anon users" ON "public"."users" FOR SELECT TO anon USING (true);
CREATE POLICY "Enable insert for authenticated users" ON "public"."users" FOR INSERT TO authenticated WITH CHECK (true);

-- Políticas de RLS para a tabela comments
CREATE POLICY "Enable read access for anon comments" ON "public"."comments" FOR SELECT TO anon USING (true);
CREATE POLICY "Enable insert for authenticated comments" ON "public"."comments" FOR INSERT TO authenticated WITH CHECK (true);
```

## 5. Adaptação das Rotas de API Existentes

Você precisará adaptar as rotas de API existentes para usar o cliente Supabase em vez do Prisma. Abaixo estão exemplos de como as rotas principais devem ser modificadas.

### 5.1. `src/app/api/articles/route.ts`

Esta rota lida com a listagem e criação de artigos. As operações de leitura podem usar `supabase` (cliente público) e as de escrita (`POST`) devem usar `supabaseAdmin` (cliente com service_role).

**Exemplo de GET (Listar Artigos):**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Importe o cliente público
// ... outras importações

export async function GET(request: NextRequest) {
  try {
    // ... lógica de query
    let query = supabase.from('articles').select('*');
    // ... aplicar filtros e ordenação

    const { data: articles, error } = await query;

    if (error) {
      console.error('Error fetching articles:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar artigos' },
        { status: 500 }
      );
    }
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar artigos' },
      { status: 500 }
    );
  }
}
```

**Exemplo de POST (Criar Artigo):**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase'; // Importe o cliente admin
// ... outras importações

export async function POST(request: NextRequest) {
  try {
    // ... lógica de validação e geração de slug/excerpt

    // Verificar se o slug já existe e gerar um único se necessário
    let finalSlug = slug;
    let counter = 1;
    
    while (true) {
      const { data: existingArticle, error: existingError } = await supabaseAdmin
        .from('articles')
        .select('slug')
        .eq('slug', finalSlug)
        .single();
      
      if (existingError && existingError.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error('Error checking existing slug:', existingError);
        throw existingError;
      }

      if (!existingArticle) {
        break;
      }
      
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const { data: article, error } = await supabaseAdmin
      .from('articles')
      .insert([
        {
          title,
          content,
          excerpt,
          slug: finalSlug,
          category,
          imageUrl: imageUrl || null,
          readTime,
          isPublished: Boolean(isPublished),
          authorName: authorName || null,
        },
      ])
      .select();

    if (error) {
      console.error('Error creating article:', error);
      return NextResponse.json(
        { error: 'Erro ao criar artigo: ' + error.message },
        { status: 500 }
      );
    }

    console.log('Article created:', article);
    return NextResponse.json(article[0], { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { error: 'Erro ao criar artigo: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
```

### 5.2. `src/lib/auth.ts`

Este arquivo lida com a autenticação de usuários. As operações de busca e criação de usuários devem usar `supabaseAdmin`.

**Exemplo de `authenticateUser` e `createUser`:**

```typescript
import { supabaseAdmin } from './supabase'; // Importe o cliente admin
// ... outras importações

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
    console.error('Error fetching user:', error);
    return null;
  }

  if (!data) {
    return null;
  }

  const isValid = await verifyPassword(password, data.passwordHash);
  if (!isValid) {
    return null;
  }

  return {
    id: data.id,
    email: data.email
  };
}

export async function createUser(email: string, password: string): Promise<AuthUser> {
  const hashedPassword = await hashPassword(password);
  
  const { data, error } = await supabaseAdmin
    .from('users')
    .insert([
      {
        email,
        passwordHash: hashedPassword
      }
    ])
    .select();

  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }

  return {
    id: data[0].id,
    email: data[0].email
  };
}
```

### 5.3. `src/app/api/search/route.ts`

Esta rota lida com a busca de artigos. As operações de busca devem usar `supabase`.

**Exemplo de GET (Buscar Artigos):**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Importe o cliente público

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // ... lógica de query e paginação

    let articlesQuery = supabase
      .from('articles')
      .select('id, title, excerpt, slug, category, imageUrl, readTime, createdAt')
      .eq('isPublished', true);

    if (query) {
      articlesQuery = articlesQuery.or(
        `title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`
      );
    }

    if (category) {
      articlesQuery = articlesQuery.eq('category', category);
    }

    const { data: articles, error: articlesError } = await articlesQuery
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (articlesError) {
      console.error('Error searching articles:', articlesError);
      return NextResponse.json(
        { error: 'Erro ao buscar artigos' },
        { status: 500 }
      );
    }

    // Para obter o total de artigos, faremos uma segunda consulta com count
    let countQuery = supabase
      .from('articles')
      .select('count', { count: 'exact' })
      .eq('isPublished', true);

    if (query) {
      countQuery = countQuery.or(
        `title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`
      );
    }

    if (category) {
      countQuery = countQuery.eq('category', category);
    }

    const { count: totalCount, error: countError } = await countQuery;

    if (countError) {
      console.error('Error counting articles:', countError);
      return NextResponse.json(
        { error: 'Erro ao contar artigos' },
        { status: 500 }
      );
    }

    const totalPages = Math.ceil((totalCount || 0) / limit);

    return NextResponse.json({
      articles,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount: totalCount || 0,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
      query: query || '',
      category: category || '',
    });
  } catch (error) {
    console.error('Error searching articles:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar artigos' },
      { status: 500 }
    );
  }
}
```

### 5.4. `src/app/api/upload/route.ts` (Upload de Imagens)

Para o upload de imagens, em vez de salvar no sistema de arquivos local, você deve usar o Supabase Storage. Isso envolve a remoção do código de manipulação de arquivos local e a integração com o cliente Supabase Storage.

**Exemplo de POST (Upload de Imagens para Supabase Storage):**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase'; // Usar supabaseAdmin para upload

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

    // Verificar tamanho do arquivo (Supabase Storage tem seus próprios limites, mas é bom ter uma validação inicial)
    // O erro 413 Content Too Large que você estava enfrentando pode ser resolvido aqui ou na configuração do Vercel/Next.js
    // Para Supabase Storage, o limite padrão é 50MB por arquivo, mas pode ser configurado.
    if (file.size > 10 * 1024 * 1024) { // Exemplo: 10MB
      return NextResponse.json({ error: 'Arquivo muito grande. Máximo 10MB' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`; // Nome único para o arquivo
    const filePath = `public/${fileName}`; // Caminho dentro do bucket

    const { data, error } = await supabaseAdmin.storage
      .from('articles-images') // Nome do seu bucket no Supabase Storage
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (error) {
      console.error('Error uploading file to Supabase Storage:', error);
      return NextResponse.json({ error: 'Erro ao fazer upload da imagem: ' + error.message }, { status: 500 });
    }

    // Obter a URL pública da imagem
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('articles-images')
      .getPublicUrl(filePath);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      return NextResponse.json({ error: 'Erro ao obter URL pública da imagem' }, { status: 500 });
    }

    return NextResponse.json({ success: true, url: publicUrlData.publicUrl });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Erro ao fazer upload do arquivo: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
```

**Observações para o Upload de Imagens:**

- **Crie um Bucket no Supabase Storage:** No seu painel do Supabase, vá em `Storage` e crie um novo bucket (ex: `articles-images`). Defina as políticas de acesso (público ou privado) conforme sua necessidade.
- **Políticas de RLS para Storage:** Se o bucket for privado, você precisará configurar políticas de RLS para o Supabase Storage para permitir o upload e o acesso às imagens.
- **Erro 413 Content Too Large:** O erro `413 Content Too Large` que você estava enfrentando anteriormente é geralmente um limite do servidor ou do proxy (como Vercel ou Nginx) para o tamanho do corpo da requisição. Ao usar o Supabase Storage, o upload é feito diretamente para o Supabase, o que pode contornar esse limite. No entanto, se o problema persistir, você pode precisar ajustar as configurações de upload no seu ambiente de deploy (ex: `next.config.mjs` para Next.js, ou configurações do Vercel).

### 5.5. `src/app/api/images/[...path]/route.ts` (Servir Imagens)

Esta rota atualmente serve imagens do sistema de arquivos local. Com o Supabase Storage, você não precisará mais desta rota, pois as imagens serão servidas diretamente do CDN do Supabase. Você pode remover este arquivo.

### 5.6. `src/app/api/newsletter/route.ts` (Newsletter)

Esta rota atualmente salva e-mails em um arquivo de texto local. Para uma solução mais robusta e escalável com Supabase, você pode criar uma nova tabela no Supabase (ex: `newsletter_subscribers`) e salvar os e-mails lá.

**Exemplo de POST (Cadastro de Newsletter com Supabase):**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase'; // Usar supabaseAdmin para inserção

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'E-mail é obrigatório' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'E-mail inválido' },
        { status: 400 }
      );
    }

    // Verificar se o e-mail já existe na tabela do Supabase
    const { data: existingSubscriber, error: selectError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', email)
      .single();

    if (selectError && selectError.code !== 'PGRST116') { // PGRST116 means no rows found
      console.error('Error checking existing subscriber:', selectError);
      throw selectError;
    }

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'E-mail já cadastrado na newsletter' },
        { status: 409 }
      );
    }

    // Inserir novo e-mail na tabela do Supabase
    const { data, error: insertError } = await supabaseAdmin
      .from('newsletter_subscribers')
      .insert([
        {
          email,
          subscribed_at: new Date().toISOString(), // Adiciona timestamp
        },
      ])
      .select();

    if (insertError) {
      console.error('Error subscribing email:', insertError);
      return NextResponse.json(
        { error: 'Erro ao cadastrar e-mail na newsletter: ' + insertError.message },
        { status: 500 }
      );
    }

    console.log(`Novo e-mail cadastrado na newsletter: ${email}`);

    return NextResponse.json({ 
      message: 'E-mail cadastrado com sucesso na newsletter!' 
    });

  } catch (err: any) {
    console.error("Erro ao cadastrar e-mail na newsletter:", err);
    return NextResponse.json(
      { 
        error: "Erro interno do servidor",
        details: err instanceof Error ? err.message : "Erro desconhecido"
      },
      { status: 500 }
    );
  }
}
```

**SQL para a tabela `newsletter_subscribers`:**

```sql
CREATE TABLE "newsletter_subscribers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "subscribed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_subscribers_pkey" PRIMARY KEY ("id")
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for newsletter subscribers" ON "public"."newsletter_subscribers" FOR INSERT TO anon WITH CHECK (true);
```

## 6. Considerações Finais

- **Testes:** Após implementar todas as mudanças, teste exaustivamente todas as funcionalidades que interagem com o banco de dados (criação de artigos, busca, login, registro, newsletter, upload de imagens).
- **Segurança:** Sempre revise as políticas de RLS e as permissões do seu bucket de Storage no Supabase para garantir que seus dados estejam seguros e acessíveis apenas conforme o necessário.
- **Frontend:** Lembre-se de que, ao mudar a forma como as imagens são servidas (de `/uploads/` para URLs do Supabase Storage), você precisará atualizar o frontend para usar as novas URLs das imagens. O mesmo vale para a newsletter, se você tiver algum feedback visual baseado no sucesso do cadastro.

Este guia deve fornecer uma base sólida para a migração do seu backend para o Supabase. Boa sorte!

