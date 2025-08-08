# Renova Verde Hub - Landing Page

Uma landing page moderna e responsiva para o Renova Verde Hub, focada em sustentabilidade residencial. Desenvolvida com Next.js 14, TypeScript e Tailwind CSS.

## 🌱 Sobre o Projeto

O Renova Verde Hub é uma plataforma dedicada a promover sustentabilidade residencial através de dicas práticas de jardinagem, reformas ecológicas e energia renovável. Esta landing page foi projetada para converter visitantes em leitores engajados e assinantes da newsletter.

## ✨ Características

### Gerenciamento de Artigos
- **Editor de Artigos Aprimorado**: Dimensões do editor de conteúdo e do preview aumentadas para melhor usabilidade.
- **Preview Markdown em Tempo Real**: Renderização correta de cabeçalhos (H2, H3), listas, negrito e itálico no preview.
- **Interface Limpa**: Remoção de textos de dicas desnecessários no editor de artigos.

### Navegação e Descoberta de Conteúdo
- **Artigos Relacionados Inteligentes**: Algoritmo baseado em palavras-chave para sugerir artigos relevantes ao conteúdo lido.
- **Novos Artigos**: Seção dedicada aos 3 artigos mais recentes, excluindo o artigo atual.

### Design e UX
- **Design Mobile-First**: Totalmente responsivo para todos os dispositivos
- **Cores Primárias**: Verde-escuro (#1a3f32) como cor principal
- **Animações Suaves**: Micro-interações e transições elegantes
- **Otimização Anti-FOUC**: Prevenção de Flash of Unstyled Content

### Seções Principais
1. **Hero Section**: Título impactante, subtítulo, CTA e estatísticas
2. **Artigos em Destaque**: Cards com imagens, categorias e links
3. **Newsletter**: Formulário compacto com validação e feedback
4. **Footer**: Links organizados e informações de contato

### Tecnologias
- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática para maior confiabilidade
- **Tailwind CSS**: Estilização utilitária e responsiva
- **Otimizações SEO**: Meta tags, Schema.org e Open Graph

## 🚀 Instalação e Uso

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd renova-verde-hub

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

### Scripts Disponíveis
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css          # Estilos globais e animações
│   ├── layout.tsx           # Layout principal com SEO
│   └── page.tsx             # Página principal
├── components/
│   ├── landing/
│   │   ├── HeroSection.tsx      # Seção hero
│   │   ├── FeaturedArticles.tsx # Artigos em destaque
│   │   ├── ArticleCard.tsx      # Card de artigo
│   │   └── NewsletterSection.tsx # Seção newsletter
│   └── ui/
│       └── NewsletterSignup.tsx # Componente de newsletter
├── lib/
│   └── constants.ts         # Dados mock e configurações
└── types/
    └── index.ts             # Definições TypeScript
```

## 🎨 Componentes Principais

### HeroSection
- Imagem de fundo responsiva
- Título em múltiplas linhas
- Botões CTA com hover effects
- Estatísticas animadas
- Indicador de scroll

### ArticleCard
- Imagem otimizada com Next/Image
- Badges de categoria coloridos
- Tempo de leitura
- Hover effects e animações
- Links para artigos individuais

### NewsletterSignup
- Variante compacta e completa
- Validação de email em tempo real
- Estados de loading e sucesso
- Ícone de email opcional
- Feedback visual para usuário

## 🔧 Configurações

### Tailwind CSS
As cores personalizadas estão configuradas em `tailwind.config.ts`:
```typescript
primary: {
  900: '#1a3f32', // Cor principal
  // ... outras variações
}
```

### SEO e Meta Tags
Configurações em `src/app/layout.tsx`:
- Meta tags dinâmicas
- Open Graph para redes sociais
- Schema.org para SEO
- Favicon e theme colors

## 🔮 Próximas Etapas e Melhorias Sugeridas

Com as funcionalidades atuais, o blog já está robusto para um deploy inicial. No entanto, há sempre espaço para crescimento e aprimoramento. Abaixo, algumas ideias para futuras integrações e melhorias:

### 1. **Melhorias no Conteúdo e SEO**
- **Otimização de Conteúdo Existente**: Revisar artigos para SEO, garantindo palavras-chave relevantes e estrutura otimizada.
- **Criação de Conteúdo Regular**: Estabelecer um calendário editorial para publicações consistentes.
- **Implementação de Breadcrumbs**: Melhorar a navegação e o SEO, especialmente para artigos.

### 2. **Funcionalidades de Interação e Comunidade**
- **Sistema de Comentários Aprimorado**: Implementar autenticação para comentários, respostas aninhadas mais complexas e moderação.
- **Compartilhamento em Redes Sociais**: Adicionar botões de compartilhamento direto para as principais redes sociais.
- **Sistema de Avaliação/Reação**: Permitir que usuários avaliem ou reajam aos artigos (ex: likes, estrelas).

### 3. **Experiência do Usuário e Navegação**
- **Sistema de Busca Avançada**: Implementar uma busca mais robusta com filtros por categoria, autor, data, etc.
- **Filtros e Tags de Categoria**: Adicionar filtros visuais na página de listagem de artigos para facilitar a navegação por tópicos.
- **Páginas de Autor**: Criar páginas dedicadas para cada autor, listando seus artigos.
- **Paginação ou Carregamento Infinito**: Melhorar a experiência de navegação em listas longas de artigos.

### 4. **Infraestrutura e Performance**
- **Integração com um CMS (Content Management System)**: Utilizar plataformas como Strapi, Contentful ou Sanity para gerenciar o conteúdo de forma mais eficiente, facilitando a criação e edição de artigos sem a necessidade de intervenção no código.
- **Otimização de Imagens para Diferentes Dispositivos**: Garantir que as imagens sejam carregadas no tamanho e formato ideais para cada dispositivo, melhorando a performance.
- **Implementação de Cache**: Otimizar o carregamento de páginas e APIs através de estratégias de cache.
- **Monitoramento de Performance e Erros**: Configurar ferramentas de monitoramento para identificar gargalos e erros em tempo real.

### 5. **Monetização e Engajamento**
- **Newsletter Aprimorada**: Integrar com um serviço de e-mail marketing (Mailchimp, SendGrid) para automação e segmentação.
- **Conteúdo Premium/Assinatura**: Explorar a possibilidade de oferecer conteúdo exclusivo para assinantes.
- **Integração com Google Analytics/Ferramentas de Análise**: Para entender o comportamento do usuário e otimizar o site com base em dados.

Estas são apenas algumas sugestões para continuar aprimorando o Renova Verde Hub. O projeto já possui uma base sólida para crescer!

## 📊 Performance

### Otimizações Implementadas
- **Lazy Loading**: Imagens carregadas sob demanda
- **Font Display Swap**: Evita FOUC com fontes
- **Preconnect**: Links para domínios externos
- **Image Optimization**: Next/Image com sizes otimizados
- **CSS Critical**: Estilos críticos inline

### Métricas Esperadas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🎯 SEO

### Implementações
- **Meta Tags**: Título, descrição, keywords
- **Open Graph**: Compartilhamento em redes sociais
- **Schema.org**: Dados estruturados para buscadores
- **Canonical URLs**: Evita conteúdo duplicado
- **Sitemap**: Geração automática (configurar)

### Próximos Passos
1. Configurar Google Search Console
2. Implementar Google Analytics
3. Criar sitemap.xml
4. Configurar robots.txt
5. Implementar breadcrumbs

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### Outras Plataformas
- **Netlify**: Conectar repositório GitHub
- **AWS Amplify**: Deploy automático
- **Railway**: Deploy com Docker

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

**Renova Verde Hub**
- Website: https://renovaverdehub.com
- Email: contato@renovaverdehub.com
- Instagram: @renovaverdehub

---

Desenvolvido com 💚 para um futuro mais sustentável.

