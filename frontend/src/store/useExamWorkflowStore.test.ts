import { act } from "@testing-library/react-native";

import { useExamWorkflowStore } from "@/store/useExamWorkflowStore";

describe("useExamWorkflowStore", () => {
  beforeEach(() => {
    useExamWorkflowStore.getState().reset();
  });

  it("creates a new exam request", () => {
    act(() => {
      useExamWorkflowStore.getState().requestExam({
        teacherId: "user-teacher-1",
        studentId: "user-student-1",
        title: "Novo exame mockado",
        note: "Solicitacao de teste",
      });
    });

    expect(useExamWorkflowStore.getState().requests[0]?.title).toBe(
      "Novo exame mockado"
    );
  });

  it("uploads an exam and marks the request as sent", () => {
    const targetRequestId = useExamWorkflowStore.getState().requests[0]?.id;

    act(() => {
      useExamWorkflowStore.getState().uploadExam({
        examRequestId: targetRequestId,
        studentId: "user-student-1",
        fileName: "upload-de-teste.pdf",
      });
    });

    expect(useExamWorkflowStore.getState().uploads[0]?.fileName).toBe(
      "upload-de-teste.pdf"
    );
    expect(
      useExamWorkflowStore.getState().requests.find((item) => item.id === targetRequestId)
        ?.status
    ).toBe("sent");
  });

  it("returns null when uploading to an unknown request", () => {
    let result = null;

    act(() => {
      result = useExamWorkflowStore.getState().uploadExam({
        examRequestId: "missing-request",
        studentId: "user-student-1",
        fileName: "invalido.pdf",
      });
    });

    expect(result).toBeNull();
  });

  it("updates request status and returns null for missing ids", () => {
    const targetRequestId = useExamWorkflowStore.getState().requests[0]?.id;

    act(() => {
      useExamWorkflowStore.getState().updateRequestStatus(targetRequestId, "reviewed");
    });

    expect(
      useExamWorkflowStore.getState().requests.find((item) => item.id === targetRequestId)
        ?.status
    ).toBe("reviewed");

    expect(
      useExamWorkflowStore.getState().updateRequestStatus("missing-request", "reviewed")
    ).toBeNull();
  });

  it("stores a review note when the teacher reviews an exam", () => {
    const targetRequestId = useExamWorkflowStore.getState().requests[0]?.id;

    act(() => {
      useExamWorkflowStore.getState().reviewExam({
        examRequestId: targetRequestId,
        reviewNote: "Marcadores dentro do esperado.",
      });
    });

    expect(
      useExamWorkflowStore.getState().requests.find((item) => item.id === targetRequestId)
        ?.reviewNote
    ).toBe("Marcadores dentro do esperado.");
    expect(
      useExamWorkflowStore.getState().requests.find((item) => item.id === targetRequestId)
        ?.status
    ).toBe("reviewed");
  });
});
