import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/landing/HeroSection';
import FeaturedArticles from '@/components/landing/FeaturedArticles';
import NewsletterSection from '@/components/landing/NewsletterSection';
import Link from 'next/link';

export default function Home() {
  return (
    <MainLayout>
      {/* Featured Articles Section */}
      <FeaturedArticles />
      
      {/* Seção de Quizzes e Calendário Sazonal */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Aprenda de Forma Interativa</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubra seu tipo de jardim ideal, teste seus conhecimentos e mantenha-se atualizado 
              com as melhores práticas sazonais.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link 
              href="/quizzes" 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                    Quizzes Interativos
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Teste seus conhecimentos sobre jardinagem, compostagem e sustentabilidade com 
                  nossos quizzes personalizados.
                </p>
                <div className="text-green-600 font-medium group-hover:text-green-700 transition-colors">
                  Explorar quizzes →
                </div>
              </div>
            </Link>
            
            <Link 
              href="/calendario-sazonal" 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                    Calendário Sazonal
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Descubra as melhores atividades para cada estação do ano e mantenha seu jardim 
                  sempre saudável e produtivo.
                </p>
                <div className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                  Ver calendário →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <HeroSection />
      
      {/* Newsletter Section */}
      <NewsletterSection />
    </MainLayout>
  );
}