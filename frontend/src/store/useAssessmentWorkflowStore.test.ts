import { act } from "@testing-library/react-native";

import { useAssessmentWorkflowStore } from "@/store/useAssessmentWorkflowStore";

describe("useAssessmentWorkflowStore", () => {
  beforeEach(() => {
    useAssessmentWorkflowStore.getState().reset();
  });

  it("submits a new mocked assessment", () => {
    act(() => {
      useAssessmentWorkflowStore.getState().submitAssessment({
        studentId: "user-student-1",
        teacherId: "user-teacher-1",
        description: "Nova avaliacao enviada em teste",
      });
    });

    expect(useAssessmentWorkflowStore.getState().submissions[0]?.description).toBe(
      "Nova avaliacao enviada em teste"
    );
    expect(useAssessmentWorkflowStore.getState().submissions[0]?.status).toBe(
      "pending"
    );
  });
});
