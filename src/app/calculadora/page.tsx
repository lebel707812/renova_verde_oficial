
import MainLayout from '@/components/layout/MainLayout';
import Head from 'next/head';
import Link from 'next/link';

export default function CalculadorasPage() {
  return (
    <MainLayout>
      <Head>
        <title>Calculadoras de Sustentabilidade | Renova Verde</title>
        <meta name="description" content="Utilize nossas calculadoras de sustentabilidade para estimar economia de energia solar, captação de água da chuva, quantidade de tinta ecológica e muito mais. Ferramentas práticas para um lar mais verde." />
        <meta name="keywords" content="calculadora solar, economia de energia, captação de água, tinta ecológica, compostagem, telhado verde, ROI sustentável, sustentabilidade, casa verde, eficiência energética" />
        <meta property="og:title" content="Calculadoras de Sustentabilidade | Renova Verde" />
        <meta property="og:description" content="Utilize nossas calculadoras de sustentabilidade para estimar economia de energia solar, captação de água da chuva, quantidade de tinta ecológica e muito mais. Ferramentas práticas para um lar mais verde." />
        <meta property="og:url" content="https://renovaverde.com.br/calculadora" />
        <meta property="og:type" content="website" />
        {/* Adicionar og:image quando tiver uma imagem relevante */}
        {/* <meta property="og:image" content="https://renovaverde.com.br/images/calculadoras-og.jpg" /> */}
        <link rel="canonical" href="https://renovaverde.com.br/calculadora" />
      </Head>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Nossas Calculadoras de Sustentabilidade
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Ferramentas práticas para te ajudar a tomar decisões mais sustentáveis e economizar no seu dia a dia.
            Explore nossas calculadoras e descubra o potencial de um lar mais verde!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Espaço para as calculadoras individuais */}
            <Link href="/calculadora/solar" className="block">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculadora de Economia de Energia Solar</h2>
                <p className="text-gray-700">Mostra quanto você pode economizar instalando painéis solares, com base no consumo mensal (kWh) e região.</p>
              </div>
            </Link>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculadora de Captação de Água da Chuva</h2>
              <p className="text-gray-700">Calcula litros captáveis por mês com base na área do telhado e precipitação média da cidade.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculadora de Tinta para Pintura Sustentável</h2>
              <p className="text-gray-700">Determina a quantidade de tinta ecológica necessária para paredes, considerando janelas/portas e número de demãos.</p>
            </div>
            {/* As outras calculadoras serão adicionadas aqui no futuro */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}


