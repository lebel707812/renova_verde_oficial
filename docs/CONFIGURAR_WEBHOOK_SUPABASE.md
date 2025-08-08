# Guia de Configuração – Webhook do Supabase + Trigger + Secret

Este guia mostra como:
1) Criar um Webhook no Supabase que chama `https://renovaverde.com.br/api/webhook/sitemap`
2) Configurar os eventos (INSERT/UPDATE) para a tabela `articles`
3) Definir a variável `SUPABASE_WEBHOOK_SECRET` para validar as chamadas no backend
4) (Opcional) Alternativa via TRIGGER + `pg_net` caso a aba Webhooks não esteja disponível no seu projeto

---

## 1) Criar Webhook no Supabase (recomendado)

Pré-requisito: Projeto com a aba Database → Webhooks habilitada no painel do Supabase.

Passo a passo:
1. Abra o Dashboard do Supabase → selecione seu projeto
2. Vá em Database → Webhooks → Create webhook
3. Preencha os campos:
   - Name: `sitemap-webhook`
   - Endpoint URL: `https://renovaverde.com.br/api/webhook/sitemap`
     - Ambiente de desenvolvimento (opcional): `http://localhost:3000/api/webhook/sitemap`
   - HTTP Method: `POST`
   - Events:
     - Schema: `public`
     - Table: `articles`
     - Operations: marque `INSERT` e `UPDATE`
   - Headers (se disponível):
     - Key: `Authorization`
     - Value: `Bearer ${SUPABASE_WEBHOOK_SECRET}`
       - Coloque um valor temporário agora (ex.: `minha_chave_super_secreta`). O mesmo valor será configurado na variável de ambiente da aplicação.
   - Retry policy: deixe o padrão (recomendado) – o Supabase fará tentativas em caso de falha
4. Salve o webhook

Observação: Alguns projetos exibem um campo específico de “Secret” que o próprio Supabase envia no cabeçalho Authorization; em outros, é possível adicionar cabeçalhos customizados. O importante é que o backend receba `Authorization: Bearer <seu_secret>`.

Validação no backend: nosso endpoint `/api/webhook/sitemap` valida o header `Authorization: Bearer <SUPABASE_WEBHOOK_SECRET>`.

---

## 2) Eventos INSERT/UPDATE para a tabela `articles`

Ao criar o webhook e selecionar a tabela `articles` com operações `INSERT` e `UPDATE`, o Supabase cria automaticamente os gatilhos necessários. Não é preciso criar TRIGGER manualmente neste modo. A cada inserção/atualização, o Supabase chamará o endpoint configurado.

Payload esperado: O Supabase envia um JSON com campos como `type`, `table`, `record` (novo) e, em UPDATE, `old_record`. Nosso webhook já tolera variações e usa o campo `table` para checar se é `articles`.

Teste rápido (opcional):
- Faça um `INSERT` ou `UPDATE` via SQL Editor ou pela interface do Supabase em `public.articles` (ex.: publicar um artigo). Verifique os logs do seu servidor (ou configure um serviço de logs) para ver o recebimento do webhook.

---

## 3) Definir `SUPABASE_WEBHOOK_SECRET` no servidor

Na sua hospedagem (Vercel/Hostinger/Outro), adicione a variável de ambiente com o mesmo valor usado no Webhook.

- Nome: `SUPABASE_WEBHOOK_SECRET`
- Valor: o mesmo que você definiu no webhook (ex.: `minha_chave_super_secreta`)

Depois do deploy, faça um teste de chamada manual para conferir a validação:

```bash
curl -X POST \
  -H "Authorization: Bearer minha_chave_super_secreta" \
  -H "Content-Type: application/json" \
  -d '{
    "table": "articles",
    "type": "INSERT",
    "record": { "id": 123, "slug": "teste" }
  }' \
  https://renovaverde.com.br/api/webhook/sitemap
```

Resposta esperada: JSON com `success: true` e contagem de URLs do sitemap. Em produção real, quem dispara é o próprio Supabase.

---

## 4) Alternativa via TRIGGER + `pg_net` (caso a aba Webhooks não esteja disponível)

Se o seu projeto ainda não tem a aba “Webhooks”, você pode usar uma função/trigger no Postgres com a extensão `pg_net` para fazer a requisição HTTP diretamente do banco.

ATENÇÃO: certifique-se de que `pg_net` está disponível no seu projeto. No Supabase, geralmente está.

SQL (execute no SQL Editor do Supabase):

```sql
-- 1) Habilitar extensão pg_net (se necessário)
create extension if not exists pg_net;

-- 2) Guardar o secret numa setting de banco (para não deixar hardcoded)
-- Substitua o valor pelo seu secret real
alter database postgres set app.settings.webhook_secret = 'minha_chave_super_secreta';

-- 3) Função que dispara o POST no INSERT/UPDATE
create or replace function public.notify_sitemap()
returns trigger as $$
declare
  payload jsonb;
  secret text;
begin
  select current_setting('app.settings.webhook_secret', true) into secret;

  if TG_OP = 'INSERT' or TG_OP = 'UPDATE' then
    payload := jsonb_build_object(
      'table', TG_TABLE_NAME,
      'type', TG_OP,
      'record', row_to_json(NEW)
    );

    perform net.http_post(
      url := 'https://renovaverde.com.br/api/webhook/sitemap',
      headers := '{"Authorization": "Bearer ' || secret || '", "Content-Type": "application/json"}',
      body := payload
    );
  end if;

  return NEW;
end;
$$ language plpgsql security definer;

-- 4) Triggers na tabela articles
drop trigger if exists trg_articles_notify_sitemap_ins on public.articles;
drop trigger if exists trg_articles_notify_sitemap_upd on public.articles;

create trigger trg_articles_notify_sitemap_ins
  after insert on public.articles
  for each row execute function public.notify_sitemap();

create trigger trg_articles_notify_sitemap_upd
  after update on public.articles
  for each row execute function public.notify_sitemap();
```

Com isso, cada INSERT/UPDATE em `public.articles` fará um POST no seu endpoint de webhook com o header Authorization esperado.

Para alterar o secret depois:
```sql
alter database postgres set app.settings.webhook_secret = 'novo_secret_mais_forte';
```

---

## Dicas finais

- Certifique-se de que o endpoint `https://renovaverde.com.br/api/webhook/sitemap` está acessível publicamente e responde em até ~10s.
- O endpoint já tenta notificar o Google (`/ping?sitemap=...`) e gera o XML do sitemap dinamicamente.
- Se estiver em ambiente de staging, ajuste a URL do site em `SITE_CONFIG.url` e nos webhooks.
- Em produção, após publicar/editar um artigo, acesse `https://renovaverde.com.br/sitemap.xml` e confira se o artigo aparece.

Se quiser, posso aplicar a alternativa via TRIGGER no seu projeto (executando o SQL acima) ou configurar o Webhook direto no painel do Supabase com você.

