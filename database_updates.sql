-- Adicionar coluna user_id à tabela articles (opcional)
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS user_id INTEGER;

-- Adicionar foreign key para user_id (opcional, pode referenciar a tabela users)
-- ALTER TABLE public.articles ADD CONSTRAINT articles_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;

-- Atualizar política RLS para articles - permitir inserção sem autenticação
DROP POLICY IF EXISTS "Enable insert for service_role articles" ON public.articles;
DROP POLICY IF EXISTS "Enable insert for authenticated articles" ON public.articles;

-- Nova política que permite inserção tanto para service_role quanto para casos sem autenticação
CREATE POLICY "Enable insert for articles" ON public.articles 
FOR INSERT 
WITH CHECK (true);

-- Política para permitir inserção com autenticação específica (se necessário)
-- CREATE POLICY "Enable insert for authenticated articles" ON public.articles 
-- FOR INSERT 
-- TO authenticated
-- WITH CHECK (auth.uid()::text::integer = user_id OR user_id IS NULL);

-- Verificar se as políticas de leitura estão corretas
DROP POLICY IF EXISTS "Enable read access for anon articles" ON public.articles;
CREATE POLICY "Enable read access for anon articles" ON public.articles 
FOR SELECT 
TO anon, authenticated
USING (true);

