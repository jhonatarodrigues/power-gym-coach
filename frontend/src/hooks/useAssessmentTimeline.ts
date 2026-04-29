import { mockAssessmentRepository } from "@/repository/mock";

export function useAssessmentTimeline() {
  const submissions = mockAssessmentRepository.listSubmissions();
  const reviews = mockAssessmentRepository.listReviews();
  const submission = submissions[0];
  const review = reviews[0];

  const timeline = submission && review
    ? [
        {
          id: submission.id,
          date: submission.submittedAt.slice(0, 10),
          titleTeacher: "Aluno enviou avaliacao",
          titleStudent: "Voce enviou avaliacao",
          description: submission.description,
        },
        {
          id: review.id,
          date: review.reviewedAt.slice(0, 10),
          titleTeacher: "Devolutiva registrada",
          titleStudent: "Professor revisou sua avaliacao",
          description: review.summary,
        },
      ]
    : [];

  return {
    submission,
    review,
    timeline,
  };
}
