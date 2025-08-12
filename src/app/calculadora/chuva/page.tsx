
'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Head from 'next/head';

export default function RainwaterCalculatorPage() {
  const [areaTelhado, setAreaTelhado] = useState<number | ''>('');
  const [precipitacao, setPrecipitacao] = useState<number | ''>('');
  const [litrosCaptados, setLitrosCaptados] = useState<number>(0);

  const handleCalculate = () => {
    if (areaTelhado === '' || precipitacao === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Coeficiente de escoamento (ex: 0.8 para telhados típicos)
    // Representa a porcentagem da água da chuva que realmente pode ser coletada
    const coeficienteEscoamento = 0.8; 

    // 1 mm de chuva em 1 m² = 1 litro de água
    const captacaoEstimada = (areaTelhado as number) * (precipitacao as number) * coeficienteEscoamento;

    setLitrosCaptados(captacaoEstimada);
  };

  return (
    <MainLayout>
      <Head>
        <title>Calculadora de Captação de Água da Chuva | Renova Verde</title>
        <meta name="description" content="Calcule o potencial de captação de água da chuva em sua casa. Estime a quantidade de litros que você pode economizar com base na área do telhado e precipitação da sua cidade. Descubra os benefícios da sustentabilidade hídrica e do reuso de água." />
        <meta name="keywords" content="calculadora água da chuva, captação de água, reuso de água, sustentabilidade hídrica, economia de água, telhado verde, cisternas, água da chuva, recursos hídricos, meio ambiente, sustentabilidade" />
        <meta property="og:title" content="Calculadora de Captação de Água da Chuva | Renova Verde" />
        <meta property="og:description" content="Calcule o potencial de captação de água da chuva em sua casa. Estime a quantidade de litros que você pode economizar com base na área do telhado e precipitação da sua cidade." />
        <meta property="og:url" content="https://renovaverde.com.br/calculadora/chuva" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://renovaverde.com.br/calculadora/chuva" />
      </Head>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Calculadora de Captação de Água da Chuva
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Descubra o potencial de <strong>economia de água</strong> e a contribuição para o meio ambiente ao captar água da chuva.
            Preencha os campos abaixo para estimar a quantidade de litros que você pode coletar e como a <strong>sustentabilidade hídrica</strong> pode transformar seu lar.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Calcule sua Captação</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="areaTelhado" className="block text-sm font-medium text-gray-700">Área do Telhado (m²)</label>
                <input
                  type="number"
                  id="areaTelhado"
                  name="areaTelhado"
                  placeholder="Ex: 100"
                  value={areaTelhado}
                  onChange={(e) => setAreaTelhado(e.target.value === '' ? '' : Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="precipitacao" className="block text-sm font-medium text-gray-700">Precipitação Média Mensal (mm)</label>
                <input
                  type="number"
                  id="precipitacao"
                  name="precipitacao"
                  placeholder="Ex: 150 (verifique a média da sua cidade)"
                  value={precipitacao}
                  onChange={(e) => setPrecipitacao(e.target.value === '' ? '' : Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <button
                type="button"
                onClick={handleCalculate}
                className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-900 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Calcular Captação
              </button>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Captação Estimada:</h3>
              <p className="text-3xl font-extrabold text-blue-900">{litrosCaptados.toFixed(2).replace('.', ',')} Litros / mês</p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Exemplos de Captação de Água da Chuva</h2>
            <p className="text-gray-700 mb-4">
              Veja o potencial de <strong>captação de água da chuva</strong> em diferentes cenários:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li><strong>Casa Pequena (50 m² de telhado, 100 mm de chuva/mês):</strong> Com um coeficiente de escoamento de 0.8, você pode captar aproximadamente <strong>4.000 litros por mês</strong>. Ideal para regar jardins e lavar áreas externas.</li>
              <li><strong>Casa Média (100 m² de telhado, 150 mm de chuva/mês):</strong> Com a mesma eficiência, a captação pode chegar a <strong>12.000 litros por mês</strong>. Suficiente para descargas, lavagem de roupas e outras atividades não potáveis.</li>
              <li><strong>Grande Residência (200 m² de telhado, 200 mm de chuva/mês):</strong> O potencial de captação é de cerca de <strong>32.000 litros por mês</strong>. Uma excelente fonte para suprir grande parte das necessidades hídricas não potáveis da casa.</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Esses exemplos demonstram a viabilidade do <strong>reuso de água</strong> e a <strong>economia de água</strong> que a <strong>captação de água da chuva</strong> pode proporcionar. Os valores podem variar de acordo com a área real do telhado, a intensidade da chuva e a eficiência do sistema de coleta.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Por que Captar Água da Chuva é Essencial para a Sustentabilidade?</h2>
            <p className="text-gray-700 mb-4">
              A <strong>captação de água da chuva</strong> é uma prática sustentável que oferece diversos benefícios, tanto ambientais quanto econômicos. Ao coletar e armazenar a água da chuva, você reduz o consumo de <strong>água potável</strong> da rede pública, diminui sua conta de água e contribui para a preservação dos <strong>recursos hídricos</strong>. É uma forma eficaz de promover a <strong>sustentabilidade hídrica</strong> e reduzir o impacto ambiental do seu lar.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Benefícios da Captação de Água da Chuva:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Redução da conta de água</strong>: Diminua seus gastos mensais com água.</li>
              <li><strong>Diminuição da pressão sobre os recursos hídricos</strong>: Contribua para a conservação da água potável.</li>
              <li><strong>Reuso de água para fins não potáveis</strong>: Utilize a água da chuva para jardinagem, limpeza, descarga e outras necessidades.</li>
              <li><strong>Minimização de enchentes urbanas</strong>: Ajude a reduzir o escoamento superficial e o risco de inundações.</li>
              <li><strong>Independência hídrica em períodos de seca</strong>: Tenha uma fonte alternativa de água.</li>
              <li><strong>Contribuição para o meio ambiente</strong>: Pratique a sustentabilidade e ajude a proteger o planeta.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Nossa <strong>calculadora de captação de água da chuva</strong> é uma ferramenta simplificada para te dar uma ideia
              do potencial de economia. Para um projeto mais detalhado e a instalação de um sistema de captação de <strong>água da chuva</strong>,
              recomendamos consultar um especialista na sua região. Invista no <strong>reuso de água</strong> e faça a diferença!
            </p>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}


