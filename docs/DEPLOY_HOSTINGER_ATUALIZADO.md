# Guia de Deploy na Hostinger - Renova Verde Hub (Atualizado)

## Importante: Configuração para Next.js com APIs

Este projeto utiliza APIs do Next.js, portanto requer um ambiente Node.js na Hostinger. **Não é possível fazer deploy como site estático.**

## Pré-requisitos

1. **Plano Hostinger Business ou superior** (com suporte a Node.js)
2. **Acesso ao painel de controle** da Hostinger
3. **Domínio configurado**

## Passos para Deploy

### 1. Preparar o Projeto

```bash
# Instalar dependências
npm install

# Testar localmente
npm run dev

# Build para produção
npm run build
```

### 2. Configurar Node.js na Hostinger

1. **Acesse o painel da Hostinger**
2. **Vá em "Advanced" → "Node.js"**
3. **Configure:**
   - Versão Node.js: 18.x ou superior
   - Diretório da aplicação: `public_html` (ou pasta do domínio)
   - Arquivo de entrada: `server.js`
   - Modo de produção: Ativado

### 3. Criar arquivo server.js

Crie um arquivo `server.js` na raiz do projeto:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
  .once('error', (err) => {
    console.error(err)
    process.exit(1)
  })
  .listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

### 4. Configurar Banco de Dados

#### Opção A: MySQL (Recomendado para produção)

1. **Criar banco MySQL no painel da Hostinger**
2. **Atualizar schema.prisma:**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

3. **Configurar .env:**

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
NEXTAUTH_SECRET="sua_chave_secreta_super_forte"
NEXTAUTH_URL="https://seudominio.com"
ADMIN_EMAIL="admin@seudominio.com"
ADMIN_PASSWORD="senha_admin_forte"
```

#### Opção B: Manter SQLite (Desenvolvimento)

```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="sua_chave_secreta_super_forte"
NEXTAUTH_URL="https://seudominio.com"
ADMIN_EMAIL="admin@seudominio.com"
ADMIN_PASSWORD="senha_admin_forte"
```

### 5. Upload dos Arquivos

#### Via File Manager:

1. **Compacte o projeto** (excluindo node_modules)
2. **Faça upload** para a pasta do domínio
3. **Extraia os arquivos**
4. **Configure as permissões** (755 para pastas, 644 para arquivos)

#### Via Git (Recomendado):

```bash
# No terminal da Hostinger (se disponível)
git clone https://github.com/lebel707812/renova_verde_oficial.git
cd renova_verde_oficial
npm install
npm run build
```

### 6. Configurar Dependências

No painel Node.js da Hostinger:

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar migrações do banco:**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

3. **Criar dados iniciais:**
   ```bash
   node scripts/create-admin.js
   node scripts/create-sample-articles.js
   ```

### 7. Configurar Domínio e SSL

1. **Configurar domínio** no painel da Hostinger
2. **Ativar SSL** (certificado gratuito)
3. **Configurar redirecionamento** HTTP → HTTPS

### 8. Iniciar Aplicação

1. **No painel Node.js**, clique em "Start Application"
2. **Verificar logs** para confirmar que está funcionando
3. **Testar acesso** via domínio

## Estrutura de Arquivos na Hostinger

```
public_html/
├── .next/                # Build do Next.js
├── node_modules/         # Dependências
├── prisma/              # Banco de dados e migrações
├── public/              # Arquivos estáticos
├── src/                 # Código fonte
├── .env                 # Variáveis de ambiente
├── server.js            # Servidor customizado
├── package.json         # Dependências do projeto
└── next.config.mjs      # Configuração do Next.js
```

## Comandos Úteis

```bash
# Verificar status da aplicação
pm2 status

# Reiniciar aplicação
pm2 restart all

# Ver logs
pm2 logs

# Parar aplicação
pm2 stop all

# Build e restart
npm run build && pm2 restart all
```

## Troubleshooting

### Problema: Aplicação não inicia
- **Verificar**: Logs no painel Node.js
- **Solução**: Verificar se todas as dependências estão instaladas

### Problema: Erro de banco de dados
- **Verificar**: String de conexão no .env
- **Solução**: Executar migrações do Prisma

### Problema: Imagens não carregam
- **Verificar**: Permissões da pasta public/
- **Solução**: Configurar permissões 755

### Problema: APIs não funcionam
- **Verificar**: Se o Node.js está ativo
- **Solução**: Reiniciar aplicação no painel

## Manutenção

### Atualizações:
1. Fazer alterações no código
2. Fazer upload/git pull
3. Executar `npm run build`
4. Reiniciar aplicação

### Backup:
- Backup do banco de dados MySQL
- Backup da pasta de uploads
- Backup do código fonte

## Alternativa: Deploy Estático

Se preferir deploy estático (sem APIs), você pode:

1. **Remover todas as pastas API** em `src/app/api/`
2. **Configurar `output: 'export'`** no next.config.mjs
3. **Usar dados estáticos** em vez de banco de dados
4. **Fazer upload da pasta `out/`** gerada pelo build

## Contato

Para suporte técnico:
- Hostinger: https://support.hostinger.com
- Documentação Next.js: https://nextjs.org/docs

---

**Nota**: Este projeto foi configurado para funcionar com Node.js na Hostinger. Certifique-se de ter um plano compatível.

