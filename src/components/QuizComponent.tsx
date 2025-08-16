'use client';

import { useState, useEffect } from 'react';
import { Quiz, QuizQuestion, QuizResult } from '@/types/quiz';
import { quizzes, calculateQuizResult } from '@/lib/quizzes';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

interface QuizComponentProps {
  quizId: string;
}

export default function QuizComponent({ quizId }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const quiz = quizzes.find(q => q.id === quizId);
  
  if (!quiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Quiz não encontrado</h1>
        <Link href="/quizzes" className="text-green-600 hover:underline">
          Voltar para todos os quizzes
        </Link>
      </div>
    );
  }

  const handleOptionSelect = (optionId: string) => {
    const question = quiz.questions[currentQuestion];
    
    if (question.type === 'single') {
      setSelectedOptions([optionId]);
      setAnswers(prev => ({
        ...prev,
        [question.id]: [optionId]
      }));
    } else {
      const newSelected = selectedOptions.includes(optionId)
        ? selectedOptions.filter(id => id !== optionId)
        : [...selectedOptions, optionId];
      
      setSelectedOptions(newSelected);
      setAnswers(prev => ({
        ...prev,
        [question.id]: newSelected
      }));
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      // Reset selected options for next question
      const nextQuestion = quiz.questions[currentQuestion + 1];
      setSelectedOptions(answers[nextQuestion.id] || []);
    } else {
      // Calculate and show results
      const calculatedResult = calculateQuizResult(quizId, answers);
      setResult(calculatedResult);
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      // Restore selected options for previous question
      const prevQuestion = quiz.questions[currentQuestion - 1];
      setSelectedOptions(answers[prevQuestion.id] || []);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
    setSelectedOptions([]);
  };

  // Load selected options when question changes
  useEffect(() => {
    const question = quiz.questions[currentQuestion];
    setSelectedOptions(answers[question.id] || []);
  }, [currentQuestion, answers, quiz.questions]);

  if (showResult && result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
          <p className="text-gray-600 mb-6">{quiz.description}</p>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Seus Resultados</h2>
            
            {quizId === 'jardim-ideal' && result.categoryPoints.tipos && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Tipo de Jardim Recomendado</h3>
                <div className="space-y-4">
                  {Object.entries(result.categoryPoints.tipos)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 2)
                    .map(([tipo, pontos]) => (
                      <div key={tipo} className="bg-white rounded-lg p-4 shadow">
                        <h4 className="font-bold text-lg text-green-700 capitalize">
                          {tipo === 'vertical' && 'Jardim Vertical'}
                          {tipo === 'vasos' && 'Jardim em Vasos'}
                          {tipo === 'tradicional' && 'Jardim Tradicional'}
                          {tipo === 'permacultura' && 'Jardim de Permacultura'}
                          {tipo === 'floresta' && 'Jardim Floresta'}
                          {tipo === 'interno' && 'Jardim Interno'}
                          {!['vertical', 'vasos', 'tradicional', 'permacultura', 'floresta', 'interno'].includes(tipo) && tipo}
                        </h4>
                        <p className="text-gray-600">
                          {tipo === 'vertical' && 'Perfeito para espaços pequenos, utilizando paredes e estruturas verticais.'}
                          {tipo === 'vasos' && 'Ideal para varandas e apartamentos, com controle total sobre o solo e rega.'}
                          {tipo === 'tradicional' && 'O clássico jardim em canteiros, com grande variedade de plantas.'}
                          {tipo === 'permacultura' && 'Sistema sustentável que imita ecossistemas naturais, exigindo pouca manutenção.'}
                          {tipo === 'floresta' && 'Jardim densamente plantado em camadas, como uma mini floresta.'}
                          {tipo === 'interno' && 'Plantas adaptadas para ambientes internos com pouca luz natural.'}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
            
            {quizId === 'nivel-sustentabilidade' && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Seu Nível de Sustentabilidade</h3>
                <div className="bg-white rounded-lg p-6 shadow text-center">
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    {Math.round((result.totalPoints / result.maxPoints) * 100)}%
                  </div>
                  <div className="text-lg text-gray-700 mb-4">
                    {result.totalPoints <= result.maxPoints * 0.3 && 'Iniciante na Sustentabilidade'}
                    {result.totalPoints > result.maxPoints * 0.3 && result.totalPoints <= result.maxPoints * 0.6 && 'Praticante Consciente'}
                    {result.totalPoints > result.maxPoints * 0.6 && result.totalPoints <= result.maxPoints * 0.8 && 'Defensor da Sustentabilidade'}
                    {result.totalPoints > result.maxPoints * 0.8 && 'Campeão Ambiental'}
                  </div>
                  <p className="text-gray-600">
                    {result.totalPoints <= result.maxPoints * 0.3 && 'Você está começando sua jornada sustentável. Cada pequena mudança conta!'}
                    {result.totalPoints > result.maxPoints * 0.3 && result.totalPoints <= result.maxPoints * 0.6 && 'Você já tem boas práticas, mas há espaço para melhorar.'}
                    {result.totalPoints > result.maxPoints * 0.6 && result.totalPoints <= result.maxPoints * 0.8 && 'Parabéns! Você é um exemplo de vida sustentável.'}
                    {result.totalPoints > result.maxPoints * 0.8 && 'Incrível! Você é um verdadeiro campeão da sustentabilidade.'}
                  </p>
                </div>
              </div>
            )}
            
            {quizId === 'compostagem-conhecimento' && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Seu Conhecimento em Compostagem</h3>
                <div className="bg-white rounded-lg p-6 shadow text-center">
                  <div className="text-5xl font-bold text-green-600 mb-2">
                    {Math.round((result.totalPoints / result.maxPoints) * 100)}%
                  </div>
                  <div className="text-lg text-gray-700 mb-4">
                    {result.totalPoints <= result.maxPoints * 0.5 && 'Aprendiz da Compostagem'}
                    {result.totalPoints > result.maxPoints * 0.5 && result.totalPoints <= result.maxPoints * 0.8 && 'Compostador Intermediário'}
                    {result.totalPoints > result.maxPoints * 0.8 && 'Mestre da Compostagem'}
                  </div>
                  <p className="text-gray-600">
                    {result.totalPoints <= result.maxPoints * 0.5 && 'Você está começando! Continue aprendendo sobre compostagem.'}
                    {result.totalPoints > result.maxPoints * 0.5 && result.totalPoints <= result.maxPoints * 0.8 && 'Bom conhecimento! Mas sempre há mais a aprender sobre compostagem.'}
                    {result.totalPoints > result.maxPoints * 0.8 && 'Excelente! Você tem conhecimento avançado sobre compostagem.'}
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Refazer Quiz
              </button>
              <Link 
                href="/quizzes" 
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Ver Outros Quizzes
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
        <p className="text-gray-600 mb-6">{quiz.description}</p>
        
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Pergunta {currentQuestion + 1} de {quiz.questions.length}
          </div>
          <div className="text-sm text-gray-500">
            Tempo estimado: {quiz.estimatedTime} min
          </div>
        </div>
        
        <div className="mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {question.question}
          </h2>
          
          <div className="space-y-3">
            {question.options.map((option) => (
              <div 
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedOptions.includes(option.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-start">
                  <div className={`flex items-center justify-center w-5 h-5 rounded-full border mr-3 mt-0.5 flex-shrink-0 ${
                    selectedOptions.includes(option.id)
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedOptions.includes(option.id) && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-700">{option.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Anterior
          </button>
          
          <button
            onClick={handleNext}
            disabled={selectedOptions.length === 0}
            className={`px-6 py-2 rounded-lg font-medium ${
              selectedOptions.length === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Ver Resultados' : 'Próxima'}
          </button>
        </div>
      </div>
    </div>
  );
}