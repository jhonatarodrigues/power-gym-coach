import { renderHook } from "@testing-library/react-native";

import { Providers } from "@/test-utils/renderWithProviders";

import { useStudentJourneyTimeline } from "./useStudentJourneyTimeline";

describe("useStudentJourneyTimeline", () => {
  it("returns the latest unified events for the student journey", () => {
    const { result } = renderHook(() => useStudentJourneyTimeline(), {
      wrapper: Providers,
    });

    expect(result.current.events.length).toBeGreaterThan(0);
    expect(result.current.latestEvents.length).toBeGreaterThan(0);
  });
});
