# Guia de Deploy na Hostinger - Renova Verde Hub

## Pré-requisitos

1. **Conta na Hostinger** com plano que suporte Node.js (Business ou superior)
2. **Acesso ao painel de controle** da Hostinger
3. **Domínio configurado** (se aplicável)

## Passos para Deploy

### 1. Preparar o Projeto Localmente

```bash
# Instalar dependências
npm install

# Gerar build estático
npm run build
```

### 2. Configurar Banco de Dados

O projeto usa SQLite (Prisma). Para produção na Hostinger:

1. **Opção A: Manter SQLite**
   - Fazer upload do arquivo `prisma/dev.db` junto com os arquivos
   - Configurar permissões de escrita na pasta

2. **Opção B: Migrar para MySQL** (Recomendado)
   - Criar banco MySQL no painel da Hostinger
   - Atualizar `DATABASE_URL` no arquivo `.env`
   - Executar migrações: `npx prisma migrate deploy`

### 3. Configurar Variáveis de Ambiente

Criar arquivo `.env.production` na raiz do projeto:

```env
# Database
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"

# Auth
NEXTAUTH_SECRET="sua_chave_secreta_super_forte_aqui"
NEXTAUTH_URL="https://seudominio.com"

# Admin
ADMIN_EMAIL="admin@seudominio.com"
ADMIN_PASSWORD="senha_admin_forte"
```

### 4. Upload dos Arquivos

#### Via File Manager (Hostinger):

1. Acesse o **File Manager** no painel da Hostinger
2. Navegue até a pasta `public_html` (ou pasta do seu domínio)
3. Faça upload de todos os arquivos da pasta `out/` (gerada pelo build)
4. Faça upload dos arquivos de configuração:
   - `.htaccess`
   - `.env.production` (renomeie para `.env`)

#### Via FTP:

```bash
# Conectar via FTP e fazer upload da pasta 'out' para public_html
```

### 5. Configurar Node.js (se necessário)

Se usar funcionalidades server-side:

1. No painel da Hostinger, vá em **Advanced → Node.js**
2. Selecione a versão Node.js 18+ 
3. Configure o diretório da aplicação
4. Defina o arquivo de entrada como `server.js`

### 6. Configurar Domínio e SSL

1. **Domínio**: Configure o domínio no painel da Hostinger
2. **SSL**: Ative o certificado SSL gratuito
3. **Redirecionamento**: Configure redirecionamento HTTP → HTTPS

### 7. Testar a Aplicação

1. Acesse seu domínio
2. Teste as principais funcionalidades:
   - Navegação entre páginas
   - Carregamento de imagens
   - Formulário de newsletter
   - Sistema de busca
   - Área administrativa (se aplicável)

## Estrutura de Arquivos na Hostinger

```
public_html/
├── _next/                 # Arquivos do Next.js
├── images/               # Imagens do site
├── uploads/              # Uploads de usuários
├── .htaccess            # Configurações do servidor
├── .env                 # Variáveis de ambiente
├── index.html           # Página principal
└── ...                  # Outros arquivos estáticos
```

## Comandos Úteis

```bash
# Build para produção
npm run build

# Verificar build localmente
npm run start

# Limpar cache do Next.js
rm -rf .next out

# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

## Troubleshooting

### Problema: Páginas não carregam
- **Solução**: Verificar se o arquivo `.htaccess` está configurado corretamente

### Problema: Imagens não aparecem
- **Solução**: Verificar se as imagens estão na pasta `public/images/`

### Problema: Erro 500
- **Solução**: Verificar logs de erro no painel da Hostinger

### Problema: Banco de dados não conecta
- **Solução**: Verificar `DATABASE_URL` no arquivo `.env`

## Manutenção

### Atualizações do Site:
1. Fazer alterações localmente
2. Executar `npm run build`
3. Fazer upload dos novos arquivos da pasta `out/`

### Backup:
- Fazer backup regular do banco de dados
- Fazer backup dos arquivos de upload
- Manter cópia local do código

## Contato e Suporte

Para dúvidas sobre o deploy:
- Documentação da Hostinger: https://support.hostinger.com
- Suporte técnico da Hostinger via chat/ticket

---

**Nota**: Este guia assume o uso da Hostinger com plano Business ou superior. Para planos básicos, algumas funcionalidades podem não estar disponíveis.

