# Approved Mobile Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruir os componentes e as oito telas do mock aprovado com fidelidade visual no app React Native.

**Architecture:** A implementação será feita em duas camadas. Primeiro entram componentes visuais específicos do novo padrão. Depois as telas principais passam a compor esses blocos com os dados mockados e a navegação existente.

**Tech Stack:** React Native, Expo, TypeScript, Zustand, React Navigation, react-native-svg, Jest, Testing Library

---

### Task 1: Documentar a referência e preparar a fundação visual

**Files:**
- Create: `docs/superpowers/specs/2026-05-10-approved-mobile-layout-design.md`
- Create: `docs/superpowers/plans/2026-05-10-approved-mobile-layout.md`
- Modify: `frontend/src/theme/theme.ts`
- Modify: `frontend/src/theme/colors.ts`
- Modify: `frontend/src/components/Screen/Screen.tsx`

- [ ] **Step 1: Garantir que a referência aprovada esteja escrita**
- [ ] **Step 2: Revisar tokens responsivos para iPhone SE**
- [ ] **Step 3: Ajustar fundação de espaçamento e altura útil para as novas telas**

### Task 2: Escrever testes vermelhos para a nova linguagem visual

**Files:**
- Modify: `frontend/src/screens/TeacherDashboardScreen/TeacherDashboardScreen.test.tsx`
- Modify: `frontend/src/screens/CoachStudentsScreen/CoachStudentsScreen.test.tsx`
- Create: `frontend/src/screens/CoachPlanHubScreen/CoachPlanHubScreen.fidelity.test.tsx`
- Modify: `frontend/src/screens/StudentDietScreen/StudentDietScreen.test.tsx`
- Modify: `frontend/src/screens/StudentWorkoutScreen/StudentWorkoutScreen.test.tsx`
- Modify: `frontend/src/screens/PaymentsScreen/PaymentsScreen.test.tsx`
- Modify: `frontend/src/screens/AssessmentScreen/AssessmentScreen.test.tsx`
- Modify: `frontend/src/screens/ExamsScreen/ExamsScreen.test.tsx`

- [ ] **Step 1: Adicionar expectativas dos novos blocos visuais e textos-chave**
- [ ] **Step 2: Rodar os testes das telas alvo e confirmar falha**

### Task 3: Criar componentes-base do novo padrão

**Files:**
- Create: `frontend/src/components/AppTopBar/AppTopBar.tsx`
- Create: `frontend/src/components/AppTopBar/index.ts`
- Create: `frontend/src/components/AppBottomNav/AppBottomNav.tsx`
- Create: `frontend/src/components/AppBottomNav/index.ts`
- Create: `frontend/src/components/CompactMetricCard/CompactMetricCard.tsx`
- Create: `frontend/src/components/CompactMetricCard/index.ts`
- Create: `frontend/src/components/WeeklyLineChart/WeeklyLineChart.tsx`
- Create: `frontend/src/components/WeeklyLineChart/index.ts`
- Create: `frontend/src/components/CircularProgressSummary/CircularProgressSummary.tsx`
- Create: `frontend/src/components/CircularProgressSummary/index.ts`
- Create: `frontend/src/components/InlineAlertBanner/InlineAlertBanner.tsx`
- Create: `frontend/src/components/InlineAlertBanner/index.ts`
- Create: `frontend/src/components/StudentListRow/StudentListRow.tsx`
- Create: `frontend/src/components/StudentListRow/index.ts`
- Create: `frontend/src/components/PlanSummaryCard/PlanSummaryCard.tsx`
- Create: `frontend/src/components/PlanSummaryCard/index.ts`
- Create: `frontend/src/components/PlanModuleRow/PlanModuleRow.tsx`
- Create: `frontend/src/components/PlanModuleRow/index.ts`
- Create: `frontend/src/components/MealProgressRow/MealProgressRow.tsx`
- Create: `frontend/src/components/MealProgressRow/index.ts`
- Create: `frontend/src/components/FoodCheckRow/FoodCheckRow.tsx`
- Create: `frontend/src/components/FoodCheckRow/index.ts`
- Create: `frontend/src/components/WaterDropProgress/WaterDropProgress.tsx`
- Create: `frontend/src/components/WaterDropProgress/index.ts`
- Create: `frontend/src/components/WorkoutProgressCard/WorkoutProgressCard.tsx`
- Create: `frontend/src/components/WorkoutProgressCard/index.ts`
- Create: `frontend/src/components/PaymentSummaryCard/PaymentSummaryCard.tsx`
- Create: `frontend/src/components/PaymentSummaryCard/index.ts`
- Create: `frontend/src/components/TimelineEventRow/TimelineEventRow.tsx`
- Create: `frontend/src/components/TimelineEventRow/index.ts`
- Modify: `frontend/src/components/index.ts`

- [ ] **Step 1: Criar os componentes mínimos do mock**
- [ ] **Step 2: Integrar o símbolo correto da marca no topo**
- [ ] **Step 3: Rodar testes direcionados dos componentes novos**

### Task 4: Reconstruir as telas do mock aprovado

**Files:**
- Modify: `frontend/src/screens/TeacherDashboardScreen/TeacherDashboardScreen.tsx`
- Modify: `frontend/src/screens/CoachStudentsScreen/CoachStudentsScreen.tsx`
- Modify: `frontend/src/screens/CoachPlanHubScreen/CoachPlanHubScreen.tsx`
- Modify: `frontend/src/screens/StudentDietScreen/StudentDietScreen.tsx`
- Modify: `frontend/src/screens/StudentWorkoutScreen/StudentWorkoutScreen.tsx`
- Modify: `frontend/src/screens/PaymentsScreen/PaymentsScreen.tsx`
- Modify: `frontend/src/screens/AssessmentScreen/AssessmentScreen.tsx`
- Modify: `frontend/src/screens/ExamsScreen/ExamsScreen.tsx`

- [ ] **Step 1: Reescrever dashboard do coach sobre os novos componentes**
- [ ] **Step 2: Reescrever tela de alunos**
- [ ] **Step 3: Reescrever hub do plano**
- [ ] **Step 4: Reescrever dieta do dia**
- [ ] **Step 5: Reescrever treino de hoje**
- [ ] **Step 6: Reescrever pagamentos**
- [ ] **Step 7: Reescrever avaliação**
- [ ] **Step 8: Reescrever exames**

### Task 5: Fechar fidelidade de navegação e branding

**Files:**
- Modify: `frontend/src/navigation/AppNavigator.tsx`
- Modify: `frontend/src/navigation/types.ts`
- Modify: `frontend/src/components/BrandLogo/BrandLogo.tsx`
- Modify: `frontend/assets/brand-symbol.svg`
- Modify: `frontend/assets/brand-symbol.png`
- Modify: `frontend/assets/icon.png`
- Modify: `frontend/assets/adaptive-icon.png`
- Modify: `frontend/assets/splash-icon.png`
- Modify: `frontend/assets/favicon.png`

- [ ] **Step 1: Garantir o símbolo correto da marca**
- [ ] **Step 2: Ajustar tabs visuais para refletir o mock**
- [ ] **Step 3: Confirmar compatibilidade das rotas usadas pelas telas novas**

### Task 6: Validar, registrar e publicar

**Files:**
- Modify: `.ia`

- [ ] **Step 1: Rodar `pnpm typecheck`**
- [ ] **Step 2: Rodar `pnpm test`**
- [ ] **Step 3: Revisar cobertura mínima**
- [ ] **Step 4: Atualizar `.ia` com o novo padrão oficial**
- [ ] **Step 5: Commitar e subir a feature**
