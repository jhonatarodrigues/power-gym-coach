import { screen } from "@testing-library/react-native";

import { currentPlanMock, historyRecordsMock } from "@/repository/mock";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { Card } from "@/components/Card";
import { HistoryCard } from "@/components/HistoryCard";
import { MacroSummaryCard } from "@/components/MacroSummaryCard";
import { MealCard } from "@/components/MealCard";
import { SectionTitle } from "@/components/SectionTitle";
import { SupplementCard } from "@/components/SupplementCard";
import { TrainingDayCard } from "@/components/TrainingDayCard";

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

  it("covers optional content branches for summary cards", () => {
    const mealWithoutObservation = {
      ...currentPlanMock.dietPlan.meals[0],
      observation: undefined,
    };
    const dayWithoutNotes = {
      ...currentPlanMock.trainingPlan.days[0],
      notes: undefined,
    };
    const supplementWithoutObservation = {
      ...currentPlanMock.dietPlan.supplements[0],
      observation: undefined,
    };
    const recordWithoutDescription = {
      ...historyRecordsMock[0],
      description: undefined,
    };

    const { rerender } = renderWithProviders(
      <SectionTitle title="Resumo" description="Descricao" actionLabel="Acao" />
    );

    expect(screen.getByText("Descricao")).toBeTruthy();
    expect(screen.getByText("Acao")).toBeTruthy();

    rerender(<SectionTitle title="Resumo" />);
    rerender(<MacroSummaryCard title="Macros" calories={10} carbs={1} protein={2} fat={3} />);
    rerender(<MealCard meal={mealWithoutObservation} />);
    rerender(<TrainingDayCard day={dayWithoutNotes} />);
    rerender(<SupplementCard supplement={supplementWithoutObservation} />);
    rerender(<HistoryCard record={recordWithoutDescription} />);
    rerender(<Card padded={false}><SectionTitle title="Sem padding" /></Card>);

    expect(screen.getByText("Sem padding")).toBeTruthy();
  });
});
