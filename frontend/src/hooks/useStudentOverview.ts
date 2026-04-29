import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { studentOverviewRepository } from "@/repository/studentRepository";

export function useStudentOverview() {
  const { currentPlan, hasUnsavedChanges } = useCurrentPlan();
  const overview = studentOverviewRepository.getPrimaryStudentOverview();

  return {
    ...overview,
    currentPlanTitle: currentPlan.title,
    currentPlanStatus: hasUnsavedChanges ? "Rascunho com ajustes em aberto" : "Plano atual salvo",
    trainingDaysCount: currentPlan.trainingPlan.days.length,
    mealsCount: currentPlan.dietPlan.meals.length,
    supplementsCount: currentPlan.dietPlan.supplements.length,
  };
}
