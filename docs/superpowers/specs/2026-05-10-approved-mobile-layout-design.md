# Layout Mobile Aprovado Design

## Contexto

O produto `Power Gym Coach` possui uma nova referência visual aprovada pelo usuário composta por oito telas mobile em largura de iPhone SE 2020. Essa referência substitui os padrões visuais antigos e passa a ser a fonte de verdade para a linguagem visual do app.

## Fonte de verdade visual

A imagem aprovada contém estas telas:

1. Dashboard do coach
2. Alunos
3. Hub do plano do aluno
4. Dieta do dia
5. Treino de hoje
6. Pagamentos
7. Avaliação
8. Exames

## Objetivo

Transcrever a referência aprovada para o app React Native com fidelidade alta de composição, proporção, ritmo, hierarquia, densidade e semântica visual, preservando o fluxo mockado já existente.

## Regras visuais obrigatórias

- Fundo principal em cinza carvão, não preto puro.
- Superfícies escuras com pouca variação tonal e bordas suaves.
- Laranja usado apenas em destaques, CTAs, ícones ativos, linhas de gráfico e estados importantes.
- Tipografia mais contida, menos pesada que as versões anteriores.
- Sem `box em cima de box`.
- Cards com ritmo consistente e respiro controlado para iPhone SE.
- Listas em formato de superfície única com linhas internas quando fizer sentido.
- Gráficos compactos e legíveis em telas pequenas.
- Rodapé com cinco atalhos visuais no padrão do mock aprovado.
- Topos com distribuição, tamanhos e iconografia próximas da imagem aprovada.

## Regras de branding

- O símbolo oficial deve ser o ícone presente na imagem aprovada.
- O símbolo deve ser usado em vez de variações antigas do app.
- O logo da dashboard do coach deve usar o símbolo correto e as proporções do mock.

## Regras de fidelidade por tela

### Dashboard do coach

- Topo com menu, símbolo, saudação, título, sino e avatar.
- Três cards de visão geral com composição vertical enxuta.
- Gráfico semanal largo com linha laranja, área preenchida e seletor de período.
- Bloco de progresso médio com anel percentual e barras temáticas.
- Alerta horizontal de pagamento pendente.
- Lista de alunos em destaque com CTA compacto.

### Alunos

- Topo com título, menu, sino e avatar.
- Dois cards de métricas principais.
- Busca e filtro na mesma faixa.
- Lista de alunos em superfície contínua, sem card pesado por linha.

### Hub do plano do aluno

- Topo com voltar, nome, objetivo e avatar.
- Card de plano atual com status, datas e progresso.
- Três entradas principais: dieta, treino e feedback.
- Rodapé visual com planos ativo.

### Dieta do dia

- Topo com voltar, título, data e menu de contexto.
- Três cards pequenos para meta, consumidas e restantes.
- Distribuição de refeições com barras horizontais.
- Lista de alimentos por refeição com calorias e status.
- Água do dia em linha com gotas.

### Treino de hoje

- Topo com voltar, título, data e dias da semana em chips.
- Card de progresso com anel, conclusão e tempo restante.
- Lista de exercícios em estrutura de checklist leve.

### Pagamentos

- Topo com voltar e título.
- Três cards resumo.
- Bloco de cobranças em aberto.
- Bloco de planos oferecidos.
- Botões de método de pagamento no rodapé do conteúdo.

### Avaliação

- Topo com voltar, título, nome do aluno e avatar.
- Linha de status do ciclo.
- Faixa de imagens do último envio.
- Bloco do último feedback.
- CTA principal fixo no fluxo da tela.

### Exames

- Topo com voltar, título, nome do aluno e avatar.
- Três cards resumo.
- Linha do tempo vertical clara.
- CTA principal ao final.

## Regras técnicas

- Preferir reconstruir telas críticas do zero em vez de adaptar layouts antigos quando a estrutura atual impedir fidelidade.
- Criar componentes-base antes de montar as telas.
- Validar iPhone SE como referência mínima.
- Manter textos em português.
- Preservar a lógica mockada já existente para dados, fluxos e navegação.

## Componentes-base necessários

- topo mobile do coach/aluno
- rodapé visual de navegação
- card de métrica compacta
- gráfico semanal com SVG
- card de progresso circular com barras auxiliares
- alerta horizontal
- linha de lista de aluno
- card de resumo de plano
- entrada de módulo do plano
- barra de refeição
- linha de alimento com status
- faixa de gotas de água
- card de progresso de treino
- linha de exercício
- card de resumo financeiro
- linha de cobrança
- linha de timeline
- faixa de miniaturas de avaliação

## Critérios de sucesso

- As oito telas devem lembrar imediatamente o mock aprovado.
- A composição deve caber com conforto em iPhone SE.
- O branding precisa usar o símbolo correto.
- O layout final deve parecer uma transcrição do mock, não apenas uma interpretação aproximada.
