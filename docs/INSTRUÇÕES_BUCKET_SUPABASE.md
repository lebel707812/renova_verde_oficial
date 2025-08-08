# Instruções para Configurar o Bucket 'images' no Supabase

## Problema Identificado

O erro `{"statusCode":"404","error":"Bucket not found","message":"Bucket not found"}` indica que o Supabase Storage não está encontrando o bucket de imagens. Isso acontece quando:

1. O bucket 'images' não existe
2. O bucket não está configurado como público
3. As políticas RLS estão bloqueando o acesso

## Solução Passo a Passo

### 1. Verificar/Criar o Bucket 'images'

1. **Acesse o painel do Supabase:**
   - Vá para [https://app.supabase.com/](https://app.supabase.com/)
   - Faça login e selecione seu projeto

2. **Navegue para Storage:**
   - No menu lateral, clique em **Storage**

3. **Verificar se o bucket 'images' existe:**
   - Procure por um bucket chamado `images`
   - Se **NÃO existir**, clique em **"New bucket"**
   - Nome do bucket: `images`
   - **IMPORTANTE:** Marque a opção **"Public bucket"** ✅
   - Clique em **"Create bucket"**

4. **Se o bucket já existir, verificar se é público:**
   - Clique no bucket `images`
   - Vá para **Settings** (configurações)
   - Certifique-se de que **"Public access"** está **ATIVADO** ✅

### 2. Configurar Políticas RLS para Storage

1. **Acesse o SQL Editor:**
   - No painel do Supabase, vá para **SQL Editor**

2. **Execute as seguintes políticas:**

```sql
-- Política para permitir leitura pública das imagens
CREATE POLICY "Allow public read access to images" ON storage.objects
FOR SELECT 
USING (bucket_id = 'images');

-- Política para permitir upload de imagens (para usuários autenticados ou service role)
CREATE POLICY "Allow authenticated uploads to images bucket" ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'images');

-- Política para permitir atualização de imagens
CREATE POLICY "Allow authenticated updates to images bucket" ON storage.objects
FOR UPDATE 
USING (bucket_id = 'images')
WITH CHECK (bucket_id = 'images');

-- Política para permitir exclusão de imagens
CREATE POLICY "Allow authenticated deletes from images bucket" ON storage.objects
FOR DELETE 
USING (bucket_id = 'images');
```

3. **Clique em "Run" para executar**

### 3. Verificar Variáveis de Ambiente

Certifique-se de que as seguintes variáveis estão corretas no Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ncglgprpvyaezbfoxcbb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
```

### 4. Testar o Acesso

Após configurar tudo, teste acessando uma URL de imagem:
```
https://ncglgprpvyaezbfoxcbb.supabase.co/storage/v1/object/public/images/articles/teste.jpg
```

Se ainda retornar "Bucket not found", verifique:

1. **O bucket realmente existe e se chama exatamente 'images'**
2. **O bucket está marcado como público**
3. **As políticas RLS foram aplicadas corretamente**

### 5. Verificação Adicional - Estrutura do Bucket

O bucket deve ter a seguinte estrutura:
```
images/
├── articles/
│   ├── 1754538699525.png
│   ├── 1754538699526.jpg
│   └── ...
```

### 6. Comandos SQL para Verificação

Execute no SQL Editor para verificar se tudo está correto:

```sql
-- Verificar se o bucket existe
SELECT * FROM storage.buckets WHERE name = 'images';

-- Verificar políticas do storage
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';

-- Verificar arquivos no bucket (se houver)
SELECT * FROM storage.objects WHERE bucket_id = 'images' LIMIT 10;
```

## Resultado Esperado

Após seguir todos os passos:

✅ O bucket 'images' deve existir e ser público
✅ As políticas RLS devem permitir leitura pública
✅ As URLs das imagens devem funcionar corretamente
✅ As imagens devem aparecer no frontend sem o ícone de "imagem quebrada"

## Troubleshooting

Se o problema persistir:

1. **Verifique os logs do Vercel** para ver se há erros no upload
2. **Teste fazer upload de uma imagem pequena** (< 1MB)
3. **Verifique se as variáveis de ambiente estão corretas**
4. **Confirme que você está usando o projeto Supabase correto**

## Contato para Suporte

Se após seguir todos os passos o problema persistir, forneça:
- Screenshot do painel Storage mostrando o bucket 'images'
- Screenshot das políticas RLS para storage.objects
- Logs de erro do console do navegador
- Logs de erro do Vercel (se houver)

