
import MainLayout from "@/components/layout/MainLayout";
import Head from "next/head";

export default function EnergiaRenovavelCategoryPage() {
  return (
    <MainLayout>
      <Head>
        <title>Energia Renovável | Renova Verde</title>
        <meta name="description" content="Explore o mundo da energia renovável: solar, eólica, biomassa e mais. Saiba como gerar sua própria energia limpa, reduzir custos e contribuir para um futuro mais sustentável." />
        <meta name="keywords" content="energia renovável, energia solar, energia eólica, biomassa, energia limpa, sustentabilidade energética, painéis solares, aquecimento solar" />
        <meta property="og:title" content="Energia Renovável | Renova Verde" />
        <meta property="og:description" content="Explore o mundo da energia renovável: solar, eólica, biomassa e mais. Saiba como gerar sua própria energia limpa." />
        <meta property="og:url" content="https://renovaverde.com.br/categoria/energia-renovavel" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://renovaverde.com.br/categoria/energia-renovavel" />
      </Head>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Energia Renovável
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Descubra as diversas fontes de energia renovável e como elas podem transformar sua casa e seu estilo de vida, gerando economia e sustentabilidade.
          </p>
          
          {/* Aqui serão listados os artigos relacionados a esta categoria */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Exemplo de card de artigo - será preenchido dinamicamente */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tudo sobre Energia Solar Fotovoltaica</h2>
              <p className="text-gray-700">Guia completo para entender e instalar painéis solares em sua residência.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Aquecimento Solar de Água: Vale a Pena?</h2>
              <p className="text-gray-700">Analise os custos e benefícios de um sistema de aquecimento solar para sua casa.</p>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}


