
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


