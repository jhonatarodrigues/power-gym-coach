import type { ConversationMessage } from "@/types";

export const conversationMessagesMock: ConversationMessage[] = [
  {
    id: "message-1",
    studentId: "user-student-1",
    coachId: "user-teacher-1",
    planId: "plan-current-1",
    senderRole: "student",
    senderName: "Marina Costa",
    body: "Coach, consegui seguir a dieta bem melhor esta semana. Posso trocar a banana por mamão no café da manhã?",
    sentAt: "2026-04-30T08:10:00.000Z",
  },
  {
    id: "message-2",
    studentId: "user-student-1",
    coachId: "user-teacher-1",
    planId: "plan-current-1",
    senderRole: "coach",
    senderName: "Rafael Duarte",
    body: "Pode sim. Mantém a mesma porção e me sinaliza se a saciedade mudar muito.",
    sentAt: "2026-04-30T08:45:00.000Z",
  },
];
