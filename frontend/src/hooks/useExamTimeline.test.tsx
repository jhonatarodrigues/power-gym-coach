import { act, renderHook } from "@testing-library/react-native";

import { Providers } from "@/test-utils/renderWithProviders";
import { useMockSessionStore } from "@/store/useMockSessionStore";

import { useExamTimeline } from "./useExamTimeline";

describe("useExamTimeline", () => {
  afterEach(() => {
    act(() => {
      useMockSessionStore.getState().signOut();
    });
  });

  it("filters requests for the student session", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
    });

    const { result } = renderHook(() => useExamTimeline(), {
      wrapper: Providers,
    });

    expect(result.current.requests.length).toBeGreaterThan(0);
    expect(result.current.timeline.length).toBeGreaterThan(0);
  });

  it("keeps data available even without an authenticated user", () => {
    const { result } = renderHook(() => useExamTimeline(), {
      wrapper: Providers,
    });

    expect(result.current.requests.length).toBeGreaterThan(0);
    expect(result.current.uploads.length).toBeGreaterThan(0);
  });
});
