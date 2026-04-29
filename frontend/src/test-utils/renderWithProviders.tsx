import type { PropsWithChildren, ReactElement } from "react";
import { render } from "@testing-library/react-native";

import { AppThemeProvider } from "@/theme";

function Providers({ children }: PropsWithChildren) {
  return <AppThemeProvider>{children}</AppThemeProvider>;
}

export function renderWithProviders(ui: ReactElement) {
  return render(ui, { wrapper: Providers });
}
