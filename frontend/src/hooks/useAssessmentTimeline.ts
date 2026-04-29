import { assessmentRepository } from "@/repository/assessmentRepository";

export function useAssessmentTimeline() {
  const submissions = assessmentRepository.listSubmissions();
  const reviews = assessmentRepository.listReviews();
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
    submissions,
    reviews,
    submission,
    review,
    timeline,
  };
}
