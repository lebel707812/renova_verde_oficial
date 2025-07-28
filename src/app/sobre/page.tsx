import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nós - Renova Verde Hub',
  description: 'Conheça a missão, visão e equipe do Renova Verde Hub. Transformando lares em espaços sustentáveis através de dicas práticas e soluções ecológicas.',
  keywords: 'sobre renova verde hub, sustentabilidade, equipe, missão, visão, ecologia',
  openGraph: {
    title: 'Sobre Nós - Renova Verde Hub',
    description: 'Conheça a missão, visão e equipe do Renova Verde Hub. Transformando lares em espaços sustentáveis através de dicas práticas e soluções ecológicas.',
    type: 'website',
  },
};

export default function SobrePage() {
  const teamMembers = [
    {
      name: 'Maria Silva',
      role: 'Fundadora & Especialista em Jardinagem',
      bio: 'Engenheira agrônoma com mais de 15 anos de experiência em agricultura sustentável e jardinagem urbana.',
      image: '/images/team/maria-silva.jpg'
    },
    {
      name: 'João Santos',
      role: 'Especialista em Energia Renovável',
      bio: 'Engenheiro elétrico especializado em sistemas de energia solar e eficiência energética residencial.',
      image: '/images/team/joao-santos.jpg'
    },
    {
      name: 'Ana Costa',
      role: 'Consultora em Sustentabilidade',
      bio: 'Bióloga e consultora ambiental, focada em soluções sustentáveis para o dia a dia doméstico.',
      image: '/images/team/ana-costa.jpg'
    },
    {
      name: 'Pedro Lima',
      role: 'Especialista em Reformas Ecológicas',
      bio: 'Arquiteto com foco em construção sustentável e reformas que respeitam o meio ambiente.',
      image: '/images/team/pedro-lima.jpg'
    }
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Paixão pela Natureza',
      description: 'Acreditamos que cada pequena ação em prol do meio ambiente faz a diferença para um futuro mais sustentável.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Educação Acessível',
      description: 'Tornamos o conhecimento sobre sustentabilidade acessível a todos, com linguagem simples e dicas práticas.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Comunidade Engajada',
      description: 'Construímos uma comunidade de pessoas comprometidas em transformar seus lares em espaços mais verdes.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Soluções Práticas',
      description: 'Oferecemos soluções testadas e aprovadas que realmente funcionam no dia a dia das famílias brasileiras.'
    }
  ];

  return (
    <MainLayout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-primary-900 text-white py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-green-800 opacity-90"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre o Renova Verde Hub
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Transformando lares em espaços sustentáveis através de conhecimento, 
              inovação e práticas ecológicas acessíveis para todos.
            </p>
          </div>
        </div>

        {/* Nossa História */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa História</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    O Renova Verde Hub nasceu da paixão de um grupo de especialistas em sustentabilidade 
                    que acreditam que pequenas mudanças no lar podem gerar grandes impactos ambientais. 
                    Fundado em 2023, nosso projeto começou como um blog simples e evoluiu para uma 
                    plataforma completa de educação ambiental.
                  </p>
                  <p>
                    Percebemos que muitas pessoas queriam adotar práticas mais sustentáveis em casa, 
                    mas não sabiam por onde começar ou achavam as informações muito técnicas e 
                    inacessíveis. Foi então que decidimos criar um espaço onde o conhecimento sobre 
                    sustentabilidade fosse apresentado de forma simples, prática e aplicável.
                  </p>
                  <p>
                    Hoje, somos uma referência em sustentabilidade residencial, ajudando milhares 
                    de famílias a transformarem seus lares em espaços mais verdes, econômicos e 
                    saudáveis para toda a família.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
                  <div className="w-full h-96 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Missão, Visão e Valores */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Missão, Visão e Valores</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nossos princípios fundamentais que guiam cada ação e decisão do Renova Verde Hub.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Missão</h3>
                <p className="text-gray-600">
                  Democratizar o acesso ao conhecimento sobre sustentabilidade residencial, 
                  oferecendo soluções práticas e acessíveis para transformar lares em 
                  espaços mais verdes e eficientes.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Visão</h3>
                <p className="text-gray-600">
                  Ser a principal referência em sustentabilidade residencial no Brasil, 
                  inspirando uma geração de famílias conscientes e engajadas com o 
                  meio ambiente.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Valores</h3>
                <p className="text-gray-600">
                  Sustentabilidade, educação acessível, inovação responsável, 
                  transparência e compromisso com as futuras gerações.
                </p>
              </div>
            </div>

            {/* Valores Detalhados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nossa Equipe */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Equipe</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conheça os especialistas apaixonados por sustentabilidade que tornam 
                o Renova Verde Hub uma realidade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-w-1 aspect-h-1">
                    <div className="w-full h-64 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-green-600">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-green-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nosso Impacto</h2>
              <p className="text-xl text-green-100 max-w-3xl mx-auto">
                Números que refletem nosso compromisso com a sustentabilidade e educação ambiental.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">50K+</div>
                <div className="text-green-100">Leitores mensais</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">200+</div>
                <div className="text-green-100">Artigos publicados</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">15K+</div>
                <div className="text-green-100">Famílias impactadas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">95%</div>
                <div className="text-green-100">Satisfação dos leitores</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Junte-se à Nossa Comunidade
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Faça parte de uma comunidade engajada em transformar o mundo através 
              de pequenas ações sustentáveis no dia a dia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contato"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
              >
                Entre em Contato
              </a>
              <a
                href="/#newsletter"
                className="inline-flex items-center justify-center px-8 py-3 border border-green-600 text-base font-medium rounded-lg text-green-600 bg-white hover:bg-green-50 transition-colors duration-200"
              >
                Assine Nossa Newsletter
              </a>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

