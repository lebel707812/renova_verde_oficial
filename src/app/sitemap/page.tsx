import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export default function SitemapPage() {
  return (
    <MainLayout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Mapa do Site
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-white p-8 rounded-lg shadow-lg">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Geral</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-primary-700 hover:underline">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/artigos" className="text-primary-700 hover:underline">
                    Artigos
                  </Link>
                </li>
                <li>
                  <Link href="/sobre" className="text-primary-700 hover:underline">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="text-primary-700 hover:underline">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-primary-700 hover:underline">
                    Pesquisa
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Calculadoras</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/calculadora" className="text-primary-700 hover:underline">
                    Calculadora Principal
                  </Link>
                </li>
                <li>
                  <Link href="/calculadora/chuva" className="text-primary-700 hover:underline">
                    Calculadora de Água da Chuva
                  </Link>
                </li>
                <li>
                  <Link href="/calculadora/solar" className="text-primary-700 hover:underline">
                    Calculadora de Energia Solar
                  </Link>
                </li>
                <li>
                  <Link href="/calculadora/tinta" className="text-primary-700 hover:underline">
                    Calculadora de Tinta Ecológica
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Categorias</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/categorias" className="text-primary-700 hover:underline">
                    Todas as Categorias
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/jardinagem" className="text-primary-700 hover:underline">
                    Jardinagem
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/energia-renovavel" className="text-primary-700 hover:underline">
                    Energia Renovável
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/reformas-ecologicas" className="text-primary-700 hover:underline">
                    Reformas Ecológicas
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/reciclagem" className="text-primary-700 hover:underline">
                    Reciclagem
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/economia-domestica" className="text-primary-700 hover:underline">
                    Economia Doméstica
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/compostagem" className="text-primary-700 hover:underline">
                    Compostagem
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/sustentabilidade" className="text-primary-700 hover:underline">
                    Sustentabilidade
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/economia-de-agua" className="text-primary-700 hover:underline">
                    Economia de Água
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Legal</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/politica-privacidade" className="text-primary-700 hover:underline">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/termos-uso" className="text-primary-700 hover:underline">
                    Termos de Uso
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Outros</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/sitemap" className="text-primary-700 hover:underline">
                    Mapa do Site
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}


