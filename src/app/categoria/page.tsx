
import MainLayout from "@/components/layout/MainLayout";
import Head from "next/head";
import Link from "next/link";

export default function CategoriasPage() {
  const categorias = [
    {
      name: "Reformas Ecológicas",
      description: "Descubra como transformar sua casa em um lar mais verde e eficiente com materiais e técnicas sustentáveis.",
      href: "/categoria/reformas-ecologicas",
    },
    {
      name: "Economia de Água",
      description: "Aprenda a reduzir o consumo de água em sua casa, desde a captação da chuva até o reuso e dicas práticas.",
      href: "/categoria/economia-de-agua",
    },
    {
      name: "Compostagem",
      description: "Transforme seus resíduos orgânicos em adubo valioso para suas plantas e contribua para um planeta mais saudável.",
      href: "/categoria/compostagem",
    },
    {
      name: "Jardinagem Sustentável",
      description: "Dicas sobre hortas orgânicas, plantas nativas e práticas que respeitam o meio ambiente para seu jardim.",
      href: "/categoria/jardinagem",
    },
    {
      name: "Energia Renovável",
      description: "Explore as diversas fontes de energia limpa e como elas podem gerar economia e sustentabilidade para você.",
      href: "/categoria/energia-renovavel",
    },
  ];

  return (
    <MainLayout>
      <Head>
        <title>Categorias | Renova Verde</title>
        <meta name="description" content="Explore as categorias de conteúdo da Renova Verde: reformas ecológicas, economia de água, compostagem, jardinagem sustentável e energia renovável. Encontre artigos e dicas para um estilo de vida mais verde." />
        <meta name="keywords" content="categorias, reformas ecológicas, economia de água, compostagem, jardinagem sustentável, energia renovável, sustentabilidade, casa verde" />
        <meta property="og:title" content="Categorias | Renova Verde" />
        <meta property="og:description" content="Explore as categorias de conteúdo da Renova Verde: reformas ecológicas, economia de água, compostagem, jardinagem sustentável e energia renovável." />
        <meta property="og:url" content="https://renovaverde.com.br/categoria" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://renovaverde.com.br/categoria" />
      </Head>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Nossas Categorias
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Explore nossos tópicos e encontre o conteúdo que mais te interessa para viver de forma mais sustentável.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((categoria) => (
              <Link key={categoria.href} href={categoria.href} className="block">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{categoria.name}</h2>
                  <p className="text-gray-700">{categoria.description}</p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </MainLayout>
  );
}


