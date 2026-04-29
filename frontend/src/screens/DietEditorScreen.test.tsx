import { fireEvent, screen } from "@testing-library/react-native";

import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { DietEditorScreen } from "./DietEditorScreen";

describe("DietEditorScreen", () => {
  it("recalculates the preview when the portion changes", () => {
    renderWithProviders(<DietEditorScreen />);

    expect(screen.getByText("192 kcal")).toBeTruthy();

    fireEvent.changeText(screen.getByLabelText("Porcao"), "300");

    expect(screen.getByText("384 kcal")).toBeTruthy();
  });
});
