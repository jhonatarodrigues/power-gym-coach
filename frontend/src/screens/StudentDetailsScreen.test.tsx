import { screen } from "@testing-library/react-native";

import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { StudentDetailsScreen } from "./StudentDetailsScreen";

describe("StudentDetailsScreen", () => {
  it("renders the student summary and quick actions", () => {
    renderWithProviders(<StudentDetailsScreen />);

    expect(screen.getByText("Student details")).toBeTruthy();
    expect(screen.getByText("Acoes rapidas")).toBeTruthy();
    expect(screen.getByText("Abrir plano atual")).toBeTruthy();
    expect(screen.getByText("Abrir avaliacao")).toBeTruthy();
    expect(screen.getByText("Abrir exams")).toBeTruthy();
  });
});
