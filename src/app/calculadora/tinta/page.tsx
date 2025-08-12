
'use client';

import { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import Head from "next/head";

export default function PaintCalculatorPage() {
  const [comprimentoParede, setComprimentoParede] = useState<number | ''>('');
  const [alturaParede, setAlturaParede] = useState<number | ''>('');
  const [areaPortasJanelas, setAreaPortasJanelas] = useState<number | ''>('');
  const [demao, setDemao] = useState<number | ''>('');
  const [tintaNecessaria, setTintaNecessaria] = useState<number>(0);

  const handleCalculate = () => {
    if (comprimentoParede === '' || alturaParede === '' || demao === '') {
      alert('Por favor, preencha todos os campos obrigatórios (Comprimento, Altura e Demãos).');
      return;
    }

    const areaTotalParede = (comprimentoParede as number) * (alturaParede as number);
    const areaUtil = areaTotalParede - (areaPortasJanelas === '' ? 0 : (areaPortasJanelas as number));

    // Rendimento médio da tinta: 5 m² por litro por demão (pode variar por tipo de tinta)
    const rendimentoPorLitroPorDemao = 5; 

    const totalAreaParaPintar = areaUtil * (demao as number);
    const tintaCalculada = totalAreaParaPintar / rendimentoPorLitroPorDemao;

    setTintaNecessaria(tintaCalculada);
  };

  return (
    <MainLayout>
      <Head>
        <title>Calculadora de Tinta para Pintura Sustentável | Renova Verde</title>
        <meta name="description" content="Calcule a quantidade de tinta ecológica necessária para sua pintura. Considere janelas, portas e demãos para uma estimativa precisa e evite desperdícios. Use nossa calculadora de tinta para uma reforma sustentável e econômica." />
        <meta name="keywords" content="calculadora de tinta, tinta ecológica, pintura sustentável, economia de tinta, reforma sustentável, casa verde, desperdício zero, cálculo de tinta, pintura residencial, materiais ecológicos" />
        <meta property="og:title" content="Calculadora de Tinta para Pintura Sustentável | Renova Verde" />
        <meta property="og:description" content="Calcule a quantidade de tinta ecológica necessária para sua pintura. Considere janelas, portas e demãos para uma estimativa precisa e evite desperdícios." />
        <meta property="og:url" content="https://renovaverde.com.br/calculadora/tinta" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://renovaverde.com.br/calculadora/tinta" />
      </Head>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Calculadora de Tinta para Pintura Sustentável
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Estime a quantidade exata de <strong>tinta ecológica</strong> necessária para o seu projeto, evitando desperdícios e garantindo uma <strong>pintura sustentável</strong> e econômica.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Calcule sua Necessidade de Tinta</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="comprimentoParede" className="block text-sm font-medium text-gray-700">Comprimento da Parede (metros)</label>
                <input
                  type="number"
                  id="comprimentoParede"
                  name="comprimentoParede"
                  placeholder="Ex: 5"
                  value={comprimentoParede}
                  onChange={(e) => setComprimentoParede(e.target.value === '' ? '' : Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="alturaParede" className="block text-sm font-medium text-gray-700">Altura da Parede (metros)</label>
                <input
                  type="number"
                  id="alturaParede"
                  name="alturaParede"
                  placeholder="Ex: 2.8"
                  value={alturaParede}
                  onChange={(e) => setAlturaParede(e.target.value === '' ? '' : Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="areaPortasJanelas" className="block text-sm font-medium text-gray-700">Área de Portas e Janelas (m²)</label>
                <input
                  type="number"
                  id="areaPortasJanelas"
                  name="areaPortasJanelas"
                  placeholder="Ex: 2 (se houver)"
                  value={areaPortasJanelas}
                  onChange={(e) => setAreaPortasJanelas(e.target.value === '' ? '' : Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="demao" className="block text-sm font-medium text-gray-700">Número de Demãos</label>
                <input
                  type="number"
                  id="demao"
                  name="demao"
                  placeholder="Ex: 2"
                  value={demao}
                  onChange={(e) => setDemao(e.target.value === '' ? '' : Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <button
                type="button"
                onClick={handleCalculate}
                className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-900 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Calcular Tinta
              </button>
            </div>

            <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
              <h3 className="text-xl font-bold text-yellow-800 mb-4">Tinta Necessária:</h3>
              <p className="text-3xl font-extrabold text-yellow-900">{tintaNecessaria.toFixed(2).replace('.', ',')} Litros</p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Exemplos de Cálculo de Tinta Ecológica</h2>
            <p className="text-gray-700 mb-4">
              Veja como nossa <strong>calculadora de tinta</strong> pode te ajudar a planejar sua <strong>pintura sustentável</strong>:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li><strong>Quarto Pequeno (3m x 4m, 2.5m altura, 1 porta, 2 demãos):</strong>
                Área da parede: (3+4)*2*2.5 = 35m². Área da porta: ~1.8m². Área útil: 35 - 1.8 = 33.2m².
                Tinta necessária: (33.2 * 2 demãos) / 5 m²/L = <strong>13.28 Litros</strong>.</li>
              <li><strong>Sala Média (5m x 6m, 2.8m altura, 1 janela, 2 demãos):</strong>
                Área da parede: (5+6)*2*2.8 = 61.6m². Área da janela: ~1.5m². Área útil: 61.6 - 1.5 = 60.1m².
                Tinta necessária: (60.1 * 2 demãos) / 5 m²/L = <strong>24.04 Litros</strong>.</li>
              <li><strong>Corredor (10m x 1.5m, 2.6m altura, sem aberturas, 1 demão):</strong>
                Área da parede: (10+1.5)*2*2.6 = 60.06m². Área útil: 60.06m².
                Tinta necessária: (60.06 * 1 demão) / 5 m²/L = <strong>12.01 Litros</strong>.</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Esses exemplos ilustram a importância de um <strong>cálculo de tinta</strong> preciso para evitar o desperdício e otimizar sua <strong>reforma sustentável</strong>. Lembre-se que o rendimento da tinta pode variar de acordo com a marca e o tipo de superfície.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pintura Sustentável: Economia e Meio Ambiente</h2>
            <p className="text-gray-700 mb-4">
              A escolha da <strong>tinta certa</strong> e o cálculo preciso da quantidade necessária são cruciais para uma <strong>pintura sustentável</strong>.
              <strong>Tintas ecológicas</strong>, com baixa emissão de VOCs (Compostos Orgânicos Voláteis), protegem sua saúde e o meio ambiente, contribuindo para a <strong>qualidade do ar interno</strong>.
              Evitar o <strong>desperdício de tinta</strong> significa menos resíduos, menor impacto ambiental e mais <strong>economia</strong> para o seu bolso.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Benefícios da Pintura Sustentável:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Menor impacto ambiental</strong>: Tintas com formulações mais naturais e menos tóxicas.</li>
              <li><strong>Melhora da qualidade do ar interno</strong>: Redução de substâncias nocivas que podem causar alergias e problemas respiratórios.</li>
              <li><strong>Redução de custos com desperdício</strong>: Calcule a quantidade exata e compre apenas o necessário.</li>
              <li><strong>Maior durabilidade da pintura</strong>: Muitas tintas ecológicas oferecem excelente cobertura e resistência.</li>
              <li><strong>Contribuição para um futuro mais verde</strong>: Apoie a indústria de <strong>materiais ecológicos</strong> e a <strong>sustentabilidade</strong> na construção.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Utilize nossa <strong>calculadora de tinta para pintura sustentável</strong> para planejar sua pintura de forma inteligente e ecológica.
              Para dicas sobre as melhores <strong>tintas sustentáveis</strong> e técnicas de aplicação, explore nossos artigos e transforme seu lar em um ambiente mais saudável e verde!
            </p>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}


