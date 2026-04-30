jest.mock("@react-navigation/drawer", () => {
  const React = require("react");

  return {
    createDrawerNavigator: () => ({
      Navigator: ({ children }: { children: React.ReactNode }) => <>{children}</>,
      Screen: ({
        component: Component,
        children,
      }: {
        component?: React.ComponentType;
        children?: () => React.ReactNode;
      }) => {
        if (Component) {
          return <Component />;
        }

        return <>{children?.()}</>;
      },
    }),
  };
});

import { render, screen } from "@testing-library/react-native";

import { useMockSessionStore } from "@/store/useMockSessionStore";
import { useThemeStore } from "@/store/useThemeStore";
import { AppThemeProvider } from "@/theme";

import { AppNavigator } from "./AppNavigator";

describe("AppNavigator", () => {
  beforeEach(() => {
    useMockSessionStore.getState().signOut();
    useThemeStore.setState({ mode: "dark" });
  });

  it("renders the role selection flow when unauthenticated", () => {
    render(
      <AppThemeProvider>
        <AppNavigator />
      </AppThemeProvider>
    );

    expect(screen.getByText("Power Gym Coach")).toBeTruthy();
  });

  it("renders the teacher app shell when authenticated as teacher", () => {
    useMockSessionStore.getState().signInAs("teacher");

    render(
      <AppThemeProvider>
        <AppNavigator />
      </AppThemeProvider>
    );

    expect(screen.getByText("Dashboard do professor")).toBeTruthy();
  });

  it("renders the student app shell when authenticated as student", () => {
    useMockSessionStore.getState().signInAs("student");
    useThemeStore.getState().setMode("light");

    render(
      <AppThemeProvider>
        <AppNavigator />
      </AppThemeProvider>
    );

    expect(screen.getByText("Dashboard do aluno")).toBeTruthy();
  });
});
