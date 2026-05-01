import { useMockAuth } from "@/hooks/useMockAuth";
import { examRepository, type StudentJourneyEvent } from "@/repository";

type ExamTimelineEvent = Omit<StudentJourneyEvent, "domain">;

function getPriorityLabel(status: "pending" | "sent" | "reviewed"): "high" | "medium" | "low" {
  if (status === "pending") {
    return "high";
  }

  if (status === "sent") {
    return "medium";
  }

  return "low";
}

export function useExamTimeline() {
  const { session } = useMockAuth();
  const isTeacher = session.accessLevel === "teacher";
  const currentUserId = session.currentUser?.id;
  const requests = examRepository
    .listRequests()
    .filter((request) =>
      currentUserId ? request.studentId === currentUserId || isTeacher : true
    );
  const uploads = examRepository.listUploads();

  const timeline: ExamTimelineEvent[] = requests
    .flatMap((request): ExamTimelineEvent[] => {
      const requestUploads = uploads.filter(
        (upload) => upload.examRequestId === request.id
      );

      return [
        {
          id: `request-${request.id}`,
          date: request.requestedAt.slice(0, 10),
          title: `Solicitacao: ${request.title}`,
          description: request.note ?? "Sem observacao adicional.",
          statusLabel:
            request.status === "pending"
              ? "Pendente"
              : request.status === "sent"
                ? "Enviado"
                : "Revisado",
          priority: getPriorityLabel(request.status),
          pending: request.status !== "reviewed",
          highlight: request.reviewNote,
        },
        ...requestUploads.map((upload) => ({
          id: `upload-${upload.id}`,
          date: upload.uploadedAt.slice(0, 10),
          title: `Upload: ${upload.fileName}`,
          description: "Arquivo vinculado a solicitacao correspondente.",
          statusLabel: "Upload",
          priority: "medium" as const,
        })),
        ...(request.reviewedAt
          ? [
              {
                id: `review-${request.id}`,
                date: request.reviewedAt.slice(0, 10),
                title: `Revisao: ${request.title}`,
                description: request.reviewNote ?? "Exame revisado pelo coach.",
                statusLabel: "Revisado",
                priority: "low" as const,
              },
            ]
          : []),
      ];
    })
    .sort((left, right) => right.date.localeCompare(left.date));

  return {
    requests,
    uploads,
    pendingRequests: requests.filter((request) => request.status === "pending"),
    sentRequests: requests.filter((request) => request.status === "sent"),
    reviewedRequests: requests.filter((request) => request.status === "reviewed"),
    timeline,
  };
}
