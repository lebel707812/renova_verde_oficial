const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateArticleImages() {
  try {
    console.log('Atualizando imagens dos artigos...');

    // Mapear artigos para suas respectivas imagens
    const articleImageMap = {
      'energia-solar-residencial-guia-completo-para-iniciantes': '/uploads/energia-solar-placeholder.jpg',
      'compostagem-domestica-transforme-restos-de-comida-em-adubo': '/uploads/jardim-vertical-placeholder.jpg',
      'reforma-ecologica-materiais-sustentaveis-para-sua-casa': '/uploads/reforma-ecologica-placeholder.jpg',
      'economia-de-agua-15-dicas-praticas-para-reduzir-o-consumo': '/uploads/energia-solar-placeholder.jpg',
      'plantas-purificadoras-de-ar-melhore-a-qualidade-do-ar-em-casa': '/uploads/jardim-vertical-placeholder.jpg',
      'como-criar-uma-horta-sustentavel-em-casa': '/uploads/jardim-vertical-placeholder.jpg'
    };

    // Atualizar cada artigo
    for (const [slug, imageUrl] of Object.entries(articleImageMap)) {
      const result = await prisma.article.updateMany({
        where: {
          slug: slug
        },
        data: {
          imageUrl: imageUrl
        }
      });
      
      if (result.count > 0) {
        console.log(`✓ Atualizado: ${slug} -> ${imageUrl}`);
      } else {
        console.log(`- Não encontrado: ${slug}`);
      }
    }

    console.log('Imagens dos artigos atualizadas com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar imagens:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateArticleImages();

