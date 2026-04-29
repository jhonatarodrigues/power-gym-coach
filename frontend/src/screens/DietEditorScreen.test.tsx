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

  it("handles unit-based foods through the quick portion buttons", () => {
    renderWithProviders(<DietEditorScreen />);

    fireEvent.press(screen.getByText("Banana prata"));

    expect(screen.getByText("196 kcal")).toBeTruthy();

    fireEvent.press(screen.getByText("Aumentar quantidade"));

    expect(screen.getByText("294 kcal")).toBeTruthy();

    fireEvent.press(screen.getByText("Reduzir quantidade"));

    expect(screen.getByText("196 kcal")).toBeTruthy();
  });
});
