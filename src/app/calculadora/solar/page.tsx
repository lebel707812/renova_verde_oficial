
'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Head from 'next/head';

export default function SolarCalculatorPage() {
  const [consumo, setConsumo] = useState<number | ''>('');
  const [regiao, setRegiao] = useState<string>('');
  const [economiaMensal, setEconomiaMensal] = useState<number>(0);
  const [economiaAnual, setEconomiaAnual] = useState<number>(0);

  const handleCalculate = () => {
    if (consumo === '' || !regiao) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Valores de tarifa por kWh simplificados para exemplo (em R$)
    // Em um cenário real, isso viria de uma base de dados mais complexa ou API
    const tarifasPorKWh: { [key: string]: number } = {
      'SP': 0.85, // Exemplo: São Paulo
      'MG': 0.92, // Exemplo: Minas Gerais
      'RJ': 0.78, // Exemplo: Rio de Janeiro
      'PR': 0.88, // Exemplo: Paraná
      'RS': 0.90, // Exemplo: Rio Grande do Sul
      'BA': 0.80, // Exemplo: Bahia
      'CE': 0.83, // Exemplo: Ceará
      'AM': 0.95, // Exemplo: Amazonas
      // Adicionar mais estados conforme necessário
    };

    const tarifa = tarifasPorKWh[regiao];

    if (!tarifa) {
      alert('Região não suportada para cálculo. Por favor, selecione um estado válido.');
      return;
    }

    // Estimativa de percentual de economia com solar (simplificado)
    // Em um cenário real, isso dependeria de irradiação solar, tamanho do sistema, etc.
    const percentualEconomia = 0.90; // 90% de economia na conta de luz

    const custoAtualMensal = (consumo as number) * tarifa;
    const economiaEstimadaMensal = custoAtualMensal * percentualEconomia;
    const economiaEstimadaAnual = economiaEstimadaMensal * 12;

    setEconomiaMensal(economiaEstimadaMensal);
    setEconomiaAnual(economiaEstimadaAnual);
  };

  return (
    <MainLayout>
      <Head>
        <title>Calculadora de Economia de Energia Solar | Renova Verde</title>
        <meta name="description" content="Calcule a economia potencial ao instalar painéis solares em sua casa. Insira seu consumo de energia e localização para estimar sua economia mensal e anual. Descubra como a energia fotovoltaica pode reduzir sua conta de luz e valorizar seu imóvel." />
        <meta name="keywords" content="calculadora solar, economia energia solar, painel solar, energia fotovoltaica, sustentabilidade, economia na conta de luz, energia renovável, custo energia solar, retorno investimento solar, energia limpa" />
        <meta property="og:title" content="Calculadora de Economia de Energia Solar | Renova Verde" />
        <meta property="og:description" content="Calcule a economia potencial ao instalar painéis solares em sua casa. Insira seu consumo de energia e localização para estimar sua economia mensal e anual." />
        <meta property="og:url" content="https://renovaverde.com.br/calculadora/solar" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://renovaverde.com.br/calculadora/solar" />
      </Head>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Calculadora de Economia de Energia Solar
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Descubra o quanto você pode economizar na sua conta de luz ao instalar painéis solares.
            Preencha os campos abaixo para ter uma estimativa personalizada e veja o impacto da <strong>energia fotovoltaica</strong> no seu orçamento.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Calcule sua Economia</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="consumo" className="block text-sm font-medium text-gray-700">Consumo Mensal de Energia (kWh)</label>
                <input
                  type="number"
                  id="consumo"
                  name="consumo"
                  placeholder="Ex: 300"
                  value={consumo}
                  onChange={(e) => setConsumo(e.target.value === '' ? '' : Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="regiao" className="block text-sm font-medium text-gray-700">Sua Região (Estado)</label>
                <select
                  id="regiao"
                  name="regiao"
                  value={regiao}
                  onChange={(e) => setRegiao(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                >
                  <option value="">Selecione seu estado</option>
                  <option value="SP">São Paulo</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="PR">Paraná</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="AM">Amazonas</option>
                </select>
              </div>
              <button
                type="button"
                onClick={handleCalculate}
                className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-900 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Calcular Economia
              </button>
            </div>

            <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200 text-center">
              <h3 className="text-xl font-bold text-green-800 mb-4">Sua Economia Estimada:</h3>
              <p className="text-3xl font-extrabold text-green-900">R$ {economiaMensal.toFixed(2).replace('.', ',')} / mês</p>
              <p className="text-lg text-green-700 mt-2">Isso representa uma economia anual de R$ {economiaAnual.toFixed(2).replace('.', ',')}</p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Exemplos de Economia com Energia Solar</h2>
            <p className="text-gray-700 mb-4">
              Veja como a instalação de <strong>painéis solares</strong> pode impactar sua conta de luz em diferentes cenários:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li><strong>Família Pequena (150 kWh/mês em SP):</strong> Com uma tarifa de R$ 0,85/kWh, o custo mensal é de R$ 127,50. Com energia solar, a economia pode chegar a <strong>R$ 114,75 por mês</strong>, totalizando <strong>R$ 1.377,00 por ano</strong>.</li>
              <li><strong>Família Média (300 kWh/mês em MG):</strong> Com uma tarifa de R$ 0,92/kWh, o custo mensal é de R$ 276,00. Com energia solar, a economia pode chegar a <strong>R$ 248,40 por mês</strong>, totalizando <strong>R$ 2.980,80 por ano</strong>.</li>
              <li><strong>Casa Grande (500 kWh/mês no RJ):</strong> Com uma tarifa de R$ 0,78/kWh, o custo mensal é de R$ 390,00. Com energia solar, a economia pode chegar a <strong>R$ 351,00 por mês</strong>, totalizando <strong>R$ 4.212,00 por ano</strong>.</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Esses exemplos demonstram o potencial de <strong>economia na conta de luz</strong> que a <strong>energia solar fotovoltaica</strong> oferece. Os valores podem variar de acordo com o consumo, a tarifa da sua concessionária e a irradiação solar da sua região.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Por que a Energia Solar é a Melhor Escolha para o seu Lar?</h2>
            <p className="text-gray-700 mb-4">
              A <strong>energia solar fotovoltaica</strong> é uma das fontes de energia mais limpas e abundantes disponíveis. Ao converter a luz do sol em eletricidade, você não apenas reduz sua <strong>pegada de carbono</strong>,
              mas também se protege contra o aumento das tarifas de energia e valoriza seu imóvel. É um <strong>investimento sustentável</strong> que oferece <strong>retorno financeiro</strong> e contribui para um futuro mais verde.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Benefícios da Energia Solar:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Redução significativa na conta de luz</strong>: Economize até 90% ou mais na sua fatura de energia.</li>
              <li>Fonte de <strong>energia limpa e renovável</strong>: Contribua para a redução de gases de efeito estufa.</li>
              <li><strong>Valorização do imóvel</strong>: Casas com sistemas solares são mais atraentes no mercado.</li>
              <li><strong>Retorno do investimento a médio prazo</strong>: O sistema se paga em poucos anos.</li>
              <li><strong>Independência energética</strong>: Menos dependência das concessionárias de energia.</li>
              <li><strong>Sustentabilidade ambiental</strong>: Reduza seu impacto no meio ambiente.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Nossa <strong>calculadora de economia de energia solar</strong> é uma ferramenta simplificada para te dar uma ideia
              do potencial de economia. Para um cálculo mais preciso e um projeto personalizado de <strong>energia fotovoltaica</strong>,
              recomendamos consultar um especialista em energia solar na sua região. Invista em <strong>energia renovável</strong> e transforme seu lar!
            </p>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}


