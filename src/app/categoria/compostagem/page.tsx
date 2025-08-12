
import MainLayout from "@/components/layout/MainLayout";
import Head from "next/head";

export default function CompostagemCategoryPage() {
  return (
    <MainLayout>
      <Head>
        <title>Compostagem | Renova Verde</title>
        <meta name="description" content="Aprenda tudo sobre compostagem doméstica, seus benefícios, como começar e quais resíduos podem ser compostados. Transforme seu lixo orgânico em adubo rico para suas plantas." />
        <meta name="keywords" content="compostagem, compostagem doméstica, adubo orgânico, lixo orgânico, resíduos orgânicos, minhocário, sustentabilidade, horta orgânica" />
        <meta property="og:title" content="Compostagem | Renova Verde" />
        <meta property="og:description" content="Aprenda tudo sobre compostagem doméstica, seus benefícios, como começar e quais resíduos podem ser compostados." />
        <meta property="og:url" content="https://renovaverde.com.br/categoria/compostagem" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://renovaverde.com.br/categoria/compostagem" />
      </Head>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Compostagem
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Transforme seus resíduos orgânicos em adubo valioso para suas plantas e contribua para um planeta mais saudável com a compostagem.
          </p>
          
          {/* Aqui serão listados os artigos relacionados a esta categoria */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Exemplo de card de artigo - será preenchido dinamicamente */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Guia Completo de Compostagem Doméstica</h2>
              <p className="text-gray-700">Passo a passo para começar sua própria composteira em casa.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">O que Pode e o que Não Pode Composto?</h2>
              <p className="text-gray-700">Lista detalhada de resíduos para uma compostagem eficiente.</p>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}


