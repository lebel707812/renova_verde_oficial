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

const sampleArticles = [
  {
    title: "Energia Solar Residencial: Guia Completo para Iniciantes",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
    content: `A energia solar residencial está se tornando cada vez mais popular no Brasil. Com a redução dos custos dos painéis solares e os incentivos governamentais, investir em energia solar pode ser uma excelente decisão financeira e ambiental.\n\n## Vantagens da Energia Solar\n\nA energia solar oferece diversas vantagens para residências:\n\n### Economia na Conta de Luz\nCom um sistema solar bem dimensionado, é possível reduzir a conta de energia elétrica em até 95%. O investimento inicial se paga em média entre 4 a 6 anos.\n\n### Sustentabilidade Ambiental\nA energia solar é uma fonte limpa e renovável, que não emite gases poluentes durante sua operação. Cada kWh gerado evita a emissão de aproximadamente 0,5 kg de CO2.\n\n### Valorização do Imóvel\nImóveis com sistemas de energia solar tendem a ter maior valor de mercado, sendo um diferencial competitivo na hora da venda.\n\n## Como Funciona o Sistema Solar\n\nO sistema solar fotovoltaico converte a luz solar em energia elétrica através de painéis solares. A energia gerada é convertida de corrente contínua para alternada através de um inversor, podendo ser utilizada diretamente na residência.\n\n## Dimensionamento do Sistema\n\nPara dimensionar corretamente o sistema solar, é necessário analisar o consumo médio mensal da residência e as condições de irradiação solar da região. Um profissional qualificado deve realizar este cálculo.\n\nInvestir em energia solar é investir no futuro sustentável da sua família e do planeta.`,
    category: "Energia Renovável",
    isPublished: true
  },
  {
    title: "Compostagem Doméstica: Transforme Restos de Comida em Adubo",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
    content: `A compostagem doméstica é uma prática simples e eficaz para reduzir o lixo orgânico e produzir adubo natural para suas plantas. Além de contribuir para o meio ambiente, você economiza dinheiro em fertilizantes.\n\n## O que é Compostagem?\n\nA compostagem é um processo natural de decomposição de matéria orgânica por microorganismos, resultando em um composto rico em nutrientes para as plantas.\n\n## Materiais para Compostagem\n\n### Materiais Verdes (Ricos em Nitrogênio)\n- Restos de frutas e verduras\n- Borra de café\n- Cascas de ovos\n- Aparas de grama\n\n### Materiais Marrons (Ricos em Carbono)\n- Folhas secas\n- Papel picado\n- Serragem\n- Galhos pequenos\n\n## Como Fazer uma Composteira\n\n### Composteira de Baldes\nPara apartamentos, uma composteira de baldes é ideal:\n1. Use 3 baldes com furos no fundo\n2. Alterne camadas de material verde e marrom\n3. Mantenha úmido mas não encharcado\n4. Revolva semanalmente\n\n### Composteira de Quintal\nPara casas com quintal:\n1. Escolha um local sombreado\n2. Faça uma pilha de 1m x 1m\n3. Alterne camadas de 10cm\n4. Cubra com folhas secas\n\n## Cuidados Importantes\n\n- Evite carnes, laticínios e gorduras\n- Mantenha a umidade adequada\n- Revolva regularmente para oxigenar\n- O composto estará pronto em 2-3 meses\n\nA compostagem é um hábito simples que faz uma grande diferença para o meio ambiente!`,
    category: "Compostagem",
    isPublished: true
  },
  {
    title: "Reforma Ecológica: Materiais Sustentáveis para sua Casa",
    imageUrl: "https://images.unsplash.com/photo-1518051870423-937283d030f7?w=800&h=600&fit=crop",
    content: `Reformar a casa pensando na sustentabilidade é uma tendência que veio para ficar. Além de contribuir para o meio ambiente, materiais ecológicos podem oferecer melhor qualidade de vida e economia a longo prazo.\n\n## Materiais Sustentáveis para Construção\n\n### Bambu\nO bambu é um material versátil e sustentável:\n- Crescimento rápido (3-5 anos)\n- Resistente e flexível\n- Uso em pisos, paredes e móveis\n- Absorve mais CO2 que árvores convencionais\n\n### Tijolo Ecológico\nFeito com solo-cimento, o tijolo ecológico oferece:\n- Melhor isolamento térmico\n- Redução no uso de argamassa\n- Processo de fabricação menos poluente\n- Economia de até 30% na obra\n\n### Tinta Ecológica\nTintas à base de água e sem compostos tóxicos:\n- Não emitem vapores nocivos\n- Secagem mais rápida\n- Cores naturais e duradouras\n- Melhor qualidade do ar interno\n\n## Isolamento Térmico Natural\n\n### Lã de Pet\nFeita com garrafas PET recicladas:\n- Excelente isolamento térmico\n- Não propaga fogo\n- Fácil instalação\n- Contribui para reciclagem\n\n### Cortiça\nMaterial natural com propriedades únicas:\n- Isolamento térmico e acústico\n- Resistente à umidade\n- Durabilidade de décadas\n- Renovável (não mata a árvore)\n\n## Pisos Sustentáveis\n\n### Piso de Bambu\n- Durabilidade similar ao carvalho\n- Resistente à umidade\n- Fácil manutenção\n- Crescimento renovável\n\n### Piso de Cortiça\n- Confortável para caminhar\n- Naturalmente antimicrobiano\n- Isolamento térmico natural\n- Absorve ruídos\n\n## Dicas para uma Reforma Ecológica\n\n1. **Planeje bem**: Evite desperdícios e retrabalhos\n2. **Reutilize**: Aproveite materiais da demolição\n3. **Compre local**: Reduza o transporte\n4. **Escolha qualidade**: Materiais duráveis são mais sustentáveis\n5. **Pense no futuro**: Facilite futuras manutenções\n\nUma reforma ecológica é um investimento no futuro do planeta e da sua família!`,
    category: "Reforma Ecológica",
    isPublished: true
  },
  {
    title: "Economia de Água: 15 Dicas Práticas para Reduzir o Consumo",
    imageUrl: "https://images.unsplash.com/photo-1551076805-e0186786854b?w=800&h=600&fit=crop",
    content: `A água é um recurso precioso e sua economia deve ser uma prioridade em todos os lares. Com algumas mudanças simples de hábitos e pequenos investimentos, é possível reduzir significativamente o consumo de água.\n\n## Dicas para o Banheiro\n\n### 1. Banhos Mais Curtos\nReduza o tempo de banho para 5-8 minutos. Cada minuto a menos economiza cerca de 6 litros de água.\n\n### 2. Feche a Torneira\nDesligue a água enquanto escova os dentes, faz a barba ou ensaboa as mãos.\n\n### 3. Vaso Sanitário Eficiente\nInstale uma válvula de duplo acionamento ou coloque uma garrafa com água no reservantório antigo.\n\n### 4. Chuveiro Econômico\nUse chuveiros com restritores de vazão ou arejadores para reduzir o consumo sem perder conforto.\n\n## Dicas para a Cozinha\n\n### 5. Lave Louça de Forma Inteligente\nAcumule a louça e lave tudo de uma vez. Use uma bacia para ensaboar e outra para enxaguar.\n\n### 6. Reutilize Água de Cozimento\nA água usada para cozinhar legumes pode ser reutilizada para regar plantas (após esfriar).\n\n### 7. Máquina de Lavar Louça\nSe tiver, use apenas quando estiver cheia. É mais econômica que lavar à mão quando usada corretamente.\n\n## Dicas para a Área de Serviço\n\n### 8. Máquina de Lavar Roupa\nUse apenas com carga completa e escolha o nível de água adequado para a quantidade de roupa.\n\n### 9. Reutilize Água da Máquina\nA água do último enxágue pode ser usada para lavar o quintal ou regar plantas.\n\n### 10. Tanque Inteligente\nFeche a torneira enquanto ensaboa as roupas no tanque.\n\n## Dicas para o Jardim\n\n### 11. Regue no Horário Certo\nRegue plantas no início da manhã ou final da tarde para evitar evaporação.\n\n### 12. Cobertura Morta (Mulch)\nUse folhas secas, palha ou casca de árvore para manter a umidade do solo.\n\n### 13. Plantas Nativas\nEscolha plantas adaptadas ao clima local, que precisam de menos água.\n\n## Sistemas de Captação\n\n### 14. Captação de Água da Chuva\nInstale calhas e reservatórios para coletar água da chuva para uso no jardim.\n\n### 15. Reuso de Água Cinza\nReutilize água do chuveiro e lavatórios (após tratamento simples) para irrigação.\n\n## Detecção de Vazamentos\n\n- Verifique o hidrômetro com todos os registros fechados\n- Observe manchas de umidade em paredes e tetos\n- Teste a válvula de descarga com corante alimentício\n- Verifique torneiras pingando\n\n## Benefícios da Economia de Água\n\n- **Financeiro**: Redução na conta de água\n- **Ambiental**: Preservação dos recursos hídricos\n- **Social**: Mais água disponível para todos\n- **Futuro**: Garantia de água para próximas gerações\n\nPequenas ações fazem uma grande diferença. Comece hoje mesmo a economizar água!`,
    category: "Economia de Água",
    isPublished: true
  },
  {
    title: "Plantas Purificadoras de Ar: Melhore a Qualidade do Ar em Casa",
    content: `As plantas não são apenas elementos decorativos, elas também podem melhorar significativamente a qualidade do ar interno da sua casa. Algumas espécies são especialmente eficazes na remoção de poluentes comuns.\n\n## Por que Usar Plantas Purificadoras?\n\n### Benefícios para a Saúde\n- Reduzem poluentes do ar\n- Aumentam a umidade do ambiente\n- Diminuem o estresse e ansiedade\n- Melhoram a concentração\n- Ajudam na qualidade do sono\n\n### Poluentes Comuns em Casa\n- Formaldeído (móveis, tapetes)\n- Benzeno (tintas, plásticos)\n- Tricloroetileno (produtos de limpeza)\n- Xileno (impressoras, borracha)\n- Amônia (produtos de limpeza)\n\n## Melhores Plantas Purificadoras\n\n### 1. Espada-de-São-Jorge (Sansevieria)\n**Poluentes removidos**: Formaldeído, xileno, benzeno\n**Cuidados**: Pouca água, luz indireta\n**Local ideal**: Quarto (produz oxigênio à noite)\n\n### 2. Jiboia (Epipremnum aureum)\n**Poluentes removidos**: Formaldeído, xileno, benzeno\n**Cuidados**: Fácil cultivo, luz indireta\n**Local ideal**: Sala, escritório\n\n### 3. Lírio-da-Paz (Spathiphyllum)\n**Poluentes removidos**: Amônia, benzeno, formaldeído\n**Cuidados**: Solo úmido, sombra parcial\n**Local ideal**: Banheiro, cozinha\n\n### 4. Palmeira-Areca (Dypsis lutescens)\n**Poluentes removidos**: Formaldeído, xileno\n**Cuidados**: Luz indireta, solo úmido\n**Local ideal**: Sala ampla\n\n### 5. Clorofito (Chlorophytum comosum)\n**Poluentes removidos**: Formaldeído, xileno\n**Cuidados**: Muito fácil, luz indireta\n**Local ideal**: Qualquer ambiente\n\n### 6. Ficus (Ficus benjamina)\n**Poluentes removidos**: Formaldeído, benzeno\n**Cuidados**: Luz indireta, rega moderada\n**Local ideal**: Sala, escritório\n\n### 7. Aloe Vera\n**Poluentes removidos**: Formaldeído, benzeno\n**Cuidados**: Pouca água, luz direta\n**Local ideal**: Cozinha, banheiro\n\n### 8. Filodendro (Philodendron)\n**Poluentes removidos**: Formaldeído\n**Cuidados**: Luz indireta, solo úmido\n**Local ideal**: Sala, quarto\n\n## Quantas Plantas Usar?\n\n### Recomendação NASA\n- 1 planta para cada 9m² de área\n- Plantas de tamanho médio a grande\n- Vasos de pelo menos 15cm de diâmetro\n\n### Distribuição Ideal\n- **Sala**: 2-3 plantas grandes\n- **Quarto**: 1-2 plantas (Espada-de-São-Jorge ideal)\n- **Cozinha**: 1-2 plantas pequenas\n- **Banheiro**: 1 planta resistente à umidade\n- **Escritório**: 1-2 plantas de fácil cuidado\n\n## Cuidados Gerais\n\n### Rega\n- Verifique a umidade do solo\n- Evite encharcamento\n- Use água filtrada quando possível\n\n### Luz\n- Maioria prefere luz indireta\n- Gire as plantas semanalmente\n- Observe sinais de falta ou excesso de luz\n\n### Limpeza\n- Limpe as folhas regularmente\n- Remove folhas mortas ou doentes\n- Use pano úmido para remover poeira\n\n### Fertilização\n- Use fertilizante líquido diluído\n- Fertilize na primavera e verão\n- Evite excesso de nutrientes\n\n## Plantas Tóxicas - Cuidado!\n\nAlgumas plantas purificadoras podem ser tóxicas para pets e crianças:\n- Lírio-da-Paz\n- Filodendro\n- Jiboia\n- Ficus\n\nMantenha fora do alcance ou escolha alternativas seguras.\n\n## Dicas Extras\n\n1. **Combine espécies**: Use diferentes plantas para máxima eficiência\n2. **Vasos adequados**: Certifique-se de que têm drenagem\n3. **Substrato de qualidade**: Use terra específica para plantas\n4. **Monitore a saúde**: Plantas saudáveis purificam melhor\n5. **Paciência**: Resultados aparecem após algumas semanas\n\nTransforme sua casa em um ambiente mais saudável e bonito com plantas purificadoras!`,
    category: "Jardinagem",
    isPublished: true
  }
];

async function createSampleArticles() {
  try {
    console.log("Criando artigos de exemplo...");

    for (const articleData of sampleArticles) {
      // Gerar slug, excerpt e readTime
      const slug = articleData.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

      const excerpt = articleData.content
        .replace(/<[^>]*>/g, "")
        .substring(0, 160)
        .trim() +
        "...";

      const readTime = Math.ceil(articleData.content.split(/\s+/).length / 200);

      // Verificar se já existe
      const { data: existing, error: existingError } = await supabaseAdmin
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();

      if (existingError && existingError.code !== "PGRST116") {
        // PGRST116 means no rows found
        console.error("Error checking existing article:", existingError);
        throw existingError;
      }

      if (!existing) {
        const { data: article, error: createArticleError } = await supabaseAdmin
          .from("articles")
          .insert([
            {
              ...articleData,
              slug,
              excerpt,
              readTime,
            },
          ])
          .select();

        if (createArticleError) {
          console.error("Error creating article:", createArticleError);
          throw createArticleError;
        }
        console.log(`✓ Artigo criado: ${articleData.title}`);
      } else {
        console.log(`- Artigo já existe: ${articleData.title}`);
      }
    }

    console.log("Artigos de exemplo criados com sucesso!");
  } catch (error) {
    console.error("Erro ao criar artigos de exemplo:", error);
  }
}

createSampleArticles();


