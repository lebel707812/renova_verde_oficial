# Plano de Redesign do Sistema de Upload de Imagens

## Análise do Problema Atual

O sistema de upload de imagens atual apresenta falhas que resultam no erro "Erro no servidor: resposta inválida". Após análise do código existente, identifiquei os seguintes problemas potenciais:

1. **Complexidade excessiva**: O código atual tenta fazer conversão de imagem para WebP com fallback para JPEG, o que pode causar falhas silenciosas
2. **Dependência do Sharp**: A biblioteca Sharp pode ter problemas de compatibilidade ou instalação
3. **Validações complexas**: Múltiplas verificações de buckets e conexões que podem falhar
4. **Tratamento de erro inadequado**: Logs insuficientes para debugging

## Novo Design Simplificado

### Princípios do Novo Sistema

1. **Simplicidade**: Reduzir a complexidade ao mínimo necessário
2. **Robustez**: Implementar tratamento de erro abrangente
3. **Transparência**: Logs detalhados para debugging
4. **Compatibilidade**: Usar apenas funcionalidades básicas e confiáveis

### Arquitetura Proposta

#### Backend (API Route)
- Validação básica de arquivo (tipo e tamanho)
- Upload direto para Supabase sem processamento de imagem
- Logs detalhados em cada etapa
- Resposta JSON consistente

#### Frontend (React Component)
- Interface simples de upload
- Feedback visual claro para o usuário
- Tratamento de erro robusto
- Preview da imagem após upload

### Fluxo de Funcionamento

1. Usuário seleciona arquivo
2. Frontend valida tipo e tamanho
3. Frontend envia arquivo para API
4. API valida novamente
5. API faz upload direto para Supabase
6. API retorna URL da imagem
7. Frontend exibe preview e salva URL

## Implementação

### Fase 1: Backend Simplificado
- Remover dependência do Sharp
- Implementar upload direto
- Adicionar logs detalhados

### Fase 2: Frontend Atualizado
- Simplificar componente de upload
- Melhorar feedback visual
- Implementar tratamento de erro

### Fase 3: Testes e Integração
- Testar com arquivos reais
- Verificar compatibilidade
- Integrar com sistema existente

