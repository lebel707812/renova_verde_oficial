# Renova Verde Hub - Landing Page

Uma landing page moderna e responsiva para o Renova Verde Hub, focada em sustentabilidade residencial. Desenvolvida com Next.js 14, TypeScript e Tailwind CSS.

## 🌱 Sobre o Projeto

O Renova Verde Hub é uma plataforma dedicada a promover sustentabilidade residencial através de dicas práticas de jardinagem, reformas ecológicas e energia renovável. Esta landing page foi projetada para converter visitantes em leitores engajados e assinantes da newsletter.

## ✨ Características

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

## 🔮 Futuras Integrações

### APIs Necessárias

#### 1. API de Artigos do Blog
**Localização**: `src/lib/constants.ts` (linha 6)
```typescript
// TODO: Integrar com API de artigos do blog
export const FEATURED_ARTICLES: Article[] = [
  // Substituir dados mock por chamada à API
];
```

**Implementação sugerida**:
```typescript
// src/lib/api.ts
export async function getFeaturedArticles(): Promise<Article[]> {
  const response = await fetch('/api/articles/featured');
  return response.json();
}
```

#### 2. API de Newsletter
**Localização**: `src/components/ui/NewsletterSignup.tsx` (linha 25)
```typescript
// TODO: Integrar com API de newsletter
// Simulação de chamada para API
await new Promise(resolve => setTimeout(resolve, 1000));
```

**Implementação sugerida**:
```typescript
const response = await fetch('/api/newsletter/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
});
```

### Melhorias Recomendadas

1. **Sistema de Busca**: Implementar busca de artigos
2. **Filtros por Categoria**: Navegação por categorias
3. **Analytics**: Google Analytics ou similar
4. **CMS Integration**: Strapi, Contentful ou Sanity
5. **Comentários**: Sistema de comentários nos artigos
6. **PWA**: Progressive Web App features

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

