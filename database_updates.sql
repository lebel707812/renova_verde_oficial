-- Adicionar campos para SEO na tabela articles
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS keywords TEXT,
ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id);

-- Criar índice para melhor performance nas consultas por keywords
CREATE INDEX IF NOT EXISTS idx_articles_keywords ON articles USING gin(to_tsvector('portuguese', keywords));

-- Criar índice para melhor performance nas consultas por meta_description
CREATE INDEX IF NOT EXISTS idx_articles_meta_description ON articles USING gin(to_tsvector('portuguese', meta_description));

-- Atualizar artigos existentes com meta descriptions baseadas no conteúdo
UPDATE articles 
SET meta_description = LEFT(REGEXP_REPLACE(content, '<[^>]*>', '', 'g'), 150) || '...'
WHERE meta_description IS NULL AND content IS NOT NULL;

-- Exemplo de como atualizar keywords para artigos existentes (pode ser executado manualmente)
-- UPDATE articles SET keywords = 'reaproveitamento agua chuva' WHERE slug LIKE '%agua-chuva%';
-- UPDATE articles SET keywords = 'reforma ecologica sustentavel' WHERE slug LIKE '%reforma-ecologica%';
-- UPDATE articles SET keywords = 'energia solar residencial' WHERE slug LIKE '%energia-solar%';
-- UPDATE articles SET keywords = 'compostagem domestica' WHERE slug LIKE '%compostagem%';
-- UPDATE articles SET keywords = 'jardim sustentavel' WHERE slug LIKE '%jardim%';

