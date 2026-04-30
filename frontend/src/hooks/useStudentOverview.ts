import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { studentOverviewRepository } from "@/repository";

export function useStudentOverview() {
  const { currentPlan, hasUnsavedChanges } = useCurrentPlan();
  const overview = studentOverviewRepository.getPrimaryStudentOverview();
  const planDecisionSummary = hasUnsavedChanges
    ? "Existem ajustes em rascunho aguardando revisao final."
    : "Plano atual salvo e pronto para acompanhamento.";
  const operationalSnapshot = [
    `${currentPlan.trainingPlan.days.length} dias de treino ativos`,
    `${currentPlan.dietPlan.meals.length} refeicoes ativas`,
    `${overview.pendingExamCount} exames exigindo acompanhamento`,
  ].join(" • ");

  return {
    ...overview,
    planDecisionSummary,
    operationalSnapshot,
    currentPlanTitle: currentPlan.title,
    currentPlanStatus: hasUnsavedChanges ? "Rascunho com ajustes em aberto" : "Plano atual salvo",
    trainingDaysCount: currentPlan.trainingPlan.days.length,
    mealsCount: currentPlan.dietPlan.meals.length,
    supplementsCount: currentPlan.dietPlan.supplements.length,
  };
}
