import { screen } from "@testing-library/react-native";

import { currentPlanMock, historyRecordsMock } from "@/repository/mock";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { HistoryCard } from "./HistoryCard";
import { MacroSummaryCard } from "./MacroSummaryCard";
import { MealCard } from "./MealCard";
import { TrainingDayCard } from "./TrainingDayCard";

describe("domain cards", () => {
  it("renders macro summary data", () => {
    renderWithProviders(
      <MacroSummaryCard
        calories={1865}
        carbs={204.3}
        fat={44.3}
        note="Totais do plano"
        protein={165.3}
        title="Resumo nutricional"
      />
    );

    expect(screen.getByText("Resumo nutricional")).toBeTruthy();
    expect(screen.getByText("1865 kcal")).toBeTruthy();
    expect(screen.getByText("Proteinas: 165.3 g")).toBeTruthy();
  });

  it("renders a training day with exercises", () => {
    renderWithProviders(
      <TrainingDayCard day={currentPlanMock.trainingPlan.days[0]} />
    );

    expect(
      screen.getByText(currentPlanMock.trainingPlan.days[0].title)
    ).toBeTruthy();
    expect(
      screen.getByText(currentPlanMock.trainingPlan.days[0].exercises[0].exerciseName)
    ).toBeTruthy();
  });

  it("renders a meal and its totals", () => {
    renderWithProviders(<MealCard meal={currentPlanMock.dietPlan.meals[0]} />);

    expect(screen.getByText(currentPlanMock.dietPlan.meals[0].title)).toBeTruthy();
    expect(
      screen.getByText(currentPlanMock.dietPlan.meals[0].items[0].foodName)
    ).toBeTruthy();
    expect(screen.getByText(/Totais:/)).toBeTruthy();
  });

  it("renders a history record", () => {
    renderWithProviders(<HistoryCard record={historyRecordsMock[0]} />);

    expect(screen.getByText(historyRecordsMock[0].title)).toBeTruthy();
    expect(screen.getByText(historyRecordsMock[0].type)).toBeTruthy();
  });
});
