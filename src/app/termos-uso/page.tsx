import MainLayout from '@/components/layout/MainLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso - Renova Verde Hub',
  description: 'Termos de uso do Renova Verde Hub. Conheça as regras e condições para utilização do nosso site e serviços.',
  keywords: 'termos de uso, condições de uso, regras do site, termos de serviço',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermosUsoPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-gray-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Termos de Uso
            </h1>
            <p className="text-xl text-gray-300">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Importante:</strong> Ao utilizar nosso site, você concorda em cumprir estes termos de uso. Leia atentamente antes de continuar.
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-700 mb-4">
                Bem-vindo ao Renova Verde Hub. Estes Termos de Uso (&quot;Termos&quot;) regem o uso do nosso site e serviços. Ao acessar ou usar nosso site, você concorda em ficar vinculado a estes Termos e à nossa Política de Privacidade.
              </p>
              <p className="text-gray-700">
                Se você não concordar com qualquer parte destes termos, não deve usar nosso site ou serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descrição do Serviço</h2>
              <p className="text-gray-700 mb-4">
                O Renova Verde Hub é uma plataforma educativa que oferece:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Artigos e conteúdo sobre sustentabilidade residencial</li>
                <li>Dicas práticas de jardinagem, energia renovável e reformas ecológicas</li>
                <li>Newsletter com conteúdo exclusivo</li>
                <li>Recursos educacionais sobre práticas sustentáveis</li>
                <li>Comunidade para troca de experiências</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Uso Aceitável</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Você Pode:</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Acessar e navegar pelo site para fins pessoais e educacionais</li>
                <li>Compartilhar nosso conteúdo com a devida atribuição</li>
                <li>Participar de discussões e comentários de forma respeitosa</li>
                <li>Inscrever-se em nossa newsletter</li>
                <li>Entrar em contato conosco através dos canais oficiais</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Você Não Pode:</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Usar o site para fins comerciais sem autorização prévia</li>
                <li>Reproduzir, distribuir ou modificar nosso conteúdo sem permissão</li>
                <li>Tentar hackear, interferir ou danificar o site</li>
                <li>Enviar spam, vírus ou código malicioso</li>
                <li>Publicar conteúdo ofensivo, ilegal ou inadequado</li>
                <li>Violar direitos de propriedade intelectual</li>
                <li>Usar informações do site para assediar outros usuários</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Conteúdo do Usuário</h2>
              <p className="text-gray-700 mb-4">
                Quando você envia comentários, mensagens ou qualquer outro conteúdo para nosso site:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Você mantém a propriedade do seu conteúdo</li>
                <li>Você nos concede uma licença para usar, exibir e distribuir esse conteúdo</li>
                <li>Você garante que tem o direito de compartilhar esse conteúdo</li>
                <li>Você é responsável pelo conteúdo que envia</li>
              </ul>
              <p className="text-gray-700">
                Reservamo-nos o direito de remover qualquer conteúdo que viole estes termos ou que consideremos inadequado.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Propriedade Intelectual</h2>
              <p className="text-gray-700 mb-4">
                Todo o conteúdo do Renova Verde Hub, incluindo textos, imagens, logos, design e código, é protegido por direitos autorais e outras leis de propriedade intelectual.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Nosso Conteúdo:</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>É de nossa propriedade ou licenciado para nós</li>
                <li>Pode ser compartilhado com atribuição adequada</li>
                <li>Não pode ser usado comercialmente sem permissão</li>
                <li>Não pode ser modificado sem autorização</li>
              </ul>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Marcas Registradas:</h3>
              <p className="text-gray-700">
                &quot;Renova Verde Hub&quot; e nossos logos são marcas registradas. Você não pode usar nossas marcas sem permissão escrita.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Isenção de Responsabilidade</h2>
              <p className="text-gray-700 mb-4">
                O conteúdo do Renova Verde Hub é fornecido apenas para fins educacionais e informativos:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Não oferecemos garantias sobre a precisão ou completude das informações</li>
                <li>Não somos responsáveis por resultados obtidos seguindo nossas dicas</li>
                <li>Recomendamos consultar profissionais qualificados para projetos específicos</li>
                <li>Não nos responsabilizamos por danos resultantes do uso de nossas informações</li>
              </ul>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">
                  <strong>Aviso Importante:</strong> Sempre consulte profissionais qualificados antes de realizar reformas, instalações elétricas ou projetos que possam afetar a segurança de sua residência.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitação de Responsabilidade</h2>
              <p className="text-gray-700">
                Na máxima extensão permitida por lei, o Renova Verde Hub não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou incapacidade de usar nosso site ou serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Links para Sites de Terceiros</h2>
              <p className="text-gray-700">
                Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelo conteúdo, políticas de privacidade ou práticas desses sites. Recomendamos que você leia os termos e políticas de qualquer site que visitar.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modificações do Serviço</h2>
              <p className="text-gray-700">
                Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer parte de nosso site ou serviços a qualquer momento, com ou sem aviso prévio. Não seremos responsáveis por qualquer modificação, suspensão ou descontinuação do serviço.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Suspensão e Encerramento</h2>
              <p className="text-gray-700 mb-4">
                Podemos suspender ou encerrar seu acesso ao nosso site se:
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Você violar estes Termos de Uso</li>
                <li>Seu uso causar danos ao site ou outros usuários</li>
                <li>Determinarmos que é necessário por motivos legais ou de segurança</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Lei Aplicável</h2>
              <p className="text-gray-700">
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Alterações nos Termos</h2>
              <p className="text-gray-700">
                Podemos atualizar estes Termos de Uso periodicamente. Quando fizermos alterações significativas, notificaremos você através do site ou por email. O uso continuado do site após as alterações constitui aceitação dos novos termos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Disposições Gerais</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">13.1 Integralidade:</h3>
              <p className="text-gray-700 mb-3">
                Estes Termos, juntamente com nossa Política de Privacidade, constituem o acordo completo entre você e o Renova Verde Hub.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">13.2 Severabilidade:</h3>
              <p className="text-gray-700 mb-3">
                Se qualquer disposição destes Termos for considerada inválida, as demais disposições permanecerão em vigor.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">13.3 Renúncia:</h3>
              <p className="text-gray-700">
                A falha em fazer cumprir qualquer disposição destes Termos não constituirá renúncia a essa disposição.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contato</h2>
              <p className="text-gray-700 mb-4">
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> <a href="mailto:legal@renovaverdehub.com" className="text-green-600 hover:text-green-700">legal@renovaverdehub.com</a></p>
                <p className="text-gray-700 mb-2"><strong>Contato Geral:</strong> <a href="mailto:contato@renovaverdehub.com" className="text-green-600 hover:text-green-700">contato@renovaverdehub.com</a></p>
                <p className="text-gray-700"><strong>Endereço:</strong> São Paulo, SP - Brasil</p>
              </div>
            </section>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Agradecemos sua Confiança</h3>
              <p className="text-green-700">
                Obrigado por fazer parte da comunidade Renova Verde Hub. Juntos, estamos construindo um futuro mais sustentável, uma casa de cada vez.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Dúvidas sobre os Termos?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Nossa equipe jurídica está disponível para esclarecer qualquer questão sobre nossos termos de uso.
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

