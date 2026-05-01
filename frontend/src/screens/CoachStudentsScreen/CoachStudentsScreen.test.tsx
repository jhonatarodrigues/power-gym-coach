import { screen } from "@testing-library/react-native";

import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { CoachStudentsScreen } from "./CoachStudentsScreen";

describe("CoachStudentsScreen", () => {
  it("renders a selectable student list", () => {
    renderWithProviders(<CoachStudentsScreen />);

    expect(screen.getByText("Alunos")).toBeTruthy();
    expect(screen.getByText("Marina Costa")).toBeTruthy();
    expect(screen.getByText("Lucas Andrade")).toBeTruthy();
  });
});
