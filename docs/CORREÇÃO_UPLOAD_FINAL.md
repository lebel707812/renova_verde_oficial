# Correção Final do Upload de Imagem - Renova Verde

## Problema Identificado

O erro `"Unexpected token 'R', "Request En"... is not valid JSON"` indica que a API de upload estava retornando uma resposta que não é JSON válido. Isso geralmente acontece quando:

1. O servidor retorna uma página de erro HTML em vez de JSON
2. Há um erro de timeout ou conexão
3. O Supabase Storage não está configurado corretamente
4. O bucket 'images' não existe ou não tem as permissões corretas

## Soluções Implementadas

### 1. **Simplificação da API de Upload** (`src/app/api/upload/route.ts`)

**Mudanças principais:**
- ✅ Removida conversão desnecessária File → ArrayBuffer → Uint8Array
- ✅ Uso direto do objeto File no upload do Supabase
- ✅ Melhor tratamento de erros com try/catch aninhados
- ✅ Logs mais detalhados para debugging
- ✅ Remoção de configurações que podem causar conflito

**Antes:**
```typescript
const arrayBuffer = await file.arrayBuffer();
const buffer = new Uint8Array(arrayBuffer);
// Upload com buffer e contentType
```

**Depois:**
```typescript
// Upload direto com o File
const { data, error } = await supabaseAdmin.storage
  .from('images')
  .upload(filename, file, { 
    cacheControl: '3600', 
    upsert: false 
  });
```

### 2. **Melhoria no Frontend** (`ArticleForm.tsx` e `TiptapEditor.tsx`)

**Mudanças principais:**
- ✅ Verificação do Content-Type da resposta antes de fazer parse JSON
- ✅ Logs detalhados para debugging
- ✅ Tratamento específico para respostas não-JSON
- ✅ Mensagens de erro mais informativas

**Novo tratamento de erro:**
```typescript
// Verificar se a resposta é JSON válida
const contentType = response.headers.get('content-type');
if (!contentType || !contentType.includes('application/json')) {
  console.error('Response is not JSON:', contentType);
  const text = await response.text();
  console.error('Response text:', text);
  setError('Erro no servidor: resposta inválida');
  return;
}
```

## Verificações Necessárias no Supabase

### 1. **Bucket 'images' deve existir**
```
1. Acesse Storage no painel do Supabase
2. Verifique se o bucket 'images' existe
3. Se não existir, crie-o
```

### 2. **Políticas RLS para Storage**
```sql
-- Política para permitir upload de imagens
CREATE POLICY "Allow authenticated uploads to images bucket" ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'images');

-- Política para permitir leitura pública
CREATE POLICY "Allow public read access to images" ON storage.objects
FOR SELECT 
USING (bucket_id = 'images');
```

### 3. **Configuração do Bucket**
- ✅ Bucket deve ser **público** para permitir acesso às URLs
- ✅ Verificar se as variáveis de ambiente estão corretas:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

## Debugging Avançado

### 1. **Logs no Console do Navegador**
Agora você verá logs detalhados como:
```
Starting image upload: filename.jpg image/jpeg 123456
Upload response status: 200
Upload response data: {success: true, url: "..."}
```

### 2. **Logs no Vercel**
A API agora produz logs mais detalhados:
```
Upload API called
File received: filename.jpg
File details: {name: "...", type: "...", size: ...}
Generated filename: articles/1234567890.jpg
Upload successful: {...}
```

### 3. **Verificação de Resposta Inválida**
Se a resposta não for JSON, você verá:
```
Response is not JSON: text/html
Response text: <html>Error page content...</html>
```

## Possíveis Causas Restantes

Se o erro persistir, verifique:

### 1. **Bucket não existe**
- Crie o bucket 'images' no Supabase Storage

### 2. **Políticas RLS muito restritivas**
- Execute as políticas SQL fornecidas acima

### 3. **Variáveis de ambiente incorretas**
- Verifique se todas as variáveis estão configuradas no Vercel

### 4. **Tamanho do arquivo muito grande**
- Verifique se o arquivo não excede os limites do Supabase (5MB por padrão)

### 5. **Timeout de rede**
- Arquivos muito grandes podem causar timeout

## Arquivos Modificados

- ✅ `src/app/api/upload/route.ts` - API simplificada e melhorada
- ✅ `src/components/admin/ArticleForm.tsx` - Melhor tratamento de erro
- ✅ `src/components/admin/TiptapEditor.tsx` - Melhor tratamento de erro

## Status

- ✅ **Build bem-sucedido**
- ✅ **Logs de debugging implementados**
- ✅ **Tratamento de erro robusto**
- ✅ **Pronto para deploy e teste**

## Próximos Passos

1. **Deploy das mudanças**
2. **Verificar bucket 'images' no Supabase**
3. **Testar upload de imagem**
4. **Analisar logs se o erro persistir**

Com essas mudanças, você deve conseguir identificar exatamente onde está o problema e resolvê-lo definitivamente.

