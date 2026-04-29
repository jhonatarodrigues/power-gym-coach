import {
  archivedPlansMock,
  assessmentReviewsMock,
  assessmentSubmissionsMock,
  currentPlanMock,
  examRequestsMock,
  examUploadsMock,
  historyRecordsMock,
  mockAssessmentRepository,
  mockExamRepository,
  mockPlanRepository,
  mockProgressRepository,
  progressEntriesMock,
} from "@/repository/mock";

describe("mock repositories", () => {
  it("returns the mocked plan data", () => {
    expect(mockPlanRepository.getCurrentPlan()).toEqual(currentPlanMock);
    expect(mockPlanRepository.getArchivedPlans()).toEqual(archivedPlansMock);
  });

  it("returns the mocked assessment data", () => {
    expect(mockAssessmentRepository.listSubmissions()).toEqual(
      assessmentSubmissionsMock
    );
    expect(mockAssessmentRepository.listReviews()).toEqual(assessmentReviewsMock);
  });

  it("returns the mocked exam data", () => {
    expect(mockExamRepository.listRequests()).toEqual(examRequestsMock);
    expect(mockExamRepository.listUploads()).toEqual(examUploadsMock);
  });

  it("returns the mocked progress data", () => {
    expect(mockProgressRepository.listEntries()).toEqual(progressEntriesMock);
    expect(mockProgressRepository.listHistory()).toEqual(historyRecordsMock);
  });
});
