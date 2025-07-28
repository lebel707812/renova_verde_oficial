import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

interface SEOEnhancedProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
}

export function generateSEOMetadata({
  title,
  description = SITE_CONFIG.description,
  keywords = SITE_CONFIG.keywords,
  ogImage = SITE_CONFIG.ogImage,
  canonical,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  noIndex = false,
}: SEOEnhancedProps): Metadata {
  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.name;
  const fullUrl = canonical ? `${SITE_CONFIG.url}${canonical}` : SITE_CONFIG.url;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_CONFIG.url}${ogImage}`;

  // Combinar keywords padrão com keywords específicas
  const allKeywords = [...new Set([...keywords, ...(tags || [])])];

  const metadata: Metadata = {
    title: {
      default: SITE_CONFIG.name,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description,
    keywords: allKeywords,
    authors: author ? [{ name: author }] : [{ name: 'Renova Verde Hub' }],
    creator: 'Renova Verde Hub',
    publisher: 'Renova Verde Hub',
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonical || '/',
    },
    openGraph: {
      type: type === 'article' ? 'article' : 'website',
      locale: 'pt_BR',
      url: fullUrl,
      title: fullTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title || SITE_CONFIG.name,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullOgImage],
      creator: '@renovaverdehub',
      site: '@renovaverdehub',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // TODO: Adicionar códigos de verificação quando disponíveis
      // google: 'google-verification-code',
      // yandex: 'yandex-verification-code',
      // yahoo: 'yahoo-verification-code',
    },
    category: section,
  };

  return metadata;
}

// Função para gerar Schema.org JSON-LD
export function generateSchemaOrg(props: SEOEnhancedProps & { 
  content?: string;
  readingTime?: number;
  category?: string;
}) {
  const {
    title,
    description = SITE_CONFIG.description,
    canonical,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    content,
    readingTime,
    category,
    ogImage = SITE_CONFIG.ogImage,
  } = props;

  const fullUrl = canonical ? `${SITE_CONFIG.url}${canonical}` : SITE_CONFIG.url;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_CONFIG.url}${ogImage}`;

  if (type === 'article' && title && content) {
    // Schema para artigos
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      image: fullOgImage,
      url: fullUrl,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      author: {
        '@type': 'Person',
        name: author || 'Renova Verde Hub',
        url: `${SITE_CONFIG.url}/sobre`,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_CONFIG.url}/images/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl,
      },
      articleSection: category,
      wordCount: content.split(' ').length,
      timeRequired: readingTime ? `PT${readingTime}M` : undefined,
      inLanguage: 'pt-BR',
      about: {
        '@type': 'Thing',
        name: 'Sustentabilidade Residencial',
      },
      keywords: category,
    };
  }

  // Schema para website/páginas gerais
  return {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    sameAs: [
      'https://instagram.com/renovaverdehub',
      'https://facebook.com/renovaverdehub',
      'https://youtube.com/@renovaverdehub',
      'https://linkedin.com/company/renovaverdehub'
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/images/logo.png`,
      },
    },
  };
}

// Componente para inserir Schema.org JSON-LD
export function SchemaOrgScript(props: Parameters<typeof generateSchemaOrg>[0]) {
  const schema = generateSchemaOrg(props);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
}

