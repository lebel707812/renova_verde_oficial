
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from "@/components/layout/MainLayout";
import SEOEnhanced from '@/components/SEOEnhanced';
import ArticleCard from '@/components/landing/ArticleCard';
import { Article } from '@/types';
import { supabaseAdmin } from '@/lib/supabase';

// Função para buscar artigos da categoria Compostagem
async function getCompostagemArticles(): Promise<Article[]> {
  const supabase = supabaseAdmin;
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('category', 'Compostagem')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Erro ao buscar artigos de Compostagem:', error.message);
      return [];
    }
    return data as Article[];
  } catch (error) {
    console.error('Erro ao buscar artigos de Compostagem:', error);
    return [];
  }
}

export default async function CompostagemCategoryPage() {
  const articles = await getCompostagemArticles();

  return (
    <>
      <SEOEnhanced
        title="Compostagem | Renova Verde"
        description="Aprenda tudo sobre compostagem doméstica, seus benefícios, como começar e quais resíduos podem ser compostados. Transforme seu lixo orgânico em adubo rico para suas plantas."
        keywords="compostagem, compostagem doméstica, adubo orgânico, lixo orgânico, resíduos orgânicos, minhocário, sustentabilidade, horta orgânica"
        url="/categoria/compostagem"
        type="website"
      />
      
      <MainLayout>
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-green-600">Início</Link></li>
                <li>/</li>
                <li><Link href="/categoria" className="hover:text-green-600">Categorias</Link></li>
                <li>/</li>
                <li className="text-gray-900">Compostagem</li>
              </ol>
            </nav>

            {/* Header da categoria */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                Compostagem
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Transforme seus resíduos orgânicos em adubo valioso para suas plantas e contribua para um planeta mais saudável com a compostagem.
              </p>
            </div>
            
            {/* Lista de artigos */}
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhum artigo encontrado
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Ainda não temos artigos publicados nesta categoria. Volte em breve para conferir nosso conteúdo sobre compostagem!
                  </p>
                  <Link
                    href="/artigos"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Ver todos os artigos
                  </Link>
                </div>
              </div>
            )}

            {/* Call to action */}
            {articles.length > 0 && (
              <div className="mt-12 text-center">
                <Link
                  href="/artigos"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Ver todos os artigos
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  );
}


