import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { studentOverviewRepository } from "@/repository";

export function useStudentOverview() {
  const { currentPlan, hasUnsavedChanges } = useCurrentPlan();
  const overview = studentOverviewRepository.getPrimaryStudentOverview();
  const planDecisionSummary = hasUnsavedChanges
    ? "Existem ajustes em rascunho aguardando revisao final."
    : "Plano atual salvo e pronto para acompanhamento.";

  return {
    ...overview,
    planDecisionSummary,
    currentPlanTitle: currentPlan.title,
    currentPlanStatus: hasUnsavedChanges ? "Rascunho com ajustes em aberto" : "Plano atual salvo",
    trainingDaysCount: currentPlan.trainingPlan.days.length,
    mealsCount: currentPlan.dietPlan.meals.length,
    supplementsCount: currentPlan.dietPlan.supplements.length,
  };
}
