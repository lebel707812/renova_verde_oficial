
import MainLayout from '@/components/layout/MainLayout';
import Head from 'next/head';

export default function ReformasEcologicasCategoryPage() {
  return (
    <MainLayout>
      <Head>
        <title>Reformas Ecológicas | Renova Verde</title>
        <meta name="description" content="Descubra tudo sobre reformas ecológicas, materiais sustentáveis, e como transformar sua casa em um lar mais verde e eficiente. Dicas e guias completos para construções e renovações conscientes." />
        <meta name="keywords" content="reformas ecológicas, construção sustentável, materiais ecológicos, casa verde, arquitetura sustentável, bioarquitetura, design sustentável" />
        <meta property="og:title" content="Reformas Ecológicas | Renova Verde" />
        <meta property="og:description" content="Descubra tudo sobre reformas ecológicas, materiais sustentáveis, e como transformar sua casa em um lar mais verde e eficiente." />
        <meta property="og:url" content="https://renovaverde.com.br/categoria/reformas-ecologicas" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://renovaverde.com.br/categoria/reformas-ecologicas" />
      </Head>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Reformas Ecológicas
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Explore nosso conteúdo sobre como realizar reformas e construções de forma sustentável, utilizando materiais ecológicos e técnicas que minimizam o impacto ambiental.
          </p>
          
          {/* Aqui serão listados os artigos relacionados a esta categoria */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Exemplo de card de artigo - será preenchido dinamicamente */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Artigo sobre Telhados Verdes</h2>
              <p className="text-gray-700">Descubra os benefícios e como implementar um telhado verde em sua casa.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Guia de Materiais Sustentáveis</h2>
              <p className="text-gray-700">Conheça as melhores opções de materiais ecológicos para sua reforma.</p>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}


