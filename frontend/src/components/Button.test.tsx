import { fireEvent, screen } from "@testing-library/react-native";

import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { Button } from "./Button";

describe("Button", () => {
  it("renders the label and handles press", () => {
    const onPress = jest.fn();

    renderWithProviders(<Button label="Salvar" onPress={onPress} />);

    fireEvent.press(screen.getByText("Salvar"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("disables press events when disabled", () => {
    const onPress = jest.fn();

    renderWithProviders(<Button disabled label="Desabilitado" onPress={onPress} />);

    fireEvent.press(screen.getByText("Desabilitado"));

    expect(onPress).not.toHaveBeenCalled();
  });
});
