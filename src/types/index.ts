// Tipos para artigos
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  slug: string;
  createdAt: string;
  publishedAt: string;
  readTime: number;
  author: {
    name: string;
    avatar: string;

  };
}

// Tipos para newsletter
export interface NewsletterSignupProps {
  variant?: 'default' | 'compact';
  placeholder?: string;
  showIcon?: boolean;
  className?: string;
}

// Tipos para componentes de landing
export interface ArticleCardProps {
  article: Article;
  className?: string;
  style?: React.CSSProperties;
}

export interface HeroSectionProps {
  className?: string;
}

// Tipos para SEO
export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

// Tipos para schema.org
export interface WebsiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

