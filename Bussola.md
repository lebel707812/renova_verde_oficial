# Bússola do Projeto Renova Verde Hub

Este documento serve como uma bússola para o desenvolvimento do projeto, registrando o que foi implementado e fornecendo um norte para futuras melhorias.

## Status Atual (28/07/2025)

### Funcionalidades Implementadas e Ajustadas:

- **Sistema de Imagens:**
    - Corrigido o problema de carregamento de imagens em todo o site.
    - Implementada uma rota de API (`/api/images/[...path]`) para servir imagens estáticas da pasta `public/uploads`.
    - O sistema de upload de imagens no painel administrativo foi corrigido e agora salva as imagens no diretório correto.
    - As imagens dos artigos são exibidas corretamente tanto na página inicial quanto na página de detalhes do artigo.

- **Estrutura de Navegação:**
    - A rota `/blog` foi substituída pela rota `/artigos`, que agora exibe todos os artigos publicados.
    - A seção e a rota de "Categorias" foram removidas para simplificar a navegação.
    - Os links no cabeçalho, rodapé e em outras partes do site foram atualizados para refletir a nova estrutura.

- **Layout da Página Inicial:**
    - A seção de artigos em destaque foi movida para o topo da página, logo abaixo do cabeçalho.
    - A seção "Hero" com o título "Sustentabilidade inteligente para seu lar" foi movida para baixo dos artigos em destaque.
    - A seção "Quer mais conteúdo como este?" foi removida.
    - O botão "Saiba Mais" na seção "Hero" agora rola a página para a seção de inscrição na newsletter.

- **Novas Páginas:**
    - Criada a página `/sitemap` para melhorar a navegabilidade e o SEO do site.

### Próximos Passos (Ideias e Sugestões):

- **Gamificação e Engajamento:**
    - Implementar um sistema de pontos para os usuários que leem artigos, deixam comentários e compartilham o conteúdo. Os pontos poderiam ser trocados por selos ou outros benefícios.

- **Conteúdo Interativo:**
    - Criar quizzes e calculadoras interativas (ex: "Calcule sua pegada de carbono", "Qual seu perfil de sustentabilidade?") para aumentar o engajamento dos usuários.

- **Comunidade:**
    - Adicionar um fórum ou uma seção de comunidade onde os usuários possam discutir sobre sustentabilidade, compartilhar suas próprias dicas e tirar dúvidas.

- **Personalização:**
    - Permitir que os usuários salvem seus artigos favoritos e criem listas de leitura personalizadas.

- **SEO Avançado:**
    - Otimizar as meta descrições e palavras-chave de cada artigo para melhorar o ranking nos motores de busca.
    - Gerar `sitemap.xml` dinamicamente com base nos artigos publicados.

- **Monetização (opcional):**
    - Adicionar uma loja virtual com produtos sustentáveis (ex: kits de compostagem, sementes orgânicas, etc.).
    - Criar conteúdo premium (e-books, cursos online) para usuários assinantes.


