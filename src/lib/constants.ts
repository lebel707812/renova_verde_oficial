import { Article } from '@/types';

// TODO: Integrar com API de artigos do blog
// Substituir dados mock por chamada à API
export const FEATURED_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Como Criar um Jardim Vertical Sustentável em Casa',
    excerpt: 'Descubra técnicas simples para transformar qualquer parede em um jardim vertical que purifica o ar e economiza espaço.',
    category: 'Jardinagem',
    imageUrl: '/images/jardim-vertical-placeholder.jpg',
    slug: 'jardim-vertical-sustentavel',
    publishedAt: '2024-01-15',
    readTime: 8
  },
  {
    id: '2',
    title: 'Energia Solar Residencial: Guia Completo para Iniciantes',
    excerpt: 'Tudo que você precisa saber sobre instalação de painéis solares em casa, custos, benefícios e retorno do investimento.',
    category: 'Energia Renovável',
    imageUrl: '/images/energia-solar-placeholder.jpg',
    slug: 'energia-solar-residencial-guia',
    publishedAt: '2024-01-10',
    readTime: 12
  },
  {
    id: '3',
    title: 'Reforma Ecológica: Materiais Sustentáveis para Sua Casa',
    excerpt: 'Conheça os melhores materiais ecológicos para reformas que respeitam o meio ambiente sem abrir mão do design.',
    category: 'Reforma Ecológica',
    imageUrl: '/images/reforma-ecologica-placeholder.jpg',
    slug: 'reforma-ecologica-materiais-sustentaveis',
    publishedAt: '2024-01-05',
    readTime: 10
  }
];

export const ARTICLE_CATEGORIES = [
  'Jardinagem',
  'Energia Renovável', 
  'Reforma Ecológica',
  'Compostagem',
  'Economia de Água',
  'Sustentabilidade'
];

// Configurações do site
export const SITE_CONFIG = {
  name: 'Renova Verde Hub',
  description: 'Sustentabilidade Inteligente para Seu Lar - Dicas práticas de jardinagem, reformas ecológicas e energia renovável para transformar sua casa em um espaço mais verde e eficiente',
  url: 'https://renovaverdehub.com',
  ogImage: '/images/og-image.jpg',
  keywords: [
    'sustentabilidade residencial',
    'jardinagem urbana',
    'energia renovável',
    'reforma ecológica',
    'casa sustentável',
    'jardim vertical',
    'energia solar residencial',
    'materiais ecológicos',
    'compostagem doméstica',
    'economia de água',
    'reciclagem doméstica',
    'construção sustentável',
    'horta em casa',
    'painéis solares',
    'arquitetura verde',
    'sustentabilidade doméstica',
    'vida sustentável',
    'ecologia residencial',
    'meio ambiente',
    'green living',
  ],
  author: 'Renova Verde Hub',
  language: 'pt-BR',
  locale: 'pt_BR',
  type: 'website',
  twitter: '@renovaverdehub',
};

// URLs das redes sociais
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/renovaverdehub',
  facebook: 'https://facebook.com/renovaverdehub',
  youtube: 'https://youtube.com/@renovaverdehub',
  linkedin: 'https://linkedin.com/company/renovaverdehub',
};

export type ArticleCategory = typeof ARTICLE_CATEGORIES[number];

