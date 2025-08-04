const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleArticles = [
  {
    title: "Energia Solar Residencial: Guia Completo para Iniciantes",
    imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
    content: `A energia solar residencial está se tornando cada vez mais popular no Brasil. Com a redução dos custos dos painéis solares e os incentivos governamentais, investir em energia solar pode ser uma excelente decisão financeira e ambiental.

## Vantagens da Energia Solar

A energia solar oferece diversas vantagens para residências:

### Economia na Conta de Luz
Com um sistema solar bem dimensionado, é possível reduzir a conta de energia elétrica em até 95%. O investimento inicial se paga em média entre 4 a 6 anos.

### Sustentabilidade Ambiental
A energia solar é uma fonte limpa e renovável, que não emite gases poluentes durante sua operação. Cada kWh gerado evita a emissão de aproximadamente 0,5 kg de CO2.

### Valorização do Imóvel
Imóveis com sistemas de energia solar tendem a ter maior valor de mercado, sendo um diferencial competitivo na hora da venda.

## Como Funciona o Sistema Solar

O sistema solar fotovoltaico converte a luz solar em energia elétrica através de painéis solares. A energia gerada é convertida de corrente contínua para alternada através de um inversor, podendo ser utilizada diretamente na residência.

## Dimensionamento do Sistema

Para dimensionar corretamente o sistema solar, é necessário analisar o consumo médio mensal da residência e as condições de irradiação solar da região. Um profissional qualificado deve realizar este cálculo.

Investir em energia solar é investir no futuro sustentável da sua família e do planeta.`,
    category: "Energia Renovável",
    isPublished: true
  },
  {
    title: "Compostagem Doméstica: Transforme Restos de Comida em Adubo",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
    content: `A compostagem doméstica é uma prática simples e eficaz para reduzir o lixo orgânico e produzir adubo natural para suas plantas. Além de contribuir para o meio ambiente, você economiza dinheiro em fertilizantes.

## O que é Compostagem?

A compostagem é um processo natural de decomposição de matéria orgânica por microorganismos, resultando em um composto rico em nutrientes para as plantas.

## Materiais para Compostagem

### Materiais Verdes (Ricos em Nitrogênio)
- Restos de frutas e verduras
- Borra de café
- Cascas de ovos
- Aparas de grama

### Materiais Marrons (Ricos em Carbono)
- Folhas secas
- Papel picado
- Serragem
- Galhos pequenos

## Como Fazer uma Composteira

### Composteira de Baldes
Para apartamentos, uma composteira de baldes é ideal:
1. Use 3 baldes com furos no fundo
2. Alterne camadas de material verde e marrom
3. Mantenha úmido mas não encharcado
4. Revolva semanalmente

### Composteira de Quintal
Para casas com quintal:
1. Escolha um local sombreado
2. Faça uma pilha de 1m x 1m
3. Alterne camadas de 10cm
4. Cubra com folhas secas

## Cuidados Importantes

- Evite carnes, laticínios e gorduras
- Mantenha a umidade adequada
- Revolva regularmente para oxigenar
- O composto estará pronto em 2-3 meses

A compostagem é um hábito simples que faz uma grande diferença para o meio ambiente!`,
    category: "Compostagem",
    isPublished: true
  },
  {
    title: "Reforma Ecológica: Materiais Sustentáveis para sua Casa",
    imageUrl: "https://images.unsplash.com/photo-1518051870423-937283d030f7?w=800&h=600&fit=crop",
    content: `Reformar a casa pensando na sustentabilidade é uma tendência que veio para ficar. Além de contribuir para o meio ambiente, materiais ecológicos podem oferecer melhor qualidade de vida e economia a longo prazo.

## Materiais Sustentáveis para Construção

### Bambu
O bambu é um material versátil e sustentável:
- Crescimento rápido (3-5 anos)
- Resistente e flexível
- Uso em pisos, paredes e móveis
- Absorve mais CO2 que árvores convencionais

### Tijolo Ecológico
Feito com solo-cimento, o tijolo ecológico oferece:
- Melhor isolamento térmico
- Redução no uso de argamassa
- Processo de fabricação menos poluente
- Economia de até 30% na obra

### Tinta Ecológica
Tintas à base de água e sem compostos tóxicos:
- Não emitem vapores nocivos
- Secagem mais rápida
- Cores naturais e duradouras
- Melhor qualidade do ar interno

## Isolamento Térmico Natural

### Lã de Pet
Feita com garrafas PET recicladas:
- Excelente isolamento térmico
- Não propaga fogo
- Fácil instalação
- Contribui para reciclagem

### Cortiça
Material natural com propriedades únicas:
- Isolamento térmico e acústico
- Resistente à umidade
- Durabilidade de décadas
- Renovável (não mata a árvore)

## Pisos Sustentáveis

### Piso de Bambu
- Durabilidade similar ao carvalho
- Resistente à umidade
- Fácil manutenção
- Crescimento renovável

### Piso de Cortiça
- Confortável para caminhar
- Naturalmente antimicrobiano
- Isolamento térmico natural
- Absorve ruídos

## Dicas para uma Reforma Ecológica

1. **Planeje bem**: Evite desperdícios e retrabalhos
2. **Reutilize**: Aproveite materiais da demolição
3. **Compre local**: Reduza o transporte
4. **Escolha qualidade**: Materiais duráveis são mais sustentáveis
5. **Pense no futuro**: Facilite futuras manutenções

Uma reforma ecológica é um investimento no futuro do planeta e da sua família!`,
    category: "Reforma Ecológica",
    isPublished: true
  },
  {
    title: "Economia de Água: 15 Dicas Práticas para Reduzir o Consumo",
    imageUrl: "https://images.unsplash.com/photo-1551076805-e0186786854b?w=800&h=600&fit=crop",
    content: `A água é um recurso precioso e sua economia deve ser uma prioridade em todos os lares. Com algumas mudanças simples de hábitos e pequenos investimentos, é possível reduzir significativamente o consumo de água.

## Dicas para o Banheiro

### 1. Banhos Mais Curtos
Reduza o tempo de banho para 5-8 minutos. Cada minuto a menos economiza cerca de 6 litros de água.

### 2. Feche a Torneira
Desligue a água enquanto escova os dentes, faz a barba ou ensaboa as mãos.

### 3. Vaso Sanitário Eficiente
Instale uma válvula de duplo acionamento ou coloque uma garrafa com água no reservantório antigo.

### 4. Chuveiro Econômico
Use chuveiros com restritores de vazão ou arejadores para reduzir o consumo sem perder conforto.

## Dicas para a Cozinha

### 5. Lave Louça de Forma Inteligente
Acumule a louça e lave tudo de uma vez. Use uma bacia para ensaboar e outra para enxaguar.

### 6. Reutilize Água de Cozimento
A água usada para cozinhar legumes pode ser reutilizada para regar plantas (após esfriar).

### 7. Máquina de Lavar Louça
Se tiver, use apenas quando estiver cheia. É mais econômica que lavar à mão quando usada corretamente.

## Dicas para a Área de Serviço

### 8. Máquina de Lavar Roupa
Use apenas com carga completa e escolha o nível de água adequado para a quantidade de roupa.

### 9. Reutilize Água da Máquina
A água do último enxágue pode ser usada para lavar o quintal ou regar plantas.

### 10. Tanque Inteligente
Feche a torneira enquanto ensaboa as roupas no tanque.

## Dicas para o Jardim

### 11. Regue no Horário Certo
Regue plantas no início da manhã ou final da tarde para evitar evaporação.

### 12. Cobertura Morta (Mulch)
Use folhas secas, palha ou casca de árvore para manter a umidade do solo.

### 13. Plantas Nativas
Escolha plantas adaptadas ao clima local, que precisam de menos água.

## Sistemas de Captação

### 14. Captação de Água da Chuva
Instale calhas e reservatórios para coletar água da chuva para uso no jardim.

### 15. Reuso de Água Cinza
Reutilize água do chuveiro e lavatórios (após tratamento simples) para irrigação.

## Detecção de Vazamentos

- Verifique o hidrômetro com todos os registros fechados
- Observe manchas de umidade em paredes e tetos
- Teste a válvula de descarga com corante alimentício
- Verifique torneiras pingando

## Benefícios da Economia de Água

- **Financeiro**: Redução na conta de água
- **Ambiental**: Preservação dos recursos hídricos
- **Social**: Mais água disponível para todos
- **Futuro**: Garantia de água para próximas gerações

Pequenas ações fazem uma grande diferença. Comece hoje mesmo a economizar água!`,
    category: "Economia de Água",
    isPublished: true
  },
  {
    title: "Plantas Purificadoras de Ar: Melhore a Qualidade do Ar em Casa",
    content: `As plantas não são apenas elementos decorativos, elas também podem melhorar significativamente a qualidade do ar interno da sua casa. Algumas espécies são especialmente eficazes na remoção de poluentes comuns.

## Por que Usar Plantas Purificadoras?

### Benefícios para a Saúde
- Reduzem poluentes do ar
- Aumentam a umidade do ambiente
- Diminuem o estresse e ansiedade
- Melhoram a concentração
- Ajudam na qualidade do sono

### Poluentes Comuns em Casa
- Formaldeído (móveis, tapetes)
- Benzeno (tintas, plásticos)
- Tricloroetileno (produtos de limpeza)
- Xileno (impressoras, borracha)
- Amônia (produtos de limpeza)

## Melhores Plantas Purificadoras

### 1. Espada-de-São-Jorge (Sansevieria)
**Poluentes removidos**: Formaldeído, xileno, benzeno
**Cuidados**: Pouca água, luz indireta
**Local ideal**: Quarto (produz oxigênio à noite)

### 2. Jiboia (Epipremnum aureum)
**Poluentes removidos**: Formaldeído, xileno, benzeno
**Cuidados**: Fácil cultivo, luz indireta
**Local ideal**: Sala, escritório

### 3. Lírio-da-Paz (Spathiphyllum)
**Poluentes removidos**: Amônia, benzeno, formaldeído
**Cuidados**: Solo úmido, sombra parcial
**Local ideal**: Banheiro, cozinha

### 4. Palmeira-Areca (Dypsis lutescens)
**Poluentes removidos**: Formaldeído, xileno
**Cuidados**: Luz indireta, solo úmido
**Local ideal**: Sala ampla

### 5. Clorofito (Chlorophytum comosum)
**Poluentes removidos**: Formaldeído, xileno
**Cuidados**: Muito fácil, luz indireta
**Local ideal**: Qualquer ambiente

### 6. Ficus (Ficus benjamina)
**Poluentes removidos**: Formaldeído, benzeno
**Cuidados**: Luz indireta, rega moderada
**Local ideal**: Sala, escritório

### 7. Aloe Vera
**Poluentes removidos**: Formaldeído, benzeno
**Cuidados**: Pouca água, luz direta
**Local ideal**: Cozinha, banheiro

### 8. Filodendro (Philodendron)
**Poluentes removidos**: Formaldeído
**Cuidados**: Luz indireta, solo úmido
**Local ideal**: Sala, quarto

## Quantas Plantas Usar?

### Recomendação NASA
- 1 planta para cada 9m² de área
- Plantas de tamanho médio a grande
- Vasos de pelo menos 15cm de diâmetro

### Distribuição Ideal
- **Sala**: 2-3 plantas grandes
- **Quarto**: 1-2 plantas (Espada-de-São-Jorge ideal)
- **Cozinha**: 1-2 plantas pequenas
- **Banheiro**: 1 planta resistente à umidade
- **Escritório**: 1-2 plantas de fácil cuidado

## Cuidados Gerais

### Rega
- Verifique a umidade do solo
- Evite encharcamento
- Use água filtrada quando possível

### Luz
- Maioria prefere luz indireta
- Gire as plantas semanalmente
- Observe sinais de falta ou excesso de luz

### Limpeza
- Limpe as folhas regularmente
- Remove folhas mortas ou doentes
- Use pano úmido para remover poeira

### Fertilização
- Use fertilizante líquido diluído
- Fertilize na primavera e verão
- Evite excesso de nutrientes

## Plantas Tóxicas - Cuidado!

Algumas plantas purificadoras podem ser tóxicas para pets e crianças:
- Lírio-da-Paz
- Filodendro
- Jiboia
- Ficus

Mantenha fora do alcance ou escolha alternativas seguras.

## Dicas Extras

1. **Combine espécies**: Use diferentes plantas para máxima eficiência
2. **Vasos adequados**: Certifique-se de que têm drenagem
3. **Substrato de qualidade**: Use terra específica para plantas
4. **Monitore a saúde**: Plantas saudáveis purificam melhor
5. **Paciência**: Resultados aparecem após algumas semanas

Transforme sua casa em um ambiente mais saudável e bonito com plantas purificadoras!`,
    category: "Jardinagem",
    isPublished: true
  }
];

async function createSampleArticles() {
  try {
    console.log('Criando artigos de exemplo...');
    
    for (const articleData of sampleArticles) {
      // Gerar slug, excerpt e readTime
      const slug = articleData.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      const excerpt = articleData.content
        .replace(/<[^>]*>/g, '')
        .substring(0, 160)
        .trim() + '...';
      
      const readTime = Math.ceil(articleData.content.split(/\s+/).length / 200);
      
      // Verificar se já existe
      const existing = await prisma.article.findUnique({
        where: { slug }
      });
      
      if (!existing) {
        await prisma.article.create({
          data: {
            ...articleData,
            slug,
            excerpt,
            readTime
          }
        });
        console.log(`✓ Artigo criado: ${articleData.title}`);
      } else {
        console.log(`- Artigo já existe: ${articleData.title}`);
      }
    }
    
    console.log('Artigos de exemplo criados com sucesso!');
    
  } catch (error) {
    console.error('Erro ao criar artigos de exemplo:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleArticles();

