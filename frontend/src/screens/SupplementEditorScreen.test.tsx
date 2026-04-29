import { fireEvent, screen, waitFor } from "@testing-library/react-native";

import { currentPlanMock } from "@/repository/mock";
import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { SupplementEditorScreen } from "./SupplementEditorScreen";

describe("SupplementEditorScreen", () => {
  beforeEach(() => {
    useCurrentPlanStore.getState().resetCurrentPlan();
  });

  it("adds a supplement to the current plan", async () => {
    const initialCount = currentPlanMock.dietPlan.supplements.length;

    renderWithProviders(<SupplementEditorScreen />);

    fireEvent.changeText(screen.getByLabelText("Nome"), "Cafeina");
    fireEvent.changeText(screen.getByLabelText("Dosagem"), "200 mg");
    fireEvent.changeText(screen.getByLabelText("Horario"), "Pre treino");
    fireEvent.changeText(screen.getByLabelText("Observacao"), "Somente pela manha.");
    fireEvent.changeText(screen.getByLabelText("Calorias"), "10");
    fireEvent.changeText(screen.getByLabelText("Carboidratos"), "2");
    fireEvent.changeText(screen.getByLabelText("Proteinas"), "0");
    fireEvent.changeText(screen.getByLabelText("Gorduras"), "0");
    fireEvent.press(screen.getByText("Adicionar suplemento"));

    await waitFor(() => {
      const supplements = useCurrentPlanStore.getState().currentPlan.dietPlan.supplements;

      expect(supplements).toHaveLength(initialCount + 1);
      expect(supplements.at(-1)).toMatchObject({
        name: "Cafeina",
        dosage: "200 mg",
        timing: "Pre treino",
      });
    });
  });
});
