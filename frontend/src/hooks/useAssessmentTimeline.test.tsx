import { renderHook } from "@testing-library/react-native";

import { mockAssessmentRepository } from "@/repository/mock";
import { Providers } from "@/test-utils/renderWithProviders";

import { useAssessmentTimeline } from "./useAssessmentTimeline";

describe("useAssessmentTimeline", () => {
  it("returns the mocked submission and review timeline", () => {
    const { result } = renderHook(() => useAssessmentTimeline(), {
      wrapper: Providers,
    });

    expect(result.current.submission?.id).toBeDefined();
    expect(result.current.review?.id).toBeDefined();
    expect(result.current.timeline).toHaveLength(2);
  });

  it("returns an empty timeline when one side of the assessment is missing", () => {
    const submissionsSpy = jest
      .spyOn(mockAssessmentRepository, "listSubmissions")
      .mockReturnValue([]);

    const { result } = renderHook(() => useAssessmentTimeline(), {
      wrapper: Providers,
    });

    expect(result.current.submission).toBeUndefined();
    expect(result.current.timeline).toEqual([]);

    submissionsSpy.mockRestore();
  });
});
