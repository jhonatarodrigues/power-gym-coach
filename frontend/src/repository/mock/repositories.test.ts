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
  mockStudentOverviewRepository,
  progressEntriesMock,
  studentProfilesMock,
  usersMock,
} from "@/repository/mock";
import { useAssessmentWorkflowStore } from "@/store/useAssessmentWorkflowStore";
import { useExamWorkflowStore } from "@/store/useExamWorkflowStore";

describe("mock repositories", () => {
  beforeEach(() => {
    useAssessmentWorkflowStore.getState().reset();
    useExamWorkflowStore.getState().reset();
  });

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

  it("mutates the exam workflow through the repository contract", () => {
    mockExamRepository.requestExam({
      teacherId: "user-teacher-1",
      studentId: "user-student-1",
      title: "Triglicerideos",
    });

    expect(mockExamRepository.listRequests()[0]?.title).toBe("Triglicerideos");

    const sentRequest = mockExamRepository.listRequests().find((request) => request.status === "sent");

    if (!sentRequest) {
      throw new Error("Expected a sent exam request in mock repository.");
    }

    mockExamRepository.reviewExam({
      examRequestId: sentRequest.id,
      reviewNote: "Exame revisado com boa resposta.",
    });

    expect(mockExamRepository.listRequests().find((request) => request.id === sentRequest.id)?.reviewNote).toBe(
      "Exame revisado com boa resposta."
    );
  });

  it("mutates the assessment workflow through the repository contract", () => {
    mockAssessmentRepository.submitAssessment({
      teacherId: "user-teacher-1",
      studentId: "user-student-1",
      description: "Nova submissao de avaliacao",
    });

    expect(mockAssessmentRepository.listSubmissions()[0]?.description).toBe(
      "Nova submissao de avaliacao"
    );
  });

  it("returns the mocked progress data", () => {
    expect(mockProgressRepository.listEntries()).toEqual(progressEntriesMock);
    expect(mockProgressRepository.listHistory()).toEqual(historyRecordsMock);
  });

  it("returns the primary student overview", () => {
    const overview = mockStudentOverviewRepository.getPrimaryStudentOverview();

    expect(overview.studentProfile).toEqual(studentProfilesMock[0]);
    expect(overview.studentUser).toEqual(usersMock[1]);
    expect(overview.currentPlanTitle).toBe(currentPlanMock.title);
    expect(overview.pendingExamCount).toBeGreaterThanOrEqual(0);
    expect(overview.nextRecommendedAction.length).toBeGreaterThan(0);
  });
});
