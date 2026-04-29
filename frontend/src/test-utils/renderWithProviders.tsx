import type { PropsWithChildren, ReactElement } from "react";
import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AppThemeProvider } from "@/theme";

export function Providers({ children }: PropsWithChildren) {
  return (
    <NavigationContainer>
      <AppThemeProvider>{children}</AppThemeProvider>
    </NavigationContainer>
  );
}

export function renderWithProviders(ui: ReactElement) {
  return render(ui, { wrapper: Providers });
}
