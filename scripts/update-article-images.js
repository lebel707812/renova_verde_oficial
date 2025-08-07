const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase URL or Service Role Key");
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
  },
});

async function updateArticleImages() {
  try {
    console.log("Atualizando imagens dos artigos...");

    // Mapear artigos para suas respectivas imagens
    const articleImageMap = {
      "energia-solar-residencial-guia-completo-para-iniciantes": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
      "compostagem-domestica-transforme-restos-de-comida-em-adubo": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
      "reforma-ecologica-materiais-sustentaveis-para-sua-casa": "https://images.unsplash.com/photo-1518051870423-937283d030f7?w=800&h=600&fit=crop",
      "economia-de-agua-15-dicas-praticas-para-reduzir-o-consumo": "https://images.unsplash.com/photo-1551076805-e0186786854b?w=800&h=600&fit=crop",
      "plantas-purificadoras-de-ar-melhore-a-qualidade-do-ar-em-casa": "https://images.unsplash.com/photo-1551076805-e0186786854b?w=800&h=600&fit=crop",
      "como-criar-uma-horta-sustentavel-em-casa": "https://images.unsplash.com/photo-1551076805-e0186786854b?w=800&h=600&fit=crop"
    };

    // Atualizar cada artigo
    for (const [slug, imageUrl] of Object.entries(articleImageMap)) {
      const { data, error } = await supabaseAdmin
        .from("articles")
        .update({ imageUrl: imageUrl })
        .eq("slug", slug);

      if (error) {
        console.error(`Erro ao atualizar ${slug}:`, error);
      } else if (data && data.length > 0) {
        console.log(`✓ Atualizado: ${slug} -> ${imageUrl}`);
      } else {
        console.log(`- Não encontrado: ${slug}`);
      }
    }

    console.log("Imagens dos artigos atualizadas com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar imagens:", error);
  }
}

updateArticleImages();


