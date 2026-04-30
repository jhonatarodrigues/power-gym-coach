import { screen } from "@testing-library/react-native";

import { exerciseLibraryMock } from "@/repository/mock";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { ExerciseLibraryScreen } from "./ExerciseLibraryScreen";

describe("ExerciseLibraryScreen", () => {
  it("renders exercise totals and exercise items", () => {
    renderWithProviders(<ExerciseLibraryScreen />);

    expect(screen.getByText("Exercise library")).toBeTruthy();
    expect(
      screen.getByText(`Total de exercicios: ${exerciseLibraryMock.length}`)
    ).toBeTruthy();
    expect(screen.getByText(exerciseLibraryMock[0].name)).toBeTruthy();
  });
});
