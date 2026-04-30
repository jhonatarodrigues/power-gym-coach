import { fireEvent, screen } from "@testing-library/react-native";

import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { StudentDetailsScreen } from "./StudentDetailsScreen";

describe("StudentDetailsScreen", () => {
  it("renders the student summary and quick actions", () => {
    renderWithProviders(<StudentDetailsScreen />);

    expect(screen.getByText("Student details")).toBeTruthy();
    expect(screen.getByText("Sinais para decisao")).toBeTruthy();
    expect(screen.getByText("Timeline unificada")).toBeTruthy();
    expect(screen.getByText("Acoes rapidas")).toBeTruthy();
    expect(screen.getAllByText("Ajustar plano atual").length).toBeGreaterThan(0);
    expect(screen.getByText("Revisar progresso")).toBeTruthy();
    expect(screen.getAllByText("Abrir avaliacao").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Abrir exams").length).toBeGreaterThan(0);
    expect(screen.getByText("Abrir historico")).toBeTruthy();

    fireEvent.press(screen.getByText(/Exams \(/));

    expect(screen.getByText("Filtro atual: exam")).toBeTruthy();
  });

  it("can switch between timeline filters and return to all", () => {
    renderWithProviders(<StudentDetailsScreen />);

    fireEvent.press(screen.getByText(/Progress \(/));
    expect(screen.getByText("Filtro atual: progress")).toBeTruthy();

    fireEvent.press(screen.getByText("Mostrar timeline completa"));
    expect(screen.getByText("Filtro atual: Tudo")).toBeTruthy();
  });
});
