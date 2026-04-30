import { renderHook } from "@testing-library/react-native";

import { Providers } from "@/test-utils/renderWithProviders";

import { useProgressSummary } from "./useProgressSummary";

describe("useProgressSummary", () => {
  it("returns comparison data for the latest progress entry", () => {
    const { result } = renderHook(() => useProgressSummary(), {
      wrapper: Providers,
    });

    expect(result.current.latestEntry).toBeTruthy();
    expect(result.current.previousEntry).toBeTruthy();
    expect(result.current.latestPhotos.length).toBeGreaterThan(0);
    expect(result.current.recentMomentum).toContain("Resposta");
  });
});
