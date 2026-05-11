import { useConversationStore } from "@/store/useConversationStore";

describe("useConversationStore", () => {
  beforeEach(() => {
    useConversationStore.getState().reset();
  });

  it("appends a new message to the student conversation", () => {
    useConversationStore.getState().sendMessage({
      studentId: "user-student-1",
      coachId: "user-teacher-1",
      planId: "plan-current-1",
      senderRole: "coach",
      senderName: "Rafael Duarte",
      body: "Vamos ajustar o treino amanhã.",
    });

    const conversation = useConversationStore
      .getState()
      .getConversationByStudent("user-student-1");

    expect(conversation).toHaveLength(3);
    expect(conversation[2]?.body).toBe("Vamos ajustar o treino amanhã.");
  });

  it("resets the mocked conversation state", () => {
    useConversationStore.getState().sendMessage({
      studentId: "user-student-1",
      coachId: "user-teacher-1",
      senderRole: "student",
      senderName: "Marina Costa",
      body: "Mensagem temporária",
    });

    useConversationStore.getState().reset();

    expect(useConversationStore.getState().messages).toHaveLength(2);
  });
});
