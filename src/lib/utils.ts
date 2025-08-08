export function generateSlug(title: string): string {
  // Palavras comuns que podem ser removidas para encurtar o slug
  const stopWords = [
    'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas',
    'de', 'da', 'do', 'das', 'dos', 'em', 'na', 'no', 'nas', 'nos',
    'para', 'por', 'com', 'sem', 'sobre', 'entre', 'até', 'desde',
    'e', 'ou', 'mas', 'que', 'se', 'como', 'quando', 'onde',
    'seu', 'sua', 'seus', 'suas', 'meu', 'minha', 'meus', 'minhas',
    'este', 'esta', 'estes', 'estas', 'esse', 'essa', 'esses', 'essas',
    'aquele', 'aquela', 'aqueles', 'aquelas',
    'guia', 'definitivo', 'completo', 'melhor', 'melhores', 'top',
    'dicas', 'como', 'fazer', 'criar', 'transformar', 'casa', 'sua'
  ];

  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .split(/\s+/) // Divide em palavras
    .filter(word => word.length > 2 && !stopWords.includes(word)) // Remove palavras pequenas e stop words
    .slice(0, 6) // Limita a 6 palavras principais
    .join('-') // Une com hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}

export function generateSlugFromKeywords(keywords: string): string {
  return keywords
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function extractExcerpt(content: string, maxLength: number = 160): string {
  // Remove HTML tags se houver
  const plainText = content.replace(/<[^>]*>/g, '');
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength).trim() + '...';
}

export function generateMetaDescription(content: string, title: string): string {
  // Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, '');
  
  // Pega os primeiros 150-160 caracteres do conteúdo
  let description = plainText.substring(0, 150).trim();
  
  // Se não terminar com ponto final, adiciona reticências
  if (!description.endsWith('.') && !description.endsWith('!') && !description.endsWith('?')) {
    description += '...';
  }
  
  return description;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function isValidCategory(category: string): boolean {
  const validCategories = ['Jardinagem', 'Energia Renovável', 'Reforma Ecológica', 'Compostagem', 'Economia de Água', 'Sustentabilidade'];
  return validCategories.includes(category);
}

