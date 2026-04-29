import { useMockAuth } from "@/hooks/useMockAuth";
import { mockExamRepository } from "@/repository/mock";

export function useExamTimeline() {
  const { session } = useMockAuth();
  const isTeacher = session.accessLevel === "teacher";
  const currentUserId = session.currentUser?.id;
  const requests = mockExamRepository
    .listRequests()
    .filter((request) =>
      currentUserId ? request.studentId === currentUserId || isTeacher : true
    );
  const uploads = mockExamRepository.listUploads();

  const timeline = requests
    .flatMap((request) => {
      const requestUploads = uploads.filter(
        (upload) => upload.examRequestId === request.id
      );

      return [
        {
          id: `request-${request.id}`,
          date: request.requestedAt.slice(0, 10),
          title: `Solicitacao: ${request.title}`,
          description: request.note ?? "Sem observacao adicional.",
        },
        ...requestUploads.map((upload) => ({
          id: `upload-${upload.id}`,
          date: upload.uploadedAt.slice(0, 10),
          title: `Upload: ${upload.fileName}`,
          description: "Arquivo vinculado a solicitacao correspondente.",
        })),
      ];
    })
    .sort((left, right) => right.date.localeCompare(left.date));

  return {
    requests,
    uploads,
    timeline,
  };
}
