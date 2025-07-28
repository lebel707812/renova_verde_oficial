import MainLayout from '@/components/layout/MainLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade - Renova Verde Hub',
  description: 'Política de privacidade do Renova Verde Hub. Saiba como coletamos, usamos e protegemos seus dados pessoais.',
  keywords: 'política de privacidade, proteção de dados, LGPD, privacidade',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PoliticaPrivacidadePage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Política de Privacidade
            </h1>
            <p className="text-xl text-gray-300">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Importante:</strong> Esta política de privacidade está em conformidade com a Lei Geral de Proteção de Dados (LGPD) - Lei nº 13.709/2018.
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introdução</h2>
              <p className="text-gray-700 mb-4">
                O Renova Verde Hub (&quot;nós&quot;, &quot;nosso&quot; ou &quot;nossa&quot;) está comprometido em proteger e respeitar sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você visita nosso site ou utiliza nossos serviços.
              </p>
              <p className="text-gray-700">
                Ao utilizar nosso site, você concorda com a coleta e uso de informações de acordo com esta política. Se você não concordar com qualquer parte desta política, recomendamos que não utilize nossos serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Informações que Coletamos</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Informações Fornecidas Voluntariamente</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Nome e endereço de email (newsletter e formulário de contato)</li>
                <li>Mensagens e comentários enviados através de formulários</li>
                <li>Preferências de comunicação</li>
                <li>Qualquer outra informação que você escolha compartilhar conosco</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Informações Coletadas Automaticamente</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Endereço IP e localização geográfica aproximada</li>
                <li>Tipo de navegador e sistema operacional</li>
                <li>Páginas visitadas e tempo de permanência</li>
                <li>Referências de sites que direcionaram você ao nosso site</li>
                <li>Cookies e tecnologias similares</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Cookies</h3>
              <p className="text-gray-700">
                Utilizamos cookies para melhorar sua experiência em nosso site. Cookies são pequenos arquivos de texto armazenados em seu dispositivo que nos ajudam a lembrar suas preferências e analisar como nosso site é usado.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Como Usamos suas Informações</h2>
              <p className="text-gray-700 mb-4">Utilizamos suas informações pessoais para:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Fornecer e manter nossos serviços</li>
                <li>Enviar newsletters e comunicações sobre sustentabilidade (apenas com seu consentimento)</li>
                <li>Responder a suas dúvidas e solicitações</li>
                <li>Melhorar nosso site e conteúdo</li>
                <li>Analisar como nosso site é usado</li>
                <li>Cumprir obrigações legais</li>
                <li>Proteger nossos direitos e prevenir fraudes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Base Legal para Processamento</h2>
              <p className="text-gray-700 mb-4">Processamos seus dados pessoais com base em:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li><strong>Consentimento:</strong> Para newsletters e comunicações de marketing</li>
                <li><strong>Interesse legítimo:</strong> Para melhorar nossos serviços e analisar o uso do site</li>
                <li><strong>Execução de contrato:</strong> Para responder a solicitações e fornecer suporte</li>
                <li><strong>Cumprimento de obrigação legal:</strong> Quando exigido por lei</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Compartilhamento de Informações</h2>
              <p className="text-gray-700 mb-4">
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Com seu consentimento explícito</li>
                <li>Para cumprir obrigações legais ou responder a processos judiciais</li>
                <li>Para proteger nossos direitos, propriedade ou segurança</li>
                <li>Com prestadores de serviços que nos ajudam a operar o site (sob acordos de confidencialidade)</li>
                <li>Em caso de fusão, aquisição ou venda de ativos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Segurança dos Dados</h2>
              <p className="text-gray-700 mb-4">
                Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento regular de segurança</li>
                <li>Treinamento de equipe sobre proteção de dados</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Retenção de Dados</h2>
              <p className="text-gray-700">
                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei. Quando não precisarmos mais de suas informações, as excluiremos de forma segura.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Seus Direitos</h2>
              <p className="text-gray-700 mb-4">
                De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Acesso:</strong> Solicitar informações sobre quais dados pessoais processamos</li>
                <li><strong>Retificação:</strong> Corrigir dados pessoais incompletos, inexatos ou desatualizados</li>
                <li><strong>Exclusão:</strong> Solicitar a exclusão de dados pessoais desnecessários ou processados em desconformidade</li>
                <li><strong>Portabilidade:</strong> Solicitar a transferência de dados para outro fornecedor</li>
                <li><strong>Oposição:</strong> Opor-se ao processamento de dados pessoais</li>
                <li><strong>Revogação do consentimento:</strong> Retirar o consentimento a qualquer momento</li>
              </ul>
              <p className="text-gray-700">
                Para exercer qualquer um desses direitos, entre em contato conosco através do email: <a href="mailto:privacidade@renovaverdehub.com" className="text-green-600 hover:text-green-700">privacidade@renovaverdehub.com</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Transferência Internacional de Dados</h2>
              <p className="text-gray-700">
                Seus dados pessoais podem ser transferidos e processados em países fora do Brasil. Quando isso ocorrer, garantimos que medidas adequadas de proteção sejam implementadas para proteger seus dados de acordo com esta política e a legislação aplicável.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Menores de Idade</h2>
              <p className="text-gray-700">
                Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente informações pessoais de menores de idade. Se tomarmos conhecimento de que coletamos dados de um menor sem o consentimento dos pais, tomaremos medidas para remover essas informações.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Alterações nesta Política</h2>
              <p className="text-gray-700">
                Podemos atualizar esta Política de Privacidade periodicamente. Quando fizermos alterações significativas, notificaremos você por email ou através de um aviso em nosso site. Recomendamos que você revise esta política regularmente para se manter informado sobre como protegemos suas informações.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contato</h2>
              <p className="text-gray-700 mb-4">
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos seus dados pessoais, entre em contato conosco:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> <a href="mailto:privacidade@renovaverdehub.com" className="text-green-600 hover:text-green-700">privacidade@renovaverdehub.com</a></p>
                <p className="text-gray-700 mb-2"><strong>Endereço:</strong> São Paulo, SP - Brasil</p>
                <p className="text-gray-700"><strong>Encarregado de Dados (DPO):</strong> Para questões específicas sobre proteção de dados</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Autoridade de Controle</h2>
              <p className="text-gray-700">
                Você tem o direito de apresentar uma reclamação à Autoridade Nacional de Proteção de Dados (ANPD) se acreditar que o processamento de seus dados pessoais viola a LGPD. Mais informações estão disponíveis em: <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">www.gov.br/anpd</a>
              </p>
            </section>
          </div>
        </div>

        {/* Call to Action */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Dúvidas sobre Privacidade?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Nossa equipe está pronta para esclarecer qualquer questão sobre como protegemos seus dados.
            </p>
            <a
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
            >
              Entre em Contato
            </a>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

