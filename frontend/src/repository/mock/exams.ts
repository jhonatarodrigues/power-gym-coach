import type { ExamRequest, ExamUpload } from "@/types";

export const examRequestsMock: ExamRequest[] = [
  {
    id: "exam-request-1",
    teacherId: "user-teacher-1",
    studentId: "user-student-1",
    title: "Hemograma completo + vitamina D",
    note: "Solicitado para revisar energia, recuperacao e resposta ao aumento de treino.",
    status: "sent",
    requestedAt: "2026-04-20T08:30:00.000Z",
  },
  {
    id: "exam-request-2",
    teacherId: "user-teacher-1",
    studentId: "user-student-1",
    title: "Perfil lipidico",
    note: "Enviar junto com os proximos exames laboratoriais.",
    status: "pending",
    requestedAt: "2026-04-28T10:00:00.000Z",
  },
];

export const examUploadsMock: ExamUpload[] = [
  {
    id: "exam-upload-1",
    examRequestId: "exam-request-1",
    studentId: "user-student-1",
    fileName: "hemograma-vitamina-d-abril-2026.pdf",
    fileUrl: "https://example.com/mock/hemograma-vitamina-d-abril-2026.pdf",
    uploadedAt: "2026-04-25T18:10:00.000Z",
  },
];
