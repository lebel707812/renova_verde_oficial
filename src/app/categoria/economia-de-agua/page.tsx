
import MainLayout from '@/components/layout/MainLayout';
import Head from 'next/head';

export default function EconomiaDeAguaCategoryPage() {
  return (
    <MainLayout>
      <Head>
        <title>Economia de Água | Renova Verde</title>
        <meta name="description" content="Aprenda sobre a economia de água, captação de água da chuva, reuso e dicas para reduzir o consumo em sua casa. Contribua para a sustentabilidade hídrica e diminua sua conta de água." />
        <meta name="keywords" content="economia de água, captação de água da chuva, reuso de água, sustentabilidade hídrica, consumo consciente, dicas de economia de água" />
        <meta property="og:title" content="Economia de Água | Renova Verde" />
        <meta property="og:description" content="Aprenda sobre a economia de água, captação de água da chuva, reuso e dicas para reduzir o consumo em sua casa." />
        <meta property="og:url" content="https://renovaverde.com.br/categoria/economia-de-agua" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://renovaverde.com.br/categoria/economia-de-agua" />
      </Head>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Economia de Água
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Descubra como economizar água em sua casa, desde a captação da chuva até o reuso e dicas práticas para o dia a dia, contribuindo para um futuro mais sustentável.
          </p>
          
          {/* Aqui serão listados os artigos relacionados a esta categoria */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Exemplo de card de artigo - será preenchido dinamicamente */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Artigo sobre Reuso de Água Cinza</h2>
              <p className="text-gray-700">Aprenda a reutilizar a água do banho e da máquina de lavar.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dicas para Reduzir o Consumo de Água</h2>
              <p className="text-gray-700">Pequenas mudanças que fazem uma grande diferença na sua conta de água.</p>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}


