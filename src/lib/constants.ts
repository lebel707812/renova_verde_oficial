import { Article } from '@/types';

export const FEATURED_ARTICLES: Article[] = [
  {
    id: '73',
    title: 'O Guia Definitivo para o Reaproveitamento de Água da Chuva: Economize, Proteja o Planeta e Transforme seu Jardim',
    excerpt: 'A crise hídrica é uma realidade que afeta cada vez mais pessoas e regiões em todo o mundo. A água, um recurso essencial para a vida, está se tornando escassa, e...',
    category: 'Economia de Água',
    imageUrl: 'https://ncglgprpvyaezbfoxcbb.supabase.co/storage/v1/object/public/images/articles/1754607444915.png',
    slug: 'o-guia-definitivo-para-o-reaproveitamento-de-agua-da-chuva-economize-proteja-o-planeta-e-transforme-seu-jardim-4',
    publishedAt: '2025-08-07',
    readTime: 11
  },
  {
    id: '67',
    title: 'O Guia Definitivo para uma Reforma Ecológica: Transforme sua Casa em um Oásis de Sustentabilidade',
    excerpt: 'A ideia de reformar a casa pode trazer uma mistura de sentimentos: a empolgação com o novo visual, a esperança de ter um espaço mais funcional e a ansiedade com o caos temporário. Mas e se eu dissesse que essa reforma pode ir além da estética e se tornar uma oportunidade para você contribuir com o planeta e, de quebra, economizar dinheiro a longo prazo? É exatamente isso que propõe a Reforma Ecológica.',
    category: 'Reforma Ecológica',
    imageUrl: 'https://ncglgprpvyaezbfoxcbb.supabase.co/storage/v1/object/public/images/articles/1754607463362.png',
    slug: 'o-guia-definitivo-para-uma-reforma-ecologica-transforme-sua-casa-em-um-oasis-de-sustentabilidade',
    publishedAt: '2025-08-07',
    readTime: 10
  }
];

export const ARTICLE_CATEGORIES = [
  'Economia de Água',
  'Reforma Ecológica'
];

// Configurações do site
export const SITE_CONFIG = {
  name: 'Renova Verde Hub',
  description: 'Sustentabilidade Inteligente para Seu Lar - Dicas práticas de jardinagem, reformas ecológicas e energia renovável para transformar sua casa em um espaço mais verde e eficiente',
  url: 'https://www.renovaverde.com.br',
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


