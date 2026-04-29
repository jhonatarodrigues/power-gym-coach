import { act, renderHook } from "@testing-library/react-native";

import { useMockSessionStore } from "@/store/useMockSessionStore";
import { Providers } from "@/test-utils/renderWithProviders";

import { useMockAuth } from "./useMockAuth";

describe("useMockAuth", () => {
  beforeEach(() => {
    useMockSessionStore.getState().signOut();
  });

  it("exposes session and sign in helpers", () => {
    const { result } = renderHook(() => useMockAuth(), { wrapper: Providers });

    act(() => {
      result.current.signInAs("teacher");
    });

    expect(result.current.session.accessLevel).toBe("teacher");
    expect(result.current.session.isAuthenticated).toBe(true);
  });
});
