# Coach Student Plan Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fazer o fluxo do coach respeitar `Alunos -> Planos do aluno -> Detalhe do plano`, com o detalhe do plano reunindo treino, dieta, observacoes e suplementacao no layout novo.

**Architecture:** A lista de alunos passa a usar o estado real do `useCoachContextStore` e seleciona explicitamente o aluno antes da navegacao. A tela de planos organiza o plano atual e o historico, e a tela de detalhe do plano vira um hub completo do ciclo com secoes inline para treino, dieta, observacoes e suplementos.

**Tech Stack:** React Native, Expo, TypeScript, Zustand, React Navigation, Testing Library, Jest

---

### Task 1: Alinhar o estado e os testes do fluxo de aluno para planos

**Files:**
- Modify: `frontend/src/store/useCoachContextStore.ts`
- Modify: `frontend/src/screens/CoachStudentsScreen/CoachStudentsScreen.test.tsx`
- Modify: `frontend/src/screens/CoachStudentPlansScreen/CoachStudentPlansScreen.test.tsx`

- [ ] Garantir que o store exponha o aluno selecionado e os planos dele em ordem correta.
- [ ] Escrever/ajustar testes para confirmar que a selecao do aluno e usada pelo fluxo.
- [ ] Rodar os testes das duas telas e validar comportamento esperado.

### Task 2: Refazer a tela de alunos para abrir corretamente os planos do aluno

**Files:**
- Modify: `frontend/src/components/StudentListRow/StudentListRow.tsx`
- Modify: `frontend/src/screens/CoachStudentsScreen/CoachStudentsScreen.tsx`

- [ ] Tornar a linha do aluno clicavel no padrao visual novo.
- [ ] Passar a usar os alunos reais do `useCoachContextStore`, em vez de uma lista visual desconectada.
- [ ] Ao tocar no aluno, selecionar o aluno no store e navegar para `CoachStudentPlans`.

### Task 3: Refazer a tela de planos do aluno

**Files:**
- Create: `frontend/src/components/PlanListCard/PlanListCard.tsx`
- Create: `frontend/src/components/PlanListCard/index.ts`
- Modify: `frontend/src/components/index.ts`
- Modify: `frontend/src/screens/CoachStudentPlansScreen/CoachStudentPlansScreen.tsx`

- [ ] Criar o card de plano no padrao novo com status, periodo e CTA.
- [ ] Reorganizar a tela para mostrar plano atual em destaque, historico abaixo e CTA `Cadastrar novo plano`.
- [ ] Ao abrir o plano, manter selecao no store e navegar para o detalhe do plano.

### Task 4: Criar os componentes do detalhe do plano

**Files:**
- Create: `frontend/src/components/TrainingDaySection/TrainingDaySection.tsx`
- Create: `frontend/src/components/TrainingDaySection/index.ts`
- Create: `frontend/src/components/MealPlanSection/MealPlanSection.tsx`
- Create: `frontend/src/components/MealPlanSection/index.ts`
- Create: `frontend/src/components/PlanNotesCard/PlanNotesCard.tsx`
- Create: `frontend/src/components/PlanNotesCard/index.ts`
- Create: `frontend/src/components/SupplementPlanCard/SupplementPlanCard.tsx`
- Create: `frontend/src/components/SupplementPlanCard/index.ts`
- Modify: `frontend/src/components/index.ts`

- [ ] Criar secao de treino por dia com exercicios.
- [ ] Criar secao de dieta por refeicao com lista de alimentos.
- [ ] Criar card de observacoes do plano.
- [ ] Criar card/lista de suplementacao do plano.

### Task 5: Refazer o hub do plano como detalhe completo do ciclo

**Files:**
- Modify: `frontend/src/screens/CoachPlanHubScreen/CoachPlanHubScreen.tsx`
- Modify: `frontend/src/screens/CoachPlanHubScreen/CoachPlanHubScreen.test.tsx`

- [ ] Usar o resumo do plano no topo.
- [ ] Renderizar treino, dieta, observacoes e suplementacao inline na mesma tela.
- [ ] Manter o layout fiel ao padrao aprovado do app.
- [ ] Ajustar testes para cobrir as novas secoes.

### Task 6: Validacao e publicacao

**Files:**
- Modify: `.ia`

- [ ] Rodar `pnpm typecheck`
- [ ] Rodar `pnpm test`
- [ ] Verificar coverage acima da meta
- [ ] Atualizar `.ia`
- [ ] Commitar e subir as mudancas
