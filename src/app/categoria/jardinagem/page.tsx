
import MainLayout from "@/components/layout/MainLayout";
import Head from "next/head";

export default function JardinagemCategoryPage() {
  return (
    <MainLayout>
      <Head>
        <title>Jardinagem Sustentável | Renova Verde</title>
        <meta name="description" content="Descubra dicas e guias para uma jardinagem sustentável, desde o plantio de hortas orgânicas até o uso consciente da água e a criação de espaços verdes que beneficiam o meio ambiente." />
        <meta name="keywords" content="jardinagem sustentável, horta orgânica, plantas nativas, economia de água no jardim, adubo natural, permacultura, paisagismo ecológico" />
        <meta property="og:title" content="Jardinagem Sustentável | Renova Verde" />
        <meta property="og:description" content="Descubra dicas e guias para uma jardinagem sustentável, desde o plantio de hortas orgânicas até o uso consciente da água e a criação de espaços verdes." />
        <meta property="og:url" content="https://renovaverde.com.br/categoria/jardinagem" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://renovaverde.com.br/categoria/jardinagem" />
      </Head>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Jardinagem Sustentável
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Transforme seu jardim em um oásis de sustentabilidade com nossas dicas sobre hortas orgânicas, plantas nativas e práticas que respeitam o meio ambiente.
          </p>
          
          {/* Aqui serão listados os artigos relacionados a esta categoria */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Exemplo de card de artigo - será preenchido dinamicamente */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Como Montar uma Horta Orgânica em Casa</h2>
              <p className="text-gray-700">Um guia completo para cultivar seus próprios alimentos de forma saudável.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Plantas Nativas: Beleza e Sustentabilidade</h2>
              <p className="text-gray-700">Descubra as vantagens de usar espécies nativas em seu paisagismo.</p>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}


