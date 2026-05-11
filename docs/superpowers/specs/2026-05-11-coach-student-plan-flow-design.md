# Fluxo Coach Aluno Plano Design

## Objetivo

Reestruturar o fluxo do coach para que a navegacao siga claramente a hierarquia:

`Alunos -> Planos do aluno -> Detalhe do plano`

O detalhe do plano passa a ser a unidade principal do ciclo de acompanhamento, reunindo treino, dieta, observacoes e suplementacao no mesmo contexto visual.

## Regras de produto

- Ao tocar em um aluno na tela `Alunos`, o coach deve ver os planos daquele aluno.
- A tela de planos do aluno deve mostrar:
  - plano atual em destaque
  - historico de planos
  - CTA para cadastrar novo plano
- O detalhe do plano deve conter no mesmo fluxo:
  - resumo do plano
  - treino por dia da semana e por exercicio
  - dieta por refeicao
  - observacoes do plano
  - suplementacao do plano
- O layout deve seguir o padrao visual novo aprovado no mock mobile.

## Estrutura visual aprovada

### 1. Alunos

- topo no chrome novo
- metricas compactas
- busca e filtro
- lista clicavel de alunos
- cada linha do aluno abre os planos daquele aluno

### 2. Planos do aluno

- topo com voltar, nome do aluno e contexto do objetivo
- card principal do plano atual
- CTA `Cadastrar novo plano`
- lista de planos com status, periodo e CTA `Abrir plano`

### 3. Detalhe do plano

- topo com voltar, nome do aluno e status do ciclo
- resumo do plano com datas e progresso
- modulo `Treino`
  - agrupado por dia da semana
  - cada dia lista os exercicios com series, repeticoes, descanso e observacoes
- modulo `Dieta`
  - agrupado por refeicao
  - cada refeicao lista alimentos, calorias e observacao
- modulo `Observacoes`
  - notas gerais do treino/dieta para o ciclo
- modulo `Suplementacao`
  - lista suplementos, dosagem, horario e observacao

## Componentes necessarios

- `PlanListCard`
- `PlanMetaStrip`
- `TrainingDaySection`
- `ExercisePrescriptionRow`
- `MealPlanSection`
- `MealFoodRow`
- `PlanNotesCard`
- `SupplementPlanCard`

## Critérios de sucesso

- O clique no aluno sempre leva para os planos daquele aluno.
- O clique no plano abre uma tela que concentra tudo do ciclo.
- O coach nao precisa sair do detalhe do plano para entender treino, dieta, observacoes e suplementos.
- O visual segue o padrao novo do app, sem voltar para o layout antigo.
