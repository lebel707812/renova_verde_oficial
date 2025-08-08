# Guia de Desenvolvimento - Renova Verde Hub

## 🔧 Configuração do Ambiente

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.renovaverdehub.com
NEWSLETTER_API_KEY=your_newsletter_api_key
BLOG_API_KEY=your_blog_api_key

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# SEO
NEXT_PUBLIC_SITE_URL=https://renovaverdehub.com
```

## 🏗️ Arquitetura

### Padrões de Design
- **Component Composition**: Componentes reutilizáveis e compostos
- **Props Interface**: Tipagem TypeScript para todas as props
- **Separation of Concerns**: Lógica separada da apresentação
- **Mobile-First**: Design responsivo desde o início

### Estrutura de Pastas
```
src/
├── app/                 # App Router (Next.js 14)
├── components/          # Componentes React
│   ├── ui/             # Componentes de interface básicos
│   └── landing/        # Componentes específicos da landing
├── lib/                # Utilitários e configurações
├── types/              # Definições TypeScript
└── styles/             # Estilos globais (se necessário)
```

## 🎨 Sistema de Design

### Cores
```css
/* Paleta Principal */
--primary-50: #f0f9f4;
--primary-900: #1a3f32;  /* Cor principal */
--primary-950: #0d2318;

/* Cores Secundárias */
--secondary-50: #f8fafc;
--secondary-900: #0f172a;
```

### Tipografia
```css
/* Fontes */
--font-geist-sans: 'Geist Sans', system-ui, sans-serif;
--font-geist-mono: 'Geist Mono', monospace;

/* Tamanhos */
text-4xl: 2.25rem;  /* Títulos principais */
text-xl: 1.25rem;   /* Subtítulos */
text-base: 1rem;    /* Texto corpo */
```

### Espaçamento
```css
/* Sistema de espaçamento 8px */
space-2: 0.5rem;   /* 8px */
space-4: 1rem;     /* 16px */
space-8: 2rem;     /* 32px */
space-16: 4rem;    /* 64px */
```

## 🔌 Integrações de API

### 1. API de Artigos

#### Estrutura de Dados
```typescript
interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  slug: string;
  publishedAt: string;
  readTime: number;
  author: {
    name: string;
    avatar: string;
  };
  tags: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}
```

#### Endpoints Necessários
```typescript
// src/lib/api/articles.ts
export const articlesApi = {
  // Listar artigos em destaque
  getFeatured: () => fetch('/api/articles/featured'),
  
  // Buscar artigo por slug
  getBySlug: (slug: string) => fetch(`/api/articles/${slug}`),
  
  // Listar por categoria
  getByCategory: (category: string) => fetch(`/api/articles?category=${category}`),
  
  // Buscar artigos
  search: (query: string) => fetch(`/api/articles/search?q=${query}`)
};
```

### 2. API de Newsletter

#### Estrutura de Dados
```typescript
interface NewsletterSubscription {
  email: string;
  name?: string;
  preferences: {
    frequency: 'weekly' | 'monthly';
    categories: string[];
  };
  source: string; // 'landing-page', 'blog', etc.
  timestamp: string;
}
```

#### Implementação
```typescript
// src/lib/api/newsletter.ts
export const newsletterApi = {
  subscribe: async (data: NewsletterSubscription) => {
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Erro ao cadastrar email');
    }
    
    return response.json();
  },
  
  unsubscribe: async (email: string) => {
    return fetch('/api/newsletter/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
  }
};
```

## 📊 Analytics e Tracking

### Google Analytics 4
```typescript
// src/lib/analytics.ts
export const trackEvent = (eventName: string, parameters: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Eventos importantes para rastrear
export const events = {
  newsletterSignup: (email: string) => trackEvent('newsletter_signup', { email }),
  articleClick: (articleId: string) => trackEvent('article_click', { article_id: articleId }),
  ctaClick: (ctaName: string) => trackEvent('cta_click', { cta_name: ctaName })
};
```

### Hotjar/Clarity
```typescript
// src/lib/heatmaps.ts
export const initHeatmaps = () => {
  // Implementar Hotjar ou Microsoft Clarity
  // para análise de comportamento do usuário
};
```

## 🧪 Testes

### Configuração Jest
```javascript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

### Testes de Componentes
```typescript
// src/components/__tests__/NewsletterSignup.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import NewsletterSignup from '../ui/NewsletterSignup';

describe('NewsletterSignup', () => {
  it('should validate email format', () => {
    render(<NewsletterSignup variant="compact" />);
    
    const input = screen.getByPlaceholderText('Seu melhor email');
    fireEvent.change(input, { target: { value: 'invalid-email' } });
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByText('Por favor, insira um email válido')).toBeInTheDocument();
  });
});
```

## 🚀 Performance

### Otimizações Implementadas

#### 1. Imagens
```typescript
// Uso correto do Next/Image
<Image
  src="/images/hero-jardim-vertical.webp"
  alt="Jardim vertical sustentável"
  fill
  className="object-cover"
  priority // Para imagens above-the-fold
  sizes="100vw" // Para responsividade
/>
```

#### 2. Fontes
```typescript
// Otimização de fontes
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: 'swap', // Evita FOUC
  preload: true,   // Precarrega fonte principal
});
```

#### 3. Bundle Splitting
```typescript
// Dynamic imports para componentes pesados
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Carregando...</div>,
  ssr: false // Se não precisar de SSR
});
```

### Métricas de Performance
```typescript
// src/lib/performance.ts
export const measurePerformance = () => {
  if (typeof window !== 'undefined') {
    // Core Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
};
```

## 🔒 Segurança

### Validação de Dados
```typescript
// src/lib/validation.ts
import { z } from 'zod';

export const emailSchema = z.string().email('Email inválido');

export const newsletterSchema = z.object({
  email: emailSchema,
  name: z.string().optional(),
  preferences: z.object({
    frequency: z.enum(['weekly', 'monthly']),
    categories: z.array(z.string())
  }).optional()
});
```

### Headers de Segurança
```javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};
```

## 📱 PWA (Progressive Web App)

### Configuração
```javascript
// next.config.mjs
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  // outras configurações
});
```

### Manifest
```json
// public/manifest.json
{
  "name": "Renova Verde Hub",
  "short_name": "RenovaVerde",
  "description": "Sustentabilidade Inteligente para Seu Lar",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a3f32",
  "theme_color": "#1a3f32",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 🔄 CI/CD

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📈 Monitoramento

### Error Tracking
```typescript
// src/lib/monitoring.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

export const logError = (error: Error, context?: any) => {
  Sentry.captureException(error, { extra: context });
};
```

### Uptime Monitoring
- **Pingdom**: Monitoramento de uptime
- **StatusPage**: Página de status público
- **New Relic**: APM e performance

## 🎯 Roadmap

### Fase 1 - MVP (Atual)
- ✅ Landing page responsiva
- ✅ Seção hero com CTA
- ✅ Artigos em destaque
- ✅ Newsletter signup
- ✅ SEO básico

### Fase 2 - Integração
- 🔄 API de artigos
- 🔄 API de newsletter
- 🔄 Sistema de busca
- 🔄 Filtros por categoria

### Fase 3 - Expansão
- 📋 Blog completo
- 📋 Sistema de comentários
- 📋 Área do usuário
- 📋 Notificações push

### Fase 4 - Avançado
- 📋 PWA completo
- 📋 Modo offline
- 📋 Personalização de conteúdo
- 📋 Gamificação

---

**Última atualização**: Janeiro 2024
**Versão**: 1.0.0

