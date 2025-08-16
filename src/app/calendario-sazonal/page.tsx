'use client';

import { useState } from 'react';
import { seasons, getCurrentSeason } from '@/lib/seasonalCalendar';
import SEOEnhanced from '@/components/SEOEnhanced';

interface SeasonalTip {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'Fácil' | 'Média' | 'Difícil';
  timeRequired: string;
}

export default function SeasonalCalendarPage() {
  const [selectedSeason, setSelectedSeason] = useState(getCurrentSeason().name);
  
  const currentSeason = seasons.find(season => season.name === selectedSeason) || getCurrentSeason();
  
  const getSeasonIcon = (seasonName: string) => {
    switch(seasonName) {
      case 'Verão': return '☀️';
      case 'Outono': return '🍂';
      case 'Inverno': return '❄️';
      case 'Primavera': return '🌸';
      default: return '🌱';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-800';
      case 'Média': return 'bg-yellow-100 text-yellow-800';
      case 'Difícil': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <SEOEnhanced
        title="Calendário Sazonal de Atividades Sustentáveis"
        description="Descubra as melhores atividades e projetos para cada estação do ano. Mantenha seu jardim e casa sustentáveis o ano todo com nosso calendário sazonal."
        keywords={['calendário sazonal', 'estações do ano', 'atividades sustentáveis', 'jardinagem sazonal', 'dicas sazonais']}
        url="/calendario-sazonal"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Calendário Sazonal</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra as melhores atividades e projetos para cada estação do ano. 
            Mantenha seu jardim e casa sustentáveis o ano todo.
          </p>
        </div>

        {/* Season Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {seasons.map((season) => (
            <button
              key={season.name}
              onClick={() => setSelectedSeason(season.name)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
                selectedSeason === season.name
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300'
              }`}
            >
              <span className="text-xl mr-2">{getSeasonIcon(season.name)}</span>
              {season.name}
            </button>
          ))}
        </div>

        {/* Season Description */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-12 text-center">
          <div className="flex justify-center text-4xl mb-4">
            {getSeasonIcon(currentSeason.name)}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{currentSeason.name}</h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            {currentSeason.description}
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSeason.tips.map((tip) => (
            <div key={tip.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                    {tip.category}
                  </span>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(tip.difficulty)}`}>
                    {tip.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">{tip.title}</h3>
                <p className="text-gray-600 mb-4">{tip.description}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>⏱️ {tip.timeRequired}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {currentSeason.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seasonal Projects */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Projetos Especiais para {currentSeason.name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Planejamento</h3>
              <p className="text-gray-600">
                {currentSeason.name === 'Primavera' && 'Planeje seu jardim e horta para o ano todo'}
                {currentSeason.name === 'Verão' && 'Organize seu espaço para aproveitar o sol'}
                {currentSeason.name === 'Outono' && 'Prepare seu jardim para o inverno'}
                {currentSeason.name === 'Inverno' && 'Planeje melhorias e projetos para a primavera'}
              </p>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Manutenção</h3>
              <p className="text-gray-600">
                {currentSeason.name === 'Primavera' && 'Prepare o solo e fertilize suas plantas'}
                {currentSeason.name === 'Verão' && 'Regue e proteja suas plantas do calor'}
                {currentSeason.name === 'Outono' && 'Limpe e proteja seu jardim para o inverno'}
                {currentSeason.name === 'Inverno' && 'Conserte ferramentas e organize seu espaço'}
              </p>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Colheita</h3>
              <p className="text-gray-600">
                {currentSeason.name === 'Primavera' && 'Plante sementes e mudas iniciais'}
                {currentSeason.name === 'Verão' && 'Colha frutas e vegetais da estação'}
                {currentSeason.name === 'Outono' && 'Colha frutas e prepare seu jardim para dormir'}
                {currentSeason.name === 'Inverno' && 'Planeje e aprenda para a próxima estação'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}