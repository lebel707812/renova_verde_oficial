'use client';

import NewsletterSignup from '@/components/ui/NewsletterSignup';

interface NewsletterSectionProps {
  className?: string;
}

export default function NewsletterSection({ className = '' }: NewsletterSectionProps) {
  return (
    <section className={`py-16 lg:py-24 bg-primary-900 relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-400 rounded-full mb-8">
            <svg className="w-8 h-8 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Transforme Sua Casa em um
            <span className="text-green-400 block sm:inline sm:ml-3">Lar Sustentável</span>
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Receba semanalmente dicas práticas, tutoriais exclusivos e as últimas novidades 
            em sustentabilidade residencial diretamente no seu email.
          </p>

          {/* Newsletter Signup */}
          <div className="mb-8">
            <NewsletterSignup 
              variant="compact"
              placeholder="Seu melhor email"
              showIcon={true}
              className="max-w-lg mx-auto"
            />
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-400/20 rounded-lg mb-3">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">Conteúdo Exclusivo</h3>
              <p className="text-gray-300 text-sm">Dicas que você não encontra em lugar nenhum</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-400/20 rounded-lg mb-3">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">Sem Spam</h3>
              <p className="text-gray-300 text-sm">Apenas 1 email por semana com o melhor conteúdo</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-400/20 rounded-lg mb-3">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">Cancele Quando Quiser</h3>
              <p className="text-gray-300 text-sm">Descadastre-se com apenas 1 clique</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-300">
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                <div className="w-8 h-8 bg-green-400 rounded-full border-2 border-primary-900 flex items-center justify-center text-primary-900 text-xs font-bold">
                  A
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-primary-900 flex items-center justify-center text-primary-900 text-xs font-bold">
                  M
                </div>
                <div className="w-8 h-8 bg-purple-400 rounded-full border-2 border-primary-900 flex items-center justify-center text-primary-900 text-xs font-bold">
                  J
                </div>
                <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-primary-900 flex items-center justify-center text-primary-900 text-xs font-bold">
                  +
                </div>
              </div>
              <span className="text-sm">Mais de 10.000 pessoas já se cadastraram</span>
            </div>
            
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm">4.9/5 de satisfação</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-400/10 rounded-full -translate-x-32 -translate-y-32 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full translate-x-32 translate-y-32 blur-3xl" />
    </section>
  );
}

