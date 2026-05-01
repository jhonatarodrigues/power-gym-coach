import type { AssessmentReview, AssessmentSubmission } from "@/types";

export const assessmentSubmissionsMock: AssessmentSubmission[] = [
  {
    id: "assessment-submission-1",
    studentId: "user-student-1",
    teacherId: "user-teacher-1",
    planId: "plan-current-1",
    status: "reviewed",
    description:
      "Envio de atualizacao apos 4 semanas. Mantive a dieta na maior parte dos dias e senti melhora no rendimento de pernas.",
    images: [
      {
        id: "assessment-image-1",
        imageUrl:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
        label: "Frente",
      },
      {
        id: "assessment-image-2",
        imageUrl:
          "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
        label: "Costas",
      },
    ],
    submittedAt: "2026-04-26T14:00:00.000Z",
  },
];

export const assessmentReviewsMock: AssessmentReview[] = [
  {
    id: "assessment-review-1",
    submissionId: "assessment-submission-1",
    teacherId: "user-teacher-1",
    planId: "plan-current-1",
    summary:
      "Boa evolucao visual em dorsais e deltoides, com reducao discreta de gordura abdominal.",
    observations:
      "Vamos aumentar um pouco o volume de pernas e subir calorias em dias de treino mais pesado.",
    suggestedChanges:
      "Novo planejamento com ajuste de carboidrato no almoco e no jantar e progressao de carga em quadriceps.",
    createdNewPlan: true,
    reviewedAt: "2026-04-27T09:30:00.000Z",
  },
  {
    id: "assessment-review-2",
    submissionId: "assessment-submission-1",
    teacherId: "user-teacher-1",
    planId: "plan-current-1",
    summary:
      "Feedback complementar de aderencia: boa consistencia no cafe da manha e no treino de quadriceps.",
    observations:
      "Manter comunicacao sobre saciedade no final da tarde e registrar fotos apos 14 dias.",
    suggestedChanges:
      "Sem troca estrutural no plano, apenas ajuste fino na refeicao 3 e reforco tecnico no agachamento.",
    createdNewPlan: false,
    reviewedAt: "2026-04-29T10:15:00.000Z",
  },
];
